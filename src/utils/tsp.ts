import { City } from "../types";
import { coordDistInKm, totalDistInKm } from "./distanceFunctions";

export const alignNeighbours = (
  cities: City[],
  setBestOrder: Function,
  setTotalDistance: Function
) => {
  const matrix = generateMatrix(cities);
  const order = [0];
  let currentCity = 0;
  for (let i = 0; i < cities.length - 1; i++) {
    let closestDist = Math.min(...matrix[currentCity]);
    let nextCity = matrix[currentCity].indexOf(closestDist);
    order.push(nextCity);
    for (let i = 0; i < cities.length; i++) {
      for (let j = 0; j < cities.length; j++) {
        if (j === currentCity || i === currentCity) {
          matrix[i][j] = Infinity;
          matrix[j][i] = Infinity;
        }
      }
    }
    currentCity = nextCity;
  }
  let closedLoopCities = [...cities];
  closedLoopCities.push(cities[0]);
  let closedLoopOrder = [...order];
  closedLoopOrder.push(closedLoopCities.length - 1);
  setBestOrder(closedLoopOrder);
  setTotalDistance(totalDistInKm(closedLoopCities, closedLoopOrder));
  return order;
};

export const generateMatrix = (cities: City[]) => {
  let matrix = [];
  for (let i = 0; i < cities.length; i++) {
    let distRow = [];
    for (let j = 0; j < cities.length; j++) {
      if (i === j) {
        distRow.push(Infinity);
      } else {
        distRow.push(
          coordDistInKm(
            cities[i].latitude,
            cities[i].longitude,
            cities[j].latitude,
            cities[j].longitude
          )
        );
      }
    }
    matrix.push(distRow);
  }
  return matrix;
};
