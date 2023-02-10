import { useState } from "react";
import "./styles/styles.sass";
import { Link } from "react-router-dom";

export const Input = () => {
  const [name, setName] = useState<string>("");

  return (
    <section className="search">
      <h2 className="search-text">
        Escreva o nome do pokemon que você queira ver os detalhes.
      </h2>
      <input
        className="search-input"
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Nome do pokemon"
      ></input>
      <Link className="search-button" to={`/cards/${name}`}>
        Procurar
      </Link>
      <div></div>
    </section>
  );
};
