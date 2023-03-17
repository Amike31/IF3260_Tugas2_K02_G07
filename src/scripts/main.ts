const main = () => {
  const elmtContainer = new ElmtContainer();
  const contextGL = new ContextGL(elmtContainer.canvas);

  verticesSetup();
  bufferSetup(contextGL);
  sceneSetup(contextGL);
  selectedSetup(elmtContainer);
  addElmtListener(elmtContainer, contextGL);
};

main();
