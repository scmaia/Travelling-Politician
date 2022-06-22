import "./NodeInfo.scss";
import Point from "../Point/Point";
import { City } from "../../types";
import { coordDistInKm } from "../../utils/distanceFunctions";

interface INodeInfoProps {
  // Ordered array of cities saved in state
  cities: City[];
  // Order of selected city in ordered array
  selectedNode: number | null;
}

const NodeInfo: React.FC<INodeInfoProps> = ({ cities, selectedNode }) => {
  if (!cities) {
    return <p className="select">Load data to display</p>;
  } else if (!selectedNode) {
    return <p className="select">Select city for more information</p>;
  } else {
    let previousDistance =
      selectedNode > 1
        ? coordDistInKm(
            cities[selectedNode - 2].latitude,
            cities[selectedNode - 2].longitude,
            cities[selectedNode - 1].latitude,
            cities[selectedNode - 1].longitude
          ).toFixed(2) + "km away"
        : "";
    let nextDistance = cities[selectedNode]
      ? coordDistInKm(
          cities[selectedNode].latitude,
          cities[selectedNode].longitude,
          cities[selectedNode - 1].latitude,
          cities[selectedNode - 1].longitude
        ).toFixed(2) + "km away"
      : "";
    return (
      <div className="info">
        <div className="info__cell">
          <Point
            topDist={13}
            leftDist={20}
            isSelected={false}
            isNeightbour={true}
          />
          Previous city:{" "}
          {cities[selectedNode - 2] ? cities[selectedNode - 2].city : "None"}{" "}
          <br />
          {previousDistance}
        </div>
        <div className="info__cell">
          <Point
            topDist={13}
            leftDist={20}
            isSelected={true}
            isNeightbour={false}
          />
          Selected city: {cities[selectedNode - 1].city}
        </div>
        <div className="info__cell">
          <Point
            topDist={13}
            leftDist={20}
            isSelected={false}
            isNeightbour={true}
          />
          Next city: {cities[selectedNode] ? cities[selectedNode].city : "None"}{" "}
          <br /> {nextDistance}
        </div>
      </div>
    );
  }
};

export default NodeInfo;
