import React, { useRef, useEffect } from "react";
import "./Canvas.scss";
import Point from "../Point/Point";
import NodeInfo from "../NodeInfo/NodeInfo";
import { City } from "../../types";
import {
  drawCanvas,
  drawPoints,
  adjustX,
  adjustY,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
} from "./canvasUtils";

interface ICanvasProps {
  // Ordered array of cities
  cities: City[];
  // Index of selected city
  selectedNode: number | null;
  // Callback that receives updated selected city
  setSelectedNode: React.Dispatch<React.SetStateAction<number | null>>;
}

const Canvas: React.FC<ICanvasProps> = ({
  cities,
  selectedNode,
  setSelectedNode,
}) => {
  const canvasRef = useRef(null);

  const onPointSelection = (id: number) => {
    setSelectedNode(id);
  };

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current as HTMLCanvasElement;
      const context = canvas.getContext("2d") as CanvasRenderingContext2D;

      drawCanvas(context);
      drawPoints(context, cities);
    }
  });

  return (
    <section
      className="plotter"
      style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}
    >
      <canvas ref={canvasRef} />
      <div className="plotter__points">
        {/**
         * Draw cities as interactive points. These are overlayed
         * on Canvas, which has both points and connections.
         * If I had more time, I would move away from using canvas
         * to a pure css solution. 
         */}
        {cities &&
          cities.map((city, index) => (
            <Point
              key={`city-point${index + 1}`}
              leftDist={adjustX(city.longitude)}
              topDist={adjustY(city.latitude)}
              isSelected={selectedNode === index + 1}
              isNeightbour={
                selectedNode === index || selectedNode === index + 2
              }
              onClick={() => onPointSelection(index + 1)}
            />
          ))}
      </div>
      <NodeInfo cities={cities} selectedNode={selectedNode} />
    </section>
  );
};

export default Canvas;
