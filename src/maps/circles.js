import { ee, tt, EE, TT } from "../console-short.js";

import * as HEX_CONST from "../constants.js";

const x_start = 2;
const y_start = 1;
const z_start = 7;

const x_look = 3;
const y_look = 1;
const z_look = 3;

// const CIRCLE_WALKWAY_ANGLED = [
//     [x_start, y_start, z_start],
//     [x_look, y_look, z_look],
//     ["003", "0.2", "006", HEX_CONST.C_____BLUE, HEX_CONST.TILT_SE, 1.0],

//     ["004", "1.2", "006", HEX_CONST.C____GREEN, HEX_CONST.TILT_SE, 1.0],
//     ["003", "1.2", "007", HEX_CONST.C____GREEN, HEX_CONST.TILT_SS, 1.0],

//     ["002", "1.2", "007", HEX_CONST.C____GREEN, HEX_CONST.TILT_SW, 1.0],
//     ["002", y_start, "006", HEX_CONST.C____GREEN, HEX_CONST.TILT_NW, 1.0],
//     ["003", "1.2", "005", HEX_CONST.C____GREEN, HEX_CONST.TILT_NN, 1.0],
//     ["004", "1.2", "005", HEX_CONST.C____GREEN, HEX_CONST.TILT_NE, 1.0],
//     ["001", "2.2", "006", HEX_CONST.C______RED, HEX_CONST.TILT_NW, 1.0]
// ];

// we don't do hexPoints, but instead 2 triangles vertical with no incline angles can also do a band, not meet at bottom

const CIRCLE_WALKWAY_nn = [
    [x_start, y_start, z_start], // fix me
    [x_look, y_look, z_look],
    ["003", "1.0", "006"],

    ["004", "1.0", "006", HEX_CONST.C______RED],
    ["003", "1.0", "007", HEX_CONST.C___PURPLE],
    ["002", "1.0", "007", HEX_CONST.C____BROWN],
    ["002", "1.0", "006", HEX_CONST.C____GREEN],
    ["004", "1.0", "005", HEX_CONST.C___YELLOW],

    ["003", "2.0", "004", HEX_CONST.C_____BLUE],
    ["003", "1.0", "005", HEX_CONST.C_____BLUE, HEX_CONST.TILT_NN, 1]
];

const CIRCLE_WALKWAY_ne = [
    [x_start, y_start, z_start], // fix me
    [x_look, y_look, z_look],
    ["003", "1.0", "006"],

    ["004", "1.0", "006", HEX_CONST.C______RED],
    ["003", "1.0", "007", HEX_CONST.C___PURPLE],
    ["002", "1.0", "007", HEX_CONST.C____BROWN],
    ["002", "1.0", "006", HEX_CONST.C____GREEN],
    ["003", "2.0", "004", HEX_CONST.C_____BLUE],

    ["004", "1.0", "005", HEX_CONST.C___YELLOW],
    ["005", "1.0", "004", HEX_CONST.C___YELLOW, HEX_CONST.TILT_NE, 1],
    ["006", "2.0", "003", HEX_CONST.C___YELLOW]
];

const CIRCLE_WALKWAY_NW = [
    [x_start, y_start, z_start], // fix me
    [x_look, y_look, z_look],
    ["003", "1.0", "006"],

    ["004", "1.0", "006", HEX_CONST.C______RED],
    ["003", "1.0", "007", HEX_CONST.C___PURPLE],
    ["002", "1.0", "007", HEX_CONST.C____BROWN],
    ["002", "1.0", "006", HEX_CONST.C____GREEN],
    ["003", "2.0", "004", HEX_CONST.C_____BLUE],

    ["002", "1.0", "006", HEX_CONST.C___YELLOW],
    ["001", "1.0", "006", HEX_CONST.C___YELLOW, HEX_CONST.TILT_NW, 1],
    ["000", "2.0", "006", HEX_CONST.C___YELLOW]
];

const CIRCLE_WALKWAY__ss = [
    [x_start, y_start, z_start], // fix me
    [x_look, y_look, z_look],
    ["003", "1.0", "006"],

    ["004", "1.0", "006", HEX_CONST.C______RED],
    ["002", "1.0", "007", HEX_CONST.C____BROWN],
    ["002", "1.0", "006", HEX_CONST.C____GREEN],
    ["004", "1.0", "005", HEX_CONST.C___YELLOW],

    ["003", "1.0", "007", HEX_CONST.C___PURPLE],
    ["003", "1.0", "008", HEX_CONST.C___PURPLE, HEX_CONST.TILT_SS, 1],
    ["003", "2.0", "009", HEX_CONST.C___PURPLE]
];

const CIRCLE_WALKWAY_sw = [
    [x_start, y_start, z_start], // fix me
    [x_look, y_look, z_look],
    ["003", "1.0", "006"],

    ["004", "1.0", "006", HEX_CONST.C______RED],
    //   ["002", "1.0", "007", HEX_CONST.C____BROWN],
    ["002", "1.0", "006", HEX_CONST.C____GREEN],
    ["004", "1.0", "005", HEX_CONST.C___YELLOW],

    ["002", "1.0", "007", HEX_CONST.C____BROWN],
    ["001", "1.0", "008", HEX_CONST.C____BROWN, HEX_CONST.TILT_SW, 1],
    ["000", "2.0", "009", HEX_CONST.C____BROWN]
];

const CIRCLE_WALKWAYse = [
    [x_start, y_start, z_start], // fix me
    [x_look, y_look, z_look],
    ["003", "1.0", "006"],

    // ["004", "1.0", "006", HEX_CONST.C______RED],
    //   ["002", "1.0", "007", HEX_CONST.C____BROWN],
    ["002", "1.0", "006", HEX_CONST.C____GREEN],
    ["004", "1.0", "005", HEX_CONST.C___YELLOW],

    ["004", "1.0", "006", HEX_CONST.C______RED],
    ["005", "1.0", "006", HEX_CONST.C______RED, HEX_CONST.TILT_SE, 1],
    ["006", "2.0", "006", HEX_CONST.C______RED]
];
const CIRCLE_WALKWAY_smnp = [
    [x_start, y_start, z_start], // fix me
    [x_look, y_look, z_look],

    ["004", "1.2", "006", HEX_CONST.C____GREEN],
    ["003", "1.2", "007", HEX_CONST.C______RED],
    ["002", "1.2", "007", HEX_CONST.C___YELLOW],
    ["002", y_start, "006", HEX_CONST.C___PURPLE],
    ["003", "1.2", "005", HEX_CONST.C_____BLUE],
    ["004", "1.2", "005", HEX_CONST.C____BROWN]
];

const CIRCLE_WALKWAYttt = [
    [0, 2, 0], // fix me
    [0, 1, 0],
    ["000", "2.0", "000"],

    ["000", "1.0", "-01", HEX_CONST.C___YELLOW, HEX_CONST.TILT_SS, 1] //nnDownToFlat
];

const CIRCLE_WALKWAYFLOWER = [
    // FLOWER
    [x_start, y_start, z_start],
    [x_look, y_look, z_look],
    //    ["003", "0.2", "006", HEX_CONST.C_____BLUE, HEX_CONST.TILT_SE, 1.0],

    ["004", "1", "006", HEX_CONST.C____GREEN, HEX_CONST.TILT_SE, 1.0],
    ["003", "1", "007", HEX_CONST.C____GREEN, HEX_CONST.TILT_SS, 1.0],
    ["002", "1", "007", HEX_CONST.C____GREEN, HEX_CONST.TILT_SW, 1.0],

    ["002", "1", "006", HEX_CONST.C____GREEN, HEX_CONST.TILT_NW, 1.0],
    ["003", "1", "005", HEX_CONST.C____GREEN, HEX_CONST.TILT_NN, 1.0],
    ["004", "1", "005", HEX_CONST.C____GREEN, HEX_CONST.TILT_NE, 1.0]
    //  ["001", "2.2", "006", HEX_CONST.C______RED, HEX_CONST.TILT_NW, 1.0]
];

const CIRCLE_WALKWAY_HAT = [
    // hat
    [x_start, y_start, z_start],
    [x_look, y_look, z_look],
    //    ["003", "0.2", "006", HEX_CONST.C_____BLUE, HEX_CONST.TILT_SE, 1.0],

    ["004", "1", "006", HEX_CONST.C____GREEN, HEX_CONST.TILT_NW, 1.0],
    ["003", "1", "007", HEX_CONST.C____GREEN, HEX_CONST.TILT_NN, 1.0],

    ["002", "1", "007", HEX_CONST.C____GREEN, HEX_CONST.TILT_NE, 1.0],
    ["002", "1", "006", HEX_CONST.C____GREEN, HEX_CONST.TILT_SE, 1.0],
    ["003", "1", "005", HEX_CONST.C____GREEN, HEX_CONST.TILT_SS, 1.0],
    ["004", "1", "005", HEX_CONST.C____GREEN, HEX_CONST.TILT_SW, 1.0]
    //  ["001", "2.2", "006", HEX_CONST.C______RED, HEX_CONST.TILT_NW, 1.0]
];

const CIRCLE_WALLS_e = [
    //  ["000", "3", "-03", HEX_CONST.C_____BLUE, HEX_CONST.WALL_SS, 1]
    // ["003", "1.3", "008", HEX_CONST.C______RED, HEX_CONST.WALL_NN, 0.6],
    // ["004", "1.4", "006", HEX_CONST.C____GREEN, HEX_CONST.WALL_NW, 0.9],
    // ["001", "1.5", "006", HEX_CONST.C___PURPLE, HEX_CONST.WALL_SE, 2.0],
    // ["005", "1.2", "004", HEX_CONST.C____BROWN, HEX_CONST.WALL_SW, 3.0],
    // ["001", "1.2", "008", HEX_CONST.C___YELLOW, HEX_CONST.WALL_NE, 1.0]
];

const CIRCLE_WALKWAY_loop = [
    [0, 2, 0], // fix me
    [0, 1, 0],
    ["000", "2.0", "000"],

    ["000", "2.0", "-01", HEX_CONST.C_____BLUE], //nnFlatToFlat

    ["000", "2.0", "-02", HEX_CONST.C____GREEN, HEX_CONST.TILT_NN, 1], // flattoUP

    ["000", "4.0", "-02", HEX_CONST.C____GREEN, HEX_CONST.TILT_SS, 1], // flattoUP

    ["000", "5.0", "-01", HEX_CONST.C_____BLUE] //nnFlatToFlat
];

const CIRCLE_WALKWAY_curvy = [
    //    [0, 2, 0], // start
    [0, 3, -6], // start
    [0, 1, -7],
    //[0, 1, 0],
    ["000", "2.0", "000"],

    ["000", "2.0", "-01", HEX_CONST.C_____BLUE], //nnFlatToFlat

    ["000", "2.0", "-02", HEX_CONST.C____GREEN, HEX_CONST.TILT_NN, 1], // flattoUP

    ["000", "3.0", "-03", HEX_CONST.C___YELLOW, HEX_CONST.TILT_NN, 1], //UPtoflat

    ["000", "4.0", "-04", HEX_CONST.C___PURPLE], // uptoFLAT

    ["000", "3.0", "-05", HEX_CONST.C___YELLOW, HEX_CONST.TILT_SS, 1], //nnDownToFlat
    ["000", "3.0", "-06", HEX_CONST.C______RED, HEX_CONST.TILT_NN, 1], //nnDownToFlat
    ["000", "4.0", "-07", HEX_CONST.C______RED], //nnDownToFlat

    ["100", "4.0", "-07", HEX_CONST.C______RED, HEX_CONST.TILT_NE, 1], //nnDownToFlat

    ["000", "2.0", "1", HEX_CONST.C____GREEN, HEX_CONST.TILT_SS, 1], // flattoUP

    ["000", "3.0", "2", HEX_CONST.C____GREEN], // flattoUP

    ["-1", "3.0", "2", HEX_CONST.C____GREEN], // flattoUP
    ["-1", "3.0", "1", HEX_CONST.C____GREEN, HEX_CONST.TILT_NN, 1], // flattoUP
    ["-1", "4.0", "0", HEX_CONST.C____GREEN], // flattoUP
    ["0", "4.0", "0", HEX_CONST.C____GREEN] // flattoUP
];

const CIRCLE_WALLS = [
    ["001", "200", "002", HEX_CONST.C_____BLUE, HEX_CONST.WALL_SW, 1.5], //["001", "2", "02", HEX_CONST.C_____BLUE, HEX_CONST.WALL_SW, 1.5],
    ["001", "200", "003", HEX_CONST.C___YELLOW, HEX_CONST.WALL_NW, 0.5], //["001", "2", "3", HEX_CONST.C___YELLOW, HEX_CONST.WALL_NW, 0.5],

    ["000", "200", "004", HEX_CONST.C______RED, HEX_CONST.WALL_NN, 1.5], //["00", "2", "004", HEX_CONST.C______RED, HEX_CONST.WALL_NN, 1.5],

    ["-01", "200", "004", HEX_CONST.C___PURPLE, HEX_CONST.WALL_NE, 0.5], ///  ["-1", "2", "004", HEX_CONST.C___PURPLE, HEX_CONST.WALL_NE, 0.5],
    ["-01", "200", "003", HEX_CONST.C____BROWN, HEX_CONST.WALL_SE, 1.5] ///["-1", "2", "003", HEX_CONST.C____BROWN, HEX_CONST.WALL_SE, 1.5]
];

const CIRCLE_WALKWAY = [
    [0, 605, 1], //[0, 900, -2], //  [0, 6, 0], // start
    [-4, 500, 2], // [0, 1, 3],
    ["000", "350", "003", 0xffff00], //["000", "3.5", "003"],

    ["000", "200", "003", 0x0000ff], //    ["000", "2.0", "003"],

    ["000", "200", "002", 0xffffff], //   ["000", "2.0", "002"],
    ["000", "200", "001", 0x0000ff], //["000", "2.0", "001"],
    ["000", "200", "000", 0x0000ff], //["000", "2.0", "000"],

    ["000", "200", "-01", 0x1010ff, HEX_CONST.TILT_NN, 1], //["000", "2.0", "-01", HEX_CONST.C____GREEN, HEX_CONST.TILT_NN, 1],
    ["000", "300", "-02"], //["000", "3.0", "-02"],
    ["001", "300", "-02", HEX_CONST.C______RED, HEX_CONST.TILT_SE, 1], //    ["001", "3.0", "-02", HEX_CONST.C______RED, HEX_CONST.TILT_SE, 1],
    ["002", "400", "-02"], //["002", "4.0", "-02"],
    ["001", "400", "-01", HEX_CONST.C______RED, HEX_CONST.TILT_SW, 1], //["001", "4.0", "-01", HEX_CONST.C______RED, HEX_CONST.TILT_SW, 1],
    ["000", "500", "000"], //["000", "5.0", "0"],
    ["000", "500", "-01", HEX_CONST.C______RED, HEX_CONST.TILT_NN, 1], //["0", "5.0", "-01", HEX_CONST.C______RED, HEX_CONST.TILT_NN, 1],
    ["000", "600", "-02"], //["000", "6.0", "-2"],
    ["000", "600", "-03"], // ["000", "6.0", "-3"],
    ["000", "600", "-04"], //["000", "6.0", "-4"],
    ["001", "600", "-04"], //["001", "6.0", "-4"],
    ["002", "600", "-04"], //["002", "6.0", "-4"],
    ////////////////////////////////

    ["-4", "700", "3", HEX_CONST.C___YELLOW, HEX_CONST.TILT_SE, 1.0],
    ["-5", "700", "4", HEX_CONST.C___YELLOW, HEX_CONST.TILT_SS, 1.0],
    ["-6", "700", "4", HEX_CONST.C___YELLOW, HEX_CONST.TILT_SW, 1.0],

    ["-6", "700", "3", HEX_CONST.C___YELLOW, HEX_CONST.TILT_NW, 1.0],
    ["-5", "700", "2", HEX_CONST.C___YELLOW, HEX_CONST.TILT_NN, 1.0],
    ["-4", "700", "2", HEX_CONST.C___YELLOW, HEX_CONST.TILT_NE, 1.0]
];
// NB only 1.0  1.5

const CIRCLE_TRAMPOLINES = [["-2", "0", "2", HEX_CONST.C____GREEN]];

const CIRCLE_PENTAGONS = [["0", "270", "3", HEX_CONST.C____GREEN]];

export { CIRCLE_WALKWAY, CIRCLE_WALLS, CIRCLE_TRAMPOLINES, CIRCLE_PENTAGONS };
