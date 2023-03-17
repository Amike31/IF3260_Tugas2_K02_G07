const bufferSetup = (contextGL: ContextGL) => {
  const gl = contextGL.gl;
  const shaderProgram = contextGL.program;

  const vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    throw new Error("Vertex buffer not created");
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(globalVars.vertices),
    gl.STATIC_DRAW
  );

  const colorBuffer = gl.createBuffer();
  if (!colorBuffer) {
    throw new Error("Color buffer not created");
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(globalVars.colors),
    gl.STATIC_DRAW
  );

  const normalBuffer = gl.createBuffer();
  if (!normalBuffer) {
    throw new Error("Normal buffer not created");
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(globalVars.normals),
    gl.STATIC_DRAW
  );

  contextGL.initMatrix();

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  const position = gl.getAttribLocation(shaderProgram, "position");
  gl.vertexAttribPointer(position, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(position);

  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  const color = gl.getAttribLocation(shaderProgram, "color");
  gl.vertexAttribPointer(color, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(color);

  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
  const normal = gl.getAttribLocation(shaderProgram, "normal");
  gl.vertexAttribPointer(normal, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(normal);

  gl.useProgram(shaderProgram);

  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);

  contextGL.clear();
};

const verticesSetup = () => {
  for (let i = 0; i < 12 * 4 * 6; i++) {
    if (i % 3 == 0) {
      globalVars.vertices.push(cubeVertices[i] - 0.7);
    } else {
      globalVars.vertices.push(cubeVertices[i]);
    }
  }

  for (let i = 0; i < 12 * 4 * 4; i++) {
    if (i % 3 == 1) {
      globalVars.vertices.push(pyramidVertices[i] + 0.5);
    } else {
      globalVars.vertices.push(pyramidVertices[i]);
    }
  }

  for (let i = 0; i < 12 * 4 * 5; i++) {
    if (i % 3 == 0) {
      globalVars.vertices.push(prismVertices[i] + 0.7);
    } else {
      globalVars.vertices.push(prismVertices[i]);
    }
  }
};

const sceneSetup = (contextGL: ContextGL) => {
  globalVars.models.push(
    new Model({
      name: "cube",
      offset: 0,
      end: 24,
      numVertices: 96,
      vertices: globalVars.vertices.slice(0, 96 * 3),
      color: colors.slice(0, 96 * 3),
      normals: vertexNormals.slice(0, 96 * 3),
      modelMatrix: defaultMatrix.model,
    })
  );

  globalVars.models.push(
    new Model({
      name: "pyramid",
      offset: 24,
      end: 40,
      numVertices: 64,
      vertices: globalVars.vertices.slice(96 * 3, 96 * 3 + 64 * 3),
      color: colors.slice(96 * 3, 96 * 3 + 64 * 3),
      normals: vertexNormals.slice(96 * 3, 96 * 3 + 64 * 3),
      modelMatrix: defaultMatrix.model,
    })
  );

  drawAll(contextGL);
};

const selectedSetup = (elmtContainer: ElmtContainer) => {
  const selectedShape = elmtContainer.selectShape.value;
  updateSelected(selectedShape);
}