import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getSpecieOfPokemon, getEvolutions, getPokemon } from "../../get/gets";
import { EvolutionChainTypes, CardDataTypes } from "../../../utils/types";
import "./styles/styles.sass";
import { Loading } from "../../loading/roll/loading";

export const Cards = () => {
  const { nameResearch } = useParams();
  const [urlEvolutionChain, setUrlEvolutionChain] = useState<string>("");
  const [evolutionChain, setEvolutionChain] = useState<EvolutionChainTypes>();
  const [arrayNamePokes, setArrayNamePokes] = useState<Array<string>>([]);
  const [pokeDataCards, setPokeDataCards] = useState<CardDataTypes[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      if (nameResearch !== undefined) {
        setIsLoading(false);
      }
    }, 2000);
  },[nameResearch]);

  useEffect(() => {
    const fetchData = async () => {
      if (nameResearch !== undefined) {
        const getDetailsPokemon = await getSpecieOfPokemon(nameResearch);
        setUrlEvolutionChain(getDetailsPokemon.evolution_chain.url);
      }
    };
    fetchData();
  }, [nameResearch]);

  useEffect(() => {
    const fetchData = async () => {
      if (nameResearch !== undefined) {
        const getEvolutionChain = await getEvolutions(urlEvolutionChain);
        setEvolutionChain(getEvolutionChain.chain);
        setArrayNamePokes([getEvolutionChain.chain.species.name]);
      }
    };
    fetchData();
  }, [urlEvolutionChain]);

  useEffect(() => {
    let arrayNamePokemons: Array<string> = [];
    if (
      evolutionChain !== undefined &&
      evolutionChain.evolves_to.length !== 0
    ) {
      const evolveTo1 = evolutionChain.evolves_to.map((element) => {
        return element.species.name;
      });

      const evolveTo2 = evolutionChain.evolves_to.map((element) => {
        const evolutionTwoPokemonName = element.evolves_to.map((element) => {
          return element.species.name;
        });
        return evolutionTwoPokemonName;
      });

      evolveTo1.map((element) => {
        arrayNamePokemons = [...arrayNamePokemons, element];
      });

      evolveTo2[0].map((element) => {
        arrayNamePokemons = [...arrayNamePokemons, element];
      });

      arrayNamePokemons.unshift(arrayNamePokes[0]);
      setArrayNamePokes(arrayNamePokemons);
    }
  }, [evolutionChain]);

  useEffect(() => {
    const fetchData = async () => {
      var pokeDataGet: CardDataTypes[] = [];
      if (evolutionChain !== undefined) {
        for (let i = 0; i !== arrayNamePokes.length; i++) {
          const response = await getPokemon(arrayNamePokes[i]);
          pokeDataGet = [...pokeDataGet, response];
        }
        // const pokeDataGet = arrayNamePokes.map( async(element: string) => {
        //   const response = await getPokemon(element)
        //   return await response
        // })
        setPokeDataCards(pokeDataGet);
      }
    };
    fetchData();
  }, [arrayNamePokes]);

  console.log(pokeDataCards);

  return (
    <section className="cards">
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          {pokeDataCards.length === 0 && (
            <h2 className="cards-text">
              <h2 style={{ color: "black" }}>"{nameResearch}"</h2> ou não existe
              ou foi digitado errado.
            </h2>
          )}
          {pokeDataCards.length > 0 && (
            <>
              <h2 className="cards-text">
                Click on the pokemon card you want to see details!
              </h2>
              <ul className="cards-box">
                {pokeDataCards.map((element: CardDataTypes, index: number) => {
                  return (
                    <Link to={`/pokemon/${element.name}`}>
                      <li key={index} className="cards-box-card">
                        <img
                          className="cards-box-card-img"
                          alt="imagePokemon"
                          src={element.sprites.front_default}
                        ></img>
                        <h3 className="cards-box-card-name">{element.name}</h3>
                      </li>
                    </Link>
                  );
                })}
              </ul>
            </>
          )}
        </>
      )}
    </section>
  );
};
