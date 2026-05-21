import { ee, tt, EE, TT } from "./console-short.js";

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
    Mesh,
    DoubleSide,
    RGB_ETC2_Format
} from "three";

// only ramp needs to be double sided
function geoMesh(group, vertices_set, a_color) {
    //  tt("geoMesh", vertices_set);
    const side_geometry = geometricVertices(vertices_set);
    const side_material = new MeshLambertMaterial({ color: a_color, transparent: false, opacity: 1 });
    const hexagon_side = new Mesh(side_geometry, side_material);
    side_material.side = DoubleSide;

    const edges = new EdgesGeometry(side_geometry);
    const lineMaterial = new LineBasicMaterial({ color: a_color, linewidth: 256 });
    lineMaterial.side = DoubleSide;
    const edgeLines = new LineSegments(edges, lineMaterial);

    hexagon_side.add(edgeLines);
    group.add(hexagon_side);
    //  return hexagon_side;       // so can change color later via hexagon_side.material.color.set(0xff0000);
}

function geometricVertices(the_vertices) {
    const float_vertices = new Float32Array(the_vertices);
    const the_geometry = new BufferGeometry();
    the_geometry.setAttribute("position", new Float32BufferAttribute(float_vertices, 3));
    return the_geometry;
}
export { geoMesh };
