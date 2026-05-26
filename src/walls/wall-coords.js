import { ee, tt, EE, TT } from "../misc/console-short.js";
//import { TILT_NN, TILT_SS, TILT_NW, TILT_NE, TILT_SE, TILT_SW } from "../constants.js";
import * as HEX_CONST from "../constants.js";

import { SquareWall } from "./square-walls.js";

//function makeWalls(the_scene, wall_coords, object_meshes, wall_squares, walkway_columns, walkway_overlaps) {
function makeWalls(the_scene, object_meshes, wall_coords, wall_squares, wall_columns) {
    for (var i = 0; i < wall_coords.length; i++) {
        const ramp_piece = wall_coords[i];
        if (Array.isArray(ramp_piece)) {
            const [x_str, y_str, z_str] = ramp_piece;
            const x_index = parseInt(x_str);
            const y_index = parseInt(y_str);
            //            const y_index = parseFloat(y_str);
            const z_index = parseInt(z_str);
            const ramp_xyz = [x_index, y_index, z_index];

            const [, , , tile_color, wall_position, wall_height] = ramp_piece;

            [object_meshes, wall_squares] = SquareWall(
                the_scene,
                object_meshes,
                wall_squares,

                ramp_xyz,
                tile_color,
                wall_position, // wall_position
                wall_height // wall_height
            );
        }
    }

    var wall_columns = new Map();

    for (const [_key, a_wall] of wall_squares) {
        const x_z = a_wall.x_z;
        const xyz_index = a_wall.xyz_index;
        const missing_x_z_column = !wall_columns.has(x_z);
        if (missing_x_z_column) {
            let empty_x_z_column = new Map();
            wall_columns.set(x_z, empty_x_z_column);
        }
        let cur_x_z_column = wall_columns.get(x_z);
        const [x_index, z_index] = x_z.split(",");

        let low_y_10 = a_wall.low_y * 10;
        let high_y_10 = a_wall.high_y * 10;
        for (let y_10_index = low_y_10; y_10_index <= high_y_10; y_10_index++) {
            const a_y_index = `${x_index},${y_10_index / 10},${z_index}`;
            cur_x_z_column.set(a_y_index, xyz_index);
        }
    }
    return [object_meshes, wall_squares, wall_columns];
}

export { makeWalls };
