import { ee, tt, EE, TT } from "../misc/console-short.js";

import { X_INDX, Y_INDX, Z_INDX, TILT_NN, TILT_SS, TILT_NW, TILT_NE, TILT_SE, TILT_SW } from "../constants.js";

import { distance2hexpoints, axial_round, coords2HexIndexes, tileCenterCoord } from "../maths.js";
function hexIndex(x_hex_ind, y_height, z_hex_ind) {
    let y_fixed_to_10ths = Math.trunc(y_height * 10) / 10;

    let hex_index = `${x_hex_ind},${y_fixed_to_10ths},${z_hex_ind}`;
    return hex_index;
}

function swivelIntercept(cam_x_z, swivel_a, swivel_b) {
    let [cam_x, cam_z] = cam_x_z;
    let x1 = swivel_a[0];
    let z1 = swivel_a[2];
    let x2 = swivel_b[0];
    let z2 = swivel_b[2];
    let dx = x2 - x1;
    let dz = z2 - z1;
    let dAB = dx * dx + dz * dz;
    let u_top = (cam_x - x1) * dx + (cam_z - z1) * dz;
    let u = u_top / dAB;
    let x = x1 + u * dx;
    let z = z1 + u * dz;
    let swivel_intercept = [x, z];
    return swivel_intercept;
}

function intercept2cam(cam_x_z, swivel_intercept) {
    let [cam_x, cam_z] = cam_x_z;
    let x_diff = cam_x - swivel_intercept[0];
    let z_diff = cam_z - swivel_intercept[1];
    let length_from_swivel = Math.sqrt(x_diff * x_diff + z_diff * z_diff);
    return length_from_swivel;
}

function dotsSideOfLine(cam_x_z, line_point_a, line_point_b) {
    let [cam_x, cam_z] = cam_x_z;
    const nw_x1 = line_point_a[0];
    const nw_z1 = line_point_a[2];
    const nw_x2 = line_point_b[0];
    const nw_z2 = line_point_b[2];
    const pos_or_neg = (cam_x - nw_x1) * (nw_z2 - nw_z1) - (cam_z - nw_z1) * (nw_x2 - nw_x1);
    return pos_or_neg;
}

function inclineNW_NE_SE_SW(cam_pos, stair_tile, swivel_a, swivel_b) {
    const { tilt_up, accross_length, angle_incline, y_position } = stair_tile;
    const cam_x_z = [cam_pos.x, cam_pos.z];
    const swivel_intercept = swivelIntercept(cam_x_z, swivel_a, swivel_b);
    const length_from_swivel2 = intercept2cam(cam_x_z, swivel_intercept);
    const dot_side_of_line = dotsSideOfLine(cam_x_z, swivel_a, swivel_b);
    let pixel_size;
    if (tilt_up == TILT_NW || tilt_up == TILT_SW) {
        if (dot_side_of_line < 0) {
            pixel_size = accross_length / 2 - length_from_swivel2;
        } else {
            pixel_size = accross_length / 2 + length_from_swivel2;
        }
    } else {
        if (dot_side_of_line > 0) {
            pixel_size = accross_length / 2 - length_from_swivel2; // TILT_NE or TILT_SE
        } else {
            pixel_size = accross_length / 2 + length_from_swivel2;
        }
    }
    const height_increase = angle_incline * (pixel_size / accross_length);
    const new_cam = y_position + height_increase + 0; //ABOVE_WALKWAY;
    return height_increase; //new_cam;
}

const ABOVE_WALKWAY = 0.52; // Base offset for camera height above surface
const ABOVE_WALKWAY_SS = 1.52;

function inclineNN(cam_pos, current_tile) {
    let { angle_incline, tile_positions } = current_tile;
    const highest_z = tile_positions[0][2];
    const lowest_z = tile_positions[3][2];
    let total_z_width = highest_z - lowest_z;
    let z_distance_traveled, nn_ss_offset;
    z_distance_traveled = highest_z - cam_pos.z;
    nn_ss_offset = 0; //ABOVE_WALKWAY;
    let height_increase = (z_distance_traveled / total_z_width) * angle_incline;
    let new_cam_y2 = height_increase + nn_ss_offset;
    return new_cam_y2;
}

function inclineSS(cam_pos, current_tile) {
    let { angle_incline, tile_positions } = current_tile;
    const highest_z = tile_positions[0][2];
    const lowest_z = tile_positions[3][2];
    let total_z_width = highest_z - lowest_z;
    let z_distance_traveled, nn_ss_offset;

    z_distance_traveled = cam_pos.z - lowest_z;

    nn_ss_offset = 0; // ABOVE_WALKWAY_SS; // qbert

    let height_increase = (z_distance_traveled / total_z_width) * angle_incline;
    let new_cam_y2 = height_increase + nn_ss_offset;
    return new_cam_y2;
}

function walkwayIncline(walkway_tiles, cam_pos) {
    let [x_hex_ind, z_hex_ind] = coords2HexIndexes(cam_pos.x, cam_pos.z);
    let tile_index = hexIndex(x_hex_ind, cam_pos.y, z_hex_ind);
    if (walkway_tiles.has(tile_index)) {
        let current_tile = walkway_tiles.get(tile_index);
        let { tilt_up, tile_positions } = current_tile;
        if (tilt_up == TILT_NW) {
            return inclineNW_NE_SE_SW(cam_pos, current_tile, tile_positions[0], tile_positions[3]);
        } else if (tilt_up == TILT_NE) {
            return inclineNW_NE_SE_SW(cam_pos, current_tile, tile_positions[1], tile_positions[4]);
        } else if (tilt_up == TILT_SE) {
            return inclineNW_NE_SE_SW(cam_pos, current_tile, tile_positions[0], tile_positions[3]);
        } else if (tilt_up == TILT_SW) {
            return inclineNW_NE_SE_SW(cam_pos, current_tile, tile_positions[1], tile_positions[4]);
        } else if (tilt_up == TILT_NN) {
            return inclineNN(cam_pos, current_tile);
        } else if (tilt_up == TILT_SS) {
            return inclineSS(cam_pos, current_tile);
        }
    }
    return 0; // y_position + ABOVE_WALKWAY;
}

export { walkwayIncline };
