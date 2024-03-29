import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPokemon } from "../../get/gets";
import { DataPokemonsType } from "../../../utils/types";
import "./styles/styles.sass";
import Skeleton from "../../loading/skeleton/skeleton";
import { backgroundOfTypes } from "./background-of-types";

export const Details = () => {
  const { name } = useParams();
  const [dataPokemons, setDataPokemons] = useState<DataPokemonsType>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (dataPokemons !== undefined) {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  }, [dataPokemons]);

  console.log(dataPokemons)

  useEffect(() => {
    const fetchData = async () => {
      if (name !== undefined) {
        const responseOfGetPokemon = await getPokemon(name);
        setDataPokemons(responseOfGetPokemon);
        const urlAbilitiesArray = dataPokemons?.abilities.map((element) => {
          return element.ability.url;
        });
        console.log(urlAbilitiesArray);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="details">
      {isLoading ? (
        <>
          <Skeleton width={280} height={563} borderRadius={8} />
          <div>
            <Skeleton width={280} height={234} borderRadius={8} />
            <Skeleton width={280} height={234} borderRadius={8} />
          </div>
          <Skeleton width={280} height={563} borderRadius={8} />
        </>
      ) : (
        <>
          <div className="details-card" data-testid="card">
            <span className="details-card-span">{dataPokemons?.id}</span>
            <img
              className="details-card-img"
              alt="fotoPokemon"
              src={dataPokemons?.sprites.other.dream_world.front_default}
            ></img>
            <h1 className="details-card-name">{dataPokemons?.name}</h1>
            <div className="details-card-stats">
              <h3>Stats:</h3>
              {dataPokemons?.stats.map((element, index) => {
                return (
                  <p key={index}>
                    {element.stat.name} : {element.base_stat}
                  </p>
                );
              })}
            </div>
          </div>
          <div>
            <div className="details-types">
              <h3>Types:</h3>
              <ul className="details-types-box">
                {dataPokemons?.types.map((element, index: number) => {
                  return (
                    <li
                      className="details-types-box-item"
                      key={index}
                      style={{
                        backgroundColor: backgroundOfTypes(element.type.name),
                      }}
                    >
                      <p className="details-types-box-item-name">
                        {element.type.name}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="details-abilities">
              <h3>Abilities:</h3>
              <ul className="details-abilities-box">
                {dataPokemons?.abilities.map((element, index: number) => {
                  return (
                    <li className="details-abilities-box-item" key={index}>
                      <p className="details-abilities-box-item-name">
                        {element.ability.name}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="details-move" data-testid="move">
            <h3>Moves:</h3>
            <ul className="details-move-box">
              {dataPokemons?.moves.map((element, index) => {
                return (
                  <li key={index} className="details-move-box-moves">
                    {element.move.name}
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}
    </section>
  );
};
