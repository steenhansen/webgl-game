import { X_INDX, Y_INDX, Z_INDX, N_N, S_S, N_W, N_E, S_E, S_W } from "../constants.js";

import { tileCenterCoord } from "./hex-tile.js";

// AI: when we place a tile, we can calculate which other tiles could be above it,
// and store that in stair_overlaps. then when we place a tile, we can check if there are any tiles
// that could be below it, and if so, we can check if they are actually below it, and if so, we
//  can adjust the height of the tile accordingly. this way we can avoid having to check every tile
//  in the scene every time we place a tile, and instead only check the tiles that could be above or below it.

function walkwayOverlaps(stair_overlaps, x_y_z) {
    const [x_index, y_index, z_index] = x_y_z;
    const xyz_index = `${x_index},${y_index},${z_index}`;
    let [x_center, z_center] = tileCenterCoord(x_index, z_index);

    const x_mid = Math.floor(x_center);
    const x_low = x_mid - 1;
    const x_hih = x_mid + 1;

    const z_mid = Math.floor(z_center);
    const z_low = z_mid - 1;
    const z_hih = z_mid + 1;

    stair_overlaps = possibleOverlap(stair_overlaps, `${x_low},${z_mid}`, xyz_index); // -1,0  nw
    stair_overlaps = possibleOverlap(stair_overlaps, `${x_low},${z_hih}`, xyz_index); // -1,1  sw

    stair_overlaps = possibleOverlap(stair_overlaps, `${x_mid},${z_low}`, xyz_index); // 0,-1  nn
    stair_overlaps = possibleOverlap(stair_overlaps, `${x_mid},${z_mid}`, xyz_index); // 0,0
    stair_overlaps = possibleOverlap(stair_overlaps, `${x_mid},${z_hih}`, xyz_index); // 0,1   ss

    stair_overlaps = possibleOverlap(stair_overlaps, `${x_hih},${z_low}`, xyz_index); // 1,-1  ne
    stair_overlaps = possibleOverlap(stair_overlaps, `${x_hih},${z_mid}`, xyz_index); // 1,0   se

    return stair_overlaps;
}

function possibleOverlap(walkway_overlaps, xyz_key, xyz_index) {
    if (walkway_overlaps.has(xyz_key)) {
        let cur_arr = walkway_overlaps.get(xyz_key);
        cur_arr.push(xyz_index);
        walkway_overlaps.set(xyz_key, cur_arr);
    } else {
        walkway_overlaps.set(xyz_key, [xyz_index]);
    }
    return walkway_overlaps;
}

/*
           blue
          neg-z
            |
            |
red--neg-x----------------------pos-x
            |
            |                nn
            | -0.5,-0.86/----------\0.5,-0.86
            |          /4          3\ 
            |       nw/              \ne
            |        /                \ 
            |       /5      0,0        \ 1,0  
            |   -1,0\                 2/
            |        \                /
            |      sw \              / se        
            |          \0          1/
            |  -0.5,0.86\----------/0.5,0.86
            |     ^          ss 
            |     |
            |    start point
            |
          pos-z
*/

function pointInsideTile(x_point, z_point, stair_tile) {
    let tile_positions = stair_tile.tile_positions;
    let highest_z = tile_positions[0][2];
    let lowest_z = tile_positions[3][2];
    let highest_x = tile_positions[2][0];
    let lowest_x = tile_positions[5][0];
    const outside_hex = x_point < lowest_x || x_point > highest_x || z_point < lowest_z || z_point > highest_z;
    if (outside_hex) {
        return false;
    }
    let { x_center, z_center } = stair_tile;
    if (x_point > x_center) {
        if (z_point > z_center) {
            const se_x1 = tile_positions[1][0];
            const se_z1 = tile_positions[1][2];
            const se_x2 = tile_positions[2][0];
            const se_z2 = tile_positions[2][2];
            const se_d = (x_point - se_x1) * (se_z2 - se_z1) - (z_point - se_z1) * (se_x2 - se_x1);
            if (se_d < 0) {
                return false;
            }
        } else {
            const ne_x1 = tile_positions[2][0];
            const ne_z1 = tile_positions[2][2];
            const ne_x2 = tile_positions[3][0];
            const ne_z2 = tile_positions[3][2];
            const ne_d = (x_point - ne_x1) * (ne_z2 - ne_z1) - (z_point - ne_z1) * (ne_x2 - ne_x1);
            if (ne_d < 0) {
                return false;
            }
        }
    } else {
        if (z_point > z_center) {
            const sw_x1 = tile_positions[5][0];
            const sw_z1 = tile_positions[5][2];
            const sw_x2 = tile_positions[0][0];
            const sw_z2 = tile_positions[0][2];
            const sw_d = (x_point - sw_x1) * (sw_z2 - sw_z1) - (z_point - sw_z1) * (sw_x2 - sw_x1);
            if (sw_d < 0) {
                return false;
            }
        } else {
            const nw_x1 = tile_positions[4][0];
            const nw_z1 = tile_positions[4][2];
            const nw_x2 = tile_positions[5][0];
            const nw_z2 = tile_positions[5][2];
            const nw_d = (x_point - nw_x1) * (nw_z2 - nw_z1) - (z_point - nw_z1) * (nw_x2 - nw_x1);
            if (nw_d < 0) {
                return false;
            }
        }
    }
    return true;
}

export { walkwayOverlaps, pointInsideTile };
