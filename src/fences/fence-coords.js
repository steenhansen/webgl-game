import { ee, tt, EE, TT } from "../misc/console-short.js";
import * as THREE from "three";
import { fenceCoords } from "./fence-mesh.js";
import { tileMesh } from "../tiles/tile-mesh.js";
import { BARRIER_MIDDLE_COLOR, BARRIER_EDGE_COLOR } from "../values/color-consts.js";
import { HEX_PAIR_DIVIDER } from "../values/the-constants.js";
import { distance2hexpoints, axial_round, coords2Indexes, tileCenterCoord } from "../misc/hex-maths.js";
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
    TILT_NONE,
    SQRT_3
} from "../values/the-constants.js";

function buildFence(g_scene, object_meshes, o_fence_walls, x_y_z_1, x_y_z_2, fence_position, fence_height) {
    const [x1_index, y1_index, z1_index] = x_y_z_1;
    const [x2_index, y2_index, z2_index] = x_y_z_2;
    const xyz1_index = `${x1_index},${y1_index},${z1_index}`;
    const xyz2_index = `${x2_index},${y2_index},${z2_index}`;
    const xyz_index = `${xyz1_index}${HEX_PAIR_DIVIDER}${xyz2_index}`;

    let [x_center, z_center] = tileCenterCoord(x1_index, z1_index);
    const tile_radius = 1;
    const a_tile = new THREE.Group();
    a_tile.position.set(x_center, 0, z_center);
    const square_points = squarePoints(tile_radius, y1_index, fence_position, fence_height);
    o_fence_walls = offsetfencePoints(o_fence_walls, x_y_z_1, x_y_z_2, fence_position, square_points);
    const top_triangles = fenceRectangles(square_points);
    tileMesh(a_tile, top_triangles, BARRIER_MIDDLE_COLOR, BARRIER_EDGE_COLOR);
    g_scene.add(a_tile);
    fenceCoords(a_tile, x_y_z_1, fence_position, fence_height);
    object_meshes.set(xyz_index, a_tile);
    return [object_meshes, o_fence_walls];
}

/*
a_fence = [ {x_ndx:0, z_ndx:0}, {x_ndx:0, z_ndx:-1} ]

                             /---------\
                            /           \       
                           /     0,-1    \ 
                           \             /
                            \           /      
                             \---------/
                               fence  
                             /---------\
                            /           \       
                           /     0,0     \ 
                           \             /
                            \           /      
                             \---------/
                            
*/

function fenceRectangles(hex_points) {
    const [top_left, top_right, bot_right, bot_left] = hex_points;
    const square_up_left = [...bot_left, ...top_left, ...top_right];
    const square_down_right = [...bot_left, ...top_right, ...bot_right];

    const hexagon_triangles = [...square_up_left, ...square_down_right];
    return hexagon_triangles;
}

//    ["000", "010", "000", "green", TILT_NN, 10], just the objects

function offsetfencePoints(stair_tiles, x_y_z_1, x_y_z_2, fence_position, square_points) {
    //function offsetfencePoints(stair_tiles, x_y_z, fence_position, square_points) {
    const [x1_index, y1_index, z1_index] = x_y_z_1;
    const [x2_index, y2_index, z2_index] = x_y_z_2;
    //const [x_index, y_index, z_index] = x_y_z;

    const xyz1_index = `${x1_index},${y1_index},${z1_index}`;
    const xyz2_index = `${x2_index},${y2_index},${z2_index}`;
    //const xyz_index = `${x_index},${y_index},${z_index}`;

    let [x_center, z_center] = tileCenterCoord(x1_index, z1_index);
    let tile_positions = [];

    for (let i = 0; i < square_points.length; i++) {
        let tile_point = square_points[i];
        if (Array.isArray(tile_point)) {
            let [x, y, z] = tile_point;
            x = x + x_center;
            z = z + z_center;
            tile_positions.push([x, y, z]);
        }
    }
    let top_point_y = tile_positions[3][1];
    let bottom_point_y = tile_positions[0][1];

    if (top_point_y === bottom_point_y) {
        top_point_y = top_point_y; // * 10;
        bottom_point_y = top_point_y;
    } else {
        top_point_y = top_point_y; // * 10; // - 0.0001;
        bottom_point_y = bottom_point_y; // * 10; // + 0.0001;
    }

    var tile_obj = {
        x_center: x_center,
        y_position: y1_index,
        z_center: z_center,
        // fence_side: square_position
        fence_side: fence_position,
        tile_positions: tile_positions, // square_positions
        x_z: `${x1_index},${z1_index}`,

        xyz1_index: xyz1_index,
        xyz2_index: xyz2_index,

        // xyz_index: xyz_index,

        high_y: top_point_y, // - 0.0001,
        low_y: bottom_point_y // why?????????/
    };

    const xyz_1_2_index = `${xyz1_index}${HEX_PAIR_DIVIDER}${xyz2_index}`;
    stair_tiles.set(xyz_1_2_index, tile_obj);

    const xyz_2_1_index = `${xyz2_index}${HEX_PAIR_DIVIDER}${xyz1_index}`;
    stair_tiles.set(xyz_2_1_index, tile_obj);

    return stair_tiles;
}

// these must flip around
function squarePoints(tile_radius, y_100_height, fence_position, fence_height) {
    fence_height = fence_height / 1000;
    const y_height = y_100_height / 100;
    tile_radius = tile_radius - 0.0; // - 0.2;

    const hex_dist = (tile_radius * SQRT_3) / 2;
    const half_radius = tile_radius / 2;
    var top_left, bot_left, top_rght, bot_rght; //, left_tip, rght_tip;

    const top_height = y_height + fence_height;
    const bot_height = y_height;

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

    if (fence_position === FENCE_NN) {
        top_rght = [bot_rght_x, bot_height, bot_rght_z];
        top_left = [bot_left_x, bot_height, bot_left_z];
        bot_rght = [bot_rght_x, top_height, bot_rght_z];
        bot_left = [bot_left_x, top_height, bot_left_z];
    } else if (fence_position === FENCE_NE) {
        bot_left = [bot_rght_x, top_height, bot_rght_z];
        bot_rght = [rght_tip_x, top_height, rght_tip_z];
        top_left = [bot_rght_x, bot_height, bot_rght_z];
        top_rght = [rght_tip_x, bot_height, rght_tip_z];
    } else if (fence_position === FENCE_SW) {
        bot_left = [top_left_x, top_height, top_left_z];
        bot_rght = [left_tip_x, top_height, left_tip_z];
        top_left = [top_left_x, bot_height, top_left_z];
        top_rght = [left_tip_x, bot_height, left_tip_z];
    } else if (fence_position === FENCE_NW) {
        bot_left = [bot_left_x, top_height, bot_left_z];
        bot_rght = [left_tip_x, top_height, left_tip_z];
        top_left = [bot_left_x, bot_height, bot_left_z];
        top_rght = [left_tip_x, bot_height, left_tip_z];
    } else if (fence_position === FENCE_SE) {
        bot_left = [top_rght_x, top_height, top_rght_z];
        bot_rght = [rght_tip_x, top_height, rght_tip_z];
        top_rght = [rght_tip_x, bot_height, rght_tip_z];
        top_left = [top_rght_x, bot_height, top_rght_z];
    } else if (fence_position === FENCE_SS) {
        top_left = [top_left_x, bot_height, top_left_z];
        top_rght = [top_rght_x, bot_height, top_rght_z];
        bot_rght = [top_rght_x, top_height, top_rght_z];
        bot_left = [top_left_x, top_height, top_left_z];
    } else {
        ee("squarePoints unknown  fence_position==", fence_position);
    }
    const fence_corners = [top_left, top_rght, bot_rght, bot_left];
    return fence_corners;
}

export { buildFence, squarePoints, fenceRectangles, tileCenterCoord, coords2Indexes };
