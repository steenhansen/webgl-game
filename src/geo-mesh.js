import { ee, tt, EE, TT } from "./misc/console-short.js";

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
import { Line2 } from "three/addons/lines/Line2.js";
import { LineMaterial } from "three/addons/lines/LineMaterial.js";
import { LineGeometry } from "three/addons/lines/LineGeometry.js";
// only ramp needs to be double sided
function geoMesh(group, vertices_set, start_color, outline_color) {
    const side_geometry = geometricVertices(vertices_set);
    const side_material = new MeshLambertMaterial({ color: start_color, opacity: 1 });
    const hexagon_side = new Mesh(side_geometry, side_material);
    hexagon_side.name = "Hexagon-Part";
    side_material.side = DoubleSide;

    const edges = new EdgesGeometry(side_geometry);
    const lineMaterial = new LineBasicMaterial({ color: outline_color, linewidth: 8 });
    lineMaterial.side = DoubleSide;
    const edgeLines = new LineSegments(edges, lineMaterial);
    hexagon_side.add(edgeLines);

    // const geometry = new LineGeometry();
    // geometry.setPositions(vertices_set);
    // // geometry.setColors(#646cff);

    // let matLine = new LineMaterial({
    //     color: 0xcccccc,
    //     linewidth: 10, // in world units with size attenuation, pixels otherwise
    //     vertexColors: false,

    //     dashed: false,
    //     alphaToCoverage: true
    // });

    // let line = new Line2(geometry, matLine);
    // line.computeLineDistances();
    // line.scale.set(1, 1, 1);
    // //  scene.add(line);
    // hexagon_side.add(line);
    ////////////////

    group.add(hexagon_side);
}

function geometricVertices(the_vertices) {
    const float_vertices = new Float32Array(the_vertices);
    const the_geometry = new BufferGeometry();
    the_geometry.setAttribute("position", new Float32BufferAttribute(float_vertices, 3));
    return the_geometry;
}
export { geoMesh };
