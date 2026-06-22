import { ee, tt, EE, TT } from "../misc/console-short.js";
import * as THREE from "three";

import {
    FENCE_NN,
    FENCE_SS,
    FENCE_NW,
    FENCE_NE,
    FENCE_SE,
    FENCE_SW,
    X_INDX,
    Y_INDX,
    Z_INDX,
    TILT_NN,
    TILT_SS,
    TILT_NW,
    TILT_NE,
    TILT_SE,
    TILT_SW,
    TILT_NONE
} from "../values/the-constants.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { type_face } from "../misc/helvetiker_regular.typeface.js";

var loader2 = new FontLoader();

const WHITE_LABELS = 0xffffff;
var the_font = loader2.parse(type_face);

function fenceCoords(a_tile, x_y_z, fence_position, fence_height) {
    const [x_index, y_index, z_index] = x_y_z;
    var textMaterial = new THREE.MeshLambertMaterial({
        emissive: 0xffffff,
        color: WHITE_LABELS
    });
    const fence_text = `${x_index},${z_index}`; // ${fence_position}`;
    var textGeometry = new TextGeometry(fence_text, {
        font: the_font,
        size: 0.2,
        depth: 0,
        curveSegments: 12
    });
    var text_mesh = new THREE.Mesh(textGeometry, textMaterial);

    text_mesh.position.y = y_index + fence_height + 0.4;

    if (fence_position != TILT_NONE) {
        text_mesh.rotation.y = -Math.PI / 2;
        text_mesh.rotation.z = -Math.PI / 2;
    }
    let x, z;
    if (fence_position == TILT_NONE) {
        x = -0.15;
        z = 0.1;
    } else if (fence_position == FENCE_NN) {
        x = -0.15;
        z = -0.55;
    } else if (fence_position == FENCE_NE) {
        x = 0.3;
        z = -0.25;
    } else if (fence_position == FENCE_SE) {
        x = 1;
        z = 0.4;
        //text_mesh.position.y -= 0.1;
    } else if (fence_position == FENCE_SS) {
        x = -0.15;
        z = 0.48;
    } else if (fence_position == FENCE_SW) {
        x = -0.6;
        z = 0.4;
    } else if (fence_position == FENCE_NW) {
        x = +0.9;
        z = 0.25;
    } else {
        ee(" fenceCoords() unknown fence_position", fence_position);
    }

    text_mesh.position.x = x;
    text_mesh.position.z = z;
    a_tile.add(text_mesh);
}

export { fenceCoords }; //, tileMesh };
