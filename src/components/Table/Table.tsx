import { City } from "../../types";
import Row from "./Row";
import "./Table.scss";

interface ITableProps {
  cities: City[];
  selectedNode: number | null;
  setSelectedNode: (node: number) => void;
}

const Table: React.FC<ITableProps> = ({
  cities,
  selectedNode,
  setSelectedNode,
}) => {
  const headers = Object.keys(cities[0]);

  const onPointSelection = (index: number) => {
    setSelectedNode(index);
  };

  return (
    <section>
      <h2>LIST OF CITIES IN ORDER</h2>
      <table className="table">
        <thead>
          <tr>
            <th>order</th>
            {headers.map((header, index) => (
              <th key={`header${index}`}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cities.map((city, index) => (
            <Row
              key={`order${index + 1}`}
              columns={[index + 1, ...Object.values(city)]}
              isSelected={selectedNode === index}
              onClick={() => onPointSelection(index)}
            />
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Table;
