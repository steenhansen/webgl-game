import {
    EdgesGeometry,
    Vector3,
    MeshPhongMaterial,
    Box3,
    InstancedMesh,
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

import { X_INDX, Y_INDX, Z_INDX, N_N, S_S, N_W, N_E, S_E, S_W, FLAT } from "../constants.js";
import { hexPoints, tileTriangles, tileCenterCoord } from "./hex-tile.js";
import { geoMesh, addCoords } from "./mesh-tiles.js";

function ground_field(hex_tiles, ground_tiles, the_scene, start_x, end_x, base_color) {
    for (let x = start_x; x < end_x; x++) {
        [hex_tiles, ground_tiles] = groundRow(hex_tiles, ground_tiles, the_scene, x, -10, 10, base_color);
    }
    return [hex_tiles, ground_tiles];
}

function groundRow(hex_tiles, ground_tiles, the_scene, x_row, start_z, end_z, base_color) {
    const top_color = 0xff0000;
    const outline_color = 0xff8888;
    const tile_colors = [top_color, outline_color];
    for (let z = start_z; z < end_z; z++) {
        hex_tiles = groundTile(hex_tiles, the_scene, [x_row, -1, z], tile_colors);
    }
    return [hex_tiles, ground_tiles];
}

function groundTile(hex_tiles, the_scene, x_y_z, tile_colors) {
    const [x_index, y_height, z_index] = x_y_z;
    let [top_color, outline_color] = tile_colors;
    let [x_center, z_center] = tileCenterCoord(x_index, z_index);
    const tile_radius = 1;
    const a_tile = new Group();
    a_tile.position.set(x_center, 0, z_center);
    const stair_tiles = hexPoints(tile_radius, y_height, FLAT, 0);
    const top_triangles = tileTriangles(stair_tiles);
    geoMesh(a_tile, top_triangles, top_color, outline_color);
    the_scene.add(a_tile);
    addCoords(a_tile, x_y_z, [FLAT, 0]);
    const xyz_index = `${x_index},${y_height},${z_index}`;
    hex_tiles.set(xyz_index, a_tile);
    return hex_tiles;
}

export { groundRow, ground_field, groundTile };
