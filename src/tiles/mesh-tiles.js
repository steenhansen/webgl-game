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

//import { FontLoader } from "three/addons/loaders/FontLoader.js";

import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";

//import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

import { type_face } from "./helvetiker_regular.typeface.js";

var loader2 = new FontLoader();

const WHITE_LABELS = 0xffffff;
var the_font = loader2.parse(type_face);

function addCoords(a_tile, x_y_z, up_direction) {
    const [x_index, y_index, z_index, angled_height] = x_y_z;
    //  const [lean_amount, lean_direction] = lean_and_dir;
    var textMaterial = new MeshLambertMaterial({
        emissive: 0xffffff,
        color: WHITE_LABELS
    });
    var textGeometry = new TextGeometry(`${x_index},${z_index}`, {
        font: the_font,
        size: 0.2,
        depth: 0,
        curveSegments: 12
    });
    var text_mesh = new Mesh(textGeometry, textMaterial);

    // text_mesh.position.y = 2.1; // y_height + 0.0;

    if (up_direction == "") {
        text_mesh.position.y = 0.001;
    } else {
        console.log("addcords", y_index, up_direction);
        text_mesh.position.y = y_index + angled_height;
    }

    text_mesh.rotation.x = -Math.PI / 2;
    let x, z;
    if (up_direction == "") {
        x = -0.15;
        z = 0.1;
    } else if (up_direction == "NN") {
        x = -0.15;
        z = -0.55;
    } else if (up_direction == "NE") {
        x = 0.3;
        z = -0.25;
    } else if (up_direction == "SE") {
        x = 0.35;
        z = 0.4;
    } else if (up_direction == "SS") {
        x = -0.15;
        z = 0.8;
    } else if (up_direction == "SW") {
        x = -0.7;
        z = 0.4;
    } else if (up_direction == "NW") {
        x = -0.7;
        z = -0.25;
    }

    text_mesh.position.x = x;
    text_mesh.position.z = z;

    a_tile.add(text_mesh);
}

//function geoMesh(vertices_set, group, a_color, x, z, outline_color) {
function geoMesh(group, vertices_set, a_color, outline_color) {
    // console.log("geoMesh:::", group, vertices_set, a_color, outline_color);
    const side_geometry = geometricVertices(vertices_set);

    const side_material = new MeshLambertMaterial({ color: a_color, transparent: false, opacity: 1 });
    const hexagon_side = new Mesh(side_geometry, side_material);
    side_material.side = DoubleSide;

    const edges = new EdgesGeometry(side_geometry);
    const lineMaterial = new LineBasicMaterial({ color: outline_color, linewidth: 16 });
    lineMaterial.side = DoubleSide;
    const edgeLines = new LineSegments(edges, lineMaterial);
    hexagon_side.add(edgeLines);
    group.add(hexagon_side);

    //  return hexagon_side;       // so can change color later via hexagon_side.material.color.set(0xff0000);
}

function geometricVertices(the_vertices) {
    const float_vertices = new Float32Array(the_vertices);
    const the_geometry = new BufferGeometry();
    //  console.log("geometricVertices", the_vertices);
    the_geometry.setAttribute("position", new Float32BufferAttribute(float_vertices, 3));
    //console.log("geometricVertices", float_vertices);
    return the_geometry;
}

export { geoMesh, addCoords };
