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

function hexNewColor(g_hex_tiles, x, z, new_color) {
    let [xx, zz] = hexPosition(x, z);
    let xz_index = intTileIndex(xx, zz);
    if (g_hex_tiles.has(xz_index)) {
        const recolor_tile = g_hex_tiles.get(xz_index);
        recolor_tile.userData.the_color = new_color;
        tileColor(g_hex_tiles, recolor_tile, new_color);
    }
}

export { hexNewColor, colorLeft, colorRight };
