import { ee, tt, dd, EE, TT, DD } from "../misc/console-short.js";
import * as THREE from "three";
import { seaColor } from "../colors/tile-colors.js";
import { addTextLoc } from "./text-tiles.js";
import { tileMesh } from "./tile-mesh.js";
import { distance2hexpoints, axial_round, coords2Indexes, tileCenterCoord } from "../misc/hex-maths.js";

import {
    SQRT_3,
    X_INDX,
    Y_INDX,
    Z_INDX,
    TILT_SE90,
    TILT_NN90,
    TILT_NN,
    TILT_SS,
    TILT_NW,
    TILT_NE,
    TILT_SE,
    TILT_SW,
    TILT_NONE,
    SLOPE_NONE,
    NOT_TRANSPARENT
} from "../values/the-constants.js";

/*
                          square_up_left                                 top_left       top_right
fifth triangle               /---------\                                    /--------------\ 
|\                          / |      / |\                                  /                \
| \          triangle_left /  |  \ /   | \ triangle_right         left_tip/                  \right_tip
|  \                       \  |  / \   | /                                \                  /
|   \                       \ |/       |/                                  \                /
|----\                       \---------/                                    \--------------/
                               square_down_right                         bot_left       bot_right


                          square_up_left                                 top_left       top_right
fifth triangle               /---------\                                    /--------------\ 
|\                          /           \                                  /                \
| \          triangle_left /-------------\ triangle_right         left_tip/                  \right_tip
|  \                       \             /                                \                  /
|   \                       \           /                                  \                /
|----\                       \---------/                                    \--------------/
                               square_down_right                         bot_left       bot_right



*/

function tileTriangles(hex_points) {
    const [top_left, top_right, right_tip, bot_right, bot_left, left_tip] = hex_points;
    const square_up_left = [...bot_left, ...top_left, ...top_right];
    const square_down_right = [...bot_left, ...top_right, ...bot_right];
    const triangle_left = [...bot_left, ...left_tip, ...top_left];
    const triangle_right = [...top_right, ...right_tip, ...bot_right];
    ///////////////////////
    // const fifth_triangle = [...bot_left, ...top_left, ...bot_right];
    // const triangle_se = [...left_tip, ...right_tip, ...bot_left];

    // const triangle_sw = [...right_tip, ...left_tip, ...bot_right];

    // const triangle_nw = [...right_tip, ...left_tip, ...top_right];

    // const triangle_ne = [...left_tip, ...right_tip, ...top_left];

    const hexagon_triangles = [
        ...square_up_left,
        ...square_down_right,
        ...triangle_left,
        ...triangle_right
        // ...fifth_triangle,
        // ...triangle_ne,
        // ...triangle_nw,
        // ...triangle_se,
        // ...triangle_sw
    ];
    return hexagon_triangles;
}

const NORMAL_HEX_RADIUS = 1;
/*
  tileSlopedTransparent
  tileFlatTranspaent  22222222222222222
  tileSloped
  tileFlat



*/
function HexTileSloped(g_scene, walkway_meshes, walkway_tiles, x_y_z, is_transparent, slope_tilt, incline_amount) {
    // qbert
    const [x_index, y_100_index, z_index] = x_y_z;
    const xyz_index = `${x_index},${y_100_index},${z_index}`;
    if (slope_tilt == undefined) {
        slope_tilt = TILT_NONE;
        incline_amount = 0;
    }
    let [x_center, z_center] = tileCenterCoord(x_index, z_index);

    const a_tile = new THREE.Group();
    a_tile.position.set(x_center, 0, z_center);
    const tile_points = hexPoints(NORMAL_HEX_RADIUS, y_100_index, slope_tilt, incline_amount);
    walkway_tiles = offsetTilePoints(walkway_tiles, x_y_z, slope_tilt, incline_amount, tile_points, WALK_BEFORE_COLORS);
    const top_triangles = tileTriangles(tile_points);
    let walk_colors = seaColor(x_y_z, WALK_BEFORE_COLORS);

    tileMesh(a_tile, top_triangles, walk_colors, WALK_EDGE, is_transparent);

    g_scene.add(a_tile);
    addTextLoc(a_tile, x_y_z, slope_tilt, incline_amount);
    walkway_meshes.set(xyz_index, a_tile);
    return [walkway_meshes, walkway_tiles];
}

function HexTileFlat(g_scene, walkway_meshes, walkway_tiles, x_y_z) {
    // qbert
    const [x_index, y_100_index, z_index] = x_y_z;
    const xyz_index = `${x_index},${y_100_index},${z_index}`;
    let [x_center, z_center] = tileCenterCoord(x_index, z_index);
    const a_tile = new THREE.Group();
    a_tile.position.set(x_center, 0, z_center);

    const tile_points = hexPoints(NORMAL_HEX_RADIUS, y_100_index, TILT_NONE, SLOPE_NONE);
    walkway_tiles = offsetTilePoints(walkway_tiles, x_y_z, slope_tilt, incline_amount, tile_points, WALK_BEFORE_COLORS);
    const top_triangles = tileTriangles(tile_points);
    let walk_colors = seaColor(x_y_z, WALK_BEFORE_COLORS);

    tileMesh(a_tile, top_triangles, walk_colors, WALK_EDGE);
    tileMeshTransparent(a_tile, top_triangles, walk_colors, WALK_EDGE, NOT_TRANSPARENT);

    g_scene.add(a_tile);
    addTextLoc(a_tile, x_y_z, slope_tilt, incline_amount);
    walkway_meshes.set(xyz_index, a_tile);
    return [walkway_meshes, walkway_tiles];
}

function HexTile(g_scene, walkway_meshes, walkway_tiles, x_y_z, WALK_COLORS, WALK_EDGE, slope_tilt, incline_amount, is_transparent) {
    const [x_index, y_100_index, z_index] = x_y_z;
    const xyz_index = `${x_index},${y_100_index},${z_index}`;
    if (slope_tilt == undefined) {
        slope_tilt = TILT_NONE;
        incline_amount = 0;
    }
    let [x_center, z_center] = tileCenterCoord(x_index, z_index);
    const tile_radius = 1;

    const a_tile = new THREE.Group();
    a_tile.position.set(x_center, 0, z_center);
    const tile_points = hexPoints(tile_radius, y_100_index, slope_tilt, incline_amount);
    walkway_tiles = offsetTilePoints(walkway_tiles, x_y_z, slope_tilt, incline_amount, tile_points, WALK_COLORS);
    const top_triangles = tileTriangles(tile_points);
    let walk_colors = 0xffff00;
    walk_colors = seaColor(x_y_z, WALK_COLORS);

    tileMesh(a_tile, top_triangles, walk_colors, WALK_EDGE, is_transparent);

    g_scene.add(a_tile);
    addTextLoc(a_tile, x_y_z, slope_tilt, incline_amount);
    walkway_meshes.set(xyz_index, a_tile);
    return [walkway_meshes, walkway_tiles];
}

function offsetTilePoints(stair_tiles, x_y_z, slope_tilt, incline_amount, tile_points) {
    const [x_index, y_index, z_index] = x_y_z;
    const xyz_index = `${x_index},${y_index},${z_index}`;
    let [x_center, z_center] = tileCenterCoord(x_index, z_index);
    let tile_positions = [];

    for (let i = 0; i < tile_points.length; i++) {
        let tile_point = tile_points[i];
        if (Array.isArray(tile_point)) {
            let [x, y, z] = tile_point;
            x = x + x_center;
            z = z + z_center;
            tile_positions.push([x, y, z]);
        }
    }

    let accross_length = 0;
    let top_point, bottom_point;
    if (slope_tilt == TILT_NW) {
        bottom_point = tile_positions[1];
        top_point = tile_positions[5];
        accross_length = distance2hexpoints(bottom_point, top_point);
    } else if (slope_tilt == TILT_NE) {
        bottom_point = tile_positions[0];
        top_point = tile_positions[2];
        accross_length = distance2hexpoints(bottom_point, top_point);
    } else if (slope_tilt == TILT_SW) {
        bottom_point = tile_positions[2];
        top_point = tile_positions[0];
        accross_length = distance2hexpoints(bottom_point, top_point);
    } else if (slope_tilt == TILT_SE) {
        bottom_point = tile_positions[5];
        top_point = tile_positions[2];
        accross_length = distance2hexpoints(bottom_point, top_point);
    } else if (slope_tilt == TILT_NN) {
        bottom_point = tile_positions[0];
        top_point = tile_positions[3];
    } else if (slope_tilt == TILT_SS) {
        bottom_point = tile_positions[3];
        top_point = tile_positions[0];
    } else {
        bottom_point = tile_positions[0];
        top_point = bottom_point;
    }

    let top_point_y = top_point[1];
    let bottom_point_y = bottom_point[1];

    if (top_point_y === bottom_point_y) {
        top_point_y = top_point_y; // * 10;
        bottom_point_y = top_point_y;
    } else {
        top_point_y = top_point_y; // * 10; // - 0.0001;
        bottom_point_y = bottom_point_y; // * 10; // + 0.0001;
    }

    var tile_obj = {
        x_center: x_center,
        y_position: y_index, //
        z_center: z_center,
        tilt_up: slope_tilt,
        angle_incline: incline_amount,
        accross_length: accross_length,
        tile_positions: tile_positions,
        x_z: `${x_index},${z_index}`, // a_c !!!
        xyz_index: xyz_index,
        // light_color: light_color,
        // dark_color: dark_color,
        high_y: top_point_y, // high_y,
        low_y: bottom_point_y // low_y
    };
    stair_tiles.set(xyz_index, tile_obj);
    return stair_tiles;
}
//                              y_100_height
function hexPoints(tile_radius, y_100_height, up_direction, angled_height) {
    const y_height = y_100_height / 100;
    const hex_dist = (tile_radius * SQRT_3) / 2;
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

    const middle_point = [0, mid_height, 0];

    if (up_direction === TILT_NONE) {
        top_left = [top_left_x, y_height, top_left_z];
        bot_left = [bot_left_x, y_height, bot_left_z];
        top_rght = [top_rght_x, y_height, top_rght_z];
        bot_rght = [bot_rght_x, y_height, bot_rght_z];
        left_tip = [left_tip_x, y_height, left_tip_z];
        rght_tip = [rght_tip_x, y_height, rght_tip_z];
    } else if (up_direction === TILT_SS) {
        top_left = [top_left_x, top_height, top_left_z];
        bot_left = [bot_left_x, bot_height, bot_left_z];
        top_rght = [top_rght_x, top_height, top_rght_z];
        bot_rght = [bot_rght_x, bot_height, bot_rght_z];
        left_tip = [left_tip_x, mid_height, left_tip_z];
        rght_tip = [rght_tip_x, mid_height, rght_tip_z];
    } else if (up_direction === TILT_SW) {
        top_left = [top_left_x, top_height, top_left_z];
        bot_left = [bot_left_x, mid_height, bot_left_z];
        top_rght = [top_rght_x, mid_height, top_rght_z];
        bot_rght = [bot_rght_x, bot_height, bot_rght_z];
        left_tip = [left_tip_x, top_height, left_tip_z];
        rght_tip = [rght_tip_x, bot_height, rght_tip_z];
    } else if (up_direction === TILT_NE) {
        top_left = [top_left_x, bot_height, top_left_z];
        bot_left = [bot_left_x, mid_height, bot_left_z];
        top_rght = [top_rght_x, mid_height, top_rght_z];
        bot_rght = [bot_rght_x, top_height, bot_rght_z];
        left_tip = [left_tip_x, bot_height, left_tip_z];
        rght_tip = [rght_tip_x, top_height, rght_tip_z];
    } else if (up_direction === TILT_NW) {
        top_left = [top_left_x, mid_height, top_left_z];
        bot_left = [bot_left_x, top_height, bot_left_z];
        top_rght = [top_rght_x, bot_height, top_rght_z];
        bot_rght = [bot_rght_x, mid_height, bot_rght_z];
        left_tip = [left_tip_x, top_height, left_tip_z];
        rght_tip = [rght_tip_x, bot_height, rght_tip_z];
    } else if (up_direction === TILT_SE) {
        top_left = [top_left_x, mid_height, top_left_z];
        top_rght = [top_rght_x, top_height, top_rght_z];
        rght_tip = [rght_tip_x, top_height, rght_tip_z];
        bot_rght = [bot_rght_x, mid_height, bot_rght_z];
        bot_left = [bot_left_x, bot_height, bot_left_z];
        left_tip = [left_tip_x, bot_height, left_tip_z];
    } else if (up_direction === TILT_SE90) {
        top_left = [bot_left_x, mid_height, top_left_z];
        bot_rght = [bot_rght_x, mid_height, bot_rght_z];
        top_rght = [top_rght_x, top_height, top_rght_z];
        rght_tip = [rght_tip_x, top_height, rght_tip_z];
        bot_left = [bot_left_x, bot_height, bot_left_z];
        left_tip = [left_tip_x, bot_height, left_tip_z];
    } else if (up_direction === TILT_NN) {
        top_left = [top_left_x, bot_height, top_left_z];
        top_rght = [top_rght_x, bot_height, top_rght_z];

        rght_tip = [rght_tip_x, mid_height, rght_tip_z];
        left_tip = [left_tip_x, mid_height, left_tip_z];

        bot_rght = [bot_rght_x, top_height, bot_rght_z];
        bot_left = [bot_left_x, top_height, bot_left_z];
    } else if (up_direction === TILT_NN90) {
        top_left = [top_left_x, bot_height, top_left_z]; // bot_hkill the tips
        top_rght = [top_rght_x, bot_height, top_rght_z];

        rght_tip = [top_rght_x, mid_height, top_rght_z];
        left_tip = [top_left_x, mid_height, top_left_z];

        bot_rght = [top_rght_x, top_height, top_rght_z];
        bot_left = [top_left_x, top_height, top_left_z];
    } else {
        ee("hexPoints unknown  up_direction==", up_direction);
    }

    const stair_tiles = [top_left, top_rght, rght_tip, bot_rght, bot_left, left_tip, middle_point];
    return stair_tiles;
}

export { HexTile, hexPoints, tileTriangles, tileCenterCoord, coords2Indexes, offsetTilePoints };
