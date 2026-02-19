// https://www.redblobgames.com/grids/hexagons/

//  https://stackoverflow.com/questions/42812861/three-js-pivot-point/42866733#42866733

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

import { XyzDot } from "./a-dot.js";

const sqrt_3 = Math.sqrt(3);

const NORMAL_HEIGHT = 0;

const Y_ROTATION_AMOUNT = [256, 224, 192, 160, 128, 96, 64, 32];
const Y_ROTATION_FIX = Y_ROTATION_AMOUNT.map((y) => Math.PI / y);
const XZ_ROTATION_AMOUNT = [4, 3.5, 3, 2.5, 2, 1.5, 1, 0.5];

const X_POS_ROTATION_FIX = XZ_ROTATION_AMOUNT.map((x) => Math.PI / (2 * 8.7 * x));
const Z_POS_ROTATION_FIX = XZ_ROTATION_AMOUNT.map((z) => Math.PI / (3 * 3.4 * z));

const X_NEG_ROTATION_FIX = X_POS_ROTATION_FIX.map((x) => -x);
const Z_NEG_ROTATION_FIX = Z_POS_ROTATION_FIX.map((z) => -z);

const XY_POS_ROTATION_FIX = X_POS_ROTATION_FIX.map((x) => x * 2);

function tiltTileROW(a_tile, tilt_step, is_neg) {
    a_tile.rotation.x = X_NEG_ROTATION_FIX[tilt_step];
    a_tile.rotation.y = -Y_ROTATION_FIX[tilt_step];
    a_tile.rotation.z = Z_POS_ROTATION_FIX[tilt_step];
}

function doRowTipTile(g_hex_tiles, x, z, tip_angle, new_color) {
    const xz_index = `${x},${z}`;
    if (g_hex_tiles.has(xz_index)) {
        const recolor_tile = g_hex_tiles.get(xz_index);
        recolor_tile.userData.the_color = new_color;

        tiltTileROW(recolor_tile, tip_angle, true);

        let top_hex_group = recolor_tile.children[0];
        let new_material = top_hex_group.material.clone();
        new_material.color.setHex(new_color);
        top_hex_group.material = new_material;
        top_hex_group.material.needsUpdate = true;

        recolor_tile.userData.the_tilt = tip_angle;
    }
    return g_hex_tiles;
}
// rowTitle(g_hex_tiles, the_scene, 5, 0, 10, 0x3366ee);
function rowTilt(g_hex_tiles, the_row, start_z, end_z, base_color) {
    for (let z = start_z; z < end_z; z++) {
        doRowTipTile(g_hex_tiles, the_row, z, 7, base_color);
    }
    return g_hex_tiles;
}

///////////////////////////////////////////////////////
function columnTilt(g_hex_tiles, the_column, start_z, end_z, base_color) {
    for (let z = start_z; z < end_z; z++) {
        doColumnTipTile(g_hex_tiles, z, the_column, 7, base_color); // highest==6
    }
    return g_hex_tiles;
}

function doColumnTipTile(g_hex_tiles, x, z, tip_angle, new_color) {
    const xz_index = `${x},${z}`;
    if (g_hex_tiles.has(xz_index)) {
        const recolor_tile = g_hex_tiles.get(xz_index);
        recolor_tile.userData.the_color = new_color;

        tiltTileCOL(recolor_tile, tip_angle, true);

        let top_hex_group = recolor_tile.children[0];
        let new_material = top_hex_group.material.clone();
        new_material.color.setHex(new_color);
        top_hex_group.material = new_material;
        top_hex_group.material.needsUpdate = true;

        recolor_tile.userData.the_tilt = tip_angle;
    }
    return g_hex_tiles;
}

function tiltTileCOL(a_tile, tilt_step, is_neg) {
    //  a_tile.rotation.x = Z_NEG_ROTATION_FIX[tilt_step];
    if (is_neg) {
        a_tile.rotation.x = X_NEG_ROTATION_FIX[tilt_step];
        a_tile.rotation.y = Y_ROTATION_FIX[tilt_step];
        a_tile.rotation.z = Z_NEG_ROTATION_FIX[tilt_step];
        console.log("tiltTileCOL -", a_tile.rotation.x, a_tile.rotation.y, a_tile.rotation.z);
    } else {
        a_tile.rotation.x = X_POS_ROTATION_FIX[tilt_step];
        a_tile.rotation.y = Y_ROTATION_FIX[tilt_step];
        a_tile.rotation.z = Z_POS_ROTATION_FIX[tilt_step];
        console.log("tiltTileCOL +", a_tile.rotation.x, a_tile.rotation.y, a_tile.rotation.z);
    }
    // return [a_tile.rotation.x, a_tile.rotation.y, a_tile.rotation.z];
}
////////////////////////////////////////////////////////////

function xzTilt(g_hex_tiles, the_column, start_z, end_z, base_color) {
    for (let z = start_z; z < end_z; z++) {
        tipTileZx(g_hex_tiles, z, the_column, 7, base_color);
    }
    return g_hex_tiles;
}

function tipTileZx(g_hex_tiles, x, z, tip_angle, new_color) {
    const xz_index = `${x},${z}`;
    if (g_hex_tiles.has(xz_index)) {
        const recolor_tile = g_hex_tiles.get(xz_index);
        recolor_tile.userData.the_color = new_color;

        //tiltTile(recolor_tile, tip_angle, true);
        // recolor_tile.rotation.x = X_POS_ROTATION_FIX[tip_angle] * 1.8; // 6x0.3==1.8
        // console.log("tipTileZx", recolor_tile.rotation.x);

        recolor_tile.rotation.x = XY_POS_ROTATION_FIX[tip_angle];
        //console.log("tipTileZx", tip_angle, recolor_tile.rotation.x);

        let top_hex_group = recolor_tile.children[0];
        let new_material = top_hex_group.material.clone();
        new_material.color.setHex(new_color);
        top_hex_group.material = new_material;
        top_hex_group.material.needsUpdate = true;

        recolor_tile.userData.the_tilt = tip_angle;
    }
    return g_hex_tiles;
}
////////////////////////
function hexfield(g_hex_tiles, the_scene, start_x, end_x, base_color) {
    for (let x = start_x; x < end_x; x++) {
        g_hex_tiles = hexRow(g_hex_tiles, the_scene, x, 0, 10, base_color);
    }
    return g_hex_tiles;
}

function hexRow(g_hex_tiles, the_scene, the_row, start_z, end_z, base_color) {
    for (let z = start_z; z < end_z; z++) {
        g_hex_tiles = HexTile(g_hex_tiles, the_scene, the_row, NORMAL_HEIGHT, z, base_color);
    }
    return g_hex_tiles;
}

function HexTile(g_hex_tiles, the_scene, x, y, z, the_color) {
    //console.log("HexTile", x, y, z);
    let [xx, zz] = hexPlot(x, z);
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
    geoMesh(the_hexagon, group, the_color);

    const bot_side = tileColumnSides(bot_left, bot_right, 2);
    geoMesh(bot_side, group, colorLeft(the_color));

    const top_side = tileColumnSides(top_right, top_left, 2);
    geoMesh(top_side, group, colorRight(the_color));

    const top_right_side = tileColumnSides(right_tip, top_right, 2);
    geoMesh(top_right_side, group, colorLeft(the_color));

    const top_left_side = tileColumnSides(top_left, left_tip, 2);
    geoMesh(top_left_side, group, colorLeft(the_color));

    const bot_left_side = tileColumnSides(left_tip, bot_left, 2);
    geoMesh(bot_left_side, group, colorRight(the_color));

    const bot_right_side = tileColumnSides(bot_right, right_tip, 2);
    geoMesh(bot_right_side, group, colorRight(the_color));

    the_scene.add(group);
    const xz_index = `${x},${z}`;
    g_hex_tiles.set(xz_index, group);
    return g_hex_tiles;
}

function tileColor(g_hex_tiles, xz_color, new_color) {
    // console.log("OLD", xz_color, new_color);
    const xz_index = xz_color[0];
    if (g_hex_tiles.has(xz_index)) {
        const recolor_tile = g_hex_tiles.get(xz_index);
        let top_hex_group = recolor_tile.children[0];
        let new_material = top_hex_group.material.clone();
        new_material.color.setHex(new_color);
        top_hex_group.material = new_material;
        top_hex_group.material.needsUpdate = true;
    }
}

function tileColor2(g_hex_tiles, xz_color, new_color) {
    //console.log("NEW", xz_color, new_color);
    const xz_index = xz_color[0];

    //  console.log("xz_index", xz_index);
    //  console.log("g_hex_tiles", g_hex_tiles);
    // console.log("HAS", xz_index, g_hex_tiles.has(xz_index));
    if (g_hex_tiles.has(xz_index)) {
        //     console.log("IIIIIIIIIIIIIIIINNNNNNNNNNNNNNN");
        const recolor_tile = g_hex_tiles.get(xz_index);
        //  console.log("recolor_tile recolor_tilerecolor_tile", recolor_tile);
        let top_hex_group = recolor_tile.children[0];
        let new_material = top_hex_group.material.clone();
        new_material.color.setHex(new_color);
        top_hex_group.material = new_material;

        top_hex_group.material.needsUpdate = true;
    }
    // console.log("tile_group", tile_group.children);

    // let new_material = recolor_tile.material.clone();
    // new_material.color.setHex(new_color);
    // top_hex_group.material = new_material;

    // top_hex_group.material.needsUpdate = true;
}

function hexNewColor(g_hex_tiles, x, z, new_color) {
    //console.log("hexNewColor", x, z, new_color);
    let [xx, zz] = hexPlot(x, z);
    let xz_index = intTileIndex(xx, zz);
    if (g_hex_tiles.has(xz_index)) {
        const recolor_tile = g_hex_tiles.get(xz_index);
        recolor_tile.userData.the_color = new_color;
        //console.log("hexNewColor", x, z, new_color);
        tileColor(g_hex_tiles, recolor_tile, new_color);
    }
}

function hexFlower(g_hex_tiles, x, z, center_color, outer_color) {
    hexNewColor(g_hex_tiles, x, z, center_color);

    hexNewColor(g_hex_tiles, x + 1, z, outer_color);
    hexNewColor(g_hex_tiles, x - 1, z, outer_color);
    hexNewColor(g_hex_tiles, x, z + 1, outer_color);
    hexNewColor(g_hex_tiles, x, z - 1, outer_color);

    hexNewColor(g_hex_tiles, x + 1, z - 1, outer_color);
    hexNewColor(g_hex_tiles, x - 1, z + 1, outer_color);
}

function intTileIndex(x_float, z_float) {
    const int_x = Math.round(x_float);
    const int_z = Math.round(z_float);
    const tile_index = `${int_x},${int_z}`;
    return tile_index;
}

function hexPlot(x_ind, y_ind) {
    const x_coord = (3 / 2) * x_ind;
    const y_coord = (sqrt_3 / 2) * x_ind + sqrt_3 * y_ind;
    return [x_coord, y_coord];
}

const colorLeft = (hex) => {
    const r = hex & 0xff0000;
    const g = hex & 0x00ff00;
    const b = hex & 0x0000ff;
    const r2 = r >> 16;
    const g2 = g << 8;
    const b2 = b << 8;
    const color_left = r2 | g2 | b2;
    return color_left;
};

const colorRight = (hex) => {
    const r = hex & 0xff0000;
    const g = hex & 0x00ff00;
    const b = hex & 0x0000ff;
    const r2 = r >> 8;
    const g2 = g >> 8;
    const b2 = b << 16;
    const color_right = r2 | g2 | b2;
    return color_right;
};

function tileColumnSides(first_point, second_point, height) {
    const [x1, y1, z1] = first_point;
    const [x2, y2, z2] = second_point;

    //   const point_a_1 = [x1, y1, z1 - height];
    const point_a_1 = [x1, y1 - height, z1];
    const point_a_2 = first_point;
    const point_a_3 = second_point;

    const triangle_up_left = [...point_a_1, ...point_a_2, ...point_a_3];

    // const point_b_1 = [x1, y1, z1 - height];
    const point_b_2 = second_point;
    //    const point_b_3 = [x2, y2, z2 - height];
    const point_b_3 = [x2, y2 - height, z2];

    //    const triangle_bottom_right = [...point_b_1, ...point_b_2, ...point_b_3];
    const triangle_bottom_right = [...point_a_1, ...point_b_2, ...point_b_3];

    const square_triangles = [...triangle_up_left, ...triangle_bottom_right];
    return square_triangles;
}

function geoMesh(vertices_set, group, a_color) {
    const side_geometry = geometricVertices(vertices_set);

    // const side_material = new MeshLambertMaterial({ color: a_color, transparent: true, opacity: 0.5 });
    const side_material = new MeshLambertMaterial({ color: a_color, transparent: false, opacity: 1 });
    const hexagon_side = new Mesh(side_geometry, side_material);
    side_material.side = DoubleSide;

    //  https://search.brave.com/search?q=threejs+mesh+border&summary=1&conversation=08b70a956f5960aa7700fe375f68b66ebfa2

    //    const the_color = colorRight(a_color);

    const edges = new EdgesGeometry(side_geometry);
    const lineMaterial = new LineBasicMaterial({ color: 0xffffff, linewidth: 16 });
    lineMaterial.side = DoubleSide;
    const edgeLines = new LineSegments(edges, lineMaterial);
    hexagon_side.add(edgeLines);

    //side_material.frustumCulled = false;

    //hexagon_side.position.set(5, 0, 5);

    group.add(hexagon_side);
}

function geometricVertices(the_vertices) {
    const float_vertices = new Float32Array(the_vertices);
    const the_geometry = new BufferGeometry();
    //  console.log("geometricVertices", the_vertices);
    the_geometry.setAttribute("position", new Float32BufferAttribute(float_vertices, 3));
    //console.log("geometricVertices", float_vertices);
    return the_geometry;
}
/////////////////////////////////////////////////////
function resetTiles(covered_tiles) {
    for (const covered_tile of covered_tiles) {
        covered_tile.translateY(-0.5);
        const old_color = covered_tile.userData.the_color;
        tileColor(covered_tile, old_color);
    }
}

function settleTiles(covered_tiles) {
    for (const covered_tile of covered_tiles) {
        covered_tile.translateY(0.5);
        tileColor(covered_tile, 0xffffff);
    }
}

function coverTile(g_hex_tiles, covered_tiles, xz_index, pressed_color) {
    if (g_hex_tiles.has(xz_index)) {
        const covered_tile = g_hex_tiles.get(xz_index);
        covered_tiles.set(xz_index, pressed_color); // "12,34" => white
    }
    return covered_tiles;
}

function nearTile(g_hex_tiles, old_covered_tiles, x_float, z_float) {
    //    resetTiles(old_covered_tiles);s

    let new_covered_tiles = new Map([]);
    const middle_x = Math.round(x_float);
    const middle_z = Math.round(z_float);

    //  covered_tiles = coverTile(g_hex_tiles, covered_tiles, `${middle_x},${middle_z}`);

    new_covered_tiles = coverTile(g_hex_tiles, new_covered_tiles, `${middle_x - 1},${middle_z - 1}`, 0xff0000);
    new_covered_tiles = coverTile(g_hex_tiles, new_covered_tiles, `${middle_x},${middle_z - 1}`, 0x00ff00);
    new_covered_tiles = coverTile(g_hex_tiles, new_covered_tiles, `${middle_x + 1},${middle_z - 1}`, 0x0000ff);

    new_covered_tiles = coverTile(g_hex_tiles, new_covered_tiles, `${middle_x - 1},${middle_z}`, 0xffff00);
    new_covered_tiles = coverTile(g_hex_tiles, new_covered_tiles, `${middle_x + 1},${middle_z}`, 0x00ffff);
    //
    new_covered_tiles = coverTile(g_hex_tiles, new_covered_tiles, `${middle_x - 1},${middle_z + 1}`, 0xff00ff);
    new_covered_tiles = coverTile(g_hex_tiles, new_covered_tiles, `${middle_x},${middle_z + 1}`, 0xffffff);
    new_covered_tiles = coverTile(g_hex_tiles, new_covered_tiles, `${middle_x + 1},${middle_z + 1}`, 0x888888);
    //// console.log("new_covered_tiles", new_covered_tiles);
    // for olds
    //    if not in new then reset to old color/height
    //console.log("old_covered_tile", old_covered_tiles);
    for (const old_covered_tile of old_covered_tiles) {
        if (!new_covered_tiles.has(old_covered_tile)) {
            //  console.log("old_covered_tile", old_covered_tile, old_covered_tile[1]);
            tileColor(g_hex_tiles, old_covered_tile, old_covered_tile[1]);
        }
    }

    // for newssd
    //     if not in old then pressed color/height

    //console.log("new_covered_tiles", new_covered_tiles);

    for (const new_covered_tile of new_covered_tiles) {
        if (!old_covered_tiles.has(new_covered_tile)) {
            // console.log("new_covered_tile", new_covered_tile);
            tileColor2(g_hex_tiles, new_covered_tile, 0xffffff);
        }
    }

    return new_covered_tiles;
}
export { HexTile, nearTile, hexRow, hexfield, hexFlower, hexNewColor, rowTilt, columnTilt, xzTilt };
