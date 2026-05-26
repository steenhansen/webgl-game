import { ee, tt, EE, TT } from "../misc/console-short.js";

import {
    EdgesGeometry,
    Vector3,
    MeshPhongMaterial,
    Box3,
    InstancedMesh,
    LineBasicMaterial,
    LineSegments,
    BufferGeometry,
    Float32BufferAttribute,
    MeshLambertMaterial,
    Group,
    Color,
    Mesh,
    DoubleSide,
    RGB_ETC2_Format
} from "three";
import { Line2 } from "three/addons/lines/Line2.js";
import { LineMaterial } from "three/addons/lines/LineMaterial.js";
import { LineGeometry } from "three/addons/lines/LineGeometry.js";
// only ramp needs to be double sided

//  777700  770077 007777

function hexToRGB(hex) {
    //tt("hex", hex);

    let rr = hex >> 16;
    let gg = (hex >> 8) & 255;
    let bb = hex & 255;

    //tt("rr", rr, gg, bb);

    // // Remove the '#' character if present
    // const cleanHex = hex.replace("#", "");

    // // Parse the 2-character substrings as hexadecimal numbers
    // const r = parseInt(cleanHex.substring(0, 2), 16);
    // const g = parseInt(cleanHex.substring(2, 4), 16);
    // const b = parseInt(cleanHex.substring(4, 6), 16);

    return { r: rr, g: gg, b: bb };
}

function trampolineMeshOLD(group, vertices_set, top_color, outline_color) {
    const side_geometry = geometricVertices(vertices_set);
    const side_material = new MeshLambertMaterial({ vertexColors: true, color: 0x888888, transparent: true, opacity: 1 });

    const positionAttribute = side_geometry.getAttribute("position");
    const colors = [];
    const col_1 = hexToRGB(0x777700);
    const col_2 = hexToRGB(0x770077);
    const col_3 = hexToRGB(0x770077);

    const hex_colors = [0x770000, 0x770000, 0x007700, 0x000077, 0x000077, 0x007700];
    //[0x007700, 0x770000, 0x000077, 0x007700, 0x770000, 0x000077];
    let the_hex = 0;
    for (let i = 0; i < positionAttribute.count; i += 3) {
        const triangle_hex = hex_colors[the_hex];
        let color_obj = hexToRGB(triangle_hex);
        //   const color = new Color(Math.random(), Math.random(), Math.random());
        colors.push(color_obj.r, color_obj.g, color_obj.b);
        colors.push(color_obj.r, color_obj.g, color_obj.b);
        colors.push(color_obj.r, color_obj.g, color_obj.b);
        the_hex++;
    }
    side_geometry.setAttribute("color", new Float32BufferAttribute(colors, 3));

    const hexagon_side = new Mesh(side_geometry, side_material);
    hexagon_side.name = "Hexagon-Part";

    const geometry = new LineGeometry();

    geometry.setPositions(vertices_set);
    let matLine = new LineMaterial({
        color: 0xffff00,
        linewidth: 1, // in world units with size attenuation, pixels otherwise
        vertexColors: true,
        dashed: false,
        alphaToCoverage: true
    });

    let line = new Line2(geometry, matLine);
    line.computeLineDistances();
    line.scale.set(1, 1, 1);
    hexagon_side.add(line);
    group.add(hexagon_side);
}

function geometricVertices(the_vertices) {
    const float_vertices = new Float32Array(the_vertices);
    const the_geometry = new BufferGeometry(1, 1, 1); //.toNonIndexed();
    the_geometry.setAttribute("position", new Float32BufferAttribute(float_vertices, 3));
    return the_geometry;
}

function trampolineMesh(group, vertices_set, top_color, outline_color) {
    const side_geometry = geometricVertices(vertices_set);
    const side_material = new MeshLambertMaterial({ vertexColors: true, color: 0x888888, transparent: true, opacity: 1 });
    side_material.side = DoubleSide;
    const positionAttribute = side_geometry.getAttribute("position");
    const colors = [];
    const col_1 = hexToRGB(0x777700);
    const col_2 = hexToRGB(0x007777);
    const col_3 = hexToRGB(0x770077);

    const hex_colors = [col_1, col_1, col_3, col_2, col_2, col_3];
    let the_hex = 0;
    for (let i = 0; i < positionAttribute.count; i += 3) {
        const color_obj = hex_colors[the_hex];
        colors.push(color_obj.r, color_obj.g, color_obj.b);
        colors.push(color_obj.r, color_obj.g, color_obj.b);
        colors.push(color_obj.r, color_obj.g, color_obj.b);
        the_hex++;
    }
    side_geometry.setAttribute("color", new Float32BufferAttribute(colors, 3));

    const hexagon_side = new Mesh(side_geometry, side_material);
    hexagon_side.name = "Hexagon-Part";

    const geometry = new LineGeometry();

    geometry.setPositions(vertices_set);
    let matLine = new LineMaterial({
        color: 0x888888,
        linewidth: 8, // in world units with size attenuation, pixels otherwise
        vertexColors: false,
        dashed: false,
        alphaToCoverage: true
    });

    let line = new Line2(geometry, matLine);
    line.computeLineDistances();
    line.scale.set(1, 1, 1);
    hexagon_side.add(line);
    group.add(hexagon_side);
}

export { trampolineMesh };
