const modelFilepath = "config/models.json";
const helpFilepath = "config/help.json";

const render = (contextGL: ContextGL) => {
  if (globalVars.isAnimation) {
    animate();
  }
  drawAll(contextGL);
  window.requestAnimationFrame(() => render(contextGL));
};

const main = async () => {
  try {
    const elmtContainer = new ElmtContainer();
    const contextGL = new ContextGL(elmtContainer.canvas);

    const models = await modelSetup(modelFilepath);
    globalVars.defaultModels = models.map((model) => model.copy());

    verticesSetup(models);
    bufferSetup(contextGL);
    resetConfig(elmtContainer);
    sceneSetup(models);
    selectedSetup(elmtContainer);
    addElmtListener(elmtContainer, contextGL);
    helpSetup(helpFilepath, elmtContainer);

    window.requestAnimationFrame(() => render(contextGL));
  } catch (error) {
    console.error(error);
  }
};

main();
