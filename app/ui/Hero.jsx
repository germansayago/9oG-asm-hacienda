import CtaButton from "./CtaButton";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-11 col-lg-7">
              <h2 className="mb-4">Tu hacienda, el mejor negocio</h2>
            </div>
            <div className="col-11 col-lg-6">
              <h1 className="mb-4">
                Conectamos productores con compradores en los mejores remates ganaderos
                del país.
              </h1>
              <p className="lead mb-5">
                Transparencia, respaldo y excelentes resultados en la
                comercialización de hacienda.
              </p>
              <CtaButton id="auctions" text="Consultá el próximo remate" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
