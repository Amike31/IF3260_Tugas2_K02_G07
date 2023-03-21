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

const modelSetup = async (filepath: string) => {
  const res = await fetch(filepath);
  if (!res.ok) {
    throw new Error("File not found");
  }

  const data = await res.json();
  const models = parseModelsData(data);

  console.log(models);
};

const verticesSetup = () => {
  for (let i = 0; i < 12 * 4 * 6; i++) {
    if (i % 3 === 0) {
      globalVars.vertices.push(cubeVertices[i] - 0.7);
    } else {
      globalVars.vertices.push(cubeVertices[i]);
    }
  }

  for (let i = 0; i < 12 * 4 * 4; i++) {
    if (i % 3 === 1) {
      globalVars.vertices.push(pyramidVertices[i] + 0.5);
    } else {
      globalVars.vertices.push(pyramidVertices[i]);
    }
  }

  for (let i = 0; i < 12 * 4 * 5; i++) {
    if (i % 3 === 0) {
      globalVars.vertices.push(prismVertices[i] + 0.7);
    } else {
      globalVars.vertices.push(prismVertices[i]);
    }
  }

  globalVars.colors = colors;
  globalVars.normals = vertexNormals;
};

const sceneSetup = (contextGL: ContextGL) => {
  const nVerticesModels = [96, 64, 80];

  const cube = new Model({
    name: "cube",
    offset: 0,
    end: 24,
    numVertices: nVerticesModels[0],
    vertices: globalVars.vertices.slice(0, nVerticesModels[0] * 3),
    color: colors.slice(0, nVerticesModels[0] * 3),
    normals: vertexNormals.slice(0, nVerticesModels[0] * 3),
    modelMatrix: defaultMatrix.model,
    oldRotateX: 0,
    oldRotateY: 0,
    oldRotateZ: 0,
  });

  const pyramid = new Model({
    name: "pyramid",
    offset: 24,
    end: 40,
    numVertices: nVerticesModels[1],
    vertices: globalVars.vertices.slice(
      nVerticesModels[0] * 3,
      nVerticesModels[0] * 3 + nVerticesModels[1] * 3
    ),
    color: colors.slice(
      nVerticesModels[0] * 3,
      nVerticesModels[0] * 3 + nVerticesModels[1] * 3
    ),
    normals: vertexNormals.slice(
      nVerticesModels[0] * 3,
      nVerticesModels[0] * 3 + nVerticesModels[1] * 3
    ),
    modelMatrix: defaultMatrix.model,
    oldRotateX: 0,
    oldRotateY: 0,
    oldRotateZ: 0,
  });

  const prism = new Model({
    name: "prism",
    offset: 40,
    end: 60,
    numVertices: nVerticesModels[2],
    vertices: globalVars.vertices.slice(
      nVerticesModels[0] * 3 + nVerticesModels[1] * 3,
      nVerticesModels[0] * 3 + nVerticesModels[1] * 3 + nVerticesModels[2] * 3
    ),
    color: colors.slice(
      nVerticesModels[0] * 3 + nVerticesModels[1] * 3,
      nVerticesModels[0] * 3 + nVerticesModels[1] * 3 + nVerticesModels[2] * 3
    ),
    normals: vertexNormals.slice(
      nVerticesModels[0] * 3 + nVerticesModels[1] * 3,
      nVerticesModels[0] * 3 + nVerticesModels[1] * 3 + nVerticesModels[2] * 3
    ),
    modelMatrix: defaultMatrix.model,
    oldRotateX: 0,
    oldRotateY: 0,
    oldRotateZ: 0,
  });

  globalVars.models.push(cube, pyramid, prism);

  drawAll(contextGL);
};

const selectedSetup = (elmtContainer: ElmtContainer) => {
  const selectedShape = elmtContainer.selectShape.value;
  updateSelected(selectedShape);
};
