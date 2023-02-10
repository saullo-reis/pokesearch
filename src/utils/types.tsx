export interface CardDataTypes {
  name: string;
  sprites: {
    front_default: string;
  };
  length: number;
  map: any;
}

export interface EvolutionChainTypes {
  evolves_to: Array<{
    species: {
      name: string;
      url: string;
    };
    evolves_to: Array<{
      species: {
        name: string;
        url: string;
      };
    }>;
  }>;
  species: {
    name: string;
    url: string;
  };
  map: string;
}

export interface DataPokemonsType {
  name: string;
  abilities: Array<{
    ability: {
      name: string;
      url: string;
    }
  }>;
  height: number;
  id: 151;
  moves: Array<{
    move:{
      name:string;
    }
  }>;
  sprites:{
    other:{
      dream_world:{
        front_default: string;
      } 
    }
  }
  stats:Array<{
    base_stat: number;
    stat: {
      name: string;
    }
  }>
  weight: number;

}

export interface AbilitiesData{
  effect_entries: Array<{
    effect: string;
    short_effect: string;
  }>
}