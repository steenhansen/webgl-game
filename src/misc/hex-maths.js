import { ee, tt, dd, EE, TT, DD } from "./console-short.js";

import { SQRT_3 } from "../values/the-constants.js";

function distance2hexpoints(hex_point_1, hex_point_2) {
    let x_diff = hex_point_2[0] - hex_point_1[0];
    let z_diff = hex_point_2[2] - hex_point_1[2];
    let length = Math.sqrt(x_diff * x_diff + z_diff * z_diff);
    return length;
}

// https://observablehq.com/@jrus/hexround
function axial_round(x, y) {
    const xgrid = Math.round(x),
        ygrid = Math.round(y);
    ((x -= xgrid), (y -= ygrid)); // remainder
    const dx = Math.round(x + 0.5 * y) * (x * x >= y * y);
    const dy = Math.round(y + 0.5 * x) * (x * x < y * y);

    const not_nes_0_x = xgrid + dx + 0;
    const not_nes_0y = ygrid + dy + 0;

    return [not_nes_0_x, not_nes_0y];
}

//  https://www.redblobgames.com/grids/hexagons/#pixel-to-hex
//  function pixel_to_pointy_hex(point):

// floatCoords2tileIndex(-10.5, -6.3) => [-7, 0]
function floatCoords2tileIndex(x_coord, z_coord) {
    // invert the scaling
    var x = x_coord / 1;
    var y = z_coord / 1;
    // cartesian to hex
    var q = (2 / 3) * x;
    var r = (-1 / 3) * x + (SQRT_3 / 3) * y;
    let ar = axial_round(q, r);
    //tt("floatCoords2tileIndex", x_coord, z_coord, ar);
    return ar;
}

//  https://www.redblobgames.com/grids/hexagons/#hex-to-pixel
//  function pointy_hex_to_pixel(hex):

// tileIndex2floatCoords(1,-6) => [1.5, -9.526]
function tileIndex2floatCoords(x_tile, z_tile) {
    const x_coord = (3 / 2) * x_tile;
    const z_coord = (SQRT_3 / 2) * x_tile + SQRT_3 * z_tile;
    // tt("tileIndex2floatCoords", x_tile, z_tile, x_coord, z_coord);
    return [x_coord, z_coord];
}

export { distance2hexpoints, axial_round, floatCoords2tileIndex, tileIndex2floatCoords };
