import "./Point.scss";

interface IPointProps {
  // Distance to the top of canvas in pixels
  topDist: number;
  // Distance to the left of canvas in pixels
  leftDist: number;
  // True if the point has been selected
  isSelected: boolean;
  // True if point is adjacent node to point that has been selected
  isNeightbour: boolean;
  // On click event handler
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const Point: React.FC<IPointProps> = ({
  topDist,
  leftDist,
  isSelected,
  isNeightbour,
  onClick,
}) => {
  let radius = 10;
  let adjustedTop = topDist - radius / 2;
  let adjustedLeft = leftDist - radius / 2;
  return (
    <div
      className={`point ${isSelected ? "point--selected" : undefined} ${
        isNeightbour ? "point--neighbour" : undefined
      }`}
      style={{
        top: adjustedTop,
        left: adjustedLeft,
        width: radius,
        height: radius,
      }}
      onClick={onClick}
    />
  );
};

export default Point;
