import { getGalleryImages } from "@/lib/contentful";
import GalleryClient from "./GalleryClient";

export default async function Gallery() {
  // Obtener entradas del modelo Gallery desde Contentful
  const entries = await getGalleryImages();

  // Unificar todas las imágenes cargadas en un único array
  const images = entries.flatMap((entry) => entry.fields.images || []);

  return (
    <section className="gallery">
      <div className="container">
        <div className="row justify-content-center mb-4">
          <div className="col-md-6 text-center">
            <h2>Galería de Fotos</h2>
          </div>
        </div>

        {/* Componente cliente que maneja la UI interactiva */}
        <GalleryClient images={images} />
      </div>
    </section>
  );
}
