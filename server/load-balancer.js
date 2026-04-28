import http from 'http';
import httpProxy from 'http-proxy';
import { spawn } from 'child_process';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = 8000;
const PORTS = [8001, 8002, 8003];

// 1. Spawn PHP Workers
PORTS.forEach(port => {
    // Serve from the current directory (server/)
    const worker = spawn('php', ['-S', `127.0.0.1:${port}`], {
        cwd: __dirname,
        // stdio: 'inherit' is omitted to avoid terminal spam, 
        // uncomment or log specifically if needed.
    });
    console.log(`Spawned PHP worker on port ${port}`);
    
    worker.stdout.on('data', (data) => console.log(`[Worker ${port}]: ${data}`));
    worker.stderr.on('data', (data) => console.error(`[Worker ${port} Error]: ${data}`));
    worker.on('close', code => console.log(`Worker ${port} exited with code ${code}`));
});

// 2. Setup Express & Proxy
const app = express();
const proxy = httpProxy.createProxyServer({});

app.use(cors());

// Notification Clients
let clients = [];

// SSE Endpoint
app.get('/api/notifications', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();
    
    clients.push(res);
    console.log('Client connected to SSE. Total clients:', clients.length);
    
    req.on('close', () => {
        clients = clients.filter(client => client !== res);
        console.log('Client disconnected from SSE. Total clients:', clients.length);
    });
});

// Internal Webhook (from PHP) to trigger notification
app.post('/internal/trigger-notification', bodyParser.json(), (req, res) => {
    const data = req.body;
    console.log('Received internal notification alert from PHP. Broadcasting to connected dashboards..');
    clients.forEach(client => client.write(`data: ${JSON.stringify(data)}\n\n`));
    res.sendStatus(200);
});

// Load Balancer (Round Robin) proxy for /api/*
let currentIndex = 0;
app.use((req, res, next) => {
    if (req.path.startsWith('/api/')) {
        const targetPort = PORTS[currentIndex];
        currentIndex = (currentIndex + 1) % PORTS.length;
        
        // Rewrite path to append .php so the PHP router executes it properly.
        // e.g. /api/contacts -> /api/contacts.php
        req.url = req.url.split('?')[0]; // Strip query params for rewrite base
        if (!req.url.endsWith('.php') && req.url !== '/api/notifications') {
            req.url = req.url + '.php';
        }
        
        proxy.web(req, res, { target: `http://127.0.0.1:${targetPort}` }, (e) => {
            console.error(`Proxy Error (Port ${targetPort}):`, e);
            res.status(500).send('Load Balancer Proxy Error');
        });
    } else {
        next();
    }
});

app.listen(PORT, () => {
    console.log(`Node.js Load balancer (and SSE hub) running on http://127.0.0.1:${PORT}`);
});
