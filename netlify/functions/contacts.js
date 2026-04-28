export default async (req) => {
    if (req.method === "OPTIONS") {
        return new Response(null, {
            status: 204,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
            },
        });
    }

    try {
        const body = await req.text();

        const response = await fetch(
            "https://loopsolutions.free.nf/server/api/contacts.php",
            {
                method: "POST",
                headers: {
                    "Content-Type": req.headers.get("Content-Type") || "application/json",
                },
                body,
            }
        );

        const data = await response.text();

        return new Response(data, {
            status: response.status,
            headers: {
                "Content-Type": response.headers.get("Content-Type") || "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        });
    }
};

export const config = { path: "/api/contacts" };