import { hexIndex } from "../tiles/hex-routines.js";

function isVerticallyNear2(the_objects, this_hex) {
    const o_walkway_tiles = the_objects.o_walkway_tiles;
    if (o_walkway_tiles.has(this_hex)) {
        return true;
    }
    return false;
}
export { isVerticallyNear2 };
