import { createClient } from "contentful";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

// Obtener todos los remates
export async function getAuctions() {
  const entries = await client.getEntries({ content_type: "auctions" });
  return entries.items;
}

// Obtener todas las imágenes de la galería
export async function getGalleryImages() {
  const entries = await client.getEntries({ content_type: "gallery" });
  return entries.items;
}
