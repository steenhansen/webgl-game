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

export { nearTile };
