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