import { ee, tt, EE, TT } from "../misc/console-short.js";

import * as THREE from "three";

/*
XyzDot 4 0 4.497165515241812 4.333399999998501
XyzDot 3 0 3.0431959310833934 4.30019999999552
*/

function XyzDot(g_scene, x, y, z, the_color) {
    const y_floor = Math.floor(y);
    if (x >= 0 && x < 1 && z > 2 && z < 6) {
    } else {
    }

    const dotGeometry = new THREE.BufferGeometry();
    dotGeometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array([x, y - 0.5, z]), 3));

    const dotMaterial = new THREE.PointsMaterial({ size: 0.04, color: the_color });
    const dot = new THREE.Points(dotGeometry, dotMaterial);

    // dot.position.x = 7.5;
    // dot.position.y = 0;
    // dot.position.z = 7.5;

    g_scene.add(dot);
}
export { XyzDot };
