import * as THREE from "three";

function ACube(xyz_pos, the_color, the_roughness) {
    const cube_geometry = new THREE.BoxGeometry(...xyz_pos);
    const cube_material = new THREE.MeshStandardMaterial({
        color: the_color,
        roughness: the_roughness
    });
    const a_cube = new THREE.Mesh(cube_geometry, cube_material);
    return a_cube;
}

export { ACube };
