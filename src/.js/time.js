import * as Three from "three";
let clock = new Three.Clock;
clock.start;

export function getDeltaTime() {
  return clock.getDelta()
}