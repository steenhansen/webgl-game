import { geoMesh } from "./mesh-tiles.js";
import { hexNewColor, colorLeft, colorRight } from "./colors-tiles.js";

function tileSides2(a_tile, stair_tiles, six_side_colors, outline_color) {
    const [color_1, color_2, color_3, color_4, color_5, color_6] = six_side_colors;
    const [top_left, top_right, right_tip, bot_right, bot_left, left_tip] = stair_tiles;

    const ss_side = tileColumnSides(top_right, top_left, 2);
    geoMesh(a_tile, ss_side, color_4, outline_color); // lean into  ss !!!!    XXXXXXXXXX

    const se_side = tileColumnSides(right_tip, top_right, 2); // lean into se!!!!!
    geoMesh(a_tile, se_side, color_3, outline_color);

    const ne_side = tileColumnSides(bot_right, right_tip, 2); // lean into ne !!!!
    geoMesh(a_tile, ne_side, color_2, outline_color);

    const nn_side = tileColumnSides(bot_left, bot_right, 2); //  lean into nn !!!!!    XXXXXXXXXX
    geoMesh(a_tile, nn_side, color_1, outline_color);

    const nw_side = tileColumnSides(left_tip, bot_left, 2); // lean into  nw !!!!!
    geoMesh(a_tile, nw_side, color_6, outline_color);

    const sw_side = tileColumnSides(top_left, left_tip, 2); // lean into sw !!!!
    geoMesh(a_tile, sw_side, color_5, outline_color);
}

function hexSides(group, the_color, stair_tiles) {
    const [top_left, bot_left, top_right, bot_right, left_tip, right_tip] = stair_tiles;

    const bot_side = tileColumnSides(bot_left, bot_right, 2);
    geoMesh(group, bot_side, colorLeft(the_color));

    const top_side = tileColumnSides(top_right, top_left, 2);
    geoMesh(group, top_side, colorRight(the_color));

    const top_right_side = tileColumnSides(right_tip, top_right, 2);
    geoMesh(group, top_right_side, colorLeft(the_color));

    const top_left_side = tileColumnSides(top_left, left_tip, 2);
    geoMesh(group, top_left_side, colorLeft(the_color));

    const bot_left_side = tileColumnSides(left_tip, bot_left, 2);
    geoMesh(group, bot_left_side, colorRight(the_color));

    const bot_right_side = tileColumnSides(bot_right, right_tip, 2);
    geoMesh(group, bot_right_side, colorRight(the_color));
}

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

export { hexSides, tileColumnSides, tileSides2 };
