import { getDeltaTime } from "./time";

export const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

export function resize(callback) {
  window.addEventListener("resize", () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    callback()
  })
};

export function update(callback) {
  let tick = () => {
    callback(getDeltaTime());
    return window.requestAnimationFrame(tick)
  };

  tick()
}