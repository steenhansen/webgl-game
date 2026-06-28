import { ee, tt, dd, EE, TT, DD } from "../console-short.js";

function testTile(x_index, z_index) {
    var new_tile = {
        x_center: x_index,
        z_center: z_index,
        x_z: `${x_index},${z_index}`
    };
    return new_tile;
}

function testAngledTile(x_index, y_position, z_index, tilt_up) {
    var new_tile = {
        x_center: x_index,
        y_position: y_position,
        z_center: z_index,
        tilt_up: tilt_up,
        x_z: `${x_index},${z_index}`
    };
    return new_tile;
}

function startTestTiles(test_direction) {
    if (TEST_DIRECTION == TEST_SS) {
        [the_coords, test_xyz_camera, test_xyz_lookat, test_name] = ss_load_test(TEST_NUMBER_1_TO_11);
        // the_coords.pop(); // get rid of name
        ee("main start test coord ss", the_coords);
    } else if (TEST_DIRECTION == TEST_NN) {
        [the_coords, test_xyz_camera, test_xyz_lookat, test_name] = nn_load_test(TEST_NUMBER_1_TO_11);
        // the_coords.pop(); // get rid of name
        ee("main start test coord nn", the_coords);
    } else if (TEST_DIRECTION == TEST_NE) {
        [the_coords, test_xyz_camera, test_xyz_lookat, test_name] = ne_load_test(TEST_NUMBER_1_TO_11);
        // the_coords.pop(); // get rid of name
        ee("main start test coord ne", the_coords);
    } else if (TEST_DIRECTION == TEST_SW) {
        [the_coords, test_xyz_camera, test_xyz_lookat, test_name] = sw_load_test(TEST_NUMBER_1_TO_11);
        // the_coords.pop(); // get rid of name
    } else if (TEST_DIRECTION == TEST_NW) {
        [the_coords, test_xyz_camera, test_xyz_lookat, test_name] = nw_load_test(TEST_NUMBER_1_TO_11);
        // the_coords.pop(); // get rid of name
        ee("main start test coord nw", the_coords);
    } else if (TEST_DIRECTION == TEST_SE) {
        [the_coords, test_xyz_camera, test_xyz_lookat, test_name] = se_load_test(TEST_NUMBER_1_TO_11);
        // the_coords.pop(); // get rid of name
    }

    if (test_name !== "") {
        ee(`Physical mouse moving TEST NAME :: ${test_name} :: move forward to cause test`);
    }
}

export { testTile, testAngledTile };
