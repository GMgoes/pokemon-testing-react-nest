/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable eqeqeq */
/* eslint-disable no-use-before-define */
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import axios from "axios";
import CardPokemon from "./components/Card";
import Logo from "./styles/Pokas.jpg";
import "./styles/personalize.css";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await axios.get("http://localhost:3000/pokemons");
      setPokemons(response.data);
    };
    fetchPokemons();
  }, []);

  useEffect(() => {
    const fetchPokemon = async () => {
      const all_pokemons = await Promise.all(
        pokemons.results.map(async (pokemon) => {
          const response = await axios.get(pokemon.url);
          const moves = response.data.moves;
          let moves_restructured = [];
          moves.forEach((element) => {
            moves_restructured.push(element.move.name);
          });
          return {
            id: response.data.id,
            name: response.data.name,
            image: response.data.sprites.other["dream_world"]["front_default"],
            type: response.data.types[0].type.name,
            description: moves_restructured,
          };
        })
      );
      setPokemon(all_pokemons);
    };
    fetchPokemon();
  }, [pokemons]);

  const cards = pokemon.map((poke) => (
    <CardPokemon key={poke.id} info={poke} />
  ));

  return (
    <div className="container">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img src={Logo} alt="Logo da aplicação"></img>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        {cards}
      </div>
      <div
        className="mt-4"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <a
                className="page-link"
                href={pokemons.previous !== null ? `${pokemons.previous}` : "#"}
              >
                Previous
              </a>
            </li>
            <li className="page-item">
              <a
                className="page-link"
                href={pokemons.previous !== null ? `${pokemons.previous}` : "#"}
              >
                1
              </a>
            </li>
            <li className="page-item disabled">
              <a className="page-link" href="#">
                2
              </a>
            </li>
            <li className="page-item">
              <a
                className="page-link"
                href={pokemons.next !== null ? `${pokemons.next}` : "#"}
              >
                3
              </a>
            </li>
            <li className="page-item">
              <a
                className="page-link"
                href={pokemons.next !== null ? `${pokemons.next}` : "#"}
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default App;
