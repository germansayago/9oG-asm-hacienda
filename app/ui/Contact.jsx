import Form from "./Form";

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="header">
              <h2>Contacto</h2>
              <p className="lead">
                Solicitá información sobre nuestros remates
              </p>
            </div>
          </div>
        </div>

        <Form />
      </div>
    </section>
  );
}
