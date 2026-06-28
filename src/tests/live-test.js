import { ee, tt, dd, EE, TT, DD } from "../misc/console-short.js";

import { TEST_SS, TEST_NN, TEST_NE, TEST_SW, TEST_NW, TEST_SE } from "../values/the-constants.js";

function setUpLiveTests(TEST_DIRECTION, TEST_NUMBER_1_TO_11) {
    if (TEST_DIRECTION == TEST_SS) {
        [the_coords, test_xyz_camera, test_xyz_lookat, test_name] = ss_load_test(TEST_NUMBER_1_TO_11);
    } else if (TEST_DIRECTION == TEST_NN) {
        [the_coords, test_xyz_camera, test_xyz_lookat, test_name] = nn_load_test(TEST_NUMBER_1_TO_11);
    } else if (TEST_DIRECTION == TEST_NE) {
        [the_coords, test_xyz_camera, test_xyz_lookat, test_name] = ne_load_test(TEST_NUMBER_1_TO_11);
    } else if (TEST_DIRECTION == TEST_SW) {
        [the_coords, test_xyz_camera, test_xyz_lookat, test_name] = sw_load_test(TEST_NUMBER_1_TO_11);
    } else if (TEST_DIRECTION == TEST_NW) {
        [the_coords, test_xyz_camera, test_xyz_lookat, test_name] = nw_load_test(TEST_NUMBER_1_TO_11);
    } else if (TEST_DIRECTION == TEST_SE) {
        [the_coords, test_xyz_camera, test_xyz_lookat, test_name] = se_load_test(TEST_NUMBER_1_TO_11);
    }

    if (test_name !== "") {
        ee(`Physical mouse moving TEST NAME :: ${test_name} :: move forward to cause test`);
    }
    return [the_coords, test_xyz_camera, test_xyz_lookat, test_name];
}

function staticTests() {
    var s_tests = new Map([]);

    // s_tests = test_ss_move(s_tests);
    //s_tests = test_sw_move(s_tests);
    // s_tests = test_nn_move(s_tests);
    // s_tests = test_ne_move(s_tests);
    // s_tests = test_nw_move(s_tests);
    // s_tests = test_se_move(s_tests);
    //ee("the tests:", s_tests);
}

export { setUpLiveTests, staticTests };
