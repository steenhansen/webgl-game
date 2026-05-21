import { ee, tt, EE, TT } from "../console-short.js";
//import { TILT_NN, TILT_SS, TILT_NW, TILT_NE, TILT_SE, TILT_SW } from "../constants.js";
import * as HEX_CONST from "../constants.js";
import * as THREE from "three";
//import { roundTrampoline } from "./circle-trampoline.js";
import { distance2hexpoints, axial_round, coords2HexIndexes, tileCenterCoord } from "../maths.js";
import {
    EdgesGeometry,
    Vector3,
    MeshPhongMaterial,
    Box3,
    InstancedMesh,
    LineBasicMaterial,
    LineSegments,
    BufferGeometry,
    Float32BufferAttribute,
    MeshLambertMaterial,
    Group,
    Mesh,
    DoubleSide,
    RGB_ETC2_Format
} from "three";

//function makeWalls(the_scene, wall_coords, walkway_meshes, wall_squares, walkway_columns, walkway_overlaps) {
function makeTrampolines(the_scene, object_meshes, g_trampolines) {
    var trampoline_columns = new Map();
    for (var i = 0; i < g_trampolines.length; i++) {
        const trampoline_data = g_trampolines[i];
        const [x_str, y_str, z_str] = trampoline_data;
        const x_index = parseInt(x_str);
        const y_index = parseInt(y_str);
        const z_index = parseInt(z_str);

        const two_circles = new Group();

        const circle_geometry = new THREE.CircleGeometry(0.8, 32); // Radius 5, 32 segments
        const circle_material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const a_circle = new THREE.Mesh(circle_geometry, circle_material);
        a_circle.material.side = THREE.DoubleSide;
        let [x_center, z_center] = tileCenterCoord(x_index, z_index);
        a_circle.position.set(x_center, y_index / 100, z_center);
        a_circle.rotation.x = (2 * Math.PI) / 4;
        two_circles.add(a_circle);

        const circle_geometry2 = new THREE.CircleGeometry(0.7, 32); // Radius 5, 32 segments
        const circle_material2 = new THREE.MeshBasicMaterial({ color: 0x003300 });
        const a_circle2 = new THREE.Mesh(circle_geometry2, circle_material2);
        a_circle2.material.side = THREE.DoubleSide;
        //  let [x_center, z_center] = tileCenterCoord(x_index, z_index);
        a_circle2.position.set(x_center, y_index / 100 + 0.001, z_center);
        a_circle2.rotation.x = (2 * Math.PI) / 4;
        two_circles.add(a_circle2);

        the_scene.add(two_circles);
        const trampoline_index = `${x_str},${y_str},${z_str}`;
        tt("dasdf", trampoline_index);
        trampoline_columns.set(trampoline_index, trampoline_index);
    }

    tt("trampoline_columns", trampoline_columns);

    return [object_meshes, trampoline_columns];
}

export { makeTrampolines };
