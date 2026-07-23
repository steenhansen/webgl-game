import { ee, tt, dd, EE, TT, DD } from "../../console-short.js";

import { checkPrevNextTiles } from "../cam-adjust/test-funcs.js";
import { TEST_PASSED, TEST_FAILED, MOVE_GO } from "../../values/constants.js";
import { tileIndex2floatCoords } from "../hex-tile.js";

function nn_load_test(test_number) {
    const test_start_finish = NN_CONST.NN_START_FINISHES[test_number];

    const [start_index, finish_index, test_name] = test_start_finish;

    const [start_index_x, start_index_y, start_index_z] = start_index;
    let [start_x_cam, start_z_cam] = tileIndex2floatCoords(start_index_x, start_index_z);
    const se_xyz_camera = [start_x_cam, start_index_y, start_z_cam];

    const [finish_index_x, _finish_index_y, finish_index_z] = finish_index;
    let [finish_x_cam, finish_z_cam] = tileIndex2floatCoords(finish_index_x, finish_index_z);
    const se_lookat = [finish_x_cam, 0, finish_z_cam];

    return [test_start_finish, se_xyz_camera, se_lookat, test_name];
}

function NN_1_CURVE_UP__CURVE_UP(the_tests) {
    var prev_tile = NN_CONST.NN_START_FINISHES[1][0];
    var new_tile = NN_CONST.NN_START_FINISHES[1][1];
    var move_allowed = checkPrevNextTiles(prev_tile, new_tile);
    if (move_allowed == MOVE_GO) {
        return the_tests.set(NN_CONST.NN_1_CURVE_UP__CURVE_UP, TEST_PASSED);
    } else {
        return the_tests.set(NN_CONST.NN_1_CURVE_UP__CURVE_UP, TEST_FAILED);
    }
}

function NN_2_CURVE_DOWN__CURVE_DOWN(the_tests) {
    var prev_tile = NN_CONST.NN_START_FINISHES[2][0];
    var new_tile = NN_CONST.NN_START_FINISHES[2][1];
    var move_allowed = checkPrevNextTiles(prev_tile, new_tile);
    if (move_allowed == MOVE_GO) {
        return the_tests.set(NN_CONST.NN_2_CURVE_DOWN__CURVE_DOWN, TEST_PASSED);
    } else {
        return the_tests.set(NN_CONST.NN_2_CURVE_DOWN__CURVE_DOWN, TEST_FAILED);
    }
}

function NN_5_FLAT__FLAT(the_tests) {
    var prev_tile = NN_CONST.NN_START_FINISHES[3][0];
    var new_tile = NN_CONST.NN_START_FINISHES[3][1];
    var move_allowed = checkPrevNextTiles(prev_tile, new_tile);

    if (move_allowed == MOVE_GO) {
        return the_tests.set(NN_CONST.NN_5_FLAT__FLAT, TEST_PASSED);
    } else {
        return the_tests.set(NN_CONST.NN_5_FLAT__FLAT, TEST_FAILED);
    }
}

function NN_6_FLAT__UP(the_tests) {
    var prev_tile = NN_CONST.NN_START_FINISHES[4][0];
    var new_tile = NN_CONST.NN_START_FINISHES[4][1];
    var move_allowed = checkPrevNextTiles(prev_tile, new_tile);
    if (move_allowed == MOVE_GO) {
        return the_tests.set(NN_CONST.NN_6_FLAT__UP, TEST_PASSED);
    } else {
        return the_tests.set(NN_CONST.NN_6_FLAT__UP, TEST_FAILED);
    }
}

function NN_7_UP__FLAT(the_tests) {
    var prev_tile = NN_CONST.NN_START_FINISHES[5][0];
    var new_tile = NN_CONST.NN_START_FINISHES[5][1];
    var move_allowed = checkPrevNextTiles(prev_tile, new_tile);
    if (move_allowed == MOVE_GO) {
        return the_tests.set(NN_CONST.NN_7_UP__FLAT, TEST_PASSED);
    } else {
        return the_tests.set(NN_CONST.NN_7_UP__FLAT, TEST_FAILED);
    }
}

function NN_8_DOWN__FLAT(the_tests) {
    var prev_tile = NN_CONST.NN_START_FINISHES[6][0];
    var new_tile = NN_CONST.NN_START_FINISHES[6][1];
    var move_allowed = checkPrevNextTiles(prev_tile, new_tile);
    if (move_allowed == MOVE_GO) {
        return the_tests.set(NN_CONST.NN_8_DOWN__FLAT, TEST_PASSED);
    } else {
        return the_tests.set(NN_CONST.NN_8_DOWN__FLAT, TEST_FAILED);
    }
}

function NN_9_FLAT__DOWN(the_tests) {
    var prev_tile = NN_CONST.NN_START_FINISHES[7][0];
    var new_tile = NN_CONST.NN_START_FINISHES[7][1];
    var move_allowed = checkPrevNextTiles(prev_tile, new_tile);
    if (move_allowed == MOVE_GO) {
        return the_tests.set(NN_CONST.NN_9_FLAT__DOWN, TEST_PASSED);
    } else {
        return the_tests.set(NN_CONST.NN_9_FLAT__DOWN, TEST_FAILED);
    }
}

function NN_10_UP__UP(the_tests) {
    var prev_tile = NN_CONST.NN_START_FINISHES[8][0];
    var new_tile = NN_CONST.NN_START_FINISHES[8][1];
    var move_allowed = checkPrevNextTiles(prev_tile, new_tile);
    if (move_allowed == MOVE_GO) {
        return the_tests.set(NN_CONST.NN_10_UP__UP, TEST_PASSED);
    } else {
        return the_tests.set(NN_CONST.NN_10_UP__UP, TEST_FAILED);
    }
}

function NN_11_DOWN__DOWN(the_tests) {
    var prev_tile = NN_CONST.NN_START_FINISHES[9][0];
    var new_tile = NN_CONST.NN_START_FINISHES[9][1];
    var move_allowed = checkPrevNextTiles(prev_tile, new_tile);

    if (move_allowed == MOVE_GO) {
        return the_tests.set(NN_CONST.NN_11_DOWN__DOWN, TEST_PASSED);
    } else {
        return the_tests.set(NN_CONST.NN_11_DOWN__DOWN, TEST_FAILED);
    }
}

function NN_12_UP__DOWN(the_tests) {
    var prev_tile = NN_CONST.NN_START_FINISHES[10][0];
    var new_tile = NN_CONST.NN_START_FINISHES[10][1];
    var move_allowed = checkPrevNextTiles(prev_tile, new_tile);
    if (move_allowed == MOVE_GO) {
        return the_tests.set(NN_CONST.NN_12_UP__DOWN, TEST_PASSED);
    } else {
        return the_tests.set(NN_CONST.NN_12_UP__DOWN, TEST_FAILED);
    }
}

function NN_13_DOWN__UP(the_tests) {
    var prev_tile = NN_CONST.NN_START_FINISHES[11][0];
    var new_tile = NN_CONST.NN_START_FINISHES[11][1];
    var move_allowed = checkPrevNextTiles(prev_tile, new_tile);
    if (move_allowed == MOVE_GO) {
        return the_tests.set(NN_CONST.NN_13_DOWN__UP, TEST_PASSED);
    } else {
        return the_tests.set(NN_CONST.NN_13_DOWN__UP, TEST_FAILED);
    }
}

function test_nn_move(the_tests) {
    the_tests = NN_1_CURVE_UP__CURVE_UP(the_tests);
    the_tests = NN_2_CURVE_DOWN__CURVE_DOWN(the_tests);
    the_tests = NN_5_FLAT__FLAT(the_tests);
    the_tests = NN_6_FLAT__UP(the_tests);
    the_tests = NN_7_UP__FLAT(the_tests);
    the_tests = NN_8_DOWN__FLAT(the_tests);
    the_tests = NN_9_FLAT__DOWN(the_tests);
    the_tests = NN_10_UP__UP(the_tests);
    the_tests = NN_11_DOWN__DOWN(the_tests);
    the_tests = NN_12_UP__DOWN(the_tests);
    the_tests = NN_13_DOWN__UP(the_tests);
    return the_tests;
}

export { nn_load_test, test_nn_move };
