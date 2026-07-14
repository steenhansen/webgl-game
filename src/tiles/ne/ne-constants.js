import { COL_1, COL_2, TILT_SE, TILT_SW, TILT_NW, TILT_SS, TILT_NN, TILT_NE } from "../../values/the-constants.js";

const x_start = 0;
const z_start = 0;

const x_finish = 1;
const z_finish = -1;

const NE_WALK_AIR = "NE_WALK_AIR";
const NE_TRAMPOLINE_AIR = "NE_TRAMPOLINE_AIR";

const NE_0_SAME = "NE_0_SAME";
const NE_1_UP_UP_CLOCK = "NE_1_UP_UP_CLOCK";
const NE_2_UP_UP_COUNTER = "NE_2_UP_UP_COUNTER";
const NE_3_DOWN_DOWN_CLOCK = "NE_3_DOWN_DOWN_CLOCK";
const NE_4_DOWN_DOWN_COUNTER = "NE_4_DOWN_DOWN_COUNTER";
const NE_5_FLAT__FLAT = "NE_5_FLAT__FLAT";
const NE_6_FLAT__UP = "NE_6_FLAT__UP";
const NE_7_UP__FLAT = "NE_7_UP__FLAT";
const NE_8_DOWN__FLAT = "NE_8_DOWN__FLAT";
const NE_9_FLAT__DOWN = "NE_9_FLAT__DOWN";
const NE_10_UP__UP = "NE_10_UP__UP";
const NE_11_DOWN__DOWN = "NE_11_DOWN__DOWN";
const NE_12_UP__DOWN = "NE_12_UP__DOWN";
const NE_13_DOWN__UP = "NE_13_DOWN__UP";
const NE_14_BLOCKED = "NE_14_BLOCKED";

const NE_15_STROLL_INTO_AIR = "NE_15_STROLL_INTO_AIR";
const NE_16_DESCEND_ONE_STEP = "NE_16_DESCEND_ONE_STEP";

const NE_1_TEST = [[x_start, 1, z_start, COL_1, TILT_NW, 1], [x_finish, 1, z_finish, COL_2, TILT_NN, 1], NE_1_UP_UP_CLOCK];

const NE_222_TEST = [[x_start, 1, z_start, COL_1, TILT_NW, 1], [x_finish, 1, z_finish, COL_2, TILT_NN, 1], NE_2_UP_UP_COUNTER];

const NE_3_TEST = [[x_start, 1, z_start, COL_1, TILT_SE, 1], [x_finish, 1, z_finish, COL_2, TILT_SS, 1], NE_3_DOWN_DOWN_CLOCK];
const NE_4444_TEST = [[x_start, 1, z_start, COL_1, TILT_SE, 1], [x_finish, 1, z_finish, COL_2, TILT_SS, 1], NE_4_DOWN_DOWN_COUNTER];

const NE_5_TEST = [[x_start, 1, z_start, COL_1], [x_finish, 1, z_finish, COL_2], NE_5_FLAT__FLAT];
const NE_6_TEST = [[x_start, 1, z_start, COL_1], [x_finish, 1, z_finish, COL_2, TILT_NE, 1], NE_6_FLAT__UP];
const NE_7_TEST = [[x_start, 1, z_start, COL_1, TILT_NE, 1], [x_finish, 2, z_finish, COL_2], NE_7_UP__FLAT];
const NE_8_TEST = [[x_start, 2, z_start, COL_1, TILT_SW, 1], [x_finish, 2, z_finish, COL_2], NE_8_DOWN__FLAT];
const NE_9_TEST = [[x_start, 2, z_start, COL_1], [x_finish, 1, z_finish, COL_2, TILT_SW, 1], NE_9_FLAT__DOWN];
const NE_10_TEST = [[x_start, 1, z_start, COL_1, TILT_NE, 1], [x_finish, 2, z_finish, COL_2, TILT_NE, 1], NE_10_UP__UP];
const NE_11_TEST = [[x_start, 2, z_start, COL_1, TILT_SW, 1], [x_finish, 1, z_finish, COL_2, TILT_SW, 1], NE_11_DOWN__DOWN];
const NE_12_TEST = [[x_start, 1, z_start, COL_1, TILT_NE, 1], [x_finish, 1, z_finish, COL_2, TILT_SW, 1], NE_12_UP__DOWN];
const NE_13_TEST = [[x_start, 1, z_start, COL_1, TILT_SW, 1], [x_finish, 1, z_finish, COL_2, TILT_NE, 1], NE_13_DOWN__UP];

const NE_START_FINISHES = {
    1: NE_1_TEST,
    2: NE_222_TEST,
    3: NE_3_TEST,
    4: NE_4444_TEST,
    5: NE_5_TEST,
    6: NE_6_TEST,
    7: NE_7_TEST,
    8: NE_8_TEST,
    9: NE_9_TEST,
    10: NE_10_TEST,
    11: NE_11_TEST,
    12: NE_12_TEST,
    13: NE_13_TEST
};

export {
    NE_WALK_AIR,
    NE_TRAMPOLINE_AIR,
    NE_START_FINISHES,
    NE_0_SAME,
    NE_1_UP_UP_CLOCK,
    NE_2_UP_UP_COUNTER,
    NE_3_DOWN_DOWN_CLOCK,
    NE_4_DOWN_DOWN_COUNTER,
    NE_5_FLAT__FLAT,
    NE_6_FLAT__UP,
    NE_7_UP__FLAT,
    NE_8_DOWN__FLAT,
    NE_9_FLAT__DOWN,
    NE_10_UP__UP,
    NE_11_DOWN__DOWN,
    NE_12_UP__DOWN,
    NE_13_DOWN__UP,
    NE_14_BLOCKED,
    NE_15_STROLL_INTO_AIR,
    NE_16_DESCEND_ONE_STEP
};
