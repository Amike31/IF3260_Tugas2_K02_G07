function translate_object(axis: string, value: number) {
  let x = 0;
  let y = 0;
  let z = 0;
  if (axis === "x") {
    x = value;
  } else if (axis === "y") {
    y = value;
  } else if (axis === "z") {
    z = value;
  }

  let affineMatrix = affine_translation(x, y, z);
  let oldModelMatrix =
    globalVars.models[globalVars.selectedIdx].modelMatrix.slice();
  globalVars.models[globalVars.selectedIdx].modelMatrix =
    multiply_matrix_by_array(oldModelMatrix, affineMatrix);
}

function resize_object(scaleFactor: number) {
  let centerPoint = globalVars.models[globalVars.selectedIdx].getCenterPoint();
  let scaling_Matrix = affine_scaling(scaleFactor, scaleFactor, scaleFactor);
  let toOrigin = affine_translation(
    -centerPoint[0],
    -centerPoint[1],
    -centerPoint[2]
  );
  let fromOrigin = affine_translation(
    centerPoint[0],
    centerPoint[1],
    centerPoint[2]
  );

  let affineMatrix = multiply_matrix_by_array(
    toOrigin,
    multiply_matrix_by_array(scaling_Matrix, fromOrigin)
  );
  let oldModelMatrix =
    globalVars.models[globalVars.selectedIdx].modelMatrix.slice();
  globalVars.models[globalVars.selectedIdx].modelMatrix =
    multiply_matrix_by_array(affineMatrix, oldModelMatrix);
}

function rotate_object(axis: string, value: number, model: Model) {
  console.log("rotate_object_new", axis, value);
  let centerPoint = model.getCenterPoint();
  let toOrigin = affine_translation(
    -centerPoint[0],
    -centerPoint[1],
    -centerPoint[2]
  );
  let fromOrigin = affine_translation(
    centerPoint[0],
    centerPoint[1],
    centerPoint[2]
  );

  let affineMatrix: number[] = [];
  let angle: number = 0;
  let rotation_Matrix = null;
  if (axis === "x") {
    angle = value - model.oldRotateX;
    model.oldRotateX = value;
    rotation_Matrix = affine_rotation_x(angle);
    affineMatrix = multiply_matrix_by_array(
      toOrigin,
      multiply_matrix_by_array(rotation_Matrix, fromOrigin)
    );
  } else if (axis === "y") {
    angle = value - model.oldRotateY;
    model.oldRotateY = value;
    rotation_Matrix = affine_rotation_y(angle);
    affineMatrix = multiply_matrix_by_array(
      toOrigin,
      multiply_matrix_by_array(rotation_Matrix, fromOrigin)
    );
  } else if (axis === "z") {
    angle = value - model.oldRotateZ;
    model.oldRotateZ = value;
    rotation_Matrix = affine_rotation_z(angle);
    affineMatrix = multiply_matrix_by_array(
      toOrigin,
      multiply_matrix_by_array(rotation_Matrix, fromOrigin)
    );
  }

  let oldModelMatrix = model.modelMatrix.slice();
  model.modelMatrix = multiply_matrix_by_array(affineMatrix, oldModelMatrix);
}
