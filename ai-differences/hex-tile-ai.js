function findIncline(cam_pos, stair_tile) {
    const { x: cam_x, z: cam_z } = cam_pos;
    const cam_x_z = [cam_x, cam_z];
    const { tilt_up, angle_incline, y_position, tile_positions, accross_length } = stair_tile;
    let height_increase = 0;
    let vertical_offset = 0.52; // Base offset for camera height above surface
    switch (tilt_up) {
        case N_N: {
            const highest_z = tile_positions[0][Z_INDX];
            const lowest_z = tile_positions[3][Z_INDX];
            const total_z_width = highest_z - lowest_z;
            const z_distance_traveled = highest_z - cam_z;
            height_increase = (z_distance_traveled / total_z_width) * angle_incline;
            vertical_offset = 1;
            break;
        }
        case S_S: {
            const highest_z = tile_positions[0][Z_INDX];
            const lowest_z = tile_positions[3][Z_INDX];
            const total_z_width = highest_z - lowest_z;
            const z_distance_traveled = cam_z - highest_z;
            height_increase = (z_distance_traveled / total_z_width) * angle_incline;
            vertical_offset = 2;
            break;
        }
        case N_W:
        case N_E:
        case S_E:
        case S_W: {
            const isNWorSE = tilt_up === N_W || tilt_up === S_E;
            const swivel_a = tile_positions[isNWorSE ? 0 : 1];
            const swivel_b = tile_positions[isNWorSE ? 3 : 4];
            const swivel_intercept = swivelIntercept(swivel_a, swivel_b, cam_x_z);
            const dist_from_hinge = intercept2cam(swivel_intercept, cam_x_z);
            const side = dotsSideOfLine(cam_x_z, swivel_a, swivel_b);
            // Determine if camera is on the side tilting 'up' from the center hinge
            const isHigherSide = tilt_up === N_W || tilt_up === S_W ? side > 0 : side < 0;
            const projection_on_slope = accross_length / 2 + (isHigherSide ? dist_from_hinge : -dist_from_hinge);
            height_increase = angle_incline * (projection_on_slope / accross_length);
            break;
        }
        default:
            return cam_pos.y;
    }

    return y_position + height_increase + vertical_offset;
}
