import { BoxGeometry , MeshStandardMaterial, Mesh} from 'three';

function ACube(xyz_pos, the_color, the_roughness) {
  const cube_geometry = new BoxGeometry(...xyz_pos);
  const cube_material = new MeshStandardMaterial({ 
    color: the_color,
    roughness: the_roughness
  });
  const a_cube = new Mesh(cube_geometry, cube_material);
  return a_cube;
}

export { ACube };