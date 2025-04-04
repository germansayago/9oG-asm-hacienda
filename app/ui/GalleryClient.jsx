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

  const slides = Array.isArray(images)
    ? images.map((img) => ({
        src: `https:${img.fields.file.url}`,
        alt: img.fields.title || "Imagen",
      }))
    : [];

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
        {slides.map((img, i) => (
          <div key={i} className="col-6 col-md-4 col-lg-3">
            <div
              className="card border-0 shadow-sm"
              onClick={() => {
                setIndex(i);
                setOpen(true);
              }}
              style={{ cursor: "pointer" }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={600}
                height={400}
                className="card-img-top rounded"
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
