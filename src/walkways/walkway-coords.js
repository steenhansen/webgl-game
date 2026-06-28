import { ee, tt, dd, EE, TT, DD } from "../misc/console-short.js";

import { HexTile } from "../tiles/hex-tile.js";

import { SEA_COLORS, SEA_EDGE, WALK_BEFORE_COLORS, WALK_EDGE } from "../values/color-consts.js";

function coordsBad(x_index, y_level, z_index) {
    if (x_index % 1 != 0) {
        ee("checkCoords error x_index ", x_index);
        return true;
    }
    if (y_level % 1 != 0 && y_level % 1 != 0.5) {
        ee("checkCoords error y_level ", y_level);
        return true;
    }
    if (z_index % 1 != 0) {
        ee("checkCoords error z_index ", z_index);
        return true;
    }
    return false;
}

function makeWalkTile(g_scene, walkway_meshes, walkway_tiles, ramp_piece) {
    const [x_str, y_str, z_str] = ramp_piece;
    const x_index = parseInt(x_str);
    const y_100_index = parseInt(y_str);
    const z_index = parseInt(z_str);
    if (coordsBad(x_index, y_100_index, z_index)) {
        debugger;
    }
    const ramp_xyz = [x_index, y_100_index, z_index];
    if (ramp_piece.length == 3) {
        //        [walkway_meshes, walkway_tiles] = HexTileFlat(g_scene, walkway_meshes, walkway_tiles, ramp_xyz);  // qbert
        [walkway_meshes, walkway_tiles] = HexTile(g_scene, walkway_meshes, walkway_tiles, ramp_xyz, WALK_BEFORE_COLORS, WALK_EDGE);
    } else {
        const slope_tilt = ramp_piece[3];
        const incline_amount = ramp_piece[4];
        const is_transparent = ramp_piece[5];

        /*
  [walkway_meshes, walkway_tiles] = HexTileSloped(  // qbert
            g_scene,
            walkway_meshes,
            walkway_tiles,
            ramp_xyz,
            is_transparent,
            slope_tilt,
            incline_amount
        );
    */

        [walkway_meshes, walkway_tiles] = HexTile(
            g_scene,
            walkway_meshes,
            walkway_tiles,
            ramp_xyz,
            WALK_BEFORE_COLORS,
            WALK_EDGE,
            slope_tilt,
            incline_amount,
            is_transparent
        );
    }
    return [walkway_meshes, walkway_tiles];
}

function makeWalkway(g_scene, walkway_meshes, o_walkway_ndxs, walkway_tiles, walkway_columns) {
    for (var i = 0; i < o_walkway_ndxs.length; i++) {
        const ramp_piece = o_walkway_ndxs[i];
        if (Array.isArray(ramp_piece)) {
            [walkway_meshes, walkway_tiles] = makeWalkTile(g_scene, walkway_meshes, walkway_tiles, ramp_piece);
        }
    }
    walkway_columns = makeWalkwayColumns(walkway_tiles);
    return [walkway_meshes, walkway_tiles, walkway_columns];
}

function makeWalkwayColumns(walkway_tiles) {
    var walkway_columns = new Map();
    for (const [_key, a_tile] of walkway_tiles) {
        const x_z = a_tile.x_z;
        const xyz_index = a_tile.xyz_index;
        const missins_x_z_column = !walkway_columns.has(x_z);
        if (missins_x_z_column) {
            let empty_x_z_column = new Map();
            walkway_columns.set(x_z, empty_x_z_column);
        }
        let cur_x_z_column = walkway_columns.get(x_z);
        const [x_index, z_index] = x_z.split(",");
        let low_y_100 = a_tile.low_y * 100;
        let high_y_100 = a_tile.high_y * 100;
        for (let y_100_index = low_y_100; y_100_index <= high_y_100; y_100_index += 5) {
            const a_y_index = `${x_index},${y_100_index},${z_index}`;
            cur_x_z_column.set(a_y_index, xyz_index);
        }
    }
    return walkway_columns;
}

export { makeWalkway };
