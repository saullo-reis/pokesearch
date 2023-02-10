const urlBase = "https://pokeapi.co/api/v2/";

export async function getDataOfPokemon(name: string) {
  const response = await fetch(urlBase + `pokemon-species/${name}`);
  const json = response.json();
  return json;
}

export async function getEvolutions(url: string) {
    const response = await fetch(url)
    const json = response.json()
    return json
}

export async function getPokemon(name: string){
  const response = await fetch(urlBase + `pokemon/${name}`);
  const json = await response.json();
  return json;
}