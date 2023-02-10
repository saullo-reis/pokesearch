import "./styles/styles.sass";
interface Props {
  width: number | string;
  height: number | string;
  borderRadius?: number;
}

function Skeleton({ width, height, borderRadius }: Props) {
  return (
    <li
      className="container"
      style={{ width, height, borderRadius, margin: "22px" }}
    ></li>
  );
}

export default Skeleton;
