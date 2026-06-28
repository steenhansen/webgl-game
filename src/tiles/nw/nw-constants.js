import { COL_1, COL_2, TILT_SE, TILT_SW, TILT_NW, TILT_SS } from "../../values/the-constants.js";

const x_start = 0;
const z_start = 0;

const x_finish = -1;
const z_finish = 0;

const NW_WALK_AIR = "NW_WALK_AIR";
const NW_TRAMPOLINE_AIR = "NW_TRAMPOLINE_AIR";

const NW_0_SAME = "NW_0_SAME";
const NW_1_UP_UP_CLOCK = "NW_1_UP_UP_CLOCK";
const NW_2_UP_UP_COUNTER = "NW_2_UP_UP_COUNTER";
const NW_3_DOWN_DOWN_CLOCK = "NW_3_DOWN_DOWN_CLOCK";
const NW_4_DOWN_DOWN_COUNTER = "NW_4_DOWN_DOWN_COUNTER";

const NW_5_FLAT__FLAT = "NW_5_FLAT__FLAT";
const NW_6_FLAT__UP = "NW_6_FLAT__UP";
const NW_7_UP__FLAT = "NW_7_UP__FLAT";
const NW_8_DOWN__FLAT = "NW_8_DOWN__FLAT";
const NW_9_FLAT__DOWN = "NW_9_FLAT__DOWN";
const NW_10_UP__UP = "NW_10_UP__UP";
const NW_11_DOWN__DOWN = "NW_11_DOWN__DOWN";
const NW_12_UP__DOWN = "NW_12_UP__DOWN";
const NW_13_DOWN__UP = "NW_13_DOWN__UP";
const NW_14_BLOCKED = "NW_14_BLOCKED";

const NW_15_TRAMPOLINE = "NW_15_TRAMPOLINE";
const NW_16_STROLL_INTO_AIR = "NW_16_STROLL_INTO_AIR";
const NW_17_DESCEND_ONE_STEP = "NW_17_DESCEND_ONE_STEP";

const NW_1_TEST = [[x_start, 1, z_start, COL_1, TILT_SS, 1], [x_finish, 1, z_finish, COL_2, TILT_SW, 1], NW_1_UP_UP_CLOCK];
const NW_222_TEST = [[x_start, 1, z_start, COL_1, TILT_SS, 1], [x_finish, 1, z_finish, COL_2, TILT_SW, 1], NW_2_UP_UP_COUNTER];
const NW_3_TEST = [[x_start, 1, z_start, COL_1, TILT_SW, 1], [x_finish, 1, z_finish, COL_2, TILT_SS, 1], NW_3_DOWN_DOWN_CLOCK];
const NW_444_TEST = [[x_start, 1, z_start, COL_1, TILT_SW, 1], [x_finish, 1, z_finish, COL_2, TILT_SS, 1], NW_4_DOWN_DOWN_COUNTER];

const NW_5_TEST = [[x_start, 1, z_start, COL_1], [x_finish, 1, z_finish, COL_2], NW_5_FLAT__FLAT];
const NW_6_TEST = [[x_start, 1, z_start, COL_1], [x_finish, 1, z_finish, COL_2, TILT_NW, 1], NW_6_FLAT__UP];
const NW_7_TEST = [[x_start, 1, z_start, COL_1, TILT_NW, 1], [x_finish, 2, z_finish, COL_2], NW_7_UP__FLAT];
const NW_8_TEST = [[x_start, 2, z_start, COL_1, TILT_SE, 1], [x_finish, 2, z_finish, COL_2], NW_8_DOWN__FLAT];
const NW_9_TEST = [[x_start, 2, z_start, COL_1], [x_finish, 1, z_finish, COL_2, TILT_SE, 1], NW_9_FLAT__DOWN];
const NW_10_TEST = [[x_start, 1, z_start, COL_1, TILT_NW, 1], [x_finish, 2, z_finish, COL_2, TILT_NW, 1], NW_10_UP__UP];
const NW_11_TEST = [[x_start, 2, z_start, COL_1, TILT_SE, 1], [x_finish, 1, z_finish, COL_2, TILT_SE, 1], NW_11_DOWN__DOWN];
const NW_12_TEST = [[x_start, 1, z_start, COL_1, TILT_NW, 1], [x_finish, 1, z_finish, COL_2, TILT_SE, 1], NW_12_UP__DOWN];
const NW_13_TEST = [[x_start, 1, z_start, COL_1, TILT_SE, 1], [x_finish, 1, z_finish, COL_2, TILT_NW, 1], NW_13_DOWN__UP];

const NW_START_FINISHES = {
    1: NW_1_TEST,
    2: NW_222_TEST,
    3: NW_3_TEST,
    4: NW_444_TEST,
    5: NW_5_TEST,
    6: NW_6_TEST,
    7: NW_7_TEST,
    8: NW_8_TEST,
    9: NW_9_TEST,
    10: NW_10_TEST,
    11: NW_11_TEST,
    12: NW_12_TEST,
    13: NW_13_TEST
};

export {
    NW_WALK_AIR,
    NW_TRAMPOLINE_AIR,
    NW_START_FINISHES,
    NW_0_SAME,
    NW_1_UP_UP_CLOCK,
    NW_2_UP_UP_COUNTER,
    NW_3_DOWN_DOWN_CLOCK,
    NW_4_DOWN_DOWN_COUNTER,
    NW_5_FLAT__FLAT,
    NW_6_FLAT__UP,
    NW_7_UP__FLAT,
    NW_8_DOWN__FLAT,
    NW_9_FLAT__DOWN,
    NW_10_UP__UP,
    NW_11_DOWN__DOWN,
    NW_12_UP__DOWN,
    NW_13_DOWN__UP,
    NW_14_BLOCKED,
    NW_15_TRAMPOLINE,
    NW_16_STROLL_INTO_AIR,
    NW_17_DESCEND_ONE_STEP
};
