function inclineNW_NE_SE_SW(cam_pos, stair_tile, swivel_a, swivel_b) {
    const { tilt_up, accross_length, angle_incline, y_position } = stair_tile;
    const cam_x_z = [cam_pos.x, cam_pos.z];
    const swivel_intercept = swivelIntercept(cam_x_z, swivel_a, swivel_b);
    const length_from_swivel2 = intercept2cam(cam_x_z, swivel_intercept);
    const dot_side_of_line = dotsSideOfLine(cam_x_z, swivel_a, swivel_b);
    let pixel_size;
    if (tilt_up == N_W || tilt_up == S_W) {
        if (dot_side_of_line < 0) {
            pixel_size = accross_length / 2 - length_from_swivel2;
        } else {
            pixel_size = accross_length / 2 + length_from_swivel2;
        }
    } else {
        if (dot_side_of_line > 0) {
            pixel_size = accross_length / 2 - length_from_swivel2; // N_E or S_E
        } else {
            pixel_size = accross_length / 2 + length_from_swivel2;
        }
    }
    const height_increase = angle_incline * (pixel_size / accross_length);
    const new_cam = y_position + height_increase + ABOVE_WALKWAY;
    return new_cam;
}

function inclineNN_SS(cam_pos, stair_tile) {
    let { tilt_up, angle_incline, y_position, tile_positions } = stair_tile;
    const highest_z = tile_positions[0][Z_INDX];
    const lowest_z = tile_positions[3][Z_INDX];
    let total_z_width = highest_z - lowest_z;
    let z_distance_traveled, nn_ss_offset;
    if (tilt_up == N_N) {
        z_distance_traveled = highest_z - cam_pos.z;
        nn_ss_offset = ABOVE_WALKWAY;
    } else {
        z_distance_traveled = cam_pos.z - highest_z; // S_S
        nn_ss_offset = ABOVE_WALKWAY + 1.0;
    }
    let height_increase = (z_distance_traveled / total_z_width) * angle_incline;
    let new_cam_y2 = y_position + height_increase + nn_ss_offset;
    return new_cam_y2;
}

function walkwayIncline(cam_pos, stair_tile) {
    let { tilt_up, tile_positions, y_position } = stair_tile;
    if (tilt_up == N_W) {
        return inclineNW_NE_SE_SW(cam_pos, stair_tile, tile_positions[0], tile_positions[3]);
    } else if (tilt_up == N_E) {
        return inclineNW_NE_SE_SW(cam_pos, stair_tile, tile_positions[1], tile_positions[4]);
    } else if (tilt_up == S_E) {
        return inclineNW_NE_SE_SW(cam_pos, stair_tile, tile_positions[0], tile_positions[3]);
    } else if (tilt_up == S_W) {
        return inclineNW_NE_SE_SW(cam_pos, stair_tile, tile_positions[1], tile_positions[4]);
    } else if (tilt_up == N_N || tilt_up == S_S) {
        return inclineNN_SS(cam_pos, stair_tile);
    }
    return y_position + ABOVE_WALKWAY;
}
