"use client";

export default function CtaButton({
  id = "form",
  text = "¡Solicita Más Información!",
}) {
  const handleClick = () => {
    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    } else {
      console.warn(`Elemento con ID "${id}" no encontrado en el DOM.`);
    }
  };

  return (
    <button
      className="btn btn-lg btn-primary btn-cta text-white"
      onClick={handleClick}
    >
      {text}
    </button>
  );
}
