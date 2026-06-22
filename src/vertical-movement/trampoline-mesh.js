import { ee, tt, EE, TT } from "../misc/console-short.js";

import {
    BOUNCE_COUNT___25,
    BOUNCE_SPEED___1,
    BOUNCE_SPEED_1_5,
    BOUNCE_SPEED___2,
    BOUNCE_SPEED_2_5,
    BOUNCE_SPEED___3,
    BOUNCE_SPEED_3_5,
    BOUNCE_SPEED___4
} from "./trampoline-const.js";

import { HEXAGON_PART } from "../values/the-constants.js";

import * as THREE from "three";

function hexToRGB(hex) {
    let rr = hex >> 16;
    let gg = (hex >> 8) & 255;
    let bb = hex & 255;
    return { r: rr, g: gg, b: bb };
}

function geometricVertices(the_vertices) {
    const float_vertices = new Float32Array(the_vertices);
    const the_geometry = new THREE.BufferGeometry(1, 1, 1); //.toNonIndexed();
    the_geometry.setAttribute("position", new THREE.Float32BufferAttribute(float_vertices, 3));
    return the_geometry;
}

function trampolineMesh(group, vertices_set, f_bounce_speed) {
    let pie_colors;
    if (f_bounce_speed == BOUNCE_SPEED___1) {
        pie_colors = PIE_COLOR___1;
    } else if (f_bounce_speed == BOUNCE_SPEED_1_5) {
        pie_colors = PIE_COLOR_1_5;
    } else if (f_bounce_speed == BOUNCE_SPEED___2) {
        pie_colors = PIE_COLOR___2;
    } else if (f_bounce_speed == BOUNCE_SPEED_2_5) {
        pie_colors = PIE_COLOR_2_5;
    } else if (f_bounce_speed == BOUNCE_SPEED___3) {
        pie_colors = PIE_COLOR___3;
    } else if (f_bounce_speed == BOUNCE_SPEED_3_5) {
        pie_colors = PIE_COLOR_3_5;
    } else {
        pie_colors = PIE_COLOR___4;
    }

    for (let i = 0; i < vertices_set.length; i += 1) {
        let a_pie = vertices_set[i];

        const side_geometry = geometricVertices(a_pie);

        const side_material = new THREE.MeshLambertMaterial({ color: pie_colors[i], opacity: 1 });

        side_material.side = THREE.DoubleSide;
        const hexagon_side = new THREE.Mesh(side_geometry, side_material);
        hexagon_side.name = HEXAGON_PART;
        group.add(hexagon_side);
    }
}

// should be in color.js
const p__white = 0xffffff;
const p___grey = 0xcccccc;
const p_violet = 0xff00ff;
const p_yellow = 0xffff00;
const p___cyan = 0x00ffff;

const PIE_COLOR___1 = [p___grey, p_violet, p___grey, p_violet, p___grey, p_violet];
const PIE_COLOR_1_5 = [p___grey, p___cyan, p___grey, p___cyan, p___grey, p___cyan];
const PIE_COLOR___2 = [p___grey, p_yellow, p___grey, p_yellow, p___grey, p_yellow];

const PIE_COLOR_2_5 = [p__white, p_violet, p__white, p_violet, p__white, p_violet];
const PIE_COLOR___3 = [p__white, p___cyan, p__white, p___cyan, p__white, p___cyan];
const PIE_COLOR_3_5 = [p__white, p_yellow, p__white, p_yellow, p__white, p_yellow];

const PIE_COLOR___4 = [p_yellow, p_yellow, p_violet, p___cyan, p_violet, p___cyan];

export { trampolineMesh };
