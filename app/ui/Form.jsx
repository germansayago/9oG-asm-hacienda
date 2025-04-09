"use client";

import { useState } from "react";
import { useForm } from "@/hooks/useForm";
import { useRouter, useSearchParams } from "next/navigation";
import { sendData } from "@/lib/actions";
import Script from "next/script";

const makeRandomId = (length = 16) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from(
    { length },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
};

export default function Form() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialValues = {
    id: makeRandomId(),
    fname: "",
    lname: "",
    email: "",
    phone: "",
    location: "",
    honey: "", // Campo honeypot
    origin: "landing",
  };

  const { values, handleInputChange, reset } = useForm(initialValues);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { fname, lname, email, phone, location } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(false);

    // Honeypot
    if (values.honey !== "") {
      console.warn("Formulario bloqueado por honeypot.");
      return;
    }

    // Verificación de clave reCAPTCHA
    if (!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
      console.error("Falta la site key de reCAPTCHA");
      setError(true);
      return;
    }

    grecaptcha.ready(async () => {
      const token = await grecaptcha.execute(
        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
        {
          action: "submit",
        }
      );

      const res = await fetch("/validate", {
        method: "POST",
        body: JSON.stringify({ token }),
      });

      if (res.status === 200) {
        if (!fname || !lname || !email || !phone) {
          setError(true);
          return;
        }

        setLoading(true);

        // UTM
        if (searchParams.get("utm_campaign"))
          values.utm_campaign = searchParams.get("utm_campaign");
        if (searchParams.get("utm_source"))
          values.utm_source = searchParams.get("utm_source");
        if (searchParams.get("utm_medium"))
          values.utm_medium = searchParams.get("utm_medium");

        sendData(values)
          .then((res) => {
            if (res.status === 200) {
              window.dataLayer = window.dataLayer || [];
              window.dataLayer.push({
                event: "custom.gtm.submittedForm",
                label: "landing",
              });

              reset();
              //setIsSended(true);
              router.push("/gracias");
              return;
            } else {
              setError(true);
            }
          })
          .catch(() => setError(true))
          .finally(() => setLoading(false));
      } else {
        setError(true);
      }
    });
  };

  return (
    <section className="form" id="form">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <input
                    type="text"
                    name="fname"
                    className="form-control"
                    placeholder="Nombre"
                    value={fname}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    name="lname"
                    className="form-control"
                    placeholder="Apellido"
                    value={lname}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    placeholder="Teléfono"
                    value={phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-12">
                  <input
                    type="text"
                    name="location"
                    className="form-control"
                    placeholder="Localidad"
                    value={location}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-12">
                  <input
                    type="text"
                    name="honey"
                    className="d-none"
                    value={values.honey}
                    onChange={handleInputChange}
                    autoComplete="off"
                  />
                </div>
                <div className="col-md-12 text-end">
                  <button
                    type="submit"
                    className="btn btn-lg btn-success"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        Enviando...
                        <span className="spinner-border spinner-border-sm ms-2"></span>
                      </>
                    ) : (
                      "Enviar"
                    )}
                  </button>
                </div>
              </div>
              {error && (
                <div className="alert alert-danger mt-3">
                  Error al enviar el formulario. Verificá los datos.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
      />
    </section>
  );
}
