import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getDataOfPokemon, getEvolutions, getPokemon } from "../../get/gets";
import { EvolutionChainTypes, CardDataTypes } from "../../../utils/types";
import "./styles/styles.sass";

export const Cards = () => {
  const { nameResearch } = useParams();
  const [urlEvolutionChain, setUrlEvolutionChain] = useState<string>("");
  const [evolutionChain, setEvolutionChain] = useState<EvolutionChainTypes>();
  const [arrayNamePokes, setArrayNamePokes] = useState<Array<string>>([]);
  const [pokeDataCards, setPokeDataCards] = useState<CardDataTypes[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (nameResearch !== undefined) {
        const getDetailsPokemon = await getDataOfPokemon(nameResearch);
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
      const evolutionOne = evolutionChain.evolves_to.map((element) => {
        return element.species.name;
      });

      const evolutionTwo = evolutionChain.evolves_to.map((element) => {
        const map = element.evolves_to.map((element) => {
          return element.species.name;
        });
        return map;
      });

      evolutionOne.map((element) => {
        arrayNamePokemons = [...arrayNamePokemons, element];
      });

      evolutionTwo[0].map((element) => {
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
      {pokeDataCards.length === 0 && (
        <h2 className="cards-text">
          <h2 style={{ color: "black" }}>"{nameResearch}"</h2> ou não existe ou
          foi digitado errado.
        </h2>
      )}
      {pokeDataCards.length > 0 && (
        <>
          <h2 className="cards-text">
            {pokeDataCards.length === 1 &&
              "Esse é o pokemon que você pesquisou."}
            {pokeDataCards.length < 1 &&
              "Esse é o pokemon que você pesquisou e algumas evoluções."}
          </h2>
          <h2 className="cards-text">
            Clique no card do pokemon que você queira ver detalhes!
          </h2>
          <ul className="cards-box">
            {pokeDataCards.map((element: CardDataTypes, index: number) => {
              return (
                <li key={index} className="cards-box-card">
                  <img
                    className="cards-box-card-img"
                    alt="imagePokemon"
                    src={element.sprites.front_default}
                  ></img>
                  <h3 className="cards-box-card-name">{element.name}</h3>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </section>
  );
};
