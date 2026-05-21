import { ee, tt, EE, TT } from "../../console-short.js";

import { checkPrevNextTiles } from "../cam-adjust/test-funcs.js";
import { TEST_PASSED, TEST_FAILED, MOVE_GO } from "../../constants.js";
import { tileCenterCoord } from "../hex-tile.js";

import * as NE_CONST from "./ne-constants.js";

function ne_load_test(test_number) {
    const test_start_finish = NE_CONST.NE_START_FINISHES[test_number];

    const [start_index, finish_index, test_name] = test_start_finish;

    const [start_index_x, start_index_y, start_index_z] = start_index;
    let [start_x_cam, start_z_cam] = tileCenterCoord(start_index_x, start_index_z);
    const se_xyz_camera = [start_x_cam, start_index_y, start_z_cam];

    const [finish_index_x, _finish_index_y, finish_index_z] = finish_index;
    let [finish_x_cam, finish_z_cam] = tileCenterCoord(finish_index_x, finish_index_z);
    const se_lookat = [finish_x_cam, 0, finish_z_cam];

    return [test_start_finish, se_xyz_camera, se_lookat, test_name];
}

function NE_1_UP_UP_CLOCK(the_tests) {
    var prev_tile = NE_CONST.NE_START_FINISHES[1][0];
    var new_tile = NE_CONST.NE_START_FINISHES[1][1];
    var move_allowed = checkPrevNextTiles(prev_tile, new_tile);
    if (move_allowed == MOVE_GO) {
        return the_tests.set(NE_CONST.NE_1_UP_UP_CLOCK, TEST_PASSED);
    } else {
        return the_tests.set(NE_CONST.NE_1_UP_UP_CLOCK, TEST_FAILED);
    }
}

function NE_3_DOWN_DOWN_CLOCK(the_tests) {
    var prev_tile = NE_CONST.NE_START_FINISHES[2][0];
    var new_tile = NE_CONST.NE_START_FINISHES[2][1];
    var move_allowed = checkPrevNextTiles(prev_tile, new_tile);
    if (move_allowed == MOVE_GO) {
        return the_tests.set(NE_CONST.NE_3_DOWN_DOWN_CLOCK, TEST_PASSED);
    } else {
        return the_tests.set(NE_CONST.NE_3_DOWN_DOWN_CLOCK, TEST_FAILED);
    }
}

function NE_5_FLAT__FLAT(the_tests) {
    var prev_tile = NE_CONST.NE_START_FINISHES[3][0];
    var new_tile = NE_CONST.NE_START_FINISHES[3][1];
    var move_allowed = checkPrevNextTiles(prev_tile, new_tile);

    if (move_allowed == MOVE_GO) {
        return the_tests.set(NE_CONST.NE_5_FLAT__FLAT, TEST_PASSED);
    } else {
        return the_tests.set(NE_CONST.NE_5_FLAT__FLAT, TEST_FAILED);
    }
}

function NE_6_FLAT__UP(the_tests) {
    var prev_tile = NE_CONST.NE_START_FINISHES[4][0];
    var new_tile = NE_CONST.NE_START_FINISHES[4][1];
    var move_allowed = checkPrevNextTiles(prev_tile, new_tile);
    if (move_allowed == MOVE_GO) {
        return the_tests.set(NE_CONST.NE_6_FLAT__UP, TEST_PASSED);
    } else {
        return the_tests.set(NE_CONST.NE_6_FLAT__UP, TEST_FAILED);
    }
}

function NE_7_UP__FLAT(the_tests) {
    var prev_tile = NE_CONST.NE_START_FINISHES[5][0];
    var new_tile = NE_CONST.NE_START_FINISHES[5][1];
    var move_allowed = checkPrevNextTiles(prev_tile, new_tile);
    if (move_allowed == MOVE_GO) {
        return the_tests.set(NE_CONST.NE_7_UP__FLAT, TEST_PASSED);
    } else {
        return the_tests.set(NE_CONST.NE_7_UP__FLAT, TEST_FAILED);
    }
}

function NE_8_DOWN__FLAT(the_tests) {
    var prev_tile = NE_CONST.NE_START_FINISHES[6][0];
    var new_tile = NE_CONST.NE_START_FINISHES[6][1];
    var move_allowed = checkPrevNextTiles(prev_tile, new_tile);
    if (move_allowed == MOVE_GO) {
        return the_tests.set(NE_CONST.NE_8_DOWN__FLAT, TEST_PASSED);
    } else {
        return the_tests.set(NE_CONST.NE_8_DOWN__FLAT, TEST_FAILED);
    }
}

function NE_9_FLAT__DOWN(the_tests) {
    var prev_tile = NE_CONST.NE_START_FINISHES[7][0];
    var new_tile = NE_CONST.NE_START_FINISHES[7][1];
    var move_allowed = checkPrevNextTiles(prev_tile, new_tile);
    if (move_allowed == MOVE_GO) {
        return the_tests.set(NE_CONST.NE_9_FLAT__DOWN, TEST_PASSED);
    } else {
        return the_tests.set(NE_CONST.NE_9_FLAT__DOWN, TEST_FAILED);
    }
}

function NE_10_UP__UP(the_tests) {
    var prev_tile = NE_CONST.NE_START_FINISHES[8][0];
    var new_tile = NE_CONST.NE_START_FINISHES[8][1];
    var move_allowed = checkPrevNextTiles(prev_tile, new_tile);
    if (move_allowed == MOVE_GO) {
        return the_tests.set(NE_CONST.NE_10_UP__UP, TEST_PASSED);
    } else {
        return the_tests.set(NE_CONST.NE_10_UP__UP, TEST_FAILED);
    }
}

function NE_11_DOWN__DOWN(the_tests) {
    var prev_tile = NE_CONST.NE_START_FINISHES[9][0];
    var new_tile = NE_CONST.NE_START_FINISHES[9][1];
    var move_allowed = checkPrevNextTiles(prev_tile, new_tile);
    if (move_allowed == MOVE_GO) {
        return the_tests.set(NE_CONST.NE_11_DOWN__DOWN, TEST_PASSED);
    } else {
        return the_tests.set(NE_CONST.NE_11_DOWN__DOWN, TEST_FAILED);
    }
}

function NE_12_UP__DOWN(the_tests) {
    var prev_tile = NE_CONST.NE_START_FINISHES[10][0];
    var new_tile = NE_CONST.NE_START_FINISHES[10][1];
    var move_allowed = checkPrevNextTiles(prev_tile, new_tile);
    if (move_allowed == MOVE_GO) {
        return the_tests.set(NE_CONST.NE_12_UP__DOWN, TEST_PASSED);
    } else {
        return the_tests.set(NE_CONST.NE_12_UP__DOWN, TEST_FAILED);
    }
}

function NE_13_DOWN__UP(the_tests) {
    var prev_tile = NE_CONST.NE_START_FINISHES[11][0];
    var new_tile = NE_CONST.NE_START_FINISHES[11][1];
    var move_allowed = checkPrevNextTiles(prev_tile, new_tile);
    if (move_allowed == MOVE_GO) {
        return the_tests.set(NE_CONST.NE_13_DOWN__UP, TEST_PASSED);
    } else {
        return the_tests.set(NE_CONST.NE_13_DOWN__UP, TEST_FAILED);
    }
}

function test_ne_move(the_tests) {
    the_tests = NE_1_UP_UP_CLOCK(the_tests);
    the_tests = NE_3_DOWN_DOWN_CLOCK(the_tests);
    the_tests = NE_5_FLAT__FLAT(the_tests);
    the_tests = NE_6_FLAT__UP(the_tests);
    the_tests = NE_7_UP__FLAT(the_tests);
    the_tests = NE_8_DOWN__FLAT(the_tests);
    the_tests = NE_9_FLAT__DOWN(the_tests);
    the_tests = NE_10_UP__UP(the_tests);
    the_tests = NE_11_DOWN__DOWN(the_tests);
    the_tests = NE_12_UP__DOWN(the_tests);
    the_tests = NE_13_DOWN__UP(the_tests);
    return the_tests;
}

export { ne_load_test, test_ne_move };
