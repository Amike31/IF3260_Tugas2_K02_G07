interface ICameraProps {
  oldCameraX: number;
  oldCameraY: number;
  oldCameraZ: number;
  viewMatrix: number[];
  projMatrix: number[];
  oldHorizontal: number;
  oldVertical: number;
}

class Camera {
  public oldCameraX: number;
  public oldCameraY: number;
  public oldCameraZ: number;
  public viewMatrix: number[];
  public projMatrix: number[];
  public oldHorizontal: number;
  public oldVertical: number;
  public totalCameraX: number = 0;
  public totalCameraY: number = 0;
  public totalCameraZ: number = 0;

  constructor(props: ICameraProps) {
    this.oldCameraX = props.oldCameraX;
    this.oldCameraY = props.oldCameraY;
    this.oldCameraZ = props.oldCameraZ;
    this.viewMatrix = props.viewMatrix;
    this.projMatrix = props.projMatrix;
    this.oldHorizontal = props.oldHorizontal;
    this.oldVertical = props.oldVertical;
  }

  zoom(value: number) {
    const oldViewMat = this.viewMatrix.slice();
    const vec = [0, 0, value / 4, 0];

    const rotXmat = affine_rotation_x(this.oldCameraX);
    const rotYmat = affine_rotation_y(this.oldCameraY);
    const rotZmat = affine_rotation_z(this.oldCameraZ);

    const vecX = mulMatVec(rotXmat, vec);
    const vecY = mulMatVec(rotYmat, vecX);
    const vecZ = mulMatVec(rotZmat, vecY);

    console.log("vecZ", vecZ);

    const multiplied = multiply_matrix_by_array(
      affine_translation(vecZ[0], vecZ[1], vecZ[2]),
      oldViewMat
    );
    this.viewMatrix = multiplied;
  }

  rotate(axis: string, value: number) {
    // Adjust the value to fit UI of Web
    value /= 55;
    let rotate_value: number = 0;
    if (axis === "x") {
      rotate_value = value - this.oldCameraX;
      this.oldCameraX = value;
      this.viewMatrix = multiply_matrix_by_array(
        affine_rotation_x(rotate_value),
        this.viewMatrix
      );
      this.totalCameraX += rotate_value * 55;
    } else if (axis === "y") {
      rotate_value = value - this.oldCameraY;
      this.oldCameraY = value;
      this.viewMatrix = multiply_matrix_by_array(
        affine_rotation_y(rotate_value),
        this.viewMatrix
      );
      this.totalCameraY += rotate_value * 55;
    } else if (axis === "z") {
      rotate_value = value - this.oldCameraZ;
      this.oldCameraZ = value;
      this.viewMatrix = multiply_matrix_by_array(
        affine_rotation_z(rotate_value),
        this.viewMatrix
      );
      this.totalCameraZ += rotate_value * 55;
    }
  }

  shading_the_normal(model: number[]) {
    return model;
  }

  setProjection(projection: string) {
    if (projection === "orthographic") {
      console.log("orthographic");
      this.projMatrix = this.orthographic_projection(-1, 1, -1, 1, 1, 100);
    } else if (projection === "perspective") {
      console.log("perspective");
      this.projMatrix = this.perspective_projection(45, 1, 0.1, 100);
    } else if (projection === "oblique") {
      console.log("oblique");
      this.projMatrix = this.oblique_projection(0.5, Math.PI / 4, this.orthographic_projection(-1, 1, -1, 1, 1, 4));
    }

    console.log(this.projMatrix);
  }
  orthographic_projection(
    left: number,
    right: number,
    bottom: number,
    top: number,
    near: number,
    far: number
  ) {
    let a = right - left;
    let b = top - bottom;
    let c = far - near;
    let d = right + left;
    let e = top + bottom;
    let f = far + near;
    let affine_orthographic = [
      2 / a, 0, 0,0,
      0, 2 / b, 0, 0,
      0, 0, -2 / c, 0,
      -d / a, -e / b, -f / c, 1,
    ];

    return affine_orthographic;
  }
  perspective_projection(
    fov: number,
    aspect: number,
    near: number,
    far: number
  ) {
    let f = 1 / Math.tan(fov / 2);
    let nf = 1 / (near - far);
    let affine_perspective = [
      f / aspect,
      0,
      0,
      0,
      0,
      f,
      0,
      0,
      0,
      0,
      (far + near) * nf,
      -1,
      0,
      0,
      2 * far * near * nf,
      0,
    ];
    return affine_perspective;
  }
  oblique_projection(shearFactor: number, theta: number, matOrtho: number[]) {
    const cosTheta = Math.cos(theta);
    const sinTheta = Math.sin(theta);

    const shearMat = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      shearFactor * cosTheta, shearFactor * sinTheta, 1, 0,
      0, 0, 0, 1,
    ];

    return multiply_matrix_by_array(matOrtho, shearMat);

    // let shearMat = [
    //   1, 0, 0, 0,
    //   0, 1, 0, 0,
    //   shearFactor * Math.cos(theta) , shearFactor * Math.sin(theta), 0, 0,
    //   0, 0, 0, 1,
    // ];
    // let transFixing = shearFactor * 1.5;
    // let transMat = affine_translation(transFixing, transFixing, transFixing);
    // let affine_oblique = multiply_matrix_by_array(transMat, shearMat);
    // return affine_oblique;
  }
  slide(type: string, value: number) {
    let slide_value: number = 0;
    if (type === "x") {
      slide_value = value - this.oldHorizontal;
      this.oldHorizontal = value;
      this.viewMatrix = multiply_matrix_by_array(
        affine_translation(-slide_value, 0, 0),
        this.viewMatrix
      );
    } else if (type === "y") {
      slide_value = value - this.oldVertical;
      this.oldVertical = value;
      this.viewMatrix = multiply_matrix_by_array(
        affine_translation(0, -slide_value, 0),
        this.viewMatrix
      );
    }
  }
}
