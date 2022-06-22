import { City } from "../../types";

export const CANVAS_HEIGHT = 600;
export const CANVAS_WIDTH = 1000;
export const BACKGROUND_COLOR = "#000000";
export const FOREGROUND_COLOR = "#ffffff";

// Used for mapping latitude, longitude on canvas
export const ADJUST_PARAMS = { originOffset: [130, -20], scaleFactor: 16 };

export const adjustX = (longitude: number) =>
  (longitude + ADJUST_PARAMS.originOffset[0]) * ADJUST_PARAMS.scaleFactor;

export const adjustY = (latitude: number) =>
  CANVAS_HEIGHT -
  (latitude + ADJUST_PARAMS.originOffset[1]) * ADJUST_PARAMS.scaleFactor;


  // Draw methods for canvas
export const drawCanvas = (ctx: CanvasRenderingContext2D) => {
  ctx.canvas.width = CANVAS_WIDTH;
  ctx.canvas.height = CANVAS_HEIGHT;
  ctx.fillStyle = BACKGROUND_COLOR;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};

export const drawPoints = (ctx: CanvasRenderingContext2D, cities: City[]) => {
  if (cities) {
    // Draw each city
    cities.forEach((city, index) => {
      ctx.fillStyle = FOREGROUND_COLOR;
      ctx.beginPath();
      ctx.arc(
        adjustX(city.longitude),
        adjustY(city.latitude),
        3,
        0,
        2 * Math.PI
      );
      ctx.fill();

      // Draw connection to previous city
      if (index !== 0) {
        ctx.strokeStyle = FOREGROUND_COLOR;
        ctx.beginPath();
        ctx.moveTo(adjustX(city.longitude), adjustY(city.latitude));
        ctx.lineTo(
          adjustX(cities[index - 1].longitude),
          adjustY(cities[index - 1].latitude)
        );
        ctx.stroke();
      }
    });
  }
};
