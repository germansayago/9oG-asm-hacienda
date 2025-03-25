const auctions = [
  {
    img: "/images/remates/2025-03-18.jpg",
    date: "Viernes 18 de Marzo",
  },
  {
    img: "/images/remates/2025-03-28.jpg",
    date: "Miércoles 28 de Noviembre",
  },
  {
    img: "/images/remates/2025-03-18.jpg",
    date: "Viernes 28 de Marzo",
  },
];

export default function Auctions() {
  return (
    <section id="auctions" className="auctions">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="header">
              <h2>Próximos Remates</h2>
              <p className="lead d-none">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          {auctions.map((auction, index) => (
            <div className="col-lg-3" key={index}>
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">{auction.date}</h4>
                </div>
                {/* eslint-disable-next-line */}
                <img src={auction.img} alt="" className="card-img-bottom" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
