import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPokemon } from "../../get/gets";
import { DataPokemonsType } from "../../../utils/types";
import "./styles/styles.sass";
import Skeleton from "../../loading/skeleton/skeleton";

export const Details = () => {
  const { searchedPokemonName } = useParams();
  const [dataPokemons, setDataPokemons] = useState<DataPokemonsType>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      if (dataPokemons !== undefined) {
        setIsLoading(false);
      }
    }, 2000);
  }, [dataPokemons]);

  useEffect(() => {
    const fetchData = async () => {
      if (searchedPokemonName !== undefined) {
        const responseOfGetPokemon = await getPokemon(searchedPokemonName);
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
            <Skeleton width={280} height={414} borderRadius={8} />
          </div>
        </>
      ) : (
        <>
          <div className="details-card">
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
            <div className="details-move">
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
          </div>
        </>
      )}
    </section>
  );
};
