const filepath = "models/models.json";

const main = async () => {
  const elmtContainer = new ElmtContainer();
  const contextGL = new ContextGL(elmtContainer.canvas);

  modelSetup(filepath);
  verticesSetup();
  bufferSetup(contextGL);
  sceneSetup(contextGL);
  selectedSetup(elmtContainer);
  addElmtListener(elmtContainer, contextGL);
};

main();
