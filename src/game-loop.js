import { ee, tt, EE, TT } from "./console-short.js";

import * as HEX_CONST from "./constants.js";

import { tileCenterCoord, coords2HexIndexes } from "./tiles/hex-tile.js";

function gameLoop(prev_pos, next_pos, cur_y_100_pos, tile_transition, cam_pos) {
    const { move_result, level_y } = tile_transition;
    if (move_result == HEX_CONST.MOVE_SAME_TILE) {
        prev_pos = next_pos;
    } else if (move_result == HEX_CONST.MOVE_NEW_TILE) {
        prev_pos = next_pos;
        next_pos.y = level_y;
        cur_y_100_pos = level_y;
    } else if (move_result == HEX_CONST.MOVE_FALLING) {
        prev_pos = next_pos;
        // cur_y_100_pos = cur_y_100_pos - 5;
    } else if (move_result == HEX_CONST.MOVE_BLOCKED) {
        let [xx, zz] = coords2HexIndexes(prev_pos.x, prev_pos.z);
        let [xc, zc] = tileCenterCoord(xx, zz);

        prev_pos.x = xc;
        prev_pos.z = zc;

        cam_pos.x = prev_pos.x;
        cam_pos.y = prev_pos.y / 100;
        cam_pos.z = prev_pos.z;
        next_pos = prev_pos;
    } else {
        //  ee("move in gameLoop");
    }
    return [prev_pos, next_pos, cur_y_100_pos];
}

export { gameLoop };
