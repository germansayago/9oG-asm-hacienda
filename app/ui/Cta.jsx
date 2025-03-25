import React from "react";
import CtaButton from "./CtaButton";

export default function Cta() {
  return (
    <section className="container">
      {/* <div className="container">
        <div className="row justify-content-between">
          <div className="col-md-7">
            <div className="cta-title">¿Querés vender o comprar hacienda?</div>
            <div className="cta-text">
              Dejanos tus datos y un asesor te contactará para brindarte toda la
              información.
            </div>
            <div className="cta-button">
              <CtaButton id="contact" text="Consultar ahora" />
            </div>
          </div>
          <div className="col-md-5">
            <img src="/images/hero.webp" alt="" className="img-fluid" />
          </div>
        </div>
      </div> */}
      <div className="cta">
        <div className="row">
          <div className="col-md-6 order-2">
            <div className="cta-content">
              <div className="cta-title">
                ¿Querés vender o comprar hacienda?
              </div>
              <div className="cta-text">
                Dejanos tus datos y un asesor te contactará para brindarte toda
                la información.
              </div>
              <div className="cta-button">
                <CtaButton id="contact" text="Consultar ahora" />
              </div>
            </div>
          </div>
          <div className="col-md-6 order-1">
            <div className="cta-img"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
