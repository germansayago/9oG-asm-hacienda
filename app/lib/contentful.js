// lib/contentful.js

// Asegúrate de que las variables de entorno CONTENTFUL_SPACE_ID y CONTENTFUL_ACCESS_TOKEN
// estén definidas en tu .env.local y en tu configuración de despliegue.

async function fetchContentfulEntries(contentType, revalidateSeconds) {
  const SPACE = process.env.CONTENTFUL_SPACE_ID;
  const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;

  if (!SPACE || !ACCESS_TOKEN) {
    console.error(
      "Error: Contentful environment variables are not configured."
    );
    throw new Error("Contentful environment variables missing.");
  }

  try {
    const url = `https://cdn.contentful.com/spaces/${SPACE}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=${contentType}`;

    const response = await fetch(url, {
      next: {
        revalidate: revalidateSeconds,
      },
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(
        `Contentful API error for ${contentType}: ${response.status} - ${errorBody}`
      );
      throw new Error(`Failed to fetch ${contentType}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching ${contentType} from Contentful:`, error);
    throw error;
  }
}

// Resuelve una referencia de imagen singular (usada para el campo 'image' de remates)
function resolveSingleImage(imageRef, assetMap) {
  if (imageRef?.sys?.id) {
    const asset = assetMap.get(imageRef.sys.id);
    if (asset?.fields?.file?.url) {
      return {
        ...imageRef,
        url: `https:${asset.fields.file.url}`,
      };
    }
  }
  return imageRef;
}

// Resuelve un array de referencias de imágenes (usada para el campo 'images' de galería)
function resolveMultipleImages(imageRefsArray, assetMap) {
  if (!Array.isArray(imageRefsArray)) return imageRefsArray;
  return imageRefsArray.map((imageRef) =>
    resolveSingleImage(imageRef, assetMap)
  );
}

// --- Funciones de acceso a datos ---

export async function getAuctions() {
  try {
    const data = await fetchContentfulEntries("auctions", 60); // Revalida cada 60 segundos
    const assets = data.includes?.Asset || [];
    const entries = data.items || [];

    const assetMap = new Map();
    assets.forEach((asset) => {
      assetMap.set(asset.sys.id, asset);
    });

    // Procesa el campo 'image' (singular) en cada entrada de remate
    const processedAuctions = entries.map((auction) => {
      const newAuction = { ...auction };
      if (newAuction.fields?.image) {
        newAuction.fields.image = resolveSingleImage(
          newAuction.fields.image,
          assetMap
        );
      }
      return newAuction;
    });

    return processedAuctions;
  } catch (error) {
    console.error("Error in getAuctions:", error);
    return [];
  }
}

export async function getGalleryImages() {
  try {
    const data = await fetchContentfulEntries("gallery", 3600); // Revalida cada 3600 segundos (1 hora)
    const assets = data.includes?.Asset || [];
    const entries = data.items || [];

    const assetMap = new Map();
    assets.forEach((asset) => {
      assetMap.set(asset.sys.id, asset);
    });

    // Procesa el campo 'images' (array) en cada entrada de galería
    const processedEntries = entries.map((entry) => {
      const newEntry = { ...entry };
      if (newEntry.fields?.images) {
        newEntry.fields.images = resolveMultipleImages(
          newEntry.fields.images,
          assetMap
        );
      }
      return newEntry;
    });

    return processedEntries;
  } catch (error) {
    console.error("Error in getGalleryImages:", error);
    return [];
  }
}
