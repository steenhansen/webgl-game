import { ee, tt, EE, TT } from "../misc/console-short.js";
//import { TILT_NN, TILT_SS, TILT_NW, TILT_NE, TILT_SE, TILT_SW } from "../constants.js";
import * as HEX_CONST from "../constants.js";
import * as THREE from "three";
import { hexPoints, offsetTilePoints } from "../tiles/hex-tile.js";

import { trampolineMesh } from "./trampoline-mesh.js";
import { addCoords } from "../tiles/mesh-tiles.js";
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

function trampolineTriangles(hex_points) {
    const [top_left, top_right, right_tip, bot_right, bot_left, left_tip, middle_point] = hex_points;

    const t1 = [...middle_point, ...top_left, ...top_right];
    const t2 = [...middle_point, ...bot_right, ...bot_left];
    const t3 = [...middle_point, ...right_tip, ...bot_right];
    const t4 = [...middle_point, ...top_right, ...right_tip];
    const t5 = [...middle_point, ...bot_left, ...left_tip];
    const t6 = [...middle_point, ...left_tip, ...top_left];

    let hexagon_triangles = [t1, t2, t3, t4, t5, t6];

    return hexagon_triangles;
}
function makeTrampolines(the_scene, object_meshes, g_trampolines) {
    tt("g_tramps", g_trampolines);
    var trampoline_columns = new Map();
    let trampoline_meshes = new Map();
    for (var i = 0; i < g_trampolines.length; i++) {
        //  let { _light_color, dark_color, edge_color } = tile_3colors;
        const trampoline_data = g_trampolines[i];
        let [x_str, y_str, z_str, slope_direction, incline_amount] = trampoline_data;

        const x_index = parseInt(x_str);
        const y_100_index = parseInt(y_str);
        const z_index = parseInt(z_str);

        const x_y_z = [x_index, y_100_index, z_index];
        // let incline_amount = 0;

        const xyz_index = `${x_index},${y_100_index},${z_index}`;

        if (slope_direction == undefined) {
            slope_direction = HEX_CONST.TILT_NONE;
            incline_amount = 0;
        }
        if (incline_amount == undefined) {
            incline_amount[(HEX_CONST.TILT_NONE, 0)];
        }

        let [x_center, z_center] = tileCenterCoord(x_index, z_index);
        const tile_radius = 1;

        const a_tile = new Group();
        a_tile.position.set(x_center, 0, z_center);
        const tile_points = hexPoints(tile_radius, y_100_index, slope_direction, incline_amount);

        let tile_3colors = { dark_color: "red", light_color: "green", edge_color: "blue" };

        trampoline_columns = offsetTilePoints(trampoline_columns, x_y_z, slope_direction, incline_amount, tile_points, tile_3colors);
        tt("tile_points", tile_points);
        const top_triangles = trampolineTriangles(tile_points);
        tt("top_triangles", top_triangles);
        trampolineMesh(a_tile, top_triangles, "red", "blue");

        the_scene.add(a_tile);
        addCoords(a_tile, x_y_z, slope_direction, incline_amount);
        trampoline_meshes.set(xyz_index, a_tile);

        // trampoline_columns.set(xyz_index, xyz_index);

        // trampoline_meshes.set(xyz_index, a_circle2);
    }
    return [trampoline_meshes, trampoline_columns];
    //return [walkway_meshes, walkway_tiles];
}

//function makeWalls(the_scene, wall_coords, walkway_meshes, wall_squares, walkway_columns, walkway_overlaps) {
function makeTrampolinesOLD(the_scene, object_meshes, g_trampolines) {
    var trampoline_columns = new Map();
    let trampoline_meshes = new Map();
    for (var i = 0; i < g_trampolines.length; i++) {
        const trampoline_data = g_trampolines[i];
        const [x_str, y_str, z_str, tramp_tilt] = trampoline_data;
        const x_index = parseInt(x_str);
        const y_index = parseInt(y_str);
        const z_index = parseInt(z_str);

        // const two_circles = new Group();

        // const circle_geometry = new THREE.CircleGeometry(0.8, 32); // Radius 5, 32 segments
        // const circle_material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        // const a_circle = new THREE.Mesh(circle_geometry, circle_material);
        // a_circle.material.side = THREE.DoubleSide;
        let [x_center, z_center] = tileCenterCoord(x_index, z_index);
        // a_circle.position.set(x_center, y_index / 100, z_center);
        // a_circle.rotation.x = (2 * Math.PI) / 4;

        // two_circles.add(a_circle);

        const circle_geometry2 = new THREE.CircleGeometry(0.7, 32); // Radius 5, 32 segments
        const circle_material2 = new THREE.MeshBasicMaterial({ color: 0x003300 });
        const a_circle2 = new THREE.Mesh(circle_geometry2, circle_material2);
        a_circle2.material.side = THREE.DoubleSide;
        //  let [x_center, z_center] = tileCenterCoord(x_index, z_index);
        a_circle2.position.set(x_center, y_index / 100 + 0.001, z_center);

        // flat
        //a_circle2.rotation.x = (2 * Math.PI) / 4;
        let x_mult = 2;
        let y_mult = 0; // none or flat
        let z_mult = 0;

        if (tramp_tilt == HEX_CONST.TILT_NN) {
            x_mult = 3;
            y_mult = 0;
            z_mult = 1;
        } else if (tramp_tilt == HEX_CONST.TILT_NE) {
            // ne = 3x,1y,0z
            x_mult = 3;
            y_mult = 1.5;
            z_mult = 1.5;
        }
        a_circle2.rotation.x = (x_mult * Math.PI) / 4;
        a_circle2.rotation.y = (y_mult * Math.PI) / 4;
        a_circle2.rotation.z = (z_mult * Math.PI) / 4;

        // sw = 1x,3y,0z
        // a_circle2.rotation.x = (1 * Math.PI) / 4;
        // a_circle2.rotation.y = (3 * Math.PI) / 4;

        // ss = 1x,0y,3z
        // a_circle2.rotation.x = (1 * Math.PI) / 4;
        // a_circle2.rotation.z = (3 * Math.PI) / 4;

        // nn = 3x,0y,1z
        // a_circle2.rotation.x = (3 * Math.PI) / 4;
        // a_circle2.rotation.z = (1 * Math.PI) / 4;

        // se = 1x,1y,3z
        // a_circle2.rotation.x = (1 * Math.PI) / 4;
        // a_circle2.rotation.y = (1 * Math.PI) / 4;
        // a_circle2.rotation.z = (3 * Math.PI) / 4;

        // NW = 3x,3y,1z
        // a_circle2.rotation.x = (3 * Math.PI) / 4;
        // a_circle2.rotation.y = (3 * Math.PI) / 4;
        // a_circle2.rotation.z = (1 * Math.PI) / 4;

        //two_circles.add(a_circle2);

        the_scene.add(a_circle2);
        const trampoline_index = `${x_str},${y_str},${z_str}`;
        trampoline_columns.set(trampoline_index, trampoline_index);

        trampoline_meshes.set(trampoline_index, a_circle2);
    }

    return [trampoline_meshes, trampoline_columns];
}

export { makeTrampolines };
