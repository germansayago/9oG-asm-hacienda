export default function Gracias() {
  return (
    <div className="tanks">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <h3>Gracias por registrarte</h3>
            <p className="lead mb-4">
              Muy pronto, uno de nuestros comerciales se pondrá en contacto contigo
            </p>
            <h4 className="mt-3 mb-3">Escribinos por Whatsapp</h4>
            <div className="whatsapp">
              <div className="row justify-content-center">
                <div className="col-md-3">
                  <h5>Hacienda Gorda</h5>
                  <h6>Pedro Altahaparro</h6>
                  <a
                    id="btn-hacienda"
                    href="https://wa.me/541127837557"
                    className="btn btn-success mb-4"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <i className="fa-brands fa-whatsapp"></i> +54 11 2783 7557
                  </a>
                </div>
                <div className="col-md-3">
                  <h5>Invernada y Cría</h5>
                  <h6>Mario Masanti</h6>
                  <a
                    id="btn-invernada"
                    href="https://wa.me/3583647964"
                    className="btn btn-success mb-4"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <i className="fa-brands fa-whatsapp"></i> +54 358 3647 964
                  </a>
                </div>
              </div>
            </div>
            <h4 className="mb-2">Te invitamos a que visites nuestra web</h4>
            <a
              id="link-web"
              href="https://alfredosmondino.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              alfredosmondino.com
            </a>
            <h4 className="mt-3">o que nos sigas en nuestras redes</h4>
            <div className="social">
              <a
                id="btn-facebook"
                href="https://es-la.facebook.com/alfredosmondino/"
                rel="noopener noreferrer"
                target="_blank"
                className="btn btn-link"
              >
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a
                id="btn-instagram"
                href="https://www.instagram.com/alfredosmondino/"
                rel="noopener noreferrer"
                target="_blank"
                className="btn btn-link"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a
                id="btn-twitter"
                href="https://twitter.com/alfredosmondino"
                rel="noopener noreferrer"
                target="_blank"
                className="btn btn-link"
              >
                <i className="fa-brands fa-twitter"></i>
              </a>
              <a
                id="btn-youtube"
                href="https://www.youtube.com/channel/UCgQMosm3rvXHFWKRLtr4f6g"
                rel="noopener noreferrer"
                target="_blank"
                className="btn btn-link"
              >
                <i className="fa-brands fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
