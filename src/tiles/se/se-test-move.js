import { ee, tt, dd, EE, TT, DD } from "../../console-short.js";

import { checkPrevNextTiles } from "../cam-adjust/test-funcs.js";
import { TEST_PASSED, TEST_FAILED, MOVE_GO } from "../../values/constants.js";
import { tileCenterCoord } from "../hex-tile.js";

function se_load_test(test_number) {
    const test_start_finish = SE_CONST.SE_START_FINISHES[test_number];

    const [start_index, finish_index, test_name] = test_start_finish;

    const [start_index_x, start_index_y, start_index_z] = start_index;
    let [start_x_cam, start_z_cam] = tileCenterCoord(start_index_x, start_index_z);
    const se_xyz_camera = [start_x_cam, start_index_y, start_z_cam];

    const [finish_index_x, _finish_index_y, finish_index_z] = finish_index;
    let [finish_x_cam, finish_z_cam] = tileCenterCoord(finish_index_x, finish_index_z);
    const se_lookat = [finish_x_cam, 0, finish_z_cam];

    return [test_start_finish, se_xyz_camera, se_lookat, test_name];
}

function SE_1_UP_UP_CLOCK(the_tests) {
    var prev_tile = SE_CONST.SE_START_FINISHES[1][0];
    var new_tile = SE_CONST.SE_START_FINISHES[1][1];
    var move_allowed = checkPrevNextTiles(prev_tile, new_tile);
    if (move_allowed == MOVE_GO) {
        return the_tests.set(SE_CONST.SE_1_UP_UP_CLOCK, TEST_PASSED);
    } else {
        return the_tests.set(SE_CONST.SE_1_UP_UP_CLOCK, TEST_FAILED);
    }
}

function SE_3_DOWN_DOWN_CLOCK(the_tests) {
    var prev_tile = SE_CONST.SE_START_FINISHES[2][0];
    var new_tile = SE_CONST.SE_START_FINISHES[2][1];
    var move_allowed = checkPrevNextTiles(prev_tile, new_tile);
    if (move_allowed == MOVE_GO) {
        return the_tests.set(SE_CONST.SE_3_DOWN_DOWN_CLOCK, TEST_PASSED);
    } else {
        return the_tests.set(SE_CONST.SE_3_DOWN_DOWN_CLOCK, TEST_FAILED);
    }
}

function SE_5_FLAT__FLAT(the_tests) {
    var prev_tile = SE_CONST.SE_START_FINISHES[3][0];
    var new_tile = SE_CONST.SE_START_FINISHES[3][1];
    var move_allowed = checkPrevNextTiles(prev_tile, new_tile);

    if (move_allowed == MOVE_GO) {
        return the_tests.set(SE_CONST.SE_5_FLAT__FLAT, TEST_PASSED);
    } else {
        return the_tests.set(SE_CONST.SE_5_FLAT__FLAT, TEST_FAILED);
    }
}

function SE_6_FLAT__UP(the_tests) {
    var prev_tile = SE_CONST.SE_START_FINISHES[4][0];
    var new_tile = SE_CONST.SE_START_FINISHES[4][1];
    var move_allowed = checkPrevNextTiles(prev_tile, new_tile);
    if (move_allowed == MOVE_GO) {
        return the_tests.set(SE_CONST.SE_6_FLAT__UP, TEST_PASSED);
    } else {
        return the_tests.set(SE_CONST.SE_6_FLAT__UP, TEST_FAILED);
    }
}

function SE_7_UP__FLAT(the_tests) {
    var prev_tile = SE_CONST.SE_START_FINISHES[5][0];
    var new_tile = SE_CONST.SE_START_FINISHES[5][1];
    var move_allowed = checkPrevNextTiles(prev_tile, new_tile);
    if (move_allowed == MOVE_GO) {
        return the_tests.set(SE_CONST.SE_7_UP__FLAT, TEST_PASSED);
    } else {
        return the_tests.set(SE_CONST.SE_7_UP__FLAT, TEST_FAILED);
    }
}

function SE_8_DOWN__FLAT(the_tests) {
    var prev_tile = SE_CONST.SE_START_FINISHES[6][0];
    var new_tile = SE_CONST.SE_START_FINISHES[6][1];
    var move_allowed = checkPrevNextTiles(prev_tile, new_tile);
    if (move_allowed == MOVE_GO) {
        return the_tests.set(SE_CONST.SE_8_DOWN__FLAT, TEST_PASSED);
    } else {
        return the_tests.set(SE_CONST.SE_8_DOWN__FLAT, TEST_FAILED);
    }
}

function SE_9_FLAT__DOWN(the_tests) {
    var prev_tile = SE_CONST.SE_START_FINISHES[7][0];
    var new_tile = SE_CONST.SE_START_FINISHES[7][1];
    var move_allowed = checkPrevNextTiles(prev_tile, new_tile);
    if (move_allowed == MOVE_GO) {
        return the_tests.set(SE_CONST.SE_9_FLAT__DOWN, TEST_PASSED);
    } else {
        return the_tests.set(SE_CONST.SE_9_FLAT__DOWN, TEST_FAILED);
    }
}

function SE_10_UP__UP(the_tests) {
    var prev_tile = SE_CONST.SE_START_FINISHES[8][0];
    var new_tile = SE_CONST.SE_START_FINISHES[8][1];
    var move_allowed = checkPrevNextTiles(prev_tile, new_tile);
    if (move_allowed == MOVE_GO) {
        return the_tests.set(SE_CONST.SE_10_UP__UP, TEST_PASSED);
    } else {
        return the_tests.set(SE_CONST.SE_10_UP__UP, TEST_FAILED);
    }
}

function SE_11_DOWN__DOWN(the_tests) {
    var prev_tile = SE_CONST.SE_START_FINISHES[9][0];
    var new_tile = SE_CONST.SE_START_FINISHES[9][1];
    var move_allowed = checkPrevNextTiles(prev_tile, new_tile);
    if (move_allowed == MOVE_GO) {
        return the_tests.set(SE_CONST.SE_11_DOWN__DOWN, TEST_PASSED);
    } else {
        return the_tests.set(SE_CONST.SE_11_DOWN__DOWN, TEST_FAILED);
    }
}

function SE_12_UP__DOWN(the_tests) {
    var prev_tile = SE_CONST.SE_START_FINISHES[10][0];
    var new_tile = SE_CONST.SE_START_FINISHES[10][1];
    var move_allowed = checkPrevNextTiles(prev_tile, new_tile);
    if (move_allowed == MOVE_GO) {
        return the_tests.set(SE_CONST.SE_12_UP__DOWN, TEST_PASSED);
    } else {
        return the_tests.set(SE_CONST.SE_12_UP__DOWN, TEST_FAILED);
    }
}

function SE_13_DOWN__UP(the_tests) {
    var prev_tile = SE_CONST.SE_START_FINISHES[11][0];
    var new_tile = SE_CONST.SE_START_FINISHES[11][1];
    var move_allowed = checkPrevNextTiles(prev_tile, new_tile);
    if (move_allowed == MOVE_GO) {
        return the_tests.set(SE_CONST.SE_13_DOWN__UP, TEST_PASSED);
    } else {
        return the_tests.set(SE_CONST.SE_13_DOWN__UP, TEST_FAILED);
    }
}

function test_se_move(the_tests) {
    the_tests = SE_1_UP_UP_CLOCK(the_tests);
    the_tests = SE_3_DOWN_DOWN_CLOCK(the_tests);
    the_tests = SE_5_FLAT__FLAT(the_tests);
    the_tests = SE_6_FLAT__UP(the_tests);
    the_tests = SE_7_UP__FLAT(the_tests);
    the_tests = SE_8_DOWN__FLAT(the_tests);
    the_tests = SE_9_FLAT__DOWN(the_tests);
    the_tests = SE_10_UP__UP(the_tests);
    the_tests = SE_11_DOWN__DOWN(the_tests);
    the_tests = SE_12_UP__DOWN(the_tests);
    the_tests = SE_13_DOWN__UP(the_tests);
    return the_tests;
}

export { se_load_test, test_se_move };
