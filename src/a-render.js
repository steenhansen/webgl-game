import { Scene, Color } from 'three';

function AScene(background_color) {
  const a_scene = new Scene();
  a_scene.background = new Color(background_color);
  return a_scene;
}

export { AScene };