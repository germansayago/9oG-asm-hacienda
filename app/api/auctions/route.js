import { getAuctions } from "@/lib/contentful";

export async function GET() {
  try {
    const auctions = await getAuctions();
    return Response.json(auctions);
  } catch (error) {
    console.error("Error en API /api/auctions:", error);
    return new Response("Error al obtener los remates", { status: 500 });
  }
}
