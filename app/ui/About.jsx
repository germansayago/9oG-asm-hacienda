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
                <h2 className="mb-5 text-primary">Experiencia y Tradición en Consignación de Hacienda</h2>
            </div>
            <div className="col-md-7 text-center px-md-4">
                <p className="lead mb-4">Con más de 40 años de trayectoria en el mercado ganadero argentino, <span className="fw-bold">Alfredo S. Modino </span> ha construído una reputación basada en la confianza, el conocimiento profundo del sector y el compromiso con cada cliente.</p>
                <p className="lead mb-4">Somos especialistas en <span className="fw-bold">consignación de hacienda</span>, brindando un servicio integral que va desde la evaluación inicial hasta el cierre exitoso de cada operación. Nuestro equipo de profesionales conoce cada aspecto del mercado ganadero, permitiéndonos ofrecer asesoramiento especializado y personalizado.</p>
                <p className="lead mb-4">La innovación constante y la adaptación a las nuevas tecnologías nos permiten ofrecer herramientas digitales que facilitan la participación en remates ganaderos, sin perder el trato cercano que nos caracteriza.</p>
            </div>
        </div>
      </div>
    </section>
  );
}
