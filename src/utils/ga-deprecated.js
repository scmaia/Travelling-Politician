import { coordDistInKm, totalDistInKm} from './distanceFunctions'
import { swap, shuffle, pickOne} from './helpers'

// Incomplete genetic algorithm

const POPULATION_SIZE = 400;

let population = [];
let order = [];
let fitness = [];
let bestResult;
let recordDistance = Infinity;

export const calculateFitness = (cities) => {
  for (let i=0; i < population.length; i++){
    let dist = totalDistInKm(cities, population[i]);
    if (dist < recordDistance) {
      recordDistance = dist;
      bestResult = population[i];
    }
    fitness[i] = 1 / (dist + 1);
  }
  console.log(recordDistance);
}

export const normalizeFitness = () => {
  let sum = 0;
  for (let i=0; i < fitness.length; i++){
    sum += fitness[i];
  }

  for (let i=0; i < fitness.length; i++){
    fitness[i] = fitness[i]/sum;
  }
}

const mutate = (order, mutationRate) => {
  order.forEach(item => {
    if(Math.random() < mutationRate) {
      const indexA = Math.floor(Math.random() * order.length);
      const indexB = Math.floor(Math.random() * order.length);
      swap (order, indexA, indexB)
    }
  })
}

const crossover = (orderOne, orderTwo) => {
  let start = Math.floor(Math.random() * orderOne.length);
  let end = Math.floor(Math.random() * (orderOne.length - start) + start + 1);
  let newOrder = orderOne.slice(start, end);

  for (let i = 0; i < orderTwo.length; i++) {
    const city = orderTwo[i];
    if (!newOrder.includes(city)) {
      newOrder.push(city)
    }
  }
  return newOrder;
}

export const nextGeneration = () => {
  const newPopulation = [];
  population.forEach((order, index) => {
    let selectedOrderA = pickOne(population, fitness);
    let selectedOrderB = pickOne(population, fitness);
    let crossedOrder = crossover(selectedOrderA, selectedOrderB);
    // let crossedOrder = pickOne(population, fitness);
    mutate(crossedOrder, 0.05);
    newPopulation[index] = crossedOrder;
  });
  population = newPopulation;
}

export const setupGA = (cities) => {
  order = alignNeighbours(cities);

  for (let i=0; i < POPULATION_SIZE; i++){
    population[i] = [...order];
    shuffle(population[i], 10);
  }
  population[0] = [...order];
}

export const runGA = (cities, setBestOrder) => {
  setupGA(cities);
  for(let i = 0; i < 200; i++) {
    calculateFitness(cities);
    normalizeFitness();
    nextGeneration();
  }
  console.log(recordDistance);
  setBestOrder(bestResult);
}


// Find closest neighbours functions

export const alignNeighbours = (cities, setBestOrder) => {
  const matrix = generateMatrix(cities);
  const order = [0];
  let currentCity = 0;
  for (let i = 0; i < cities.length - 1; i++){
    let closestDist = Math.min(...matrix[currentCity]);
    let nextCity = matrix[currentCity].indexOf(closestDist);
    order.push(nextCity);
    for (let i = 0; i < cities.length; i++) {
      for (let j = 0; j < cities.length; j++) {
        if (j === currentCity || i === currentCity){
          matrix[i][j] = Infinity;
          matrix[j][i] = Infinity;
        }
      }
    }
    currentCity = nextCity;
    // setBestOrder(order);
  }
  return(order);
}

export const generateMatrix = (cities) => {
  let matrix = [];
  for (let i = 0; i < cities.length; i++) {
    let distRow = []
    for (let j = 0; j < cities.length; j++) {
      if(i === j) {
        distRow.push(Infinity)
      } else {
        distRow.push(coordDistInKm(cities[i].latitude, cities[i].longitude, cities[j].latitude, cities[j].longitude));
      }
    }
    matrix.push(distRow)
  }
  return matrix;
}