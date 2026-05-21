import { ee, tt, EE, TT } from "../console-short.js";
//import { TILT_NN, TILT_SS, TILT_NW, TILT_NE, TILT_SE, TILT_SW } from "../constants.js";
import * as HEX_CONST from "../constants.js";
import * as THREE from "three";
//import { roundTrampoline } from "./circle-trampoline.js";
import { distance2hexpoints, axial_round, coords2HexIndexes, tileCenterCoord } from "../maths.js";
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

//function makeWalls(the_scene, wall_coords, walkway_meshes, wall_squares, walkway_columns, walkway_overlaps) {
function makePentagon(the_scene, object_meshes, g_pentagons) {
    var trampoline_columns = new Map();
    let the_pentagon_mesh;
    for (var i = 0; i < g_pentagons.length; i++) {
        const trampoline_data = g_pentagons[i];
        const [x_str, y_str, z_str] = trampoline_data;
        const x_index = parseInt(x_str);
        const y_index = parseInt(y_str);
        const z_index = parseInt(z_str);

        const two_circles = new Group();

        const pent_geometry = new THREE.CircleGeometry(0.8, 5);
        const pent_material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        const pent_mesh = new THREE.Mesh(pent_geometry, pent_material);
        pent_mesh.material.side = THREE.DoubleSide;
        let [x_center, z_center] = tileCenterCoord(x_index, z_index);
        pent_mesh.position.set(x_center, y_index / 100, z_center);
        pent_mesh.rotation.z = (2 * Math.PI) / 4;
        two_circles.add(pent_mesh);

        // const pent_geometry2 = new THREE.CircleGeometry(0.7, 5);
        // const pent_material2 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        // const pent_mesh2 = new THREE.Mesh(pent_geometry2, pent_material2);
        // pent_mesh2.material.side = THREE.DoubleSide;
        // //  let [x_center, z_center] = tileCenterCoord(x_index, z_index);
        // pent_mesh2.position.set(x_center, y_index / 100, z_center + 0.1);
        // pent_mesh2.rotation.z = (2 * Math.PI) / 4;
        // two_circles.add(pent_mesh2);
        // const vertices_set = [
        //     -0.5, 3.5, -0.8660254037844386, -0.5, 3.5, 0.8660254037844386, 0.5, 3.5, 0.8660254037844386, -0.5, 3.5, -0.8660254037844386, 0.5, 3.5,
        //     0.8660254037844386, 0.5, 3.5, -0.8660254037844386, -0.5, 3.5, -0.8660254037844386, -1, 3.5, 0, -0.5, 3.5, 0.8660254037844386, 0.5, 3.5,
        //     0.8660254037844386, 1, 3.5, 0, 0.5, 3.5, -0.8660254037844386
        // ];

        // function geometricVertices(the_vertices) {
        //     const float_vertices = new Float32Array(the_vertices);
        //     const the_geometry = new BufferGeometry();
        //     the_geometry.setAttribute("position", new Float32BufferAttribute(float_vertices, 3));
        //     return the_geometry;
        // }

        // const side_geometry = geometricVertices(vertices_set);
        // // const side_material = new MeshLambertMaterial({ color: "pink", transparent: false, opacity: 1 });
        // //   const hexagon_side = new Mesh(side_geometry, side_material);
        // // side_material.side = DoubleSide;

        // const edges = new EdgesGeometry(side_geometry);
        // const lineMaterial = new LineBasicMaterial({ color: 0x00ff00, linewidth: 1256 });
        // lineMaterial.side = DoubleSide;
        // const edgeLines = new LineSegments(edges, lineMaterial);

        // // hexagon_side.add(edgeLines);
        // two_circles.add(edgeLines);
        // const pent_geometry3 = new THREE.CircleGeometry(0.7, 5);
        // const pent_material3 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        // const pent_mesh3 = new THREE.Mesh(pent_geometry3, pent_material3);
        // pent_mesh3.material.side = THREE.DoubleSide;
        // // let [x_center, z_center] = tileCenterCoord(x_index, z_index);
        // pent_mesh3.position.set(x_center, y_index / 100, z_center - 0.1);
        // pent_mesh3.rotation.z = (2 * Math.PI) / 4;
        // two_circles.add(pent_mesh3);

        the_scene.add(two_circles);

        const trampoline_index = `${x_str},${y_str},${z_str}`;
        tt("dasdf", trampoline_index);
        trampoline_columns.set(trampoline_index, trampoline_index);

        the_pentagon_mesh = pent_mesh;
    }

    tt("trampoline_columns", trampoline_columns);

    return [the_pentagon_mesh, trampoline_columns];
}

export { makePentagon };
