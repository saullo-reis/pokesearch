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
