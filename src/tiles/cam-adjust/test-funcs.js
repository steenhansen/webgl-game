import { ee, tt, EE, TT } from "../../console-short.js";

import { AScene } from "../../a-scene.js";
import { tileCenterCoord } from "../hex-tile.js";
import { transition2Tile } from "./camAdjust.js";
import { makeWalkway } from "../walkway-coords.js";

import {
    MOVE_FALLING,
    MOVE_NEW_TILE,
    TEST_TILE_MOVE,
    TESTING_PRINT,
    TEST_PASSED,
    TEST_FAILED,
    MOVE_GO,
    MOVE_STOP,
    C____GREEN,
    C_____BLUE,
    C___YELLOW,
    C_NONE,
    TILT_NW,
    TILT_NONE,
    TILT_NN,
    TILT_SW,
    TILT_SE,
    TILT_NE,
    TILT_SS,
    ON_NO_TILE,
    ON_NEW_TILE,
    ON_OLD_TILE
} from "../../constants.js";

function make_camPos(x_hex_index, y_height, z_hex_index) {
    let [x_center_coord, z_center_coord] = tileCenterCoord(x_hex_index, z_hex_index);
    let a_cam_pos = { x: x_center_coord, y: y_height, z: z_center_coord };
    return a_cam_pos;
}
// TEST_TILE_MOVE
// PHYS_TILE_MOVE
function checkPrevNextTiles(prev_tile, new_tile) {
    const the_scene = AScene(0x202025);
    const [xa, ya, za] = prev_tile;
    const [xb, yb, zb] = new_tile;
    const walkway_coords = [prev_tile, new_tile];

    let walkway_meshes = new Map();
    let walkway_tiles = new Map();
    var walkway_columns = new Map([]);
    var walkway_overlaps = new Map([]);

    [walkway_meshes, walkway_tiles, walkway_columns, walkway_overlaps] = makeWalkway(
        the_scene,
        walkway_coords,
        walkway_meshes,
        walkway_tiles,
        walkway_columns,
        walkway_overlaps
    );

    let cam_prev = make_camPos(xa, ya, za);
    let cam_new = make_camPos(xb, yb, zb);
    //                                         testing-print/ running-no-print
    let no_old_new_tile = transition2Tile(TEST_TILE_MOVE, TESTING_PRINT, walkway_coords, walkway_tiles, walkway_columns, cam_prev, cam_new);

    if (no_old_new_tile == MOVE_FALLING) {
        return MOVE_GO;
    } else if (no_old_new_tile == MOVE_NEW_TILE) {
        return MOVE_GO;
    } else {
        return MOVE_STOP;
    }
    //return change_allowed;
}

export { checkPrevNextTiles };
