import "./styles/styles.sass";
import { PropsSkeleton } from "../../../utils/types";

function Skeleton({ width, height, borderRadius }: PropsSkeleton) {
  return (
    <li
      className="container"
      style={{ width, height, borderRadius, margin: "22px" }}
    ></li>
  );
}

export default Skeleton;
