export function backgroundOfTypes(type: string) {
  switch (type) {
    case "fire":
      return "red";
    case "water":
      return "blue";
    case "grass":
      return "green";
    case "flying":
      return "#ADD8E6";
    case "poison":
      return "#483D8B";
    case "fighting":
      return "#F4A460";
    case "electric":
      return "#DAA520";
    case "ground":
      return "#8B4513";
    case "rock":
      return "#1C1C1C";
    case "psychic":
      return "#BA55D3";
    case "ice":
      return "#00FA9A";
    case "bug":
      return "#7FFF00";
    case "ghost":
      return "#808080";
    case "steel":
      return "#1C1C1C";
    case "dragon":
      return "#4B0082";
    case "dark":
      return "#000000";
    case "fairy":
      return "#6A5ACD";
  }
}
