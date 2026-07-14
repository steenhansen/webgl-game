import { ee, tt, dd, EE, TT, DD } from "../misc/console-short.js";
import { leaveTileSW } from "../tiles/sw/sw-move.js";
import { isVerticallyNear2 } from "./adjust-camera.js";
import { hexIndex } from "../tiles/hex-routines.js";

// checkNearSW()
function nearTestSW(the_objects, ndx_x, ndx_y100, ndx_z, prev_x_ind, prev_y_ind, prev_z_ind) {
    let this_hex_plus_100 = hexIndex(ndx_x, ndx_y100 + 100, ndx_z);
    let this_hex_minus_100 = hexIndex(ndx_x, ndx_y100 - 100, ndx_z);
    let this_hex_same = hexIndex(ndx_x, ndx_y100 + 0, ndx_z);
    let prev_hex = hexIndex(prev_x_ind, prev_y_ind, prev_z_ind);
    let move_result;
    if (prev_x_ind == ndx_x && prev_z_ind == ndx_z) {
        move_result = leaveTileSW(the_objects, this_hex_same, prev_hex);
    } else if (isVerticallyNear2(the_objects, this_hex_plus_100)) {
        move_result = leaveTileSW(the_objects, this_hex_plus_100, prev_hex);
    } else if (isVerticallyNear2(the_objects, this_hex_minus_100)) {
        move_result = leaveTileSW(the_objects, this_hex_minus_100, prev_hex);
    } else {
        move_result = leaveTileSW(the_objects, this_hex_same, prev_hex);
    }
    return move_result;
}

export { nearTestSW };
