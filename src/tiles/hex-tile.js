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

import { nearTile } from "./hover-tiles.js";

import { geoMesh, addCoords } from "./mesh-tiles.js";
import { tiltTile } from "./tilt-tiles.js";

//import { hexSides, tileSides2, tileColumnSides } from "./sides-tiles.js";
//import { hexNewColor, colorLeft, colorRight } from "./colors-tiles.js";
import { hexNewColor } from "./colors-tiles.js";
//import { XyzDot } from "../a-dot.js";

const sqrt_3 = Math.sqrt(3);

function flatWater(hex_tiles, the_scene, x_y_z, tile_colors) {
    const [x_index, y_height, z_index] = x_y_z;
    let [top_color, outline_color] = tile_colors;
    let [x_position, z_position] = hexPosition(x_index, z_index);
    const tile_radius = 1;
    const a_tile = new Group();
    a_tile.position.set(x_position, 0, z_position);
    const hex_points = hexPoints(tile_radius, y_height);
    const top_triangles = hexTopTriangles(hex_points);
    geoMesh(a_tile, top_triangles, top_color, outline_color);
    the_scene.add(a_tile);
    addCoords(a_tile, x_y_z, [0, ""]);
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

function hexPoints(tile_radius, y_height, up_direction, angled_height) {
    const hex_dist = (tile_radius * Math.sqrt(3)) / 2;
    const half_radius = tile_radius / 2;
    var top_left, bot_left, top_rght, bot_rght, left_tip, rght_tip;

    const top_height = y_height + angled_height;
    const bot_height = y_height;
    const mid_height = y_height + angled_height / 2;

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

    if (y_height < 0) {
        top_left = [top_left_x, -0.01, top_left_z];
        bot_left = [bot_left_x, -0.01, bot_left_z];
        top_rght = [top_rght_x, -0.01, top_rght_z];
        bot_rght = [bot_rght_x, -0.01, bot_rght_z];
        left_tip = [left_tip_x, -0.01, left_tip_z];
        rght_tip = [rght_tip_x, -0.01, rght_tip_z];
    } else if (up_direction === "") {
        top_left = [top_left_x, y_height, top_left_z];
        bot_left = [bot_left_x, y_height, bot_left_z];
        top_rght = [top_rght_x, y_height, top_rght_z];
        bot_rght = [bot_rght_x, y_height, bot_rght_z];
        left_tip = [left_tip_x, y_height, left_tip_z];
        rght_tip = [rght_tip_x, y_height, rght_tip_z];
    } else if (up_direction === "SS") {
        top_left = [top_left_x, top_height, top_left_z];
        bot_left = [bot_left_x, bot_height, bot_left_z];
        top_rght = [top_rght_x, top_height, top_rght_z];
        bot_rght = [bot_rght_x, bot_height, bot_rght_z];
        left_tip = [left_tip_x, mid_height, left_tip_z];
        rght_tip = [rght_tip_x, mid_height, rght_tip_z];
    } else if (up_direction === "SW") {
        top_left = [top_left_x, top_height, top_left_z];
        bot_left = [bot_left_x, mid_height, bot_left_z];
        top_rght = [top_rght_x, mid_height, top_rght_z];
        bot_rght = [bot_rght_x, bot_height, bot_rght_z];
        left_tip = [left_tip_x, top_height, left_tip_z];
        rght_tip = [rght_tip_x, bot_height, rght_tip_z];
    } else if (up_direction === "NE") {
        top_left = [top_left_x, bot_height, top_left_z];
        bot_left = [bot_left_x, mid_height, bot_left_z];
        top_rght = [top_rght_x, mid_height, top_rght_z];
        bot_rght = [bot_rght_x, top_height, bot_rght_z];
        left_tip = [left_tip_x, bot_height, left_tip_z];
        rght_tip = [rght_tip_x, top_height, rght_tip_z];
    } else if (up_direction === "NW") {
        top_left = [top_left_x, mid_height, top_left_z];
        bot_left = [bot_left_x, top_height, bot_left_z];
        top_rght = [top_rght_x, bot_height, top_rght_z];
        bot_rght = [bot_rght_x, mid_height, bot_rght_z];
        left_tip = [left_tip_x, top_height, left_tip_z];
        rght_tip = [rght_tip_x, bot_height, rght_tip_z];
    } else if (up_direction === "NN") {
        top_left = [top_left_x, bot_height, top_left_z];
        bot_left = [bot_left_x, top_height, bot_left_z];
        top_rght = [top_rght_x, bot_height, top_rght_z];
        bot_rght = [bot_rght_x, top_height, bot_rght_z];
        left_tip = [left_tip_x, mid_height, left_tip_z];
        rght_tip = [rght_tip_x, mid_height, rght_tip_z];
    } else if (up_direction === "SE") {
        top_left = [top_left_x, bot_height, top_left_z];
        bot_left = [bot_left_x, mid_height, bot_left_z];
        top_rght = [top_rght_x, mid_height, top_rght_z];
        bot_rght = [bot_rght_x, top_height, bot_rght_z];
        left_tip = [left_tip_x, bot_height, left_tip_z];
        rght_tip = [rght_tip_x, top_height, rght_tip_z];
    } else {
        console.log("hexPoints hhhhhhhhhhhhh  up_direction==", up_direction);
    }

    const hex_points = [top_left, top_rght, rght_tip, bot_rght, bot_left, left_tip];
    return hex_points;
}

function HexRamp(hex_tiles, the_scene, x_y_z, tile_colors, incline_and_dir) {
    const [x_index, y_index, z_index] = x_y_z;
    if (incline_and_dir == undefined) {
        incline_and_dir = ["", 0];
    }
    const [up_direction, angled_height] = incline_and_dir;
    let [top_color, outline_color] = tile_colors;
    let [x_position, z_position] = hexPosition(x_index, z_index);
    //  console.log("x z ", x_position, z_position); //x z  6 5.196152422706632

    const tile_radius = 1; // VERTICAL SPACE== 0.8660254037844386

    //   5.196152422706632
    // + 0.803671574711959
    // ==1
    //const tile_radius = 0.928; //   0.8038  0.803671574711959

    const a_tile = new Group();
    a_tile.position.set(x_position, 0, z_position);
    const hex_points = hexPoints(tile_radius, y_index, up_direction, angled_height);
    //console.log("hex_points", x_y_z, hex_points);

    const x_middle = Math.floor(x_position);
    const x_low = x_middle - 1;
    const x_high = x_middle + 1;

    const z_middle = Math.floor(z_position);
    const z_low = z_middle - 1;
    const z_high = z_middle + 1;

    console.log("----------------------------------------");

    console.log("x_z", x_y_z, x_position, z_position);
    console.log("xs", x_low, x_middle, x_high);
    console.log("zs", z_low, z_middle, z_high);

    for (var i = 0; i < hex_points.length; i++) {
        let [ax, _y, az] = hex_points[i];
        let nx = ax + x_position;
        let nz = az + z_position;
        console.log(nx, "-", nz);
        if (x_low > nx && x_high < nx) {
            console.log("bad xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
        }
        if (z_low > nz && z_high < nz) {
            console.log("bad zZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ");
        }
    }

    const top_triangles = hexTopTriangles(hex_points);
    //    console.log("top_tr", top_triangles);
    geoMesh(a_tile, top_triangles, top_color, outline_color);
    the_scene.add(a_tile);
    addCoords(a_tile, x_y_z, incline_and_dir);
    const xyz_index = `${x_index},${y_index},${z_index}`;
    hex_tiles.set(xyz_index, a_tile);

    return hex_tiles;
}

function hexPosition(x_ind, y_ind) {
    const x_coord = (3 / 2) * x_ind;
    const y_coord = (sqrt_3 / 2) * x_ind + sqrt_3 * y_ind;
    return [x_coord, y_coord];
}

function intTileIndex(x_float, z_float) {
    const int_x = Math.round(x_float);
    const int_z = Math.round(z_float);
    const tile_index = `${int_x},${int_z}`;
    return tile_index;
}

export { HexRamp, nearTile, hexNewColor, flatWater };
