"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Auctions() {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auctions")
      .then((res) => {
        if (!res.ok) {
          // Mejor manejo de errores HTTP
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) {
          // Validación de que los datos son un array
          console.error("API /api/auctions did not return an array:", data);
          setAuctions([]);
          return;
        }

        const now = new Date();
        // Ajuste para comparar solo el día, no la hora, manteniendo el inicio del día actual
        const startOfToday = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate()
        );

        const upcoming = data.filter((auction) => {
          if (!auction.fields || !auction.fields.date) return false; // Evitar errores si 'date' no existe
          const auctionDate = new Date(auction.fields.date);
          return auctionDate >= startOfToday;
        });

        const sorted = upcoming.sort(
          (a, b) => new Date(a.fields.date) - new Date(b.fields.date)
        );

        setAuctions(sorted);
        // console.log(sorted); // Mantener el console.log si lo usas para depuración
      })
      .catch((error) => {
        // Captura el error para depuración
        console.error("Error al obtener o procesar remates:", error);
        setAuctions([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-center">Cargando remates...</p>;
  }

  // Si no hay remates y no está cargando, muestra el mensaje de no disponibles
  if (auctions.length === 0) {
    return (
      <section id="auctions" className="auctions">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10 col-lg-6">
              <div className="header text-center mb-4">
                <h2 className="mb-4">Próximos Remates Ganaderos</h2>
                <p className="lead mb-5">
                  Planificá tu participación en nuestros remates de hacienda y
                  no pierdas la oportunidad de obtener los mejores resultados
                </p>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-12 text-center">
              <p className="text-muted">
                No hay remates disponibles en este momento.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="auctions" className="auctions">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-6">
            <div className="header text-center mb-4">
              <h2 className="mb-4">Próximos Remates Ganaderos</h2>
              <p className="lead mb-5">
                Planificá tu participación en nuestros remates de hacienda y no
                pierdas la oportunidad de obtener los mejores resultados
              </p>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          {auctions.map((auction) => {
            const { title, image, date } = auction.fields;
            // AHORA: image ya tiene las propiedades url, width, height, altText directamente
            const imgUrl = image?.url;
            const imgWidth = image?.width; // Proviene de lib/contentful.js
            const imgHeight = image?.height; // Proviene de lib/contentful.js
            const imgAlt = image?.altText || title; // Proviene de lib/contentful.js o usa el título del remate

            return (
              <div className="col-lg-3" key={auction.sys.id}>
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">
                      {new Date(date).toLocaleDateString("es-AR", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                      })}
                    </h4>
                  </div>

                  {/* Renderiza Image solo si imgUrl existe y tenemos width/height (o valores predeterminados) */}
                  {
                    imgUrl && (imgWidth || imgHeight) ? ( // Asegúrate de tener al menos uno de los dos para Next/Image
                      <Image
                        src={imgUrl}
                        alt={imgAlt}
                        width={imgWidth || 300} // Usa el width resuelto, o un valor por defecto si no existe
                        height={imgHeight || 200} // Usa el height resuelto, o un valor por defecto si no existe
                        className="card-img-bottom"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" // Optimización para diferentes tamaños de pantalla
                        priority={false} // No es necesario que todos sean priority, solo los primeros en el viewport
                      />
                    ) : imgUrl ? ( // Si solo hay URL pero no dimensiones, usa un Image genérico con fill/responsive si tu layout lo permite
                      // Ojo: Si tu CSS no maneja bien 'fill', esto podría seguir rompiendo el layout.
                      // La opción segura es siempre tener width/height para Image.
                      <img
                        src={imgUrl}
                        alt={imgAlt}
                        className="card-img-bottom"
                        style={{ maxWidth: "100%", height: "auto" }}
                      />
                    ) : null // Si no hay URL, no renderiza imagen
                  }
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
