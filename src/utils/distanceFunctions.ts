import { City } from "../types";

export const coordDistInKm = (lat1: number, long1: number, lat2: number, long2: number) => {
  // Latitude assumption: 1 deg = 110.574 km
  // Longitude assumption: 1 deg = 111.320*cos(latitude) km
  const latVector =  Math.abs(lat1 - lat2) * 110.574;
  const longVector = Math.abs(long1 - long2) * 111.320 * Math.cos((lat1 + lat2) * Math.PI / 360);
  return Math.hypot(latVector, longVector);
}

export const totalDistInKm = (array: City[], order: number[]) => {
  if(!order) {
    return array.reduce((prev, curr, index) => {
      if(!index){
        return 0;
      }
      return prev + coordDistInKm(curr.latitude, curr.longitude, array[index -1].latitude, array[index -1].longitude)
    }, 0)
  } else {
    let sum = 0;
    for (let i=0; i < order.length - 1; i++){
      const cityAIndex = order[i];
      const cityA = array[cityAIndex];
      const cityBIndex = order[i + 1];
      const cityB = array[cityBIndex];
      const dist = coordDistInKm(cityA.latitude, cityA.longitude, cityB.latitude, cityB.longitude);
      sum += dist;
    }
    return sum;
  }
}