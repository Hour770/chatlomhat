import { NextRequest } from "next/server";

const backendUrl = process.env.BACKEND_API_URL;

if (!backendUrl) {
  // This error will only appear on the server, not in the browser
  // and helps you catch missing configuration early.
  throw new Error("BACKEND_API_URL environment variable is required");
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const backendResponse = await fetch(`${backendUrl}/solve`, {
      method: "POST",
      body: formData,
    });

    const text = await backendResponse.text();

    return new Response(text, {
      status: backendResponse.status,
      headers: {
        "Content-Type": backendResponse.headers.get("content-type") || "application/json",
      },
    });
  } catch (error) {
    console.error("Error proxying /solve:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Error contacting backend" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
