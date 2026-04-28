// netlify/functions/contacts.js
export default async (req) => {
    const corsHeaders = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    };

    // Handle preflight
    if (req.method === "OPTIONS") {
        return new Response(null, { status: 204, headers: corsHeaders });
    }

    try {
        const body = await req.text();

        console.log("Incoming body:", body); // debug log

        const response = await fetch(
            "https://loopsolutions.free.nf/server/api/contacts.php",
            {
                method: req.method,
                headers: {
                    "Content-Type": "application/json", // ✅ always send JSON
                },
                body: req.method === "POST" ? body : undefined,
            }
        );

        const responseText = await response.text();

        console.log("PHP response status:", response.status); // debug log
        console.log("PHP response body:", responseText);       // debug log

        return new Response(responseText, {
            status: response.status,
            headers: {
                "Content-Type": "application/json",
                ...corsHeaders,
            },
        });
    } catch (err) {
        console.error("Proxy error:", err.message);
        return new Response(JSON.stringify({ status: "error", message: err.message }), {
            status: 500,
            headers: { "Content-Type": "application/json", ...corsHeaders },
        });
    }
};

export const config = { path: "/api/contacts" };