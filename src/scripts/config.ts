const vertexGLCode = `
  attribute vec3 position;
  attribute vec3 normal;

  uniform mat4 Pmatrix;
  uniform mat4 Vmatrix;
  uniform mat4 Mmatrix;
  uniform mat4 Nmatrix;

  attribute vec3 color;
  varying vec3 vLighting;
  varying vec3 vColor;

  void main(void) {
    gl_Position = Pmatrix * Vmatrix * Mmatrix * vec4(position, 1.);
    vec3 ambientLight = vec3(0.3, 0.3, 0.3);
    vec3 directionalLightColor = vec3(1, 1, 1);
    vec3 directionalVector = normalize(vec3(0.85, 0.8, 0.75));
    vec4 transformedNormal = Nmatrix*vec4(normal, 1.);

    float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
    vLighting = ambientLight + (directionalLightColor * directional);
    vColor = color;
  }
`;

const fragmentGLCode = `
  precision mediump float;
  varying vec3 vColor;
  varying vec3 vLighting;
  
  void main(void) {
    gl_FragColor = vec4(vColor, 1.);
    gl_FragColor.rgb *= vLighting;
  }
`;

const defaultMatrix = {
  projection: [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 1],
  model: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  view: [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, -2, 1],
  normal: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
};
