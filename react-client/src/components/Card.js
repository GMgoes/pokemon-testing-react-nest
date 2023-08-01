/* eslint-disable jsx-a11y/img-redundant-alt */
import "../styles/personalize.css";
import { useState } from "react";
import Modal from "react-modal";

function CardPokemon({ info }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const arrayMoves = info.description; /* info.description.slice(0, 10); */
  const listMoves = arrayMoves.map((element, index) => (
    <li key={index}>{element}</li>
  ));

  return (
    <div
      className={`card mt-3 ${info.type}`}
      style={{
        display: "flex",
        width: "18rem",
        alignItems: "center",
      }}
    >
      <img
        src={info.image}
        className="mt-auto"
        alt="Image of a Pokemon"
        style={{ width: "200px", height: "200px" }}
      ></img>
      <div className="card-body"></div>
      <div>
        <button
          type="button"
          className="btn btn-outline-dark mb-3 name"
          onClick={openModal}
        >
          {info.name}
        </button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className={`${info.type} mt-5`}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0 ,0, 0.8)",
              display: "flex",
              justifyContent: "center",
            },
            content: {
              border: "1px solid",
              borderRadius: "20px",
              padding: "20px",
              width: "80rem",
              height: "50rem",
            },
          }}
        >
          <h1
            className="name"
            style={{ display: "flex", justifyContent: "center" }}
          >
            {info.name}
          </h1>
          <div
            className="mt-3"
            style={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <div>
              <img
                src={info.image}
                className="mt-auto"
                alt="Image of a Pokemon"
                style={{ width: "500px", height: "500px" }}
              ></img>
            </div>
            <div
              style={{
                maxWidth: "50%",
                justifyContent: "center",
                height: "200px",
              }}
            >
              <h3>Movimentos</h3>
              <div
                id="divMoves"
                style={{
                  overflow: "auto",
                  width: "300px",
                  height: "400px",
                }}
              >
                <ul>{listMoves}</ul>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              type="button"
              className="btn btn-outline-dark"
              onClick={closeModal}
            >
              Fechar
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default CardPokemon;
