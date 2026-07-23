import { ee, tt, dd, EE, TT, DD } from "../console-short.js";

//import { pointInsideTile } from "./walkway-overlaps.js";   // does not seem to be used
import { floatCoords2tileIndex } from "../tiles/hex-tile.js";
import { DROP_PER_TICK_FLOAT } from "../values/constants.js";

// hex_column_ac='1,3'   imagine testing this .... so no memorizing

// NEW   MAYBE HAVE A GROUND_ZERO_TILES, WHICH HAVE TILE POSITIONS   TO CHECK FOR ...
// hex_column_ac => hex_column_ac
function walkwayCamera(cam_xyz, walkway_heights, walkway_bottoms, walkway_tiles, ground_tiles) {
    //let [a_int, c_int] = hex_column_ac.split(",");
    // const ground_ac_index = `${a_int},-1,${c_int}`;
    let [a_hex_index, c_hex_index] = floatCoords2tileIndex(cam_xyz.x, cam_xyz.z);
    let hex_column_ac = `${a_hex_index},${c_hex_index}`; // b is y height
    let tile_column = walkway_heights.get(hex_column_ac);

    let cam_inflated_y = Math.trunc(cam_xyz.y * 10);

    if (tile_column == undefined) {
        let dropped_y;
        if (cam_xyz.y > DROP_PER_TICK_FLOAT) {
            dropped_y = cam_xyz.y - DROP_PER_TICK_FLOAT; // NOT on walkway
        } else {
            dropped_y = cam_xyz.y;
        }
        return dropped_y;
    } else {
        if (cam_inflated_y in tile_column) {
        } else {
            let dropped_y = cam_xyz.y - DROP_PER_TICK_FLOAT;
            let inflated_drop_y = Math.trunc(dropped_y * 10);
            if (inflated_drop_y in tile_column) {
                return dropped_y;
            } else {
                return dropped_y;
            }
        }
    }

    return cam_xyz.y;
}

export { walkwayCamera };
