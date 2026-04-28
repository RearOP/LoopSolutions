<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Database setup (MySQL)
$dbHost = getenv('DB_HOST') ?: 'sql304.infinityfree.com';
$dbName = getenv('DB_NAME') ?: 'if0_41776323_loopportfolio';
$dbUser = getenv('DB_USER') ?: 'if0_41776323';
$dbPass = getenv('DB_PASS') ?: '4OgRMuaCSRIr';

$pdo = new PDO("mysql:host=$dbHost;dbname=$dbName;charset=utf8mb4", $dbUser, $dbPass);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Initialize database schema if not exists
$pdo->exec("
    CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        company VARCHAR(255) DEFAULT '',
        message TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
");

// Helper to notify the Node Load Balancer
// function notifyLoadBalancer($data)
// {
//     $ch = curl_init('http://localhost:8000/internal/trigger-notification');
//     curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
//     curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
//     curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
//     curl_exec($ch);
//     curl_close($ch);
// }

// Handle GET request (Admin fetch)
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $pdo->query("SELECT * FROM contacts ORDER BY created_at DESC");
    $contacts = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(["status" => "success", "data" => $contacts]);
    exit();
}

// Handle POST request (Contact form submission)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    // Validate
    if (empty($data['name']) || empty($data['email']) || empty($data['message'])) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Missing required fields"]);
        exit();
    }

    try {
        $stmt = $pdo->prepare("INSERT INTO contacts (name, email, company, message) VALUES (:name, :email, :company, :message)");
        $stmt->execute([
            ':name' => $data['name'],
            ':email' => $data['email'],
            ':company' => $data['company'] ?? '',
            ':message' => $data['message']
        ]);

        $insertedId = $pdo->lastInsertId();

        // Notify Node LB
        $data['id'] = $insertedId;
        $data['created_at'] = date('Y-m-d H:i:s');
        notifyLoadBalancer($data);

        http_response_code(201);
        echo json_encode(["status" => "success", "message" => "Contact saved successfully", "id" => $insertedId]);
    } catch (\PDOException $e) {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Database error: " . $e->getMessage()]);
    }
    exit();
}

http_response_code(405);
echo json_encode(["status" => "error", "message" => "Method not allowed"]);
