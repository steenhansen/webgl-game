import { ee, tt, EE, TT } from "../misc/console-short.js";

import * as THREE from "three";

import { X_INDX, Y_INDX, Z_INDX, TILT_NN, TILT_SS, TILT_NW, TILT_NE, TILT_SE, TILT_SW, TILT_NONE } from "../values/the-constants.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { type_face } from "../misc/helvetiker_regular.typeface.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
var loader2 = new FontLoader();

const WHITE_LABELS = 0xffffff;
var the_font = loader2.parse(type_face);

//const Y_TO_ACTUAL_HEIGHT = 10;
function addCoords(a_tile, x_y_z, slope_tilt, incline_amount) {
    // const [up_direction, angled_height] = incline_and_dir;
    let [x_index, y_100_index, z_index] = x_y_z;

    let y_index = y_100_index / 100;

    var textMaterial = new THREE.MeshLambertMaterial({
        emissive: 0xffffff,
        color: WHITE_LABELS
    });
    var textGeometry = new TextGeometry(`${x_index},${y_100_index},${z_index}`, {
        font: the_font,
        size: 0.2,
        depth: 0,
        curveSegments: 12
    });
    var text_mesh = new THREE.Mesh(textGeometry, textMaterial);

    if (y_index < 0) {
        text_mesh.position.y = -0.999;
    } else if (slope_tilt == TILT_NONE) {
        //        text_mesh.position.y = y_index / Y_TO_ACTUAL_HEIGHT + 0.001;
        text_mesh.position.y = y_index + 0.001;
        //text_mesh.position.y = y_index + 0.05;
    } else {
        //        text_mesh.position.y = y_index / Y_TO_ACTUAL_HEIGHT + incline_amount;
        text_mesh.position.y = y_index + incline_amount + 0.05;
    }

    text_mesh.rotation.x = -Math.PI / 2;

    if (slope_tilt != TILT_NONE) {
        text_mesh.rotation.y = -Math.PI / 2;
        text_mesh.rotation.z = -Math.PI / 2;
    }
    let x, z;
    if (slope_tilt == TILT_NONE) {
        x = -0.5; // -0.15;
        z = 0.1;
    } else if (slope_tilt == TILT_NN) {
        x = +0.15;
        z = -0.5; //-0.55;
        //  text_mesh.position.y += 1.1;
        // text_mesh.rotation.x = Math.PI / 2;
    } else if (slope_tilt == TILT_NE) {
        x = 0.3;
        z = -0.25;
    } else if (slope_tilt == TILT_SE) {
        x = 0.3;
        z = 0.4;
        //text_mesh.position.y -= 0.1;
    } else if (slope_tilt == TILT_SS) {
        x = +0.515;
        z = -0.4;
    } else if (slope_tilt == TILT_SW) {
        x = -0.7;
        z = 0.4;
    } else if (slope_tilt == TILT_NW) {
        x = -0.7;
        z = -0.25;
    } else {
        ee(" addCoords() unknown slope_tilt", slope_tilt);
    }

    text_mesh.position.x = x;
    text_mesh.position.z = z;
    a_tile.add(text_mesh);
}

export { addCoords };
