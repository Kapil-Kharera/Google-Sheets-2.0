const downloadBtnElement = document.querySelector(".download");
const openBtnElement = document.querySelector(".open");

downloadBtnElement.addEventListener("click", (e) => {
    const data = JSON.stringify([sheetDB, graphComponentMatrix]);
    const file = new Blob([data], {type: "application/json"});

    const a = document.createElement("a");
    a.href = URL.createObjectURL(file);
    a.download = "SheetData.json";
    a.click();
});

openBtnElement.addEventListener("click", (e) => {
    //open file explorer
    const inputElement = document.createElement("input");
    inputElement.setAttribute("type", "file");
    inputElement.click();

    inputElement.addEventListener("change", (e) => {
        const fileReader = new FileReader();
        const files = inputElement.files;
        const fileObject = files[0];

        fileReader.readAsText(fileObject);
        fileReader.addEventListener("load", (e) => {
            const readSheetData = JSON.parse(fileReader.result);
            
            //basic sheet will be created with its default data
            addSheetBtnElement.click();

            sheetDB = readSheetData[0];
            graphComponentMatrix = readSheetData[1];

            collectedSheetDB[collectedSheetDB.length - 1] = sheetDB;
            collectedGraphComponentMatrix[collectedGraphComponentMatrix.length - 1] = graphComponentMatrix;

            handleSheetProps();
        });
    })
});