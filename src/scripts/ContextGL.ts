class ContextGL {
  public readonly gl: WebGLRenderingContext;
  public readonly vertexShader: WebGLShader;
  public readonly fragmentShader: WebGLShader;
  public readonly program: WebGLProgram;

  constructor(canvas: HTMLCanvasElement) {
    const gl = canvas.getContext("webgl");
    if (!gl) {
      throw new Error("WebGL not supported");
    }

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    if (!vertexShader) {
      throw new Error("Vertex shader not created");
    }

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    if (!fragmentShader) {
      throw new Error("Fragment shader not created");
    }

    gl.shaderSource(vertexShader, vertexGLCode);
    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
      throw new Error("Vertex shader not compiled");
    }

    gl.shaderSource(fragmentShader, fragmentGLCode);
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      throw new Error("Fragment shader not compiled");
    }

    const program = gl.createProgram();
    if (!program) {
      throw new Error("Program not created");
    }

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error("Program not linked");
    }

    this.gl = gl;
    this.vertexShader = vertexShader;
    this.fragmentShader = fragmentShader;
    this.program = program;
  }
}
