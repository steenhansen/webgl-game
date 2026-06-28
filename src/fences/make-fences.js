import { ee, tt, dd, EE, TT, DD } from "../misc/console-short.js";
import * as THREE from "three";

import { BARRIER_MIDDLE_COLOR, BARRIER_EDGE_COLOR } from "../values/color-consts.js";
import { FENCE_NN, FENCE_SS, FENCE_SE, FENCE_NW, FENCE_SW, FENCE_NE } from "../values/the-constants.js";
import { opposingFenceLocation, corePanePoints, hex2Fence, corePaneTriangles, fenceMesh } from "./fence-coords.js";
import { HEX_PAIR_DIVIDER } from "../values/the-constants.js";
import { tileCenterCoord } from "../misc/hex-maths.js";
const FENCE_HEX_RADIUS = 0.8; // 1 is the normal

function xyzHexNdx2Int(fence_xyz) {
    const [x_str, y_str, z_str] = fence_xyz;
    const x_index = parseInt(x_str);
    const y_index = parseInt(y_str);
    const z_index = parseInt(z_str);
    const xyz_hex_ndx = [x_index, y_index, z_index];
    return xyz_hex_ndx;
}

function makeFences(g_scene, o_object_meshes, o_fence_ndxs, o_fence_walls, o_fence_columns) {
    [o_object_meshes, o_fence_walls] = makeFencePairs(g_scene, o_object_meshes, o_fence_ndxs, o_fence_walls);
    var o_fence_columns = new Map();
    for (const [_key, one_pane_of_fence] of o_fence_walls) {
        const { x_z, xyz_index } = one_pane_of_fence;
        const missing_x_z_column = !o_fence_columns.has(x_z);
        if (missing_x_z_column) {
            let empty_x_z_column = new Map();
            o_fence_columns.set(x_z, empty_x_z_column);
        }
        let cur_x_z_column = o_fence_columns.get(x_z);
        const [x_index, z_index] = x_z.split(",");
        let low_y_10 = one_pane_of_fence.low_y * 10;
        let high_y_10 = one_pane_of_fence.high_y * 10;
        for (let y_10_index = low_y_10; y_10_index <= high_y_10; y_10_index++) {
            const a_y_index = `${x_index},${y_10_index / 10},${z_index}`;
            cur_x_z_column.set(a_y_index, xyz_index);
        }
    }
    return [o_object_meshes, o_fence_walls, o_fence_columns];
}

function makeFencePairs(g_scene, o_object_meshes, o_fence_ndxs, o_fence_walls) {
    for (var i = 0; i < o_fence_ndxs.length; i++) {
        const fence_pair = o_fence_ndxs[i];
        const fence_ndx_a = xyzHexNdx2Int(fence_pair[0]);
        const fence_ndx_b = xyzHexNdx2Int(fence_pair[1]);
        const fence_height = parseInt(fence_pair[2]);
        const [x_a, _y_a, z_a] = fence_ndx_a;
        const [x_b, _y_b, z_b] = fence_ndx_b;
        let fence_position;
        if (x_a == x_b) {
            if (z_a > z_b) {
                fence_position = FENCE_NN;
            } else {
                fence_position = FENCE_SS;
            }
        } else if (z_a == z_b) {
            if (x_a > x_b) {
                fence_position = FENCE_NW;
            } else {
                fence_position = FENCE_SE;
            }
        } else {
            if (x_a > x_b) {
                fence_position = FENCE_SW;
            } else {
                fence_position = FENCE_NE;
            }
        }
        [o_object_meshes, o_fence_walls] = buildFencePanes(g_scene, o_object_meshes, o_fence_walls, fence_ndx_a, fence_ndx_b, fence_position, fence_height);
    }
    return [o_object_meshes, o_fence_walls];
}

function buildFencePanes(g_scene, o_object_meshes, o_fence_walls, x_y_z_a, x_y_z_b, fence_position, fence_height) {
    const [x_index_a, y_index_a, z_index_a] = x_y_z_a;
    const [x_index_b, y_index_b, z_index_b] = x_y_z_b;
    const xyz_index_a = `${x_index_a},${y_index_a},${z_index_a}`;
    const xyz_index_b = `${x_index_b},${y_index_b},${z_index_b}`;

    const mesh_index_a = `${xyz_index_a}${HEX_PAIR_DIVIDER}${xyz_index_b}`;
    const mesh_index_b = `${xyz_index_b}${HEX_PAIR_DIVIDER}${xyz_index_a}`;

    let core_a = verticalPane(g_scene, o_object_meshes, o_fence_walls, mesh_index_a, x_y_z_a, fence_position, fence_height);
    let oppose_position = opposingFenceLocation(fence_position);
    let core_b = verticalPane(g_scene, o_object_meshes, o_fence_walls, mesh_index_b, x_y_z_b, oppose_position, fence_height);

    edgePanes(g_scene, core_a, core_b);
    return [o_object_meshes, o_fence_walls];
}

function verticalPane(g_scene, object_meshes, o_fence_walls, mesh_index, x_y_z, fence_position, fence_height) {
    const [x_index, y_index, z_index] = x_y_z;
    let [x_center, z_center] = tileCenterCoord(x_index, z_index);
    const vertical_pane = new THREE.Group();
    vertical_pane.position.set(x_center, 0, z_center);
    const pane_points = corePanePoints(FENCE_HEX_RADIUS, y_index, fence_position, fence_height);
    o_fence_walls = hex2Fence(o_fence_walls, mesh_index, x_y_z, fence_position, pane_points);
    const two_pane_triangles = corePaneTriangles(pane_points);
    fenceMesh(vertical_pane, two_pane_triangles, BARRIER_MIDDLE_COLOR, BARRIER_EDGE_COLOR);
    g_scene.add(vertical_pane);
    object_meshes.set(mesh_index, vertical_pane);
    let [x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4, x5, y5, z5, x6, y6, z6] = two_pane_triangles;
    let point_1 = [x1 + x_center, y1, z1 + z_center];
    let point_2 = [x2 + x_center, y2, z2 + z_center];
    let point_3 = [x3 + x_center, y3, z3 + z_center];
    let point_4 = [x4 + x_center, y4, z4 + z_center];
    let point_5 = [x5 + x_center, y5, z5 + z_center];
    let point_6 = [x6 + x_center, y6, z6 + z_center];
    let shifted_xz_triangles = [...point_1, ...point_2, ...point_3, ...point_4, ...point_5, ...point_6];
    return shifted_xz_triangles;
}

function edgePanes(g_scene, core_a, core_b) {
    const edge_panes = new THREE.Group();

    let a_top_rite = [core_a[0], core_a[1], core_a[2]];
    let a_bot_rite = [core_a[3], core_a[4], core_a[5]];
    let a_bot_left = [core_a[6], core_a[7], core_a[8]];
    let _______a_4 = [core_a[9], core_a[10], core_a[11]];
    let _______a_5 = [core_a[12], core_a[13], core_a[14]];
    let a_top_left = [core_a[15], core_a[16], core_a[17]];

    let is_NN_or_SS = core_a[2] == core_a[17];

    if (is_NN_or_SS) {
        let temp_a_top_rite = a_top_rite;
        let temp_a_bot_rite = a_bot_rite;
        let temp_a_top_left = a_top_left;
        let temp_a_bot_left = a_bot_left;
        a_top_rite = temp_a_top_left;
        a_bot_rite = temp_a_bot_left;
        a_bot_left = temp_a_bot_rite;
        a_top_left = temp_a_top_rite;
    }

    // a_top_rite = [core_a[0], core_a[1], core_a[2]];
    // a_bot_rite = [core_a[3], core_a[4], core_a[5]];
    // a_bot_left = [core_a[6], core_a[7], core_a[8]];
    // _______a_4 = [core_a[9], core_a[10], core_a[11]];
    // _______a_5 = [core_a[12], core_a[13], core_a[14]];
    // a_top_left = [core_a[15], core_a[16], core_a[17]];

    // let is_NN_or_SS =core_a[2] == core_a[17];
    // if (core_a[2] == core_a[17]) {
    //     console.log("a_top_rite", a_top_rite);
    //     console.log("a_top_left", a_top_left);
    // }
    // if (a_top_rite[2] == a_top_left[2]) {
    //     console.log("a_top_rite", a_top_rite);
    //     console.log("a_top_left", a_top_left);
    // }
    let b_top_rite = [core_b[0], core_b[1], core_b[2]];
    let b_bot_rite = [core_b[3], core_b[4], core_b[5]];
    let b_bot_left = [core_b[6], core_b[7], core_b[8]];
    let _______b_4 = [core_b[9], core_b[10], core_b[11]];
    let _______b_5 = [core_b[12], core_b[13], core_b[14]];
    let b_top_left = [core_b[15], core_b[16], core_b[17]];

    let right_bottom = [...a_top_rite, ...b_bot_left, ...a_bot_rite];
    let right_top = [...a_top_rite, ...b_top_left, ...b_bot_left];
    let left_bottom = [...a_top_left, ...b_bot_rite, ...a_bot_left];
    let left_top = [...a_top_left, ...b_top_rite, ...b_bot_rite];
    let the_sides = [...right_bottom, ...right_top, ...left_bottom, ...left_top];
    fenceMesh(edge_panes, the_sides, BARRIER_EDGE_COLOR, BARRIER_MIDDLE_COLOR);
    g_scene.add(edge_panes);
}

export { makeFences };
