"use client";

import { useState } from "react";
import Image from "next/image";
import { Container, Row, Col, Card, Modal, Button } from "react-bootstrap";

const images = [
  { src: "/images/galeria/foto1.png", alt: "Foto 1" },
  { src: "/images/galeria/foto2.png", alt: "Foto 2" },
  { src: "/images/galeria/foto3.png", alt: "Foto 3" },
  { src: "/images/galeria/foto1.png", alt: "Foto 4" },
  { src: "/images/galeria/foto1.png", alt: "Foto 5" },
  { src: "/images/galeria/foto1.png", alt: "Foto 6" },
  { src: "/images/galeria/foto1.png", alt: "Foto 7" },
  { src: "/images/galeria/foto1.png", alt: "Foto 8" },
];

export default function Gallery() {
  const [show, setShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleShow = (img) => {
    setSelectedImage(img);
    setShow(true);
  };

  return (
    <section className="gallery">
      <Container>
        <Row className="header justify-content-center">
          <Col md={6} className="text-center">
            <h2>Remates Ganaderos</h2>
            <p className="lead">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptates, eveniet.
            </p>
          </Col>
        </Row>

        <Row className="g-3">
          {images.map((img, index) => (
            <Col key={index} xs={6} md={4} lg={3}>
              <Card
                className="border-0 shadow-sm"
                role="button"
                onClick={() => handleShow(img)}
              >
                {/* eslint-disable-next-line */}
                <img src={img.src} alt={img.alt} className="rounded" />
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Lightbox Modal */}
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Vista Previa</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {selectedImage && (
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              width={960}
              height={720}
              className="img-fluid"
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
}
