import { ee, tt, EE, TT } from "../misc/console-short.js";
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

function makePentagon(the_scene, object_meshes, g_pentagons) {
    var trampoline_columns = new Map();
    let pentagon_meshes = new Map();
    for (var i = 0; i < g_pentagons.length; i++) {
        const trampoline_data = g_pentagons[i];
        const [x_str, y_str, z_str] = trampoline_data;
        const x_index = parseInt(x_str);
        const y_index = parseInt(y_str);
        const z_index = parseInt(z_str);

        const two_circles = new Group();

        const pent_geometry = new THREE.CircleGeometry(0.8, 5);
        const pent_material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        const pent_mesh = new THREE.Mesh(pent_geometry, pent_material);
        pent_mesh.material.side = THREE.DoubleSide;
        let [x_center, z_center] = tileCenterCoord(x_index, z_index);
        pent_mesh.position.set(x_center, y_index / 100, z_center);
        pent_mesh.rotation.z = (2 * Math.PI) / 4;
        two_circles.add(pent_mesh);

        the_scene.add(two_circles);

        const trampoline_index = `${x_str},${y_str},${z_str}`;
        trampoline_columns.set(trampoline_index, trampoline_index);

        pentagon_meshes.set(trampoline_index, pent_mesh);
    }

    return [pentagon_meshes, trampoline_columns];
}

export { makePentagon };
