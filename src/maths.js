import { ee, tt, EE, TT } from "./console-short.js";

const SQRT_3 = Math.sqrt(3);

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

    const not_neg_0_x = xgrid + dx + 0;
    const not_neg_0y = ygrid + dy + 0;

    return [not_neg_0_x, not_neg_0y];
}

//  https://www.redblobgames.com/grids/hexagons/#pixel-to-hex
//function pixel_to_flat_he xMe(x_coord, z_coord) {
//       camCoords2HexIndexes()
function coords2HexIndexes(x_coord, z_coord) {
    // invert the scaling
    var x = x_coord / 1;
    var y = z_coord / 1;
    // cartesian to hex
    var q = (2 / 3) * x;
    var r = (-1 / 3) * x + (SQRT_3 / 3) * y;
    let ar = axial_round(q, r);
    return ar;
}

function tileCenterCoord(x_tile, z_tile) {
    const x_coord = (3 / 2) * x_tile;
    const z_coord = (SQRT_3 / 2) * x_tile + SQRT_3 * z_tile;
    coords2HexIndexes(x_coord, z_coord);
    return [x_coord, z_coord];
}

export { distance2hexpoints, axial_round, coords2HexIndexes, tileCenterCoord };
