const Y_ROTATION_AMOUNT = [256, 224, 192, 160, 128, 96, 64, 32];
const Y_ROTATION_FIX = Y_ROTATION_AMOUNT.map((y) => Math.PI / y);

const XZ_ROTATION_AMOUNT = [44, 2.2, 1.6, 1.2, 1, 0.7, 0.6, 0.5];

const X_POS_ROTATION_FIX = XZ_ROTATION_AMOUNT.map((x) => Math.PI / (2 * 8.7 * x));
const Z_POS_ROTATION_FIX = XZ_ROTATION_AMOUNT.map((z) => Math.PI / (3 * 3.4 * z));

const X_NEG_ROTATION_FIX = X_POS_ROTATION_FIX.map((x) => -x);
const Z_NEG_ROTATION_FIX = Z_POS_ROTATION_FIX.map((z) => -z);

const XY_POS_ROTATION_FIX = X_POS_ROTATION_FIX.map((x) => x * 2);

const X_ROT_FIX = XZ_ROTATION_AMOUNT.map((x) => -Math.PI / (18.5 * x));
const Z_ROT_FIX = XZ_ROTATION_AMOUNT.map((z) => -Math.PI / (10.2 * z));

function tiltTile(a_tile, lean_and_dir) {
    // console.log("titleTile", a_tile, lean_and_dir);
    if (lean_and_dir == 0) {
        a_tile.rotation.set(0, 0, 0);
        return [0, 0, 0];
    }
    const [lean_amount, lean_direction] = lean_and_dir;
    if (lean_amount == 0) {
        a_tile.rotation.set(0, 0, 0);
        return [0, 0, 0];
    }
    const lean_offset = lean_amount - 1; // 0 is flat, from 1-8 are leans
    //console.log("titleTiled", lean_amount, lean_direction);
    let x, y, z;
    if (lean_direction === "NN") {
        x = XY_POS_ROTATION_FIX[lean_offset];
        y = 0;
        z = 0;
    } else if (lean_direction === "SW") {
        x = X_NEG_ROTATION_FIX[lean_offset]; // BAD
        y = Y_ROTATION_FIX[lean_offset];
        z = Z_NEG_ROTATION_FIX[lean_offset];
    } else if (lean_direction === "NE") {
        x = X_POS_ROTATION_FIX[lean_offset];
        y = Y_ROTATION_FIX[lean_offset];
        z = Z_POS_ROTATION_FIX[lean_offset];
    } else if (lean_direction === "NW") {
        //         const X_POS_ROTATION_FIXq = XZ_ROTATION_AMOUNT.map((x) => Math.PI / (2 * 8.7 * x));
        // const Z_POS_ROTATION_FIXq = XZ_ROTATION_AMOUNT.map((z) => Math.PI / (3 * 3.4 * z));

        //        const X_POS_ROTATION_FIXq = XZ_ROTATION_AMOUNT.map((x) => Math.PI / (19 * x));
        //      const Z_POS_ROTATION_FIXq = XZ_ROTATION_AMOUNT.map((z) => Math.PI / (12.5 * z));
        const X_POS_ROTATION_FIXq = XZ_ROTATION_AMOUNT.map((x) => (Math.PI / 12) * 1);
        const Z_POS_ROTATION_FIXq = XZ_ROTATION_AMOUNT.map((z) => (Math.PI / 12) * 1);

        const X_NEG_ROTATION_FIXq = X_POS_ROTATION_FIXq.map((x) => -x);
        const Z_NEG_ROTATION_FIXq = Z_POS_ROTATION_FIXq.map((z) => -z);

        x = Math.PI / 12 / 12; //X_POS_ROTATION_FIXq[lean_offset]; // BAD
        y = 0; //Math.PI / 12 / 12; //Y_ROTATION_FIX[lean_offset];
        z = 0; //Math.PI / 12 / 12; //Z_NEG_ROTATION_FIXq[lean_offset];

        // x = Math.PI / 12;
        // y = 0;
        // z = 0;
        console.log("NW");
    } else if (lean_direction === "SS") {
        x = -XY_POS_ROTATION_FIX[lean_offset];
        y = 0;
        z = 0;
    } else if (lean_direction === "SE") {
        x = X_NEG_ROTATION_FIX[lean_offset]; // BAD
        y = -Y_ROTATION_FIX[lean_offset];
        z = Z_POS_ROTATION_FIX[lean_offset];
    }
    a_tile.rotation.set(x, y, z);
    return [x, y, z];
}

function tiltTileROW2(tilt_step, is_neg) {
    let x, y, z;
    if (is_neg) {
        x = X_NEG_ROTATION_FIX[tilt_step]; // n_n
        y = -Y_ROTATION_FIX[tilt_step];
        z = Z_POS_ROTATION_FIX[tilt_step]; // s_s
    } else {
        x = X_POS_ROTATION_FIX[tilt_step];
        y = Y_ROTATION_FIX[tilt_step];
        z = Z_NEG_ROTATION_FIX[tilt_step];
    }
    return [x, y, z];
}

function doRowTipTile(g_hex_tiles, x, z, tip_angle, is_neg, new_color) {
    const xz_index = `${x},${z}`;
    if (g_hex_tiles.has(xz_index)) {
        const recolor_tile = g_hex_tiles.get(xz_index);
        recolor_tile.userData.the_color = new_color;

        const xyz_rot = tiltTileROW2(tip_angle, is_neg);
        recolor_tile.rotation.set(...xyz_rot);

        let top_hex_group = recolor_tile.children[0];
        let new_material = top_hex_group.material.clone();
        new_material.color.setHex(new_color);
        top_hex_group.material = new_material;
        top_hex_group.material.needsUpdate = true;

        recolor_tile.userData.the_tilt = tip_angle;
    }
    return g_hex_tiles;
}

///////////////////////////////////////////////////////

// s_e, n_w
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
        //  console.log("tiltTileCOL -", a_tile.rotation.x, a_tile.rotation.y, a_tile.rotation.z);
    } else {
        a_tile.rotation.x = X_POS_ROTATION_FIX[tilt_step];
        a_tile.rotation.y = Y_ROTATION_FIX[tilt_step];
        a_tile.rotation.z = Z_POS_ROTATION_FIX[tilt_step];
        // console.log("tiltTileCOL +", a_tile.rotation.x, a_tile.rotation.y, a_tile.rotation.z);
    }
    // return [a_tile.rotation.x, a_tile.rotation.y, a_tile.rotation.z];
}
////////////////////////////////////////////////////////////

// sw n_e
function tipTileZx(g_hex_tiles, x, z, tip_angle, new_color) {
    const xz_index = `${x},${z}`;
    if (g_hex_tiles.has(xz_index)) {
        const recolor_tile = g_hex_tiles.get(xz_index);
        recolor_tile.userData.the_color = new_color;

        recolor_tile.rotation.x = XY_POS_ROTATION_FIX[tip_angle];

        let top_hex_group = recolor_tile.children[0];
        let new_material = top_hex_group.material.clone();
        new_material.color.setHex(new_color);
        top_hex_group.material = new_material;
        top_hex_group.material.needsUpdate = true;

        recolor_tile.userData.the_tilt = tip_angle;
    }
    return g_hex_tiles;
}

export { tipTileZx, doColumnTipTile, doRowTipTile, tiltTile };
