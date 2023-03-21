const filepath = "models/models.json";

const main = async () => {
  const elmtContainer = new ElmtContainer();
  const contextGL = new ContextGL(elmtContainer.canvas);

  const models = await modelSetup(filepath);
  verticesSetup(models);
  bufferSetup(contextGL);
  sceneSetup(contextGL, models);
  selectedSetup(elmtContainer);
  addElmtListener(elmtContainer, contextGL);
};

main();
