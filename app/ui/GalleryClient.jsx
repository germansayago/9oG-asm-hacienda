"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

export default function GalleryClient({ images }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  // --- MODIFICACIÓN CLAVE AQUÍ ---
  // El array 'images' que llega aquí ya debería tener objetos con la propiedad 'url'.
  // NO necesitamos navegar por 'fields.file.url' ni 'https:'.
  const slides = Array.isArray(images)
    ? images
        .filter((img) => img.url) // Filtra para asegurar que la imagen tenga una URL válida
        .map((img) => ({
          src: img.url, // ¡Usa directamente la propiedad 'url' que ya está resuelta!
          // Para el texto alternativo (alt text), busca en 'altText' (si lo extraemos)
          // o en 'fields.title' / 'fields.description' del asset original, si los necesitas
          alt:
            img.altText ||
            img.fields?.title ||
            img.fields?.description ||
            "Imagen de Galería",
          // Opcional: Si Lightbox puede usar width/height para optimización, puedes pasar img.width/height aquí
          // width: img.width,
          // height: img.height,
        }))
    : [];
  // --- FIN MODIFICACIÓN CLAVE ---

  if (slides.length === 0) {
    return (
      <div className="text-center text-muted">
        No hay imágenes disponibles en la galería.
      </div>
    );
  }

  return (
    <>
      <div className="row g-3">
        {" "}
        {/* Respetando tu estructura HTML */}
        {slides.map((img, i) => (
          // Usamos img.src como key porque es una URL única para cada imagen.
          // Si img.src no es única, puedes usar img.sys.id o simplemente 'i'.
          <div key={img.src || i} className="col-6 col-md-4 col-lg-3">
            <div
              className="card border-0 shadow-sm"
              onClick={() => {
                setIndex(i);
                setOpen(true);
              }}
              style={{ cursor: "pointer" }}
            >
              {/* Respetando tu estructura original para Image */}
              {/* Es crucial pasar un width y height a next/image si no usas 'fill' */}
              <Image
                src={img.src} // Usa img.src, que es la URL completa
                alt={img.alt}
                width={600} // Puedes ajustar estos valores a los tamaños que esperas para tu galería
                height={400} // Si Contentful te da width/height resueltos, úsalos: width={img.width || 600}
                className="card-img-top rounded" // Tu clase CSS original
                style={{ objectFit: "cover" }} // Para que la imagen no se distorsione
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Optimización responsive
              />
            </div>
          </div>
        ))}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        plugins={[Zoom, Thumbnails]}
      />
    </>
  );
}
