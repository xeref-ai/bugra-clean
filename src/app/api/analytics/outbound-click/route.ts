
export async function POST(req: Request) {
  try {
    const payload = await req.json();
    // Forward to your log/analytics sink here if desired.
    console.log("Outbound click tracked:", payload);
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Error tracking outbound click:", error);
    return new Response("Error processing request", { status: 400 });
  }
}
