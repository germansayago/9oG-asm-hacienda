import { getGalleryImages } from "@/lib/contentful";
import GalleryClient from "./GalleryClient";

export default async function Gallery() {
  // Obtener entradas del modelo Gallery desde Contentful
  const entries = await getGalleryImages();

  // Unificar todas las imágenes cargadas en un único array
  const images = entries.flatMap((entry) => entry.fields.images || []);

  console.log(images);

  return (
    <section className="gallery bg-light">
      <div className="container">
        <div className="row justify-content-center mb-4">
          <div className="col-md-6 text-center">
            <h2 className="mb-4 text-primary">
              Resultados que hablan por sí mismos
            </h2>
            <p className="lead mb-4">
              Más de cuatro décadas de experiencia se traducen en operaciones
              exitosas para nuestros clientes.
            </p>
          </div>
        </div>

        {/* Componente cliente que maneja la UI interactiva */}
        <GalleryClient images={images} />

        <div className="row justify-content-center mt-5">
          <div className="col-md-6 text-center">
            <h5 className="">
              <span className="fw-bold">Contactanos</span> y descubrí por qué
              productores y compradores confían en{" "}
              <span className="fw-bold">Alfredo S. Modino</span> para sus
              transacciones ganaderas.
            </h5>
          </div>
        </div>
      </div>
    </section>
  );
}
