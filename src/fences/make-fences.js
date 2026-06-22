import { ee, tt, EE, TT } from "../misc/console-short.js";

import { FENCE_NN, FENCE_SS, FENCE_SE, FENCE_NW, FENCE_SW, FENCE_NE } from "../values/the-constants.js";
import { DIRECTION_NONE, DIRECTION_SS, DIRECTION_NN, DIRECTION_NW, DIRECTION_SE, DIRECTION_NE, DIRECTION_SW } from "../values/the-constants.js";

//  buildBarrier
import { buildFence } from "./fence-coords.js";

function xyz2int(fence_xyz) {
    const [x_str, y_str, z_str] = fence_xyz;
    const x_index = parseInt(x_str);
    const y_index = parseInt(y_str);
    const z_index = parseInt(z_str);
    const ramp_xyz = [x_index, y_index, z_index];
    return ramp_xyz;
}

function makeFences(g_scene, object_meshes, fence_ndxs, o_fence_walls, fence_columns) {
    for (var i = 0; i < fence_ndxs.length; i++) {
        const fence_pair = fence_ndxs[i];
        const fence_a = xyz2int(fence_pair[0]);
        const fence_b = xyz2int(fence_pair[1]);
        const fence_height = parseInt(fence_pair[2]);
        const [x_a, _y_a, z_a] = fence_a;
        const [x_b, _y_b, z_b] = fence_b;

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
        [object_meshes, o_fence_walls] = buildFence(g_scene, object_meshes, o_fence_walls, fence_a, fence_b, fence_position, fence_height);
    }
    var fence_columns = new Map();

    for (const [_key, a_fence] of o_fence_walls) {
        const x_z = a_fence.x_z;
        const xyz_index = a_fence.xyz_index;
        const missins_x_z_column = !fence_columns.has(x_z);
        if (missins_x_z_column) {
            let empty_x_z_column = new Map();
            fence_columns.set(x_z, empty_x_z_column);
        }
        let cur_x_z_column = fence_columns.get(x_z);
        const [x_index, z_index] = x_z.split(",");

        let low_y_10 = a_fence.low_y * 10;
        let high_y_10 = a_fence.high_y * 10;
        for (let y_10_index = low_y_10; y_10_index <= high_y_10; y_10_index++) {
            const a_y_index = `${x_index},${y_10_index / 10},${z_index}`;
            cur_x_z_column.set(a_y_index, xyz_index);
        }
    }
    return [object_meshes, o_fence_walls, fence_columns];
}

export { makeFences };
