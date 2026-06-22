import { ee, tt, EE, TT } from "../misc/console-short.js";
import { HEXAGON_PART } from "../values/the-constants.js";

import { WALK_AFTER_COLORS } from "../values/color-consts.js";

import { seaColor } from "../misc/tile-colors.js";

const colorLeft = (hex) => {
    const r = hex & 0xff0000;
    const g = hex & 0x00ff00;
    const b = hex & 0x0000ff;
    const r2 = r >> 16;
    const g2 = g << 8;
    const b2 = b << 8;
    const color_left = r2 | g2 | b2;
    return color_left;
};

const colorRight = (hex) => {
    const r = hex & 0xff0000;
    const g = hex & 0x00ff00;
    const b = hex & 0x0000ff;
    const r2 = r >> 8;
    const g2 = g >> 8;
    const b2 = b << 16;
    const color_right = r2 | g2 | b2;
    return color_right;
};

function flipTileColorG(the_objects, f_this_hex) {
    const [x_index, y_ind, z_index] = f_this_hex.split(",");
    let sea_color = seaColor([x_index, y_ind, z_index], WALK_AFTER_COLORS);
    let { o_object_meshes } = the_objects;

    let possible_tile = o_object_meshes.get(f_this_hex);

    if (possible_tile) {
        const tile_mesh = possible_tile.getObjectByName(HEXAGON_PART);
        tile_mesh.material.color.setHex(sea_color);
    }
    const unvisited_tiles = the_objects.o_unvisited_tiles;
    if (unvisited_tiles.has(f_this_hex)) {
        unvisited_tiles.delete(f_this_hex);
    }
}

export { colorLeft, colorRight, flipTileColorG };
