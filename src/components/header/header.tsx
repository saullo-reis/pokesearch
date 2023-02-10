import "./styles/styles.sass";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <section className="header">
      <Link to={`/`}>
        <h1 className="header-logo">PokeSearch</h1>
      </Link>
    </section>
  );
};
