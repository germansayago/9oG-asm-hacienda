import Image from "next/image";
import { getAuctions } from "@/lib/contentful";

const now = new Date();

export default async function Auctions() {
  const auctions = await getAuctions();

  // Filtrar remates futuros o del día
  const upcoming = auctions.filter((auction) => {
    const auctionDate = new Date(auction.fields.date);
    return auctionDate >= new Date(now.setHours(0, 0, 0, 0));
  });

  // Ordenar por fecha ascendente
  const sortedUpcoming = upcoming.sort(
    (a, b) => new Date(a.fields.date) - new Date(b.fields.date)
  );

  // const sortedUpcoming = [];

  return (
    <section id="auctions" className="auctions">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-6">
            <div className="header text-center mb-4">
              <h2 className="mb-4">Próximos Remates Ganaderos</h2>
              <p className="lead mb-5">Planificá tu participación en nuestros remates de hacienda y no pierdas la oportunidad de obtener los mejores resultados</p>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          {sortedUpcoming.length > 0 ? (
            sortedUpcoming.map((auction) => {
              const { title, image, date } = auction.fields;
              const imgFile = image?.fields?.file;
              const imgUrl = imgFile?.url;
              const imgWidth = imgFile?.details?.image?.width;
              const imgHeight = imgFile?.details?.image?.height;

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

                    {imgUrl && imgWidth && imgHeight && (
                      <Image
                        src={`https:${imgUrl}`}
                        alt={title}
                        width={imgWidth}
                        height={imgHeight}
                        className="card-img-bottom"
                      />
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-12 text-center">
              <p className="text-muted">
                No hay remates disponibles en este momento.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
