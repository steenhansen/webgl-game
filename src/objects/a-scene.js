import { ee, tt, dd, EE, TT, DD } from "../misc/console-short.js";

import * as THREE from "three";

function AScene(background_color) {
    const a_scene = new THREE.Scene();

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    a_scene.add(ambientLight);

    a_scene.background = new THREE.Color(background_color);
    return a_scene;
}

export { AScene };
