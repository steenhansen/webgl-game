function findIncline(cam_pos, stair_tile) {
    let cam_x = cam_pos.x;
    let cam_y = cam_pos.y;
    let cam_z = cam_pos.z;
    let cam_x_z = [cam_x, cam_z];
    let { tilt_up, angle_incline, y_position, tile_positions, accross_length } = stair_tile;
    //  console.log("findInclines", tilt_up);
    if (tilt_up == "NN") {
        let highest_z = tile_positions[0][Z_INDX];
        let lowest_z = tile_positions[3][Z_INDX];
        let total_z_width = highest_z - lowest_z;
        let z_distance_traveled = highest_z - cam_z;
        let height_increase = (z_distance_traveled / total_z_width) * angle_incline;
        let new_cam_y2 = y_position + height_increase + 1;
        return new_cam_y2;
    } else if (tilt_up == "SS") {
        let highest_z = tile_positions[0][Z_INDX];
        let lowest_z = tile_positions[3][Z_INDX];
        let total_z_width = highest_z - lowest_z;
        let z_distance_traveled = cam_z - highest_z;
        let height_increase = (z_distance_traveled / total_z_width) * angle_incline;
        let new_cam_y2 = y_position + height_increase + 2;
        return new_cam_y2;
    } else if (tilt_up == "NW") {
        let swivel_a = tile_positions[0];
        let swivel_b = tile_positions[3];
        let swivel_intercept = swivelIntercept(swivel_a, swivel_b, cam_x_z);
        let length_from_swivel2 = intercept2cam(swivel_intercept, cam_x_z);
        const nw_side_2 = dotsSideOfLine(cam_x_z, swivel_a, swivel_b);
        let pixel_size = 0;
        if (nw_side_2 < 0) {
            pixel_size = accross_length / 2 - length_from_swivel2;
        } else {
            pixel_size = accross_length / 2 + length_from_swivel2;
        }
        let height_increase = angle_incline * (pixel_size / accross_length);
        let new_cam_y2 = y_position + height_increase + 0.52;
        return new_cam_y2;
    } else if (tilt_up == "NE") {
        let swivel_a = tile_positions[1];
        let swivel_b = tile_positions[4];
        let swivel_intercept = swivelIntercept(swivel_a, swivel_b, cam_x_z);
        let length_from_swivel2 = intercept2cam(swivel_intercept, cam_x_z);
        const nw_side_2 = dotsSideOfLine(cam_x_z, swivel_a, swivel_b);
        let pixel_size = 0;
        if (nw_side_2 > 0) {
            pixel_size = accross_length / 2 - length_from_swivel2;
        } else {
            pixel_size = accross_length / 2 + length_from_swivel2;
        }
        let height_increase = angle_incline * (pixel_size / accross_length);
        let new_cam_y2 = y_position + height_increase + 0.52;
        return new_cam_y2;
    } else if (tilt_up == "SE") {
        //  console.log("se find tile_positions", tile_positions);
        let swivel_a = tile_positions[0];
        let swivel_b = tile_positions[3];
        let swivel_intercept = swivelIntercept(swivel_a, swivel_b, cam_x_z);
        let length_from_swivel2 = intercept2cam(swivel_intercept, cam_x_z);
        const nw_side_2 = dotsSideOfLine(cam_x_z, swivel_a, swivel_b);
        let pixel_size = 0;
        if (nw_side_2 > 0) {
            pixel_size = accross_length / 2 - length_from_swivel2;
        } else {
            pixel_size = accross_length / 2 + length_from_swivel2;
        }
        let height_increase = angle_incline * (pixel_size / accross_length);
        let new_cam_y2 = y_position + height_increase + 0.52;
        //console.log("swwwwwwwwwwwwwwww", new_cam_y2)
        return new_cam_y2;
    } else if (tilt_up == "SW") {
        //  console.log("sw find tile_positions", tile_positions);
        let swivel_a = tile_positions[1];
        let swivel_b = tile_positions[4];
        let swivel_intercept = swivelIntercept(swivel_a, swivel_b, cam_x_z);
        let length_from_swivel2 = intercept2cam(swivel_intercept, cam_x_z);
        const nw_side_2 = dotsSideOfLine(cam_x_z, swivel_a, swivel_b);
        let pixel_size = 0;
        if (nw_side_2 < 0) {
            pixel_size = accross_length / 2 - length_from_swivel2;
        } else {
            pixel_size = accross_length / 2 + length_from_swivel2;
        }
        let height_increase = angle_incline * (pixel_size / accross_length);
        let new_cam_y2 = y_position + height_increase + 0.52;
        //console.log("swwwwwwwwwwwwwwww", new_cam_y2)
        return new_cam_y2;
    }
    let new_cam_y2 = cam_y - 0.1;
    return cam_y;
}
