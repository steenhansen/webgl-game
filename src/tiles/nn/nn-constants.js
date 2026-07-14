import { COL_1, COL_2, TILT_SE, TILT_SW, TILT_NW, TILT_SS, TILT_NN, TILT_NE } from "../../values/the-constants.js";

const x_start = 0;
const z_start = 0;

const x_finish = 0;
const z_finish = -1;

const NN_WALK_AIR = "NN_WALK_AIR";
const NN_TRAMPOLINE_AIR = "NN_TRAMPOLINE_AIR";

const NN_0_SAME = "NN_0_SAME";
const NN_1_UP_UP_CLOCK = "NN_1_UP_UP_CLOCK";
const NN_2_UP_UP_COUNTER = "NN_2_UP_UP_COUNTER";
const NN_3_DOWN_DOWN_CLOCK = "NN_3_DOWN_DOWN_CLOCK";
const NN_4_DOWN_DOWN_COUNTER = "NN_4_DOWN_DOWN_COUNTER";
const NN_5_FLAT__FLAT = "NN_5_FLAT__FLAT";
const NN_6_FLAT__UP = "NN_6_FLAT__UP";
const NN_7_UP__FLAT = "NN_7_UP__FLAT";
const NN_8_DOWN__FLAT = "NN_8_DOWN__FLAT";
const NN_9_FLAT__DOWN = "NN_9_FLAT__DOWN";
const NN_10_UP__UP = "NN_10_UP__UP";
const NN_11_DOWN__DOWN = "NN_11_DOWN__DOWN";
const NN_12_UP__DOWN = "NN_12_UP__DOWN";
const NN_13_DOWN__UP = "NN_13_DOWN__UP";
const NN_14_BLOCKED = "NN_14_BLOCKED";

const NN_15_STROLL_INTO_AIR = "NN_15_STROLL_INTO_AIR";
const NN_16_DESCEND_ONE_STEP = "NN_16_DESCEND_ONE_STEP";

const NN_1_TEST = [[x_start, 1, z_start, COL_1, TILT_SE, 1], [x_finish, 1, z_finish, COL_2, TILT_NE, 1], NN_1_UP_UP_CLOCK];
const NN_2_2_2_TEST = [[x_start, 1, z_start, COL_1, TILT_SE, 1], [x_finish, 1, z_finish, COL_2, TILT_NE, 1], NN_2_UP_UP_COUNTER];

const NN_3_TEST = [[x_start, 1, z_start, COL_1, TILT_NE, 1], [x_finish, 1, z_finish, COL_2, TILT_SE, 1], NN_3_DOWN_DOWN_CLOCK];
const NN_4_4_4_TEST = [[x_start, 1, z_start, COL_1, TILT_NE, 1], [x_finish, 1, z_finish, COL_2, TILT_SE, 1], NN_4_DOWN_DOWN_COUNTER];

const NN_5_TEST = [[x_start, 1, z_start, COL_1], [x_finish, 1, z_finish, COL_2], NN_5_FLAT__FLAT];
const NN_6_TEST = [[x_start, 1, z_start, COL_1], [x_finish, 1, z_finish, COL_2, TILT_NN, 1], NN_6_FLAT__UP];
const NN_7_TEST = [[x_start, 1, z_start, COL_1, TILT_NN, 1], [x_finish, 2, z_finish, COL_2], NN_7_UP__FLAT];
const NN_8_TEST = [[x_start, 2, z_start, COL_1, TILT_SS, 1], [x_finish, 2, z_finish, COL_2], NN_8_DOWN__FLAT];
const NN_9_TEST = [[x_start, 2, z_start, COL_1], [x_finish, 1, z_finish, COL_2, TILT_SS, 1], NN_9_FLAT__DOWN];
const NN_10_TEST = [[x_start, 2, z_start, COL_1, TILT_SS, 1], [x_finish, 1, z_finish, COL_2, TILT_SS, 1], NN_10_UP__UP];
const NN_11_TEST = [[x_start, 2, z_start, COL_1, TILT_SS, 1], [x_finish, 1, z_finish, COL_2, TILT_SS, 1], NN_11_DOWN__DOWN];
const NN_12_TEST = [[x_start, 1, z_start, COL_1, TILT_NN, 1], [x_finish, 1, z_finish, COL_2, TILT_SS, 1], NN_12_UP__DOWN];
const NN_13_TEST = [[x_start, 1, z_start, COL_1, TILT_SS, 1], [x_finish, 1, z_finish, COL_2, TILT_NN, 1], NN_13_DOWN__UP];

const NN_START_FINISHES = {
    1: NN_1_TEST,
    2: NN_2_2_2_TEST,
    3: NN_3_TEST,
    4: NN_4_4_4_TEST,
    5: NN_5_TEST,
    6: NN_6_TEST,
    7: NN_7_TEST,
    8: NN_8_TEST,
    9: NN_9_TEST,
    10: NN_10_TEST,
    11: NN_11_TEST,
    12: NN_12_TEST,
    13: NN_13_TEST
};

export {
    NN_WALK_AIR,
    NN_TRAMPOLINE_AIR,
    NN_0_SAME,
    NN_1_UP_UP_CLOCK,
    NN_2_UP_UP_COUNTER,
    NN_3_DOWN_DOWN_CLOCK,
    NN_4_DOWN_DOWN_COUNTER,
    NN_5_FLAT__FLAT,
    NN_6_FLAT__UP,
    NN_7_UP__FLAT,
    NN_8_DOWN__FLAT,
    NN_9_FLAT__DOWN,
    NN_10_UP__UP,
    NN_11_DOWN__DOWN,
    NN_12_UP__DOWN,
    NN_13_DOWN__UP,
    NN_14_BLOCKED,
    NN_15_STROLL_INTO_AIR,
    NN_16_DESCEND_ONE_STEP
};
