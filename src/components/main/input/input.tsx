import { useEffect, useState } from "react";
import "./styles/styles.sass";
import { Link } from "react-router-dom";
import { Loading } from "../../loading/roll/loading";

export const Input = () => {
  const [name, setName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <section className="search">
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          <h2 className="search-text">
            Write the name of the pokemon you want to see the details.
          </h2>
          <input
            className="search-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Write the name here"
          ></input>
          <Link className="search-button" to={`/cards/${name.toLowerCase()}`}>
            Search
          </Link>
          <div></div>
        </>
      )}
    </section>
  );
};
