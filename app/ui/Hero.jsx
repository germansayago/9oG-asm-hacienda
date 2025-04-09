import CtaButton from "./CtaButton";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-11 col-md-7">
              <h1 className="mb-4">Tu hacienda, el mejor negocio</h1>
              <p className="lead mb-5">
                Conectamos productores con compradores en los mejores remates ganaderos
                del país. Transparencia, respaldo y los mejores resultados en la
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
