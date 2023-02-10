import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPokemon, getAbilities } from "../../get/gets";
import { AbilitiesData, DataPokemonsType } from "../../../utils/types";
import "./styles/styles.sass";

export const Details = () => {
  const { name } = useParams();
  const [dataPokemons, setDataPokemons] = useState<DataPokemonsType>();
  const [abilitiesData, setAbilitiesData] = useState<AbilitiesData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (name !== undefined) {
        const responseOfGetPokemon = await getPokemon(name);
        setDataPokemons(responseOfGetPokemon);

        const urlAbilitiesArray = dataPokemons?.abilities.map((element) => {
          return element.ability.url;
        });
        if (urlAbilitiesArray !== undefined) {
          for (let i = 0; i !== urlAbilitiesArray?.length; i++) {
            const responseOfGetAbilities = await getAbilities(
              urlAbilitiesArray[i]
            );
            setAbilitiesData([...abilitiesData, responseOfGetAbilities]);
          }
        }
      }
    };
    fetchData();
  }, []);

  console.log(abilitiesData)

  return (
    <section className="details">
      <div className="bg">
        <div className="details-card">
          <img
            className="details-card-img"
            alt="fotoPokemon"
            src={dataPokemons?.sprites.other.dream_world.front_default}
          ></img>
          <h1 className="details-card-name">{dataPokemons?.name}</h1>
          <div className="details-card-stats">
            <h3>Status:</h3>
            {dataPokemons?.stats.map((element) => {
              return (
                <p>
                  {element.stat.name} : {element.base_stat}
                </p>
              );
            })}
          </div>
        </div>
      </div>
      <div className="bg">
        <div className="details-abilities">
          <h3>Habilidades:</h3>
          {dataPokemons?.abilities.map((element) => {
            return <p>{element.ability.name}</p>;
          })}
        </div>
      </div>
    </section>
  );
};
