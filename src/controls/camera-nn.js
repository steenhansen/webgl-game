import { ee, tt, dd, EE, TT, DD } from "../misc/console-short.js";

import { leaveTileNN } from "../tiles/nn/nn-move.js";
import { isVerticallyNear2 } from "./vertically-near.js";
import { hexIndex } from "../tiles/hex-routines.js";

function nearTestNN(the_objects, ndx_x, ndx_y100, ndx_z, prev_hex, is_a_trampoline) {
    let this_hex_plus_100 = hexIndex(ndx_x, ndx_y100 + 100, ndx_z);
    //  let this_hex_plus_50 = hexIndex(ndx_x, ndx_y100 + 50, ndx_z);
    //let this_hex_minus_50 = hexIndex(ndx_x, ndx_y100 - 50, ndx_z);
    let this_hex_minus_100 = hexIndex(ndx_x, ndx_y100 - 100, ndx_z);
    let this_hex_same = hexIndex(ndx_x, ndx_y100 + 0, ndx_z);
    let move_result;
    if (isVerticallyNear2(the_objects, this_hex_plus_100)) {
        move_result = leaveTileNN(the_objects, this_hex_plus_100, prev_hex, is_a_trampoline);
        //} else if (isVerticallyNear2(the_objects, this_hex_plus_50)) {
        //     move_result = leaveTileNN(the_objects, this_hex_plus_50, prev_hex, is_a_trampoline);
        // } else if (isVerticallyNear2(the_objects, this_hex_minus_50)) {
        //     move_result = leaveTileNN(the_objects, this_hex_minus_50, prev_hex, is_a_trampoline);
    } else if (isVerticallyNear2(the_objects, this_hex_minus_100)) {
        move_result = leaveTileNN(the_objects, this_hex_minus_100, prev_hex, is_a_trampoline);
    } else {
        move_result = leaveTileNN(the_objects, this_hex_same, prev_hex, is_a_trampoline);
    }
    return move_result;
}

export { nearTestNN };
