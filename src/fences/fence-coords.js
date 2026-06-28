import { ee, tt, dd, EE, TT, DD } from "../misc/console-short.js";
import * as THREE from "three";

import { tileCenterCoord } from "../misc/hex-maths.js";
import { IS_TRANSPARENT, FENCE_PART, FENCE_NN, FENCE_SS, FENCE_NW, FENCE_NE, FENCE_SE, FENCE_SW, SQRT_3 } from "../values/the-constants.js";

function fenceMesh(fence_group, vertices_list, core_color, edge_color, is_transparent) {
    const core_geometry = coreGeometry(vertices_list);
    let core_material;
    if (is_transparent == IS_TRANSPARENT) {
        core_material = new THREE.MeshLambertMaterial({ color: core_color, opacity: 0.3, transparent: true });
    } else {
        core_material = new THREE.MeshLambertMaterial({ color: core_color, opacity: 1 });
    }
    core_material.side = THREE.DoubleSide;
    const fence_mesh = new THREE.Mesh(core_geometry, core_material);
    fence_mesh.name = FENCE_PART;
    const edge_geometry = new THREE.EdgesGeometry(core_geometry);
    const edge_material = new THREE.LineBasicMaterial({ color: edge_color });
    edge_material.side = THREE.DoubleSide;
    const fence_lines = new THREE.LineSegments(edge_geometry, edge_material);
    fence_mesh.add(fence_lines);
    fence_group.add(fence_mesh);
}

function coreGeometry(vertices_list) {
    const float_vertices = new Float32Array(vertices_list);
    const core_geometry = new THREE.BufferGeometry();
    core_geometry.setAttribute("position", new THREE.Float32BufferAttribute(float_vertices, 3));
    return core_geometry;
}

function opposingFenceLocation(fence_position) {
    let opposing_location;
    if (fence_position == FENCE_NW) {
        opposing_location = FENCE_SE;
    } else if (fence_position == FENCE_NN) {
        opposing_location = FENCE_SS;
    } else if (fence_position == FENCE_NE) {
        opposing_location = FENCE_SW;
    } else if (fence_position == FENCE_SE) {
        opposing_location = FENCE_NW;
    } else if (fence_position == FENCE_SS) {
        opposing_location = FENCE_NN;
    } else if (fence_position == FENCE_SW) {
        opposing_location = FENCE_NE;
    }
    return opposing_location;
}

function corePaneTriangles(pane_points) {
    const [top_left, top_right, bot_right, bot_left] = pane_points;
    const square_up_left = [...bot_left, ...top_left, ...top_right];
    const square_down_right = [...bot_left, ...top_right, ...bot_right];
    const pain_triangle_list = [...square_up_left, ...square_down_right];
    return pain_triangle_list;
}

function hex2Fence(o_fence_walls, mesh_index, x_y_z_a, fence_position, fence_vertices) {
    const [x_index, y_index, z_index] = x_y_z_a;
    const xyz_index = `${x_index},${y_index},${z_index}`;
    let [x_center, z_center] = tileCenterCoord(x_index, z_index);
    let shifted_vertices = [];
    for (let i = 0; i < fence_vertices.length; i++) {
        let tile_point = fence_vertices[i];
        if (Array.isArray(tile_point)) {
            let [x, y, z] = tile_point;
            x = x + x_center;
            z = z + z_center;
            shifted_vertices.push([x, y, z]);
        }
    }
    let top_coord_y = shifted_vertices[3][1];
    let bottom_coord_y = shifted_vertices[0][1];
    var fence_obj = {
        x_center: x_center,
        y_position: y_index,
        z_center: z_center,
        fence_side: fence_position,
        fence_vertices: shifted_vertices,
        x_z: `${x_index},${z_index}`,
        xyz_index: xyz_index,
        high_y: top_coord_y,
        low_y: bottom_coord_y
    };
    o_fence_walls.set(mesh_index, fence_obj);
    return o_fence_walls;
}

function corePanePoints(tile_radius, y_100_height, fence_position, fence_height_1000) {
    const fence_height = fence_height_1000 / 1000;
    const y_height = y_100_height / 100;
    const hex_dist = (tile_radius * SQRT_3) / 2;
    const half_radius = tile_radius / 2;

    const top_height = y_height + fence_height;
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

    let top_left, bot_left, top_rght, bot_rght;
    if (fence_position === FENCE_NN) {
        // bot_rght = [bot_rght_x, bot_height, bot_rght_z];
        // bot_left = [bot_left_x, bot_height, bot_left_z];
        // top_rght = [bot_rght_x, top_height, bot_rght_z];
        // top_left = [bot_left_x, top_height, bot_left_z];
        top_rght = [bot_rght_x, bot_height, bot_rght_z];
        top_left = [bot_left_x, bot_height, bot_left_z];
        bot_rght = [bot_rght_x, top_height, bot_rght_z];
        bot_left = [bot_left_x, top_height, bot_left_z];
    } else if (fence_position === FENCE_NE) {
        bot_left = [bot_rght_x, top_height, bot_rght_z];
        bot_rght = [rght_tip_x, top_height, rght_tip_z];
        top_left = [bot_rght_x, bot_height, bot_rght_z];
        top_rght = [rght_tip_x, bot_height, rght_tip_z];
    } else if (fence_position === FENCE_SW) {
        bot_left = [top_left_x, top_height, top_left_z];
        bot_rght = [left_tip_x, top_height, left_tip_z];
        top_left = [top_left_x, bot_height, top_left_z];
        top_rght = [left_tip_x, bot_height, left_tip_z];
    } else if (fence_position === FENCE_NW) {
        bot_left = [bot_left_x, top_height, bot_left_z];
        bot_rght = [left_tip_x, top_height, left_tip_z];
        top_left = [bot_left_x, bot_height, bot_left_z];
        top_rght = [left_tip_x, bot_height, left_tip_z];
    } else if (fence_position === FENCE_SE) {
        bot_left = [top_rght_x, top_height, top_rght_z];
        bot_rght = [rght_tip_x, top_height, rght_tip_z];
        top_rght = [rght_tip_x, bot_height, rght_tip_z];
        top_left = [top_rght_x, bot_height, top_rght_z];
    } else if (fence_position === FENCE_SS) {
        top_left = [top_left_x, bot_height, top_left_z];
        top_rght = [top_rght_x, bot_height, top_rght_z];
        bot_rght = [top_rght_x, top_height, top_rght_z];
        bot_left = [top_left_x, top_height, top_left_z];
    } else {
        ee("corePanePoints() unknown fence_position==", fence_position);
    }
    const fence_corners = [top_left, top_rght, bot_rght, bot_left];
    return fence_corners;
}

export { opposingFenceLocation, corePanePoints, hex2Fence, corePaneTriangles, fenceMesh };
