import { COL_1, COL_2, TILT_NW, TILT_NN, TILT_SE, TILT_NE } from "../../values/the-constants.js";

const x_start = 0;
const z_start = 0;

const x_finish = 1;
const z_finish = 0;

const SE_WALK_AIR = "SE_WALK_AIR";
const SE_TRAMPOLINE_AIR = "SE_TRAMPOLINE_AIR";

const SE_0_SAME = "SE_0_SAME";
const SE_1_UP_UP_CLOCK = "SE_1_UP_UP_CLOCK";
const SE_2_UP_UP_COUNTER = "SE_2_UP_UP_COUNTER";
const SE_3_DOWN_DOWN_CLOCK = "SE_3_DOWN_DOWN_CLOCK";
const SE_4_DOWN_DOWN_COUNTER = "SE_4_DOWN_DOWN_COUNTER";

const SE_5_FLAT__FLAT = "SE_5_FLAT__FLAT";
const SE_6_FLAT__UP = "SE_6_FLAT__UP";
const SE_7_UP__FLAT = "SE_7_UP__FLAT";
const SE_8_DOWN__FLAT = "SE_8_DOWN__FLAT";
const SE_9_FLAT__DOWN = "SE_9_FLAT__DOWN";
const SE_10_UP__UP = "SE_10_UP__UP";
const SE_11_DOWN__DOWN = "SE_11_DOWN__DOWN";
const SE_12_UP__DOWN = "SE_12_UP__DOWN";
const SE_13_DOWN__UP = "SE_13_DOWN__UP";
const SE_14_BLOCKED = "SE_14_BLOCKED";
const SE_15_TRAMPOLINE = "SE_15_TRAMPOLINE";
const SE_16_STROLL_INTO_AIR = "SE_16_STROLL_INTO_AIR";
const SE_17_DESCEND_ONE_STEP = "SE_17_DESCEND_ONE_STEP";
const SE_1_TEST = [[x_start, 1, z_start, COL_1, TILT_NN, 1], [x_finish, 1, z_finish, COL_2, TILT_NE, 1], SE_1_UP_UP_CLOCK];

const SE_2222_TEST = [[x_start, 1, z_start, COL_1, TILT_NN, 1], [x_finish, 1, z_finish, COL_2, TILT_NE, 1], SE_2_UP_UP_COUNTER];

const SE_3_TEST = [[x_start, 1, z_start, COL_1, TILT_NE, 1], [x_finish, 1, z_finish, COL_2, TILT_NN, 1], SE_3_DOWN_DOWN_CLOCK];

const SE_44444_TEST = [[x_start, 1, z_start, COL_1, TILT_NE, 1], [x_finish, 1, z_finish, COL_2, TILT_NN, 1], SE_4_DOWN_DOWN_COUNTER];

const SE_5_TEST = [[x_start, 1, z_start, COL_1], [x_finish, 1, z_finish, COL_2], SE_5_FLAT__FLAT];
const SE_6_TEST = [[x_start, 1, z_start, COL_1], [x_finish, 1, z_finish, COL_2, TILT_SE, 1], SE_6_FLAT__UP];
const SE_7_TEST = [[x_start, 1, z_start, COL_1, TILT_SE, 1], [x_finish, 2, z_finish, COL_2], SE_7_UP__FLAT];
const SE_8_TEST = [[x_start, 2, z_start, COL_1, TILT_NW, 1], [x_finish, 2, z_finish, COL_2], SE_8_DOWN__FLAT];
const SE_9_TEST = [[x_start, 2, z_start, COL_1], [x_finish, 1, z_finish, COL_2, TILT_NW, 1], SE_9_FLAT__DOWN];
const SE_10_TEST = [[x_start, 1, z_start, COL_1, TILT_SE, 1], [x_finish, 2, z_finish, COL_2, TILT_SE, 1], SE_10_UP__UP];
const SE_11_TEST = [[x_start, 2, z_start, COL_1, TILT_NW, 1], [x_finish, 1, z_finish, COL_2, TILT_NW, 1], SE_11_DOWN__DOWN];
const SE_12_TEST = [[x_start, 1, z_start, COL_1, TILT_SE, 1], [x_finish, 1, z_finish, COL_2, TILT_NW, 1], SE_12_UP__DOWN];
const SE_13_TEST = [[x_start, 1, z_start, COL_1, TILT_NW, 1], [x_finish, 1, z_finish, COL_2, TILT_SE, 1], SE_13_DOWN__UP];

const SE_START_FINISHES = {
    1: SE_1_TEST,
    2: SE_2222_TEST,
    3: SE_3_TEST,
    4: SE_44444_TEST,
    5: SE_5_TEST,
    6: SE_6_TEST,
    7: SE_7_TEST,
    8: SE_8_TEST,
    9: SE_9_TEST,
    10: SE_10_TEST,
    11: SE_11_TEST,
    12: SE_12_TEST,
    13: SE_13_TEST
};

export {
    SE_WALK_AIR,
    SE_TRAMPOLINE_AIR,
    SE_START_FINISHES,
    SE_0_SAME,
    SE_1_UP_UP_CLOCK,
    SE_2_UP_UP_COUNTER,
    SE_3_DOWN_DOWN_CLOCK,
    SE_4_DOWN_DOWN_COUNTER,
    SE_5_FLAT__FLAT,
    SE_6_FLAT__UP,
    SE_7_UP__FLAT,
    SE_8_DOWN__FLAT,
    SE_9_FLAT__DOWN,
    SE_10_UP__UP,
    SE_11_DOWN__DOWN,
    SE_12_UP__DOWN,
    SE_13_DOWN__UP,
    SE_14_BLOCKED,
    SE_15_TRAMPOLINE,
    SE_16_STROLL_INTO_AIR,
    SE_17_DESCEND_ONE_STEP
};
