import {
    IS_TRANSPARENT,
    INCLINE___0,
    INCLINE_0_5,
    INCLINE___1,
    INCLINE_1_5,
    INCLINE___2,
    INCLINE_2_5,
    INCLINE___3,
    HEIGHT_Y____0,
    HEIGHT_Y__0_5,
    HEIGHT_Y____1,
    HEIGHT_Y__1_5,
    HEIGHT_Y____2,
    HEIGHT_Y__2_5,
    HEIGHT_Y____3,
    HEIGHT_Y__3_5,
    HEIGHT_Y____4,
    HEIGHT_Y__4_5,
    HEIGHT_Y____5,
    HEIGHT_Y__5_5,
    HEIGHT_Y____6,
    HEIGHT_Y__6_5,
    HEIGHT_Y____7,
    HEIGHT_Y__7_5,
    HEIGHT_Y____8,
    HEIGHT_Y__8_5,
    HEIGHT_Y____9,
    HEIGHT_Y__9_5,
    HEIGHT_Y___10,
    HEIGHT_Y_10_5,
    HEIGHT_Y___11
} from "../values/the-constants.js";

import { TILT_NN, TILT_SS, TILT_NW, TILT_NE, TILT_SE, TILT_SW, TILT_NONE } from "../values/the-constants.js";

import {
    BOUNCE_COUNT___25,
    BOUNCE_SPEED___1,
    BOUNCE_SPEED_1_5,
    BOUNCE_SPEED___2,
    BOUNCE_SPEED_2_5,
    BOUNCE_SPEED___3,
    BOUNCE_SPEED_3_5,
    BOUNCE_SPEED___4
} from "../vertical-movement/trampoline-const.js";

const TRIE_WALKWAY = [
    ["1", HEIGHT_Y___11, "-1"],
    ["1", HEIGHT_Y___11, "0"],
    ["2", HEIGHT_Y___11, "0"],
    ["3", HEIGHT_Y___11, "0"],
    ["0", HEIGHT_Y___11, "0"],
    ["001", HEIGHT_Y___11, "-2"],
    ["001", HEIGHT_Y___11, "-3"],
    ["001", HEIGHT_Y___11, "-4"],

    //    ["000", HEIGHT_Y___11, "-1"],
    ["000", HEIGHT_Y____9, "-1"],

    ["-01", HEIGHT_Y___11, "2"],
    ["-01", HEIGHT_Y___11, "1"],
    ["-01", HEIGHT_Y___11, "0"],
    ["-02", HEIGHT_Y___11, "0"],
    ["-03", HEIGHT_Y___11, "0"]
];

//const fence_1 = { hex_a: ["0", HEIGHT_Y___11, "0"], hex_b: ["0", HEIGHT_Y___11, "-1"], fence_height: HEIGHT_Y____5 }; //     NN
const fence_1 = { hex_a: ["0", HEIGHT_Y___11, "-1"], hex_b: ["0", HEIGHT_Y___11, "0"], fence_height: HEIGHT_Y____5 }; //   SS       NORTH OF 0,0

//const fence_2 = { hex_a: ["0", HEIGHT_Y___11, "0"], hex_b: ["0", HEIGHT_Y___11, "1"], fence_height: HEIGHT_Y____5 }; // SS
const fence_2 = { hex_a: ["0", HEIGHT_Y___11, "1"], hex_b: ["0", HEIGHT_Y___11, "0"], fence_height: HEIGHT_Y____5 }; //  NN             SOUTH of 0,0

//const fence_4 = { hex_a: ["0", HEIGHT_Y___11, "0"], hex_b: ["1", HEIGHT_Y___11, "-1"], fence_height: HEIGHT_Y____5 }; // NE
const fence_4 = { hex_a: ["1", HEIGHT_Y___11, "-1"], hex_b: ["0", HEIGHT_Y___11, "0"], fence_height: HEIGHT_Y____5 }; //  SW       NORTH EAST OF 0,0

//const fence_6 = { hex_a: ["0", HEIGHT_Y___11, "0"], hex_b: ["-1", HEIGHT_Y___11, "1"], fence_height: HEIGHT_Y____5 }; //  SW
const fence_6 = { hex_a: ["-1", HEIGHT_Y___11, "1"], hex_b: ["0", HEIGHT_Y___11, "0"], fence_height: HEIGHT_Y____5 }; //   NE     south west of 0,0

//const TRIE_FENCES = [fence_1, fence_2, fence_3, fence_4, fence_5, fence_6];  // 3 5

////////////////////
const fence_3 = { hex_a: ["0", HEIGHT_Y___11, "0"], hex_b: ["-1", HEIGHT_Y___11, "0"], fence_height: HEIGHT_Y____5 }; // SE   ????????????  fence_3
//const fence_3 = { hex_a: ["-1", HEIGHT_Y___11, "0"], hex_b: ["0", HEIGHT_Y___11, "0"], fence_height: HEIGHT_Y____5 }; //  NW         NORTH WEST of 0,0

const fence_5 = { hex_a: ["0", HEIGHT_Y___11, "0"], hex_b: ["1", HEIGHT_Y___11, "0"], fence_height: HEIGHT_Y____5 }; //  NW        SOUTH EAST OF 0,0
//const fence_5 = { hex_a: ["1", HEIGHT_Y___11, "0"], hex_b: ["0", HEIGHT_Y___11, "0"], fence_height: HEIGHT_Y____5 }; // SE  ???????????

const TRIE_FENCES = [fence_3];

//const TRIE_TRAMPOLINES = [["0", HEIGHT_Y____9, "1", BOUNCE_SPEED___4, BOUNCE_COUNT___25, TILT_SW, INCLINE___1]];
const TRIE_TRAMPOLINES = [
    //   ["000", HEIGHT_Y___10, "-1", BOUNCE_SPEED___4, BOUNCE_COUNT___25, TILT_NONE, INCLINE___0],

    ["0", HEIGHT_Y___11, "1", BOUNCE_SPEED___4, BOUNCE_COUNT___25, TILT_NONE, INCLINE___0]
];

const TRIE_FIGURE = {
    walkway_locs: TRIE_WALKWAY,
    fence_locs: TRIE_FENCES,
    trampoline_locs: TRIE_TRAMPOLINES,
    pentagon_locs: []
};

export { TRIE_FIGURE };
