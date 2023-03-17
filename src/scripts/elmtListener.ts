function addElmtListener(elmtContainer: ElmtContainer, contextGL: ContextGL) {
    
    // TRANSLATION
    elmtContainer.selectShape.addEventListener("change", () => {
        updateSelected(elmtContainer.selectShape.value);
    });
    elmtContainer.buttonTranslateLeft.addEventListener("click", () => {
        translate_object("x", -0.1);
        drawAll(contextGL);
    });
    elmtContainer.buttonTranslateRight.addEventListener("click", () => {
        translate_object("x", 0.1);
        drawAll(contextGL);
    });
    elmtContainer.buttonTranslateUp.addEventListener("click", () => {
        translate_object("y", 0.1);
        drawAll(contextGL);
    });
    elmtContainer.buttonTranslateDown.addEventListener("click", () => {
        translate_object("y", -0.1);
        drawAll(contextGL);
    });
    elmtContainer.buttonTranslateIn.addEventListener("click", () => {
        translate_object("z", 0.1);
        drawAll(contextGL);
    });
    elmtContainer.buttonTranslateOut.addEventListener("click", () => {
        translate_object("z", -0.1);
        drawAll(contextGL);
    });

    // SCALING
    elmtContainer.scaleFactor.addEventListener("change", () => {
        globalVars.scaleFactor = parseFloat(elmtContainer.scaleFactor.value);
    });
    elmtContainer.scaleButton.addEventListener("click", () => {
        resize_object(globalVars.scaleFactor);
        drawAll(contextGL);
    });
    elmtContainer.buttonEnlarge.addEventListener("click", () => {
        resize_object(1.2);
        drawAll(contextGL);
    });
    elmtContainer.buttonShrink.addEventListener("click", () => {
        resize_object(0.8);
        drawAll(contextGL);
    });
}