import { N_N, S_S, N_W, N_E, S_E, S_W } from "../constants.js";

import { HexTile } from "./hex-tile.js";

//
const walkway_coords = [
    // x,     y,      z,  incline_dir, incline_amount
    ["001", "04.0", "002"],
    ["001", "04.0", "001"],
    ["001", "04.0", "000"],
    ["002", "04.0", "-01"],
    ["003", "04.0", "-01"],
    ["003", "02.0", "-001"],

    ["002", "02.0", "-001"],
    ["001", "02.0", "-001"],
    ["000", "02.0", "000"],
    ["000", "02.0", "001"],
    ["000", "02.0", "002"],
    ["000", "02.0", "003"],
    ["000", "02.0", "004"],
    ["000", "02.0", "005"],
    ["000", "02.0", "006"],
    ["000", "02.0", "007"],
    ["000", "02.0", "008"],

    ["003", "02.0", "000", S_S, 1.0],
    ["003", "02.0", "001", N_N, 1.0],
    ["003", "01.0", "002", N_N, 1.0],
    ["003", "01.0", "003"],
    ["004", "01.0", "003", S_E, 0.5],
    ["005", "01.5", "003", S_E, 0.5],

    ["006", "01.5", "003", N_W, 0.5],

    ["002", "01.0", "004", S_W, 0.2],
    ["001", "01.2", "005", S_W, 0.2],
    ["000", "01.0", "006", N_E, 0.4],
    ["000", "0.8", "007", N_E, 0.4],

    ["004", "0.8", "006", S_E, 1.0],
    ["003", "0.8", "007", S_S, 1.0],
    ["002", "0.8", "007", S_W, 1.0],
    ["002", "0.8", "006", N_W, 1.0],
    ["003", "0.8", "005", N_N, 1.0],
    ["004", "0.8", "005", N_E, 1.0]
];

function makeWalkway(the_scene, walkway_meshes, walkway_tiles, walkway_overlaps, tile_colors2) {
    for (var i = 0; i < walkway_coords.length; i++) {
        const ramp_piece = walkway_coords[i];
        const [x_str, y_str, z_str] = ramp_piece;
        const x_index = parseInt(x_str);
        const y_index = parseFloat(y_str);
        const z_index = parseInt(z_str);
        const ramp_xyz = [x_index, y_index, z_index];

        if (ramp_piece.length == 3) {
            [walkway_meshes, walkway_tiles, walkway_overlaps] = HexTile(the_scene, walkway_meshes, walkway_tiles, walkway_overlaps, ramp_xyz, tile_colors2);
        } else {
            const incline_and_dir = [ramp_piece[3], ramp_piece[4]];
            [walkway_meshes, walkway_tiles, walkway_overlaps] = HexTile(
                the_scene,
                walkway_meshes,
                walkway_tiles,
                walkway_overlaps,
                ramp_xyz,
                tile_colors2,
                incline_and_dir
            );
        }
    }
    return [walkway_meshes, walkway_tiles, walkway_overlaps];
}

export { makeWalkway };
