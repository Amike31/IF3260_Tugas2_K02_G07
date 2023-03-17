const draw = (contextGL: ContextGL, start: number, end: number) => {
  const gl = contextGL.gl;
  const Pmatrix = contextGL.Pmatrix;
  const Vmatrix = contextGL.Vmatrix;
  const Mmatrix = contextGL.Mmatrix;
  const Nmatrix = contextGL.Nmatrix;

  gl.uniformMatrix4fv(Pmatrix, false, defaultMatrix.projection);
  gl.uniformMatrix4fv(Vmatrix, false, defaultMatrix.view);
  gl.uniformMatrix4fv(Mmatrix, false, defaultMatrix.model);

  if (globalVars.isShading) {
    // TODO
  } else {
    gl.uniformMatrix4fv(Nmatrix, false, defaultMatrix.normal);
  }

  for (let i = start; i < end; i++) {
    gl.drawArrays(gl.TRIANGLE_FAN, i * 4, 4);
  }
};
