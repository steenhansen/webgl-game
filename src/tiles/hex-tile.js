import {
    EdgesGeometry,
    Vector3,
    Box3,
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

import { X_INDX, Y_INDX, Z_INDX, N_N, S_S, N_W, N_E, S_E, S_W, FLAT } from "../constants.js";

/*
 ----------------RED-X-LINE------------------------
|
|            nn
|         /--------\
|    nw /          \ n_e
|       /            \
|       \            /
|    sw \          / se     
|         \--------/
|             ss
|

*/

import { geoMesh, addCoords } from "./mesh-tiles.js";
import { walkwayOverlaps, pointInsideTile } from "./walkway-overlaps.js";
import { hexNewColor } from "./colors-tiles.js";

const sqrt_3 = Math.sqrt(3);

function tileTriangles(hex_points) {
    const [top_left, top_right, right_tip, bot_right, bot_left, left_tip] = hex_points;
    const square_up_left = [...bot_left, ...top_left, ...top_right];
    const square_down_right = [...bot_left, ...top_right, ...bot_right];
    const triangle_left = [...bot_left, ...left_tip, ...top_left];
    const triangle_right = [...top_right, ...right_tip, ...bot_right];
    const hexagon_triangles = [...square_up_left, ...square_down_right, ...triangle_left, ...triangle_right];
    return hexagon_triangles;
}

function HexTile(the_scene, walkway_meshes, walkway_tiles, walkway_overlaps, x_y_z, tile_colors, incline_and_dir) {
    walkway_overlaps = walkwayOverlaps(walkway_overlaps, x_y_z);
    const [x_index, y_index, z_index] = x_y_z;
    const xyz_index = `${x_index},${y_index},${z_index}`;
    if (incline_and_dir == undefined) {
        incline_and_dir = [FLAT, 0];
    }
    const [up_direction, angled_height] = incline_and_dir;
    let [top_color, outline_color] = tile_colors;
    let [x_center, z_center] = tileCenterCoord(x_index, z_index);
    const tile_radius = 1;
    const a_tile = new Group();
    a_tile.position.set(x_center, 0, z_center);
    const tile_points = hexPoints(tile_radius, y_index, up_direction, angled_height);
    walkway_tiles = offsetTilePoints(walkway_tiles, x_y_z, incline_and_dir, tile_points);
    const top_triangles = tileTriangles(tile_points);
    geoMesh(a_tile, top_triangles, top_color, outline_color);
    the_scene.add(a_tile);
    addCoords(a_tile, x_y_z, incline_and_dir);
    walkway_meshes.set(xyz_index, a_tile);
    return [walkway_meshes, walkway_tiles, walkway_overlaps];
}
function distance2hexpoints(hex_point_1, hex_point_2) {
    let x_diff = hex_point_2[0] - hex_point_1[0];
    let z_diff = hex_point_2[2] - hex_point_1[2];
    let length = Math.sqrt(x_diff * x_diff + z_diff * z_diff);
    return length;
}

function offsetTilePoints(stair_tiles, x_y_z, incline_and_dir, tile_points) {
    let [tilt_up, angle_incline] = incline_and_dir;
    const [x_index, y_index, z_index] = x_y_z;
    const xyz_index = `${x_index},${y_index},${z_index}`;
    let [x_center, z_center] = tileCenterCoord(x_index, z_index);
    let tile_positions = [];
    for (let i = 0; i < tile_points.length; i++) {
        let tile_point = tile_points[i];
        let [x, y, z] = tile_point;
        x = x + x_center;
        z = z + z_center;
        tile_positions.push([x, y, z]);
    }
    let accross_length = 0;
    if (tilt_up == N_W) {
        let bottom_point = tile_positions[1];
        let top_point = tile_positions[5];
        accross_length = distance2hexpoints(bottom_point, top_point);
    } else if (tilt_up == N_E) {
        let bottom_point = tile_positions[0];
        let top_point = tile_positions[2];
        accross_length = distance2hexpoints(bottom_point, top_point);
    } else if (tilt_up == S_W) {
        let bottom_point = tile_positions[0];
        let top_point = tile_positions[2];
        accross_length = distance2hexpoints(bottom_point, top_point);
    } else if (tilt_up == S_E) {
        let bottom_point = tile_positions[0];
        let top_point = tile_positions[2];
        accross_length = distance2hexpoints(bottom_point, top_point);
    }
    var tile_obj = {
        x_center: x_center,
        y_position: y_index,
        z_center: z_center,
        tilt_up: tilt_up,
        angle_incline: angle_incline,
        accross_length: accross_length,
        tile_positions: tile_positions,
        x_z: `${x_index},${z_index}`
    };
    stair_tiles.set(xyz_index, tile_obj);
    return stair_tiles;
}

//      camPoint3d / gridIndex2d
//
//  tileCenterCamPoint3d()
function tileCenterCoord(x_tile, z_tile) {
    const x_coord = (3 / 2) * x_tile;
    const z_coord = (sqrt_3 / 2) * x_tile + sqrt_3 * z_tile;
    return [x_coord, z_coord];
}

function hexPoints(tile_radius, y_height, up_direction, angled_height) {
    const hex_dist = (tile_radius * Math.sqrt(3)) / 2;
    const half_radius = tile_radius / 2;
    var top_left, bot_left, top_rght, bot_rght, left_tip, rght_tip;

    const top_height = y_height + angled_height;
    const bot_height = y_height;
    const mid_height = y_height + angled_height / 2;

    const top_left_x = 0 - half_radius;
    const bot_left_x = 0 - half_radius;
    const top_rght_x = 0 + half_radius;
    const bot_rght_x = 0 + half_radius;
    const left_tip_x = 0 - tile_radius;
    const rght_tip_x = 0 + tile_radius;

    const top_left_z = 0 + hex_dist;
    const bot_left_z = 0 - hex_dist;
    const top_rght_z = 0 + hex_dist;
    const bot_rght_z = 0 - hex_dist;
    const left_tip_z = 0;
    const rght_tip_z = 0;

    if (up_direction === FLAT) {
        top_left = [top_left_x, y_height, top_left_z];
        bot_left = [bot_left_x, y_height, bot_left_z];
        top_rght = [top_rght_x, y_height, top_rght_z];
        bot_rght = [bot_rght_x, y_height, bot_rght_z];
        left_tip = [left_tip_x, y_height, left_tip_z];
        rght_tip = [rght_tip_x, y_height, rght_tip_z];
    } else if (up_direction === S_S) {
        top_left = [top_left_x, top_height, top_left_z];
        bot_left = [bot_left_x, bot_height, bot_left_z];
        top_rght = [top_rght_x, top_height, top_rght_z];
        bot_rght = [bot_rght_x, bot_height, bot_rght_z];
        left_tip = [left_tip_x, mid_height, left_tip_z];
        rght_tip = [rght_tip_x, mid_height, rght_tip_z];
    } else if (up_direction === S_W) {
        top_left = [top_left_x, top_height, top_left_z];
        bot_left = [bot_left_x, mid_height, bot_left_z];
        top_rght = [top_rght_x, mid_height, top_rght_z];
        bot_rght = [bot_rght_x, bot_height, bot_rght_z];
        left_tip = [left_tip_x, top_height, left_tip_z];
        rght_tip = [rght_tip_x, bot_height, rght_tip_z];
    } else if (up_direction === N_E) {
        top_left = [top_left_x, bot_height, top_left_z];
        bot_left = [bot_left_x, mid_height, bot_left_z];
        top_rght = [top_rght_x, mid_height, top_rght_z];
        bot_rght = [bot_rght_x, top_height, bot_rght_z];
        left_tip = [left_tip_x, bot_height, left_tip_z];
        rght_tip = [rght_tip_x, top_height, rght_tip_z];
    } else if (up_direction === N_W) {
        top_left = [top_left_x, mid_height, top_left_z];
        bot_left = [bot_left_x, top_height, bot_left_z];
        top_rght = [top_rght_x, bot_height, top_rght_z];
        bot_rght = [bot_rght_x, mid_height, bot_rght_z];
        left_tip = [left_tip_x, top_height, left_tip_z];
        rght_tip = [rght_tip_x, bot_height, rght_tip_z];
    } else if (up_direction === N_N) {
        top_left = [top_left_x, bot_height, top_left_z];
        bot_left = [bot_left_x, top_height, bot_left_z];
        top_rght = [top_rght_x, bot_height, top_rght_z];
        bot_rght = [bot_rght_x, top_height, bot_rght_z];
        left_tip = [left_tip_x, mid_height, left_tip_z];
        rght_tip = [rght_tip_x, mid_height, rght_tip_z];
    } else if (up_direction === S_E) {
        top_left = [top_left_x, mid_height, top_left_z];
        bot_left = [bot_left_x, bot_height, bot_left_z];
        top_rght = [top_rght_x, top_height, top_rght_z];
        bot_rght = [bot_rght_x, mid_height, bot_rght_z];
        left_tip = [left_tip_x, bot_height, left_tip_z];
        rght_tip = [rght_tip_x, top_height, rght_tip_z];
    } else {
        console.log("hexPoints unknown  up_direction==", up_direction);
    }

    const stair_tiles = [top_left, top_rght, rght_tip, bot_rght, bot_left, left_tip];
    return stair_tiles;
}

export { pointInsideTile, HexTile, hexNewColor, hexPoints, tileTriangles, tileCenterCoord };
