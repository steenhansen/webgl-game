import { COL_1, COL_2, TILT_NW, TILT_NN, TILT_SE, TILT_NE, TILT_SS, TILT_SW } from "../../values/the-constants.js";

const x_start = 0;
const z_start = 0;

const x_finish = 0;
const z_finish = 1;

const SS_WALK_AIR = "SS_WALK_AIR";
const SS_TRAMPOLINE_AIR = "SS_TRAMPOLINE_AIR";

const SS_0_SAME = "SS_0_SAME";
const SS_1_UP_UP_CLOCK = "SS_1_UP_UP_CLOCK";
const SS_2_UP_UP_COUNTER = "SS_2_UP_UP_COUNTER";
const SS_3_DOWN_DOWN_CLOCK = "SS_3_DOWN_DOWN_CLOCK";
const SS_4_DOWN_DOWN_COUNTER = "SS_4_DOWN_DOWN_COUNTER";

const SS_5_FLAT__FLAT = "SS_5_FLAT__FLAT";
const SS_6_FLAT__UP = "SS_6_FLAT__UP";
const SS_7_UP__FLAT = "SS_7_UP__FLAT";
const SS_8_DOWN__FLAT = "SS_8_DOWN__FLAT";
const SS_9_FLAT__DOWN = "SS_9_FLAT__DOWN";
const SS_10_UP__UP = "SS_10_UP__UP";
const SS_11_DOWN__DOWN = "SS_11_DOWN__DOWN";
const SS_12_UP__DOWN = "SS_12_UP__DOWN";
const SS_13_DOWN__UP = "SS_13_DOWN__UP";
const SS_14_BLOCKED = "SS_14_BLOCKED";

const SS_15_STROLL_INTO_AIR = "SS_15_STROLL_INTO_AIR";
const SS_16_DESCEND_ONE_STEP = "SS_16_DESCEND_ONE_STEP";

const SS_1_TEST = [[x_start, 1, z_start, COL_1, TILT_NW, 1], [x_finish, 1, z_finish, COL_2, TILT_SW, 1], SS_1_UP_UP_CLOCK];
const SS_222_TEST = [[x_start, 1, z_start, COL_1, TILT_NW, 1], [x_finish, 1, z_finish, COL_2, TILT_SW, 1], SS_2_UP_UP_COUNTER];

const SS_3_TEST = [[x_start, 1, z_start, COL_1, TILT_SW, 1], [x_finish, 1, z_finish, COL_2, TILT_NW, 1], SS_3_DOWN_DOWN_CLOCK];
const SS_444_TEST = [[x_start, 1, z_start, COL_1, TILT_SW, 1], [x_finish, 1, z_finish, COL_2, TILT_NW, 1], SS_4_DOWN_DOWN_COUNTER];

const SS_5_TEST = [[x_start, 1, z_start, COL_1], [x_finish, 1, z_finish, COL_2], SS_5_FLAT__FLAT];
const SS_6_TEST = [[x_start, 1, z_start, COL_1], [x_finish, 1, z_finish, COL_2, TILT_SS, 1], SS_6_FLAT__UP];
const SS_7_TEST = [[x_start, 1, z_start, COL_1, TILT_SS, 1], [x_finish, 2, z_finish, COL_2], SS_7_UP__FLAT];
const SS_8_TEST = [[x_start, 2, z_start, COL_1, TILT_NN, 1], [x_finish, 2, z_finish, COL_2], SS_8_DOWN__FLAT];
const SS_9_TEST = [[x_start, 2, z_start, COL_1], [x_finish, 1, z_finish, COL_2, TILT_NN, 1], SS_9_FLAT__DOWN];
const SS_10_TEST = [[x_start, 1, z_start, COL_1, TILT_SS, 1], [x_finish, 2, z_finish, COL_2, TILT_SS, 1], SS_10_UP__UP];
const SS_11_TEST = [[x_start, 2, z_start, COL_1, TILT_NN, 1], [x_finish, 1, z_finish, COL_2, TILT_NN, 1], SS_11_DOWN__DOWN];
const SS_12_TEST = [[x_start, 1, z_start, COL_1, TILT_SS, 1], [x_finish, 1, z_finish, COL_2, TILT_NN, 1], SS_12_UP__DOWN];
const SS_13_TEST = [[x_start, 1, z_start, COL_1, TILT_NN, 1], [x_finish, 1, z_finish, COL_2, TILT_SS, 1], SS_13_DOWN__UP];

const SS_START_FINISHES = {
    1: SS_1_TEST,
    2: SS_222_TEST,
    3: SS_3_TEST,
    4: SS_444_TEST,
    5: SS_5_TEST,
    6: SS_6_TEST,
    7: SS_7_TEST,
    8: SS_8_TEST,
    9: SS_9_TEST,
    10: SS_10_TEST,
    11: SS_11_TEST,
    12: SS_12_TEST,
    13: SS_13_TEST
};

export {
    SS_WALK_AIR,
    SS_TRAMPOLINE_AIR,
    SS_START_FINISHES,
    SS_0_SAME,
    SS_1_UP_UP_CLOCK,
    SS_2_UP_UP_COUNTER,
    SS_3_DOWN_DOWN_CLOCK,
    SS_4_DOWN_DOWN_COUNTER,
    SS_5_FLAT__FLAT,
    SS_6_FLAT__UP,
    SS_7_UP__FLAT,
    SS_8_DOWN__FLAT,
    SS_9_FLAT__DOWN,
    SS_10_UP__UP,
    SS_11_DOWN__DOWN,
    SS_12_UP__DOWN,
    SS_13_DOWN__UP,
    SS_14_BLOCKED,
    SS_15_STROLL_INTO_AIR,
    SS_16_DESCEND_ONE_STEP
};
