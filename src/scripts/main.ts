const main = () => {
  const elmtContainer = new ElmtContainer();
  const contextGL = new ContextGL(elmtContainer.canvas);

  verticesSetup();
  bufferSetup(contextGL);
  sceneSetup(contextGL);
};

main();
