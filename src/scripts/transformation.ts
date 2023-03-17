function translate_object(axis: string, value: number) {
    let x = 0;
    let y = 0;
    let z = 0;
    if (axis == "x") {
        x = value;
    } else if (axis == "y") {
        y = value;
    } else if (axis == "z") {
        // TODO
    }

    let affineMatrix = affine_translation(x, y, z);
    let oldModelMatrix = globalVars.models[globalVars.selectedIdx].modelMatrix.slice();
    globalVars.models[globalVars.selectedIdx].modelMatrix = multiply_matrix_by_array(oldModelMatrix, affineMatrix);
}

function resize_object(scaleFactor: number) {
    let centerPoint = globalVars.models[globalVars.selectedIdx].getCenterPoint();
    let scaling_Matrix = affine_scaling(scaleFactor, scaleFactor, scaleFactor);
    let toOrigin = affine_translation(-centerPoint[0], -centerPoint[1], -centerPoint[2]);
    let fromOrigin = affine_translation(centerPoint[0], centerPoint[1], centerPoint[2]);
    
    let affineMatrix = multiply_matrix_by_array(toOrigin, multiply_matrix_by_array(scaling_Matrix, fromOrigin));
    let oldModelMatrix = globalVars.models[globalVars.selectedIdx].modelMatrix.slice();
    globalVars.models[globalVars.selectedIdx].modelMatrix = multiply_matrix_by_array(affineMatrix, oldModelMatrix);
}
