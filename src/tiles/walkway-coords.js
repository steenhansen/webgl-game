import { ee, tt, EE, TT } from "../console-short.js";

//import { TILT_NN, TILT_SS, TILT_NW, TILT_NE, TILT_SE, TILT_SW } from "../constants.js";
import * as HEX_CONST from "../constants.js";

import { HexTile } from "./hex-tile.js";

// const walkway_coords = [
//     // x,     y,      z,  incline_dir, incline_amount
//     ["001", "040", "002"],
//     ["001", "040", "001"],
//     ["001", "040", "000"],
//     ["002", "040", "-01"],
//     ["003", "040", "-01"],
//     ["003", "020", "-01"],

//     ["002", "020", "-01"],
//     ["001", "020", "-01"],
//     ["000", "020", "000"],
//     ["000", "020", "001"],
//     ["000", "020", "002"],
//     ["000", "020", "003"],
//     ["000", "020", "004"],
//     ["000", "020", "005"],
//     ["000", "020", "006"],
//     ["000", "020", "007", "blue"], //   0,7      2
//     ["000", "020", "008"],

//     ["003", "020", "000", "blue", TILT_SS, 1.0],
//     ["003", "020", "001", "blue", TILT_NN, 1.0],
//     ["003", "010", "002", "blue", TILT_NN, 1.0],
//     ["003", "010", "003"],
//     ["004", "010", "003", "yellow", TILT_SE, 0.5],
//     ["005", "015", "003", "yellow", TILT_SE, 0.5],
//     ["006", "015", "003", "yellow", TILT_NW, 0.5],
//     ["002", "010", "004", "yellow", TILT_SW, 0.2],
//     ["001", "012", "005", "yellow", TILT_SW, 0.2],
//     ["000", "008", "006", "yellow", TILT_NE, 0.4],
//     ["000", "008", "007", "yellow", TILT_NE, 0.4], // 0.7       0.8

//     // 0.8 ==> 8       /10
//     // 5 ==> 50  therefore we can have g_walkway_height as ints

//     // so we modify the indexs of x,z now y as well

//     ["004", "008", "006", "purple", TILT_SE, 0.5],
//     ["003", "008", "007", "purple", TILT_SS, 1.0],
//     ["002", "008", "007", "purple", TILT_SW, 1.5],
//     ["002", "008", "006", "purple", TILT_NW, 2.0],
//     ["003", "008", "005", "purple", TILT_NN, 2.5],
//     ["004", "008", "005", "purple", TILT_NE, 3.0]

//     // ["004", "3.0", "006", TILT_SS, 0.5],
//     // ["003", "2.5", "007", TILT_SS, 1.0],
//     // ["002", "2.0", "007", TILT_SS, 1.5],
//     // ["002", "1.5", "006", TILT_SS, 2.0],
//     // ["003", "1.0", "005", TILT_SS, 2.5],
//     // ["004", "0.5", "005", TILT_SS, 3.0]
// ];

//
//         x,      y,      z,  hex_color, slope_direction, incline_amount
//    ["-001", "00.5", "-001",  c____red,         TILT_NN, 0.1]
//    ["0000", "0000", "0000",  c_yellow,         TILT_NN, 1]    // more better way !!!!!!!!!!
//    ["-003", "0050", "-002",  c_purple]

// const walkway_coords = [
//     // x,     y,      z,  incline_dir, incline_amount
//     ["0000", "1", "0000", HEX_CONST.C____GREEN],
//     //    ["-99.1", "099.1", "-99.1", TILT_NN, "0.1" "green"]
//     ["0001", "1", "-001", HEX_CONST.C_____BLUE, HEX_CONST.TILT_NE, 10]
//     //  ["003", "050", "002", "yellow"]
// ];

function coordsBad(x_index, y_level, z_index) {
    if (x_index % 1 != 0) {
        ee("checkCoords error x_index ", x_index);
        return true;
    }
    if (y_level % 1 != 0 && y_level % 1 != 0.5) {
        ee("checkCoords error y_level ", y_level);
        return true;
    }
    if (z_index % 1 != 0) {
        ee("checkCoords error z_index ", z_index);
        return true;
    }
    return false;
}

function makeWalkway(the_scene, walkway_meshes, walkway_coords, walkway_tiles, walkway_columns) {
    for (var i = 0; i < walkway_coords.length; i++) {
        const ramp_piece = walkway_coords[i];
        if (Array.isArray(ramp_piece)) {
            const [x_str, y_str, z_str] = ramp_piece;
            const x_index = parseInt(x_str);
            //            const y_index = parseFloat(y_str); /// y_level
            const y_index = parseInt(y_str); /// y_level

            const z_index = parseInt(z_str);

            if (coordsBad(x_index, y_index, z_index)) {
                debugger;
            }

            const ramp_xyz = [x_index, y_index, z_index];
            if (ramp_piece.length == 3) {
                const top_color2 = 0x88ee88;
                [walkway_meshes, walkway_tiles] = HexTile(the_scene, walkway_meshes, walkway_tiles, ramp_xyz, top_color2);
            } else if (ramp_piece.length == 4) {
                const tile_color = ramp_piece[3];
                [walkway_meshes, walkway_tiles] = HexTile(the_scene, walkway_meshes, walkway_tiles, ramp_xyz, tile_color);
            } else {
                const [, , , tile_color, slope_direction, incline_amount] = ramp_piece;
                [walkway_meshes, walkway_tiles] = HexTile(the_scene, walkway_meshes, walkway_tiles, ramp_xyz, tile_color, slope_direction, incline_amount);
            }
        }
    }
    var walkway_columns = new Map();
    for (const [_key, a_tile] of walkway_tiles) {
        const x_z = a_tile.x_z;
        const xyz_index = a_tile.xyz_index;
        const missing_x_z_column = !walkway_columns.has(x_z);
        if (missing_x_z_column) {
            let empty_x_z_column = new Map();
            walkway_columns.set(x_z, empty_x_z_column);
        }
        let cur_x_z_column = walkway_columns.get(x_z);
        const [x_index, z_index] = x_z.split(",");
        let low_y_100 = a_tile.low_y * 100;
        let high_y_100 = a_tile.high_y * 100;
        for (let y_100_index = low_y_100; y_100_index <= high_y_100; y_100_index += 5) {
            const a_y_index = `${x_index},${y_100_index},${z_index}`;
            cur_x_z_column.set(a_y_index, xyz_index);
        }
    }
    return [walkway_meshes, walkway_tiles, walkway_columns];
}

export { makeWalkway };
