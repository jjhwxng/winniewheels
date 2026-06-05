// app/api/camera/route.js
export const runtime = "nodejs";

export async function GET() {
  const PI_STREAM_URL = "http://172.20.10.4:8000/stream.mjpg";

  const upstream = await fetch(PI_STREAM_URL, {
    cache: "no-store",
  });

  if (!upstream.ok || !upstream.body) {
    return new Response("Failed to connect to camera stream", { status: 502 });
  }

  return new Response(upstream.body, {
    status: 200,
    headers: {
      "Content-Type":
        upstream.headers.get("content-type") ||
        "multipart/x-mixed-replace; boundary=FRAME",
      "Cache-Control": "no-store",
    },
  });
}