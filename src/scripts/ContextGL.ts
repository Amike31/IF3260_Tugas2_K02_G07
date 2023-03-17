class ContextGL {
  public readonly gl: WebGLRenderingContext;
  public readonly vertexShader: WebGLShader;
  public readonly fragmentShader: WebGLShader;
  public readonly program: WebGLProgram;
  public Pmatrix: WebGLUniformLocation | null = null;
  public Vmatrix: WebGLUniformLocation | null = null;
  public Mmatrix: WebGLUniformLocation | null = null;
  public Nmatrix: WebGLUniformLocation | null = null;

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

  initMatrix() {
    this.Pmatrix = this.gl.getUniformLocation(this.program, "Pmatrix");
    this.Vmatrix = this.gl.getUniformLocation(this.program, "Vmatrix");
    this.Mmatrix = this.gl.getUniformLocation(this.program, "Mmatrix");
    this.Nmatrix = this.gl.getUniformLocation(this.program, "Nmatrix");
  }

  clear() {
    this.gl.clearColor(0.0, 0.0, 0.0, 0.0);
    this.gl.clearDepth(1.0);
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
  }
}
