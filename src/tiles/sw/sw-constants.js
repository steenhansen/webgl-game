import { COL_1, COL_2, TILT_NW, TILT_NN, TILT_SE, TILT_SW, TILT_SS, TILT_NE } from "../../values/the-constants.js";

const x_start = 0;
const z_start = 0;

const x_finish = -1;
const z_finish = 1;

const SW_WALK_AIR = "SW_WALK_AIR";
const SW_TRAMPOLINE_AIR = "SW_TRAMPOLINE_AIR";

const SW_0_SAME = "SW_0_SAME";
const SW_1_UP_UP_CLOCK = "SW_1_UP_UP_CLOCK";
const SW_2_UP_UP_COUNTER = "SW_2_UP_UP_COUNTER";
const SW_3_DOWN_DOWN_CLOCK = "SW_3_DOWN_DOWN_CLOCK";
const SW_4_DOWN_DOWN_COUNTER = "SW_4_DOWN_DOWN_COUNTER";

const SW_5_FLAT__FLAT = "SW_5_FLAT__FLAT";
const SW_6_FLAT__UP = "SW_6_FLAT__UP";
const SW_7_UP__FLAT = "SW_7_UP__FLAT";
const SW_8_DOWN__FLAT = "SW_8_DOWN__FLAT";
const SW_9_FLAT__DOWN = "SW_9_FLAT__DOWN";
const SW_10_UP__UP = "SW_10_UP__UP";
const SW_11_DOWN__DOWN = "SW_11_DOWN__DOWN";
const SW_12_UP__DOWN = "SW_12_UP__DOWN";
const SW_13_DOWN__UP = "SW_13_DOWN__UP";
const SW_14_BLOCKED = "SW_14_BLOCKED";
const SW_15_STROLL_INTO_AIR = "SW_15_STROLL_INTO_AIR";
const SW_16_DESCEND_ONE_STEP = "SW_16_DESCEND_ONE_STEP";
const SW_1_TEST = [[x_start, 1, z_start, COL_1, TILT_NN, 1], [x_finish, 1, z_finish, COL_2, TILT_NW, 1], SW_1_UP_UP_CLOCK];
const SW_222_TEST = [[x_start, 1, z_start, COL_1, TILT_NN, 1], [x_finish, 1, z_finish, COL_2, TILT_NW, 1], SW_2_UP_UP_COUNTER];

const SW_3_TEST = [[x_start, 1, z_start, COL_1, TILT_SS, 1], [x_finish, 1, z_finish, COL_2, TILT_SE, 1], SW_3_DOWN_DOWN_CLOCK];
const SW_444_TEST = [[x_start, 1, z_start, COL_1, TILT_SS, 1], [x_finish, 1, z_finish, COL_2, TILT_SE, 1], SW_4_DOWN_DOWN_COUNTER];

const SW_5_TEST = [[x_start, 1, z_start, COL_1], [x_finish, 1, z_finish, COL_2], SW_5_FLAT__FLAT];
const SW_6_TEST = [[x_start, 1, z_start, COL_1], [x_finish, 1, z_finish, COL_2, TILT_SW, 1], SW_6_FLAT__UP];
const SW_7_TEST = [[x_start, 1, z_start, COL_1, TILT_SW, 1], [x_finish, 2, z_finish, COL_2], SW_7_UP__FLAT];
const SW_8_TEST = [[x_start, 2, z_start, COL_1, TILT_NE, 1], [x_finish, 2, z_finish, COL_2], SW_8_DOWN__FLAT];
const SW_9_TEST = [[x_start, 2, z_start, COL_1], [x_finish, 1, z_finish, COL_2, TILT_NE, 1], SW_9_FLAT__DOWN];
const SW_10_TEST = [[x_start, 1, z_start, COL_1, TILT_SW, 1], [x_finish, 2, z_finish, COL_2, TILT_SW, 1], SW_10_UP__UP];
const SW_11_TEST = [[x_start, 2, z_start, COL_1, TILT_NE, 1], [x_finish, 1, z_finish, COL_2, TILT_NE, 1], SW_11_DOWN__DOWN];
const SW_12_TEST = [[x_start, 1, z_start, COL_1, TILT_SW, 1], [x_finish, 1, z_finish, COL_2, TILT_NE, 1], SW_12_UP__DOWN];
const SW_13_TEST = [[x_start, 1, z_start, COL_1, TILT_NE, 1], [x_finish, 1, z_finish, COL_2, TILT_SW, 1], SW_13_DOWN__UP];

const SW_START_FINISHES = {
    1: SW_1_TEST,
    2: SW_222_TEST,
    3: SW_3_TEST,
    4: SW_444_TEST,
    5: SW_5_TEST,
    6: SW_6_TEST,
    7: SW_7_TEST,
    8: SW_8_TEST,
    9: SW_9_TEST,
    10: SW_10_TEST,
    11: SW_11_TEST,
    12: SW_12_TEST,
    13: SW_13_TEST
};

export {
    SW_WALK_AIR,
    SW_TRAMPOLINE_AIR,
    SW_START_FINISHES,
    SW_0_SAME,
    SW_1_UP_UP_CLOCK,
    SW_2_UP_UP_COUNTER,
    SW_3_DOWN_DOWN_CLOCK,
    SW_4_DOWN_DOWN_COUNTER,
    SW_5_FLAT__FLAT,
    SW_6_FLAT__UP,
    SW_7_UP__FLAT,
    SW_8_DOWN__FLAT,
    SW_9_FLAT__DOWN,
    SW_10_UP__UP,
    SW_11_DOWN__DOWN,
    SW_12_UP__DOWN,
    SW_13_DOWN__UP,
    SW_14_BLOCKED,
    SW_15_STROLL_INTO_AIR,
    SW_16_DESCEND_ONE_STEP
};
