import { ee, tt, EE, TT } from "../misc/console-short.js";
import * as THREE from "three";
import { HEXAGON_PART } from "../values/the-constants.js";

// only ramp needs to be double sided
function intToHexBGR(intColor) {
    let r = (intColor & 0xff) << 16;
    let g = intColor & 0xff00;
    let b = (intColor & 0xff0000) >>> 16;
    let combined = r | g | b;
    return "#" + (combined >>> 0).toString(16).padStart(6, "0");
}

function tileMesh(group, vertices_set, start_color, outline_color, is_transparent) {
    const side_geometry = geometricVertices(vertices_set);
    let side_material;
    if (is_transparent) {
        side_material = new THREE.MeshLambertMaterial({ color: start_color, opacity: 0.3, transparent: true });
    } else {
        side_material = new THREE.MeshLambertMaterial({ color: start_color, opacity: 1 });
    }
    side_material.side = THREE.DoubleSide;
    const hexagon_side = new THREE.Mesh(side_geometry, side_material);
    hexagon_side.name = HEXAGON_PART;

    const edges = new THREE.EdgesGeometry(side_geometry);
    const lineMaterial = new THREE.LineBasicMaterial({ color: outline_color, linewidth: 8 });
    lineMaterial.side = THREE.DoubleSide;
    const edgeLines = new THREE.LineSegments(edges, lineMaterial);
    hexagon_side.add(edgeLines);
    group.add(hexagon_side);
}

function geometricVertices(the_vertices) {
    const float_vertices = new Float32Array(the_vertices);
    const the_geometry = new THREE.BufferGeometry();
    the_geometry.setAttribute("position", new THREE.Float32BufferAttribute(float_vertices, 3));
    return the_geometry;
}
export { tileMesh };
