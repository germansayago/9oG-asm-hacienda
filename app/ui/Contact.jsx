import { Suspense } from "react";
import Form from "./Form";

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="header">
              <h2 className="mb-4">Contactanos</h2>
              <h4 className="mb-3">¿Necesitás más información sobre nuestros remates?</h4>
              <p className="lead">Nuestro equipo está a sólo un mensaje de distancia. <br/> <span className="fw-bold">¡Completa el formulario y agendá tu participación ahora!</span></p>
            </div>
          </div>
        </div>

        <Suspense>
          <Form />
        </Suspense>
      </div>
    </section>
  );
}
