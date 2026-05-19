import {
    EdgesGeometry,
    Vector3,
    Box3,
    LineBasicMaterial,
    LineSegments,
    BufferGeometry,
    Float32BufferAttribute,
    MeshLambertMaterial,
    Group,
    Mesh,
    DoubleSide,
    RGB_ETC2_Format
} from "three";
import { wallCoords } from "./wall-mesh.js";
import { geoMesh } from "../geo-mesh.js";
import { ee } from "../misc-funcs.js";

import { distance2hexpoints, axial_round, coords2HexIndexes, tileCenterCoord } from "../maths.js";
import {
    WALL_NN,
    WALL_SS,
    WALL_NW,
    WALL_NE,
    WALL_SE,
    WALL_SW,
    X_INDX,
    Y_INDX,
    Z_INDX,
    TILT_NN,
    TILT_SS,
    TILT_NW,
    TILT_NE,
    TILT_SE,
    TILT_SW,
    TILT_NONE
} from "../constants.js";
const sqrt_3 = Math.sqrt(3);

/*
                          square_up_left  
                             /---------\
                            / |      / |\       
             triangle_left /  |    /   | \ triangle_right
                           \  |  /     | /
                            \ |/       |/      
                             \---------/
                               square_down_right   
*/

function wallRectangles(hex_points) {
    const [top_left, top_right, bot_right, bot_left] = hex_points;
    const square_up_left = [...bot_left, ...top_left, ...top_right];
    const square_down_right = [...bot_left, ...top_right, ...bot_right];

    const hexagon_triangles = [...square_up_left, ...square_down_right];
    return hexagon_triangles;
}

function SquareWall(the_scene, walkway_meshes, walkway_tiles, x_y_z, tile_color, wall_position, wall_height) {
    const [x_index, y_index, z_index] = x_y_z;
    const xyz_index = `${x_index},${y_index},${z_index}`;

    let [x_center, z_center] = tileCenterCoord(x_index, z_index);
    const tile_radius = 1;
    const a_tile = new Group();
    a_tile.position.set(x_center, 0, z_center);
    const square_points = squarePoints(tile_radius, y_index, wall_position, wall_height);

    walkway_tiles = offsetWallPoints(walkway_tiles, x_y_z, wall_position, square_points);
    const top_triangles = wallRectangles(square_points);
    geoMesh(a_tile, top_triangles, tile_color);
    the_scene.add(a_tile);
    wallCoords(a_tile, x_y_z, wall_position, wall_height);
    walkway_meshes.set(xyz_index, a_tile);
    return [walkway_meshes, walkway_tiles];
}

//    ["000", "010", "000", "green", TILT_NN, 10], just the objects

function offsetWallPoints(stair_tiles, x_y_z, wall_position, square_points) {
    const [x_index, y_index, z_index] = x_y_z;
    const xyz_index = `${x_index},${y_index},${z_index}`;
    let [x_center, z_center] = tileCenterCoord(x_index, z_index);
    let tile_positions = [];

    for (let i = 0; i < square_points.length; i++) {
        let tile_point = square_points[i];
        if (Array.isArray(tile_point)) {
            let [x, y, z] = tile_point;
            x = x + x_center;
            z = z + z_center;
            tile_positions.push([x, y, z]);
        }
    }
    let top_point_y = tile_positions[3][1];
    let bottom_point_y = tile_positions[0][1];

    if (top_point_y === bottom_point_y) {
        top_point_y = top_point_y; // * 10;
        bottom_point_y = top_point_y;
    } else {
        top_point_y = top_point_y; // * 10; // - 0.0001;
        bottom_point_y = bottom_point_y; // * 10; // + 0.0001;
    }

    var tile_obj = {
        x_center: x_center,
        y_position: y_index,
        z_center: z_center,
        // wall_side: square_position
        wall_side: wall_position,
        tile_positions: tile_positions, // square_positions
        x_z: `${x_index},${z_index}`,
        xyz_index: xyz_index,

        high_y: top_point_y, // - 0.0001,
        low_y: bottom_point_y // why?????????/
    };
    stair_tiles.set(xyz_index, tile_obj);
    return stair_tiles;
}

// these must flip around
function squarePoints(tile_radius, y_100_height, wall_position, wall_height) {
    //function squarePoints(tile_radius, y_height, wall_position, wall_height) {
    const y_height = y_100_height / 100;
    tile_radius = tile_radius - 0.2; // - 0.2;

    const hex_dist = (tile_radius * Math.sqrt(3)) / 2;
    const half_radius = tile_radius / 2;
    var top_left, bot_left, top_rght, bot_rght; //, left_tip, rght_tip;

    const top_height = y_height + wall_height;
    const bot_height = y_height;

    const top_left_x = 0 - half_radius;
    const bot_left_x = 0 - half_radius;
    const top_rght_x = 0 + half_radius;
    const bot_rght_x = 0 + half_radius;
    const left_tip_x = 0 - tile_radius;
    const rght_tip_x = 0 + tile_radius;

    const top_left_z = 0 + hex_dist;
    const bot_left_z = 0 - hex_dist;
    const top_rght_z = 0 + hex_dist;
    const bot_rght_z = 0 - hex_dist;
    const left_tip_z = 0;
    const rght_tip_z = 0;

    if (wall_position === WALL_NN) {
        top_rght = [bot_rght_x, bot_height, bot_rght_z];
        top_left = [bot_left_x, bot_height, bot_left_z];
        bot_rght = [bot_rght_x, top_height, bot_rght_z];
        bot_left = [bot_left_x, top_height, bot_left_z];
    } else if (wall_position === WALL_NE) {
        bot_left = [bot_rght_x, top_height, bot_rght_z];
        bot_rght = [rght_tip_x, top_height, rght_tip_z];
        top_left = [bot_rght_x, bot_height, bot_rght_z];
        top_rght = [rght_tip_x, bot_height, rght_tip_z];
    } else if (wall_position === WALL_SW) {
        bot_left = [top_left_x, top_height, top_left_z];
        bot_rght = [left_tip_x, top_height, left_tip_z];
        top_left = [top_left_x, bot_height, top_left_z];
        top_rght = [left_tip_x, bot_height, left_tip_z];
    } else if (wall_position === WALL_NW) {
        bot_left = [bot_left_x, top_height, bot_left_z];
        bot_rght = [left_tip_x, top_height, left_tip_z];
        top_left = [bot_left_x, bot_height, bot_left_z];
        top_rght = [left_tip_x, bot_height, left_tip_z];
    } else if (wall_position === WALL_SE) {
        bot_left = [top_rght_x, top_height, top_rght_z];
        bot_rght = [rght_tip_x, top_height, rght_tip_z];
        top_rght = [rght_tip_x, bot_height, rght_tip_z];
        top_left = [top_rght_x, bot_height, top_rght_z];
    } else if (wall_position === WALL_SS) {
        top_left = [top_left_x, bot_height, top_left_z];
        top_rght = [top_rght_x, bot_height, top_rght_z];
        bot_rght = [top_rght_x, top_height, top_rght_z];
        bot_left = [top_left_x, top_height, top_left_z];
    } else {
        ee("squarePoints unknown  wall_position==", wall_position);
    }
    const wall_corners = [top_left, top_rght, bot_rght, bot_left];
    return wall_corners;
}

export { SquareWall, squarePoints, wallRectangles, tileCenterCoord, coords2HexIndexes };
