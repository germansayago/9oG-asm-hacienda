import { createClient } from "contentful";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

// Obtener todos los remates
export const getAuctions = async () => {
  try {
    const entries = await client.getEntries({ content_type: 'auctions' });
    return entries.items; // Devuelve los remates
  } catch (error) {
    console.error("Error fetching auctions from Contentful:", error);
    return []; // En caso de error, retorna un array vacío
  }
};

// Obtener todas las imágenes de la galería
export async function getGalleryImages() {
  const entries = await client.getEntries({ content_type: "gallery" });
  return entries.items;
}
