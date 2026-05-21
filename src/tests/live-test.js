import { ee, tt, EE, TT } from "../console-short.js";

function setUpLiveTests(TEST_DIRECTION, TEST_NUMBER_1_TO_11) {
    if (TEST_DIRECTION == HEX_CONST.TEST_SS) {
        [the_coords, test_xyz_camera, test_xyz_lookat, test_name] = ss_load_test(TEST_NUMBER_1_TO_11);
    } else if (TEST_DIRECTION == HEX_CONST.TEST_NN) {
        [the_coords, test_xyz_camera, test_xyz_lookat, test_name] = nn_load_test(TEST_NUMBER_1_TO_11);
    } else if (TEST_DIRECTION == HEX_CONST.TEST_NE) {
        [the_coords, test_xyz_camera, test_xyz_lookat, test_name] = ne_load_test(TEST_NUMBER_1_TO_11);
    } else if (TEST_DIRECTION == HEX_CONST.TEST_SW) {
        [the_coords, test_xyz_camera, test_xyz_lookat, test_name] = sw_load_test(TEST_NUMBER_1_TO_11);
    } else if (TEST_DIRECTION == HEX_CONST.TEST_NW) {
        [the_coords, test_xyz_camera, test_xyz_lookat, test_name] = nw_load_test(TEST_NUMBER_1_TO_11);
    } else if (TEST_DIRECTION == HEX_CONST.TEST_SE) {
        [the_coords, test_xyz_camera, test_xyz_lookat, test_name] = se_load_test(TEST_NUMBER_1_TO_11);
    }

    if (test_name !== "") {
        ee(`Physical mouse moving TEST NAME :: ${test_name} :: move forward to cause test`);
    }
    return [the_coords, test_xyz_camera, test_xyz_lookat, test_name];
}

function staticTests() {
    var g_tests = new Map([]);

    // g_tests = test_ss_move(g_tests);
    //g_tests = test_sw_move(g_tests);
    // g_tests = test_nn_move(g_tests);
    // g_tests = test_ne_move(g_tests);
    // g_tests = test_nw_move(g_tests);
    // g_tests = test_se_move(g_tests);
    //ee("the tests:", g_tests);
}

export { setUpLiveTests, staticTests };
