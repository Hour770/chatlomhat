import { NextRequest } from "next/server";

const backendUrl = process.env.BACKEND_API_URL;

if (!backendUrl) {
  throw new Error("BACKEND_API_URL environment variable is required");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const backendResponse = await fetch(`${backendUrl}/generate-exercises`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const text = await backendResponse.text();

    return new Response(text, {
      status: backendResponse.status,
      headers: {
        "Content-Type": backendResponse.headers.get("content-type") || "application/json",
      },
    });
  } catch (error) {
    console.error("Error proxying /generate-exercises:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Error contacting backend" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
