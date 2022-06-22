import { useState, useEffect } from "react";
import Canvas from "../../components/Canvas/Canvas";
import Form from "../../components/CSVUploadForm/CSVUploadForm";
import Table from "../../components/Table/Table";
import { alignNeighbours } from "../../utils/tsp";
import "./Main.scss";
import { City } from "../../types";

const Main: React.FC = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [bestOrder, setBestOrder] = useState<number[]>([]);
  const [totalDistance, setTotalDistance] = useState<number | null>(null);
  const [reorderedCities, setReorderedCities] = useState<City[]>([]);
  const [selectedNode, setSelectedNode] = useState<number | null>(null);

  useEffect(() => {
    if (cities.length > 0) {
      setReorderedCities(cities);
      alignNeighbours(cities, setBestOrder, setTotalDistance);
    }
  }, [cities]);

  useEffect(() => {
    if (bestOrder.length > 0) {
      let citiesArray = [];
      for (let i = 0; i < bestOrder.length - 1; i++) {
        let correspondingIndex = bestOrder[i];
        citiesArray.push(cities[correspondingIndex]);
      }
      citiesArray.push(cities[0]);
      setReorderedCities(citiesArray);
    }
  }, [cities, bestOrder]);

  return (
    <main className="main">
      <Canvas
        cities={reorderedCities}
        setSelectedNode={setSelectedNode}
        selectedNode={selectedNode}
      />
      {totalDistance && (
        <p className="main__distance">
          Total Distance: {totalDistance.toFixed(2)} Km
        </p>
      )}
      <Form setCities={setCities} />
      {reorderedCities.length > 0 && (
        <Table
          cities={reorderedCities}
          setSelectedNode={setSelectedNode}
          selectedNode={selectedNode}
        />
      )}
    </main>
  );
};

export default Main;
