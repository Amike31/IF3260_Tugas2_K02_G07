const modelFilepath = "config/models.json";
const helpFilepath = "config/help.json";

const main = async () => {
  try {
    const elmtContainer = new ElmtContainer();
    const contextGL = new ContextGL(elmtContainer.canvas);

    const models = await modelSetup(modelFilepath);
    globalVars.defaultModels = models.map((model) => model.copy());

    verticesSetup(models);
    bufferSetup(contextGL);
    sceneSetup(contextGL, models);
    selectedSetup(elmtContainer);
    addElmtListener(elmtContainer, contextGL);
    helpSetup(helpFilepath, elmtContainer);

    const interval = setInterval(() => {
      console.log("interval");
      animate();
      drawAll(contextGL);
    }, 0.1);

    window.onunload = () => {
      clearInterval(interval);
    };
  } catch (error) {
    console.error(error);
  }
};

main();
