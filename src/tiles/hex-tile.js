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


import { X_INDX, Y_INDX, Z_INDX  } from "../constants.js";

/*
 ----------------RED-X-LINE------------------------
|
|            nn
|         /--------\
|    nw /          \ n_e
|       /            \
|       \            /
|    sw \          / se     
|         \--------/
|             ss
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
    let [x_center, z_center] = tilePosition(x_index, z_index);
    const tile_radius = 1;
    const a_tile = new Group();
    a_tile.position.set(x_center, 0, z_center);
    const stair_tiles = hexPoints(tile_radius, y_height);
    const top_triangles = hexTopTriangles(stair_tiles);
    geoMesh(a_tile, top_triangles, top_color, outline_color);
    the_scene.add(a_tile);
    addCoords(a_tile, x_y_z, [0, ""]);
    const xyz_index = `${x_index},${y_height},${z_index}`;
    hex_tiles.set(xyz_index, a_tile);
    return hex_tiles;
}

function hexTopTriangles(stair_tiles) {
    const [top_left, top_right, right_tip, bot_right, bot_left, left_tip] = stair_tiles;
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
        top_left = [top_left_x, mid_height, top_left_z];
        bot_left = [bot_left_x, bot_height, bot_left_z];
        top_rght = [top_rght_x, top_height, top_rght_z];
        bot_rght = [bot_rght_x, mid_height, bot_rght_z];
        left_tip = [left_tip_x, bot_height, left_tip_z];
        rght_tip = [rght_tip_x, top_height, rght_tip_z];
    } else {
        console.log("hexPoints hhhhhhhhhhhhh  up_direction==", up_direction);
    }

    const stair_tiles = [top_left, top_rght, rght_tip, bot_rght, bot_left, left_tip];
    return stair_tiles;
}

function pushXyz(stair_overlaps, xyz_key, xyz_index) {
    if (stair_overlaps.has(xyz_key)) {
        let cur_arr = stair_overlaps.get(xyz_key);
        cur_arr.push(xyz_index);
        stair_overlaps.set(xyz_key, cur_arr);
    } else {
        stair_overlaps.set(xyz_key, [xyz_index]);
    }
    return stair_overlaps;
}

function possibleAboves(stair_overlaps, x_y_z) {
    const [x_index, y_index, z_index] = x_y_z;
    const xyz_index = `${x_index},${y_index},${z_index}`;
    let [x_center, z_center] = tilePosition(x_index, z_index);

    const x_mid = Math.floor(x_center);
    const x_low = x_mid - 1;
    const x_hih = x_mid + 1;

    const z_mid = Math.floor(z_center);
    const z_low = z_mid - 1;
    const z_hih = z_mid + 1;

    stair_overlaps = pushXyz(stair_overlaps, `${x_low},${z_low}`, xyz_index);
    stair_overlaps = pushXyz(stair_overlaps, `${x_low},${z_mid}`, xyz_index);
    stair_overlaps = pushXyz(stair_overlaps, `${x_low},${z_hih}`, xyz_index);

    stair_overlaps = pushXyz(stair_overlaps, `${x_mid},${z_low}`, xyz_index);
    stair_overlaps = pushXyz(stair_overlaps, `${x_mid},${z_mid}`, xyz_index);
    stair_overlaps = pushXyz(stair_overlaps, `${x_mid},${z_hih}`, xyz_index);

    stair_overlaps = pushXyz(stair_overlaps, `${x_hih},${z_low}`, xyz_index);
    stair_overlaps = pushXyz(stair_overlaps, `${x_hih},${z_mid}`, xyz_index);
    stair_overlaps = pushXyz(stair_overlaps, `${x_hih},${z_hih}`, xyz_index);

    return stair_overlaps;
}

// x_y_z      xyz_tile
function offsetTilePoints(stair_tiles, x_y_z, incline_and_dir, tile_points) {
    let [ tilt_up, angle_incline]=  incline_and_dir;
    const [x_index, y_index, z_index] = x_y_z;
    const xyz_index = `${x_index},${y_index},${z_index}`;
    let [x_center, z_center] = tilePosition(x_index, z_index);
    let tile_positions = [];
    for (let i = 0; i < tile_points.length; i++) {
        let tile_point = tile_points[i];
        let [x, y, z] = tile_point;
        x = x + x_center;
        z = z + z_center;
        tile_positions.push([x, y, z]);
    }

    let accross_length=0;
    if (tilt_up == "NW") {
        let bottom_point=tile_positions[1]; 
        let top_point=tile_positions[5];
        accross_length = distance2hexpoints(bottom_point, top_point);
        //     console.log('nw, accross_length', accross_length)
    }else if (tilt_up == "NE") {        
         let bottom_point=tile_positions[0]; 
        let top_point=tile_positions[2];
        accross_length = distance2hexpoints(bottom_point, top_point);
     //   console.log('NE, tile_positions', tile_positions)
     }else if (tilt_up == "SW") {        
         let bottom_point=tile_positions[0]; 
        let top_point=tile_positions[2];
        accross_length = distance2hexpoints(bottom_point, top_point);
        //console.log('se, tile_positions', tile_positions)
    
    }else if (tilt_up == "SE") {        
         let bottom_point=tile_positions[0]; 
        let top_point=tile_positions[2];
        accross_length = distance2hexpoints(bottom_point, top_point);
        //console.log('se, tile_positions', tile_positions)
    }
    var tile_obj = {
        x_center: x_center,
        y_position: y_index,
        z_center: z_center,
        tilt_up: tilt_up,
        angle_incline: angle_incline,
        accross_length: accross_length,
        tile_positions: tile_positions,
        x_z:  `${x_index},${z_index}`
    };
    stair_tiles.set(xyz_index, tile_obj);
    return stair_tiles;
}

//       HexRamp(the_scene, hex_ground, stair_meshes, , x_y_z, t
function HexRamp(stair_meshes, stair_tiles, stair_overlaps, the_scene, x_y_z, tile_colors, incline_and_dir) {
    stair_overlaps = possibleAboves(stair_overlaps, x_y_z);
    const [x_index, y_index, z_index] = x_y_z;
    const xyz_index = `${x_index},${y_index},${z_index}`;
    if (incline_and_dir == undefined) {
        incline_and_dir = ["", 0];
    }
    const [up_direction, angled_height] = incline_and_dir;
    let [top_color, outline_color] = tile_colors;
    let [x_center, z_center] = tilePosition(x_index, z_index);
    const tile_radius = 1;
    const a_tile = new Group();
    a_tile.position.set(x_center, 0, z_center);
    const tile_points = hexPoints(tile_radius, y_index, up_direction, angled_height);
    stair_tiles = offsetTilePoints(stair_tiles, x_y_z, incline_and_dir, tile_points);

    const top_triangles = hexTopTriangles(tile_points);
    //    console.log("top_tr", top_triangles);
    geoMesh(a_tile, top_triangles, top_color, outline_color);
    the_scene.add(a_tile);
    addCoords(a_tile, x_y_z, incline_and_dir);

    stair_meshes.set(xyz_index, a_tile);

    return [stair_meshes, stair_tiles, stair_overlaps];
}

function tilePosition(x_tile, z_tile) {
    const x_coord = (3 / 2) * x_tile;
    const y_coord = (sqrt_3 / 2) * x_tile + sqrt_3 * z_tile;
    return [x_coord, y_coord];
}

function intTileIndex(x_float, z_float) {
    const int_x = Math.round(x_float);
    const int_z = Math.round(z_float);
    const tile_index = `${int_x},${int_z}`;
    return tile_index;
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

function pointInHex(x_point, z_point, stair_tile) {
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
            //  console.log("SE d", se_d);
            if (se_d < 0) {
                return false;
            }
        } else {
            const ne_x1 = tile_positions[2][0];
            const ne_z1 = tile_positions[2][2];
            const ne_x2 = tile_positions[3][0];
            const ne_z2 = tile_positions[3][2];
            const ne_d = (x_point - ne_x1) * (ne_z2 - ne_z1) - (z_point - ne_z1) * (ne_x2 - ne_x1);
            //  console.log("NE d", ne_d);
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
             //  sw_d = dotsSideOfLine([x_point, z_point] cam_x_z, tile_positions[5], tile_positions[0]); // MO BETTER WAY
            const sw_d = (x_point - sw_x1) * (sw_z2 - sw_z1) - (z_point - sw_z1) * (sw_x2 - sw_x1);
            //   console.log("SW d", sw_d);
            if (sw_d < 0) {
                return false;
            }
        } else {
            const nw_x1 = tile_positions[4][0];
            const nw_z1 = tile_positions[4][2];
            const nw_x2 = tile_positions[5][0];
            const nw_z2 = tile_positions[5][2];
            const nw_d = (x_point - nw_x1) * (nw_z2 - nw_z1) - (z_point - nw_z1) * (nw_x2 - nw_x1);
            //  console.log("Nw d", nw_d);
            if (nw_d < 0) {
                return false;
            }
        }
    }
    return true;
}

/*
    crissCross([0,0,10,10], [0,1,1,0]) == 0,1
    we need it to be perp to swivel/hinge line - root 3
    https://search.brave.com/search?q=how+to+find+where+two+lines+intercept&summary=1&conversation=08dd524c9ed269cb47c84973d872341fb026

x = (x1y2−y1x2)(x3−x4)−(x1−x2)(x3y4−y3x4)
​    (x1−x2)(y3−y4)−(y1−y2)(x3−x4)
​
 
y = (x1​y2−y1x2)(y3−y4)−(y1−y2)(x3y4−y3x4)
​    (x1-x2)(y3-y4)-(y1-y2)(x3-x4)

*/
function crissCross(line_a, line_b) {
    const [x1, y1, x2, y2] = line_a;
    const [x3, y3, x4, y4] = line_b;

    const x_top = (x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4);
    const x_bot = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

    const x_ans = x_top / x_bot;

    const y_top = (x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4);
    const y_bot = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

    const y_ans = y_top / y_bot;
    return [x_ans, y_ans];
}

function findIncline(cam_pos, stair_tile){
    let cam_x = cam_pos.x;
    let cam_y = cam_pos.y;
    let cam_z = cam_pos.z;
      let cam_x_z = [cam_x, cam_z];
    let {tilt_up, angle_incline, y_position, tile_positions,accross_length}=stair_tile;
           //  console.log("findInclines", tilt_up);
    if (tilt_up=='NN'){
        let highest_z = tile_positions[0][Z_INDX];
        let lowest_z = tile_positions[3][Z_INDX];
        let total_z_width = highest_z - lowest_z;
        let z_distance_traveled = highest_z - cam_z;
        let height_increase = z_distance_traveled/total_z_width * angle_incline;
        let new_cam_y2 = y_position + height_increase+1;
        return new_cam_y2;
    }else if (tilt_up=='SS'){
        let highest_z = tile_positions[0][Z_INDX];
        let lowest_z = tile_positions[3][Z_INDX];
        let total_z_width = highest_z - lowest_z;
        let z_distance_traveled = cam_z- highest_z;
        let height_increase = z_distance_traveled/total_z_width * angle_incline;
        let new_cam_y2 = y_position + height_increase+2;
        return new_cam_y2;
    }else if (tilt_up=='NW'){
        let swivel_a=tile_positions[0]; 
        let swivel_b=tile_positions[3];
        let swivel_intercept = swivelIntercept(swivel_a, swivel_b, cam_x_z);
        let length_from_swivel2=intercept2cam(swivel_intercept, cam_x_z );
        const nw_side_2 = dotsSideOfLine(cam_x_z, swivel_a, swivel_b);
        let pixel_size = 0;
        if (nw_side_2 < 0) {
            pixel_size = accross_length/2-length_from_swivel2;
        }else{
            pixel_size = accross_length/2+length_from_swivel2;
        }
        let height_increase =angle_incline * (pixel_size/accross_length);
        let new_cam_y2 = y_position + height_increase+0.52;
        return new_cam_y2;
    }else if (tilt_up=='NE'){

        let swivel_a=tile_positions[1]; 
        let swivel_b=tile_positions[4];
        let swivel_intercept = swivelIntercept(swivel_a, swivel_b, cam_x_z);
        let length_from_swivel2=intercept2cam(swivel_intercept, cam_x_z );
        const nw_side_2 = dotsSideOfLine(cam_x_z, swivel_a, swivel_b);
        let pixel_size = 0;
        if (nw_side_2 > 0) {
            pixel_size = accross_length/2-length_from_swivel2;
        }else{
            pixel_size = accross_length/2+length_from_swivel2;
        }
        let height_increase =angle_incline * (pixel_size/accross_length);
        let new_cam_y2 = y_position + height_increase+0.52;
        return new_cam_y2;
    }else if (tilt_up=='SE'){
      //  console.log("se find tile_positions", tile_positions);
        let swivel_a=tile_positions[0]; 
        let swivel_b=tile_positions[3];
        let swivel_intercept = swivelIntercept(swivel_a, swivel_b, cam_x_z);
        let length_from_swivel2=intercept2cam(swivel_intercept, cam_x_z );
        const nw_side_2 = dotsSideOfLine(cam_x_z, swivel_a, swivel_b);
        let pixel_size = 0;
        if (nw_side_2 > 0) {
            pixel_size = accross_length/2-length_from_swivel2;
        }else{
            pixel_size = accross_length/2+length_from_swivel2;
        }
        let height_increase =angle_incline * (pixel_size/accross_length);
        let new_cam_y2 = y_position + height_increase+0.52;
        //console.log("swwwwwwwwwwwwwwww", new_cam_y2)
        return new_cam_y2;
    }else if (tilt_up=='SW'){
      //  console.log("sw find tile_positions", tile_positions);
        let swivel_a=tile_positions[1]; 
        let swivel_b=tile_positions[4];
        let swivel_intercept = swivelIntercept(swivel_a, swivel_b, cam_x_z);
        let length_from_swivel2=intercept2cam(swivel_intercept, cam_x_z );
        const nw_side_2 = dotsSideOfLine(cam_x_z, swivel_a, swivel_b);
        let pixel_size = 0;
        if (nw_side_2 < 0) {
            pixel_size = accross_length/2-length_from_swivel2;
        }else{
            pixel_size = accross_length/2+length_from_swivel2;
        }
        let height_increase =angle_incline * (pixel_size/accross_length);
        let new_cam_y2 = y_position + height_increase+0.52;
        //console.log("swwwwwwwwwwwwwwww", new_cam_y2)
        return new_cam_y2;
    }
   let new_cam_y2 =cam_y- 0.1;
    return cam_y;
}

function distance2hexpoints(hex_point_1, hex_point_2){
    let x_diff = hex_point_2[0] - hex_point_1[0];
    let z_diff = hex_point_2[2] - hex_point_1[2];
    let length = Math.sqrt(x_diff * x_diff + z_diff * z_diff);
    return length;
}

function dotsSideOfLine(cam_x_z, line_point_a, line_point_b){
    let [cam_x, cam_z]=  cam_x_z;
    const nw_x1 = line_point_a[0];
    const nw_z1 = line_point_a[2];
    const nw_x2 = line_point_b[0];
    const nw_z2 = line_point_b[2];
    const pos_or_neg = (cam_x - nw_x1) * (nw_z2 - nw_z1) - (cam_z - nw_z1) * (nw_x2 - nw_x1);
    return pos_or_neg;
}

function intercept2cam(swivel_intercept, cam_x_z){
    let [cam_x, cam_z] = cam_x_z;
    let x_diff = cam_x - swivel_intercept[0];
    let z_diff = cam_z - swivel_intercept[1];        
    let length_from_swivel = Math.sqrt(x_diff*x_diff + z_diff*z_diff);
    return length_from_swivel;
}

function swivelIntercept(swivel_a, swivel_b, cam_x_z){
    let [cam_x, cam_z] = cam_x_z;
    let x1=swivel_a[X_INDX];
    let z1=swivel_a[Z_INDX];
    let x2=swivel_b[X_INDX];    
    let z2=swivel_b[Z_INDX];
    let dx=x2-x1;
    let dz=z2-z1;
    let dAB=(dx*dx)+(dz*dz);
    let u_top = (cam_x-x1)*dx + (cam_z-z1)*dz;
    let u = u_top/dAB;
    let x=x1+ u*dx;
    let z=z1+ u*dz;
    let swivel_intercept = [x,z];
    return swivel_intercept;
}

export {findIncline, crissCross, pointInHex, HexRamp, nearTile, hexNewColor, flatWater };
