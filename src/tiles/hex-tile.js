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

/*
 ----------------RED-X-LINE------------------------
|
|
|
|            nn
|         /--------\
|    nw /          \ n_e
|       /            \
|       \            /
|    sw \          / se         no w nor e, named from like storms
|         \--------/
|             ss
|
B
L
U
E
|
Z
|
L         sw not working?
I
N
E
|
|
|
|
|







*/

/*
          n_n
      /--------\
  n_w /          \ n_e
    /            \
    \            /
  s_w \          / s_e         no w nor e, named from like storms
      \--------/
          s_s
*/

//import { rowTilt, columnTilt, xzTilt } from "./tilt-tiles.js";

import { nearTile } from "./hover-tiles.js";

import { geoMesh, addCoords } from "./mesh-tiles.js";
import { tiltTile } from "./tilt-tiles.js";

import { hexSides, tileSides2, tileColumnSides } from "./sides-tiles.js";
import { hexNewColor, colorLeft, colorRight } from "./colors-tiles.js";
import { XyzDot } from "../a-dot.js";

const sqrt_3 = Math.sqrt(3);

function angledWater(hex_tiles, the_scene, x_y_z, tile_colors, direction, angle_index) {
    const [x_index, y_height, z_index] = x_y_z;
    let [top_color, outline_color, six_side_colors] = tile_colors;
    if (six_side_colors.length == 1) {
        const one_color = six_side_colors[0];
        six_side_colors = [one_color, one_color, one_color, one_color, one_color, one_color];
    }
    let [x_position, z_position] = hexPosition(x_index, z_index);
    const tile_radius = 1;
    const a_tile = new Group();

    a_tile.position.set(x_position, 0, z_position);
    const hex_points = hexPoints(tile_radius, y_height);
    const top_triangles = hexTopTriangles(hex_points);
    geoMesh(a_tile, top_triangles, top_color, outline_color);
    tileSides2(a_tile, hex_points, six_side_colors, outline_color);
    the_scene.add(a_tile);
    addCoords(a_tile, x_y_z, [angle_index, direction]);
    const xyz_index = `${x_index},${y_height},${z_index}`;
    hex_tiles.set(xyz_index, a_tile);
    return hex_tiles;
}

function flatWater(hex_tiles, the_scene, x_y_z, tile_colors, no_lean_and_dir) {
    const lean_and_dir = [0, "nw"];
    const [x_index, y_height, z_index] = x_y_z;
    let [top_color, outline_color, six_side_colors] = tile_colors;
    if (six_side_colors.length == 1) {
        const one_color = six_side_colors[0];
        six_side_colors = [one_color, one_color, one_color, one_color, one_color, one_color];
    }

    const [lean_amount, lean_direction] = lean_and_dir;

    //console.log("HexTile", x, y, z);
    let [x_position, z_position] = hexPosition(x_index, z_index);
    const tile_radius = 1;
    const a_tile = new Group();

    if (lean_amount > 0) {
        tiltTile(a_tile, lean_and_dir);
    }

    a_tile.position.set(x_position, 0, z_position);
    const hex_points = hexPoints(tile_radius, y_height);
    const top_triangles = hexTopTriangles(hex_points);
    //    geoMesh(top_triangles, a_tile, top_color, x_index, z_index, outline_color);
    geoMesh(a_tile, top_triangles, top_color, outline_color);
    //tileSides2(a_tile, hex_points, six_side_colors, outline_color);
    the_scene.add(a_tile);

    addCoords(a_tile, x_y_z, "");

    const xyz_index = `${x_index},${y_height},${z_index}`;
    hex_tiles.set(xyz_index, a_tile);
    return hex_tiles;
}

function hexTopTriangles(hex_points) {
    const [top_left, top_right, right_tip, bot_right, bot_left, left_tip] = hex_points;
    const square_up_left = [...bot_left, ...top_left, ...top_right];
    const square_down_right = [...bot_left, ...top_right, ...bot_right];
    const triangle_left = [...bot_left, ...left_tip, ...top_left];
    const triangle_right = [...top_right, ...right_tip, ...bot_right];
    const hexagon_sides = [...square_up_left, ...square_down_right, ...triangle_left, ...triangle_right];
    return hexagon_sides;
}

//  have flat water by y==-1
function hexPoints(tile_radius, y_height, up_direction, angled_height) {
    const hex_dist = (tile_radius * Math.sqrt(3)) / 2;
    const half_radius = tile_radius / 2;
    var top_left, bot_left, top_rght, bot_rght, left_tip, rght_tip;

    const top_height = y_height + angled_height;
    const bot_height = y_height;
    const mid_height = y_height + angled_height / 2;

    // const top_height = 0.5 + y_height;
    // const bot_height = 0.0 + y_height;
    // const mid_height = 0.25 + y_height;

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

    // up_direction = "NW";

    if (y_height < 0) {
        top_left = [top_left_x, 0, top_left_z]; // good
        bot_left = [bot_left_x, 0, bot_left_z];
        top_rght = [top_rght_x, 0, top_rght_z];
        bot_rght = [bot_rght_x, 0, bot_rght_z];
        left_tip = [left_tip_x, 0, left_tip_z];
        rght_tip = [rght_tip_x, 0, rght_tip_z];
    } else if (up_direction === "SS") {
        // S_S_UP_DIR
        top_left = [top_left_x, top_height, top_left_z]; //good
        bot_left = [bot_left_x, bot_height, bot_left_z];
        top_rght = [top_rght_x, top_height, top_rght_z];
        bot_rght = [bot_rght_x, bot_height, bot_rght_z];
        left_tip = [left_tip_x, mid_height, left_tip_z];
        rght_tip = [rght_tip_x, mid_height, rght_tip_z];
    } else if (up_direction === "SW") {
        top_left = [top_left_x, top_height, top_left_z]; //good
        bot_left = [bot_left_x, mid_height, bot_left_z];
        top_rght = [top_rght_x, mid_height, top_rght_z];
        bot_rght = [bot_rght_x, bot_height, bot_rght_z];
        left_tip = [left_tip_x, top_height, left_tip_z];
        rght_tip = [rght_tip_x, bot_height, rght_tip_z];
    } else if (up_direction === "NE") {
        top_left = [top_left_x, bot_height, top_left_z]; //good
        bot_left = [bot_left_x, mid_height, bot_left_z];
        top_rght = [top_rght_x, mid_height, top_rght_z];
        bot_rght = [bot_rght_x, top_height, bot_rght_z];
        left_tip = [left_tip_x, bot_height, left_tip_z];
        rght_tip = [rght_tip_x, top_height, rght_tip_z];
    } else if (up_direction === "NW") {
        top_left = [top_left_x, mid_height, top_left_z]; //good
        bot_left = [bot_left_x, top_height, bot_left_z];
        top_rght = [top_rght_x, bot_height, top_rght_z];
        bot_rght = [bot_rght_x, mid_height, bot_rght_z];
        left_tip = [left_tip_x, top_height, left_tip_z];
        rght_tip = [rght_tip_x, bot_height, rght_tip_z];
    } else if (up_direction === "NN") {
        top_left = [top_left_x, bot_height, top_left_z]; //good
        bot_left = [bot_left_x, top_height, bot_left_z];
        top_rght = [top_rght_x, bot_height, top_rght_z];
        bot_rght = [bot_rght_x, top_height, bot_rght_z];
        left_tip = [left_tip_x, mid_height, left_tip_z];
        rght_tip = [rght_tip_x, mid_height, rght_tip_z];
    } else if (up_direction === "SE") {
        top_left = [top_left_x, bot_height, top_left_z]; //good
        bot_left = [bot_left_x, mid_height, bot_left_z];
        top_rght = [top_rght_x, mid_height, top_rght_z];
        bot_rght = [bot_rght_x, top_height, bot_rght_z];
        left_tip = [left_tip_x, bot_height, left_tip_z];
        rght_tip = [rght_tip_x, top_height, rght_tip_z];
    }

    const hex_points = [top_left, top_rght, rght_tip, bot_rght, bot_left, left_tip];
    return hex_points;
}

function HexTile2(hex_tiles, the_scene, x_y_z, tile_colors, up_direction) {
    const [x_index, y_index, z_index, angled_height] = x_y_z;
    let [top_color, outline_color, six_side_colors] = tile_colors;
    if (six_side_colors.length == 1) {
        const one_color = six_side_colors[0];
        six_side_colors = [one_color, one_color, one_color, one_color, one_color, one_color];
    }

    let [x_position, z_position] = hexPosition(x_index, z_index);
    const tile_radius = 1;
    const a_tile = new Group();

    a_tile.position.set(x_position, 0, z_position);
    const hex_points = hexPoints(tile_radius, y_index, up_direction, angled_height);
    const top_triangles = hexTopTriangles(hex_points);
    //    geoMesh(top_triangles, a_tile, top_color, x_index, z_index, outline_color);
    geoMesh(a_tile, top_triangles, top_color, outline_color);
    //tileSides2(a_tile, hex_points, six_side_colors, outline_color);
    the_scene.add(a_tile);

    addCoords(a_tile, x_y_z, up_direction);

    const xyz_index = `${x_index},${y_index},${z_index}`;
    hex_tiles.set(xyz_index, a_tile);
    return hex_tiles;
}

function hexPosition(x_ind, y_ind) {
    const x_coord = (3 / 2) * x_ind;
    const y_coord = (sqrt_3 / 2) * x_ind + sqrt_3 * y_ind;
    return [x_coord, y_coord];
}

function HexTile(g_hex_tiles, the_scene, x, y, z, the_color) {
    //console.log("HexTile", x, y, z);
    let [xx, zz] = hexPosition(x, z);
    const radius = 1;
    let yy = y;
    const group = new Group();

    group.position.x = xx;
    group.position.y = 0;
    group.position.z = zz;

    const h = (radius * Math.sqrt(3)) / 2;

    const half_r = radius / 2;

    const top_left = [0 - half_r, yy, 0 + h];
    const bot_left = [0 - half_r, yy, 0 - h];
    const top_right = [0 + half_r, yy, 0 + h];
    const bot_right = [0 + half_r, yy, 0 - h];
    const left_tip = [0 - radius, yy, 0];
    const right_tip = [0 + radius, yy, 0];

    const square_up_left = [...bot_left, ...top_left, ...top_right];
    const square_down_right = [...bot_left, ...top_right, ...bot_right];
    const triangle_left = [...bot_left, ...left_tip, ...top_left];
    const triangle_right = [...top_right, ...right_tip, ...bot_right];

    const the_hexagon = [...square_up_left, ...square_down_right, ...triangle_left, ...triangle_right];
    // console.log("000000", x, y);
    //    geoMesh(the_hexagon, group, the_color, x, z);
    geoMesh(group, the_hexagon, the_color, x, z);

    const hex_points = [top_left, bot_left, top_right, bot_right, left_tip, right_tip];
    hexSides(group, the_color, hex_points);

    the_scene.add(group);
    const xz_index = `${x},${z}`;
    g_hex_tiles.set(xz_index, group);
    return g_hex_tiles;
}

function intTileIndex(x_float, z_float) {
    const int_x = Math.round(x_float);
    const int_z = Math.round(z_float);
    const tile_index = `${int_x},${int_z}`;
    return tile_index;
}

export { HexTile, nearTile, hexNewColor, HexTile2, flatWater, angledWater };
