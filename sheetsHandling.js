const addSheetBtnElement = document.querySelector(".sheet-add-icon");
const sheetsFolderContainerElement = document.querySelector(".sheets-folder-conatainer");
const activeSheetColor  ="#ced6e0";

addSheetBtnElement.addEventListener("click", () => {
    const sheet = document.createElement("div");
    sheet.setAttribute("class", "sheet-folder");

    const allSheetFolder = document.querySelectorAll(".sheet-folder");
    sheet.setAttribute("id", allSheetFolder.length);

    sheet.innerHTML = `
        <div class="sheet-content">Sheet-${allSheetFolder.length + 1}</div>
    `;

    sheetsFolderContainerElement.appendChild(sheet);

    sheet.scrollIntoView();

    createSheetDB();

    createGraphComponentMatrix();

    handleSheetActiveness(sheet);

    handleSheetRemoval(sheet);

    sheet.click();
});

function handleSheetRemoval(sheet) {
    sheet.addEventListener("mousedown", (e) => {
        if (e.button !== 2) return  //0 -> left click, 1 -> mouse scroller, 2 -> right click

        const allSheetFolder = document.querySelectorAll(".sheet-folder");

        if (allSheetFolder.length === 1) {
            alert("You need to have atleast one sheet!!");
            return;
        }

        let response = confirm("Your sheet will be removed permanently.");

        if (response === false) return;

        //db update
        const sheetIndex = Number(sheet.getAttribute("id"));
        collectedSheetDB.splice(sheetIndex, 1);
        collectedGraphComponentMatrix.splice(sheetIndex, 1);
        
        //UI update
        handleSheetUIRemoval(sheet)
        

        //by default sheet 1 to active
        sheetDB = collectedSheetDB[0];
        graphComponentMatrix = collectedGraphComponentMatrix[0];

        handleSheetProps();


    })
}


function handleSheetUIRemoval(sheet) {
    sheet.remove();

    const allSheetFolder = document.querySelectorAll(".sheet-folder");

    for (let i = 0; i < allSheetFolder.length; i++) {
        allSheetFolder[i].setAttribute("id", i);
        const sheetContent = allSheetFolder[i].querySelector(".sheet-content");
        sheetContent.innerText = `Sheet-${i + 1}`;
        allSheetFolder[i].style.backgroundColor = "transparent";
    }

    allSheetFolder[0].style.backgroundColor = activeSheetColor;
}


function handleSheetDB(sheetIndex) {
    sheetDB = collectedSheetDB[sheetIndex];
    graphComponentMatrix = collectedGraphComponentMatrix[sheetIndex];
}

function handleSheetProps() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
            cell.click();
        }
    }

    //by default click on first cell via DOM
    const firstCellElement = document.querySelector(".cell");
    firstCellElement.click();
}

function handleSheetActiveUI(sheet) {
    const allSheetsFolder = document.querySelectorAll(".sheet-folder");

    for (let i = 0; i < allSheetsFolder.length; i++) {
        allSheetsFolder[i].style.backgroundColor = "transparent";
    }

    sheet.style.backgroundColor = activeSheetColor;
}

function handleSheetActiveness(sheet) {
    sheet.addEventListener("click", (e) => {
        const sheetIndex = Number(sheet.getAttribute("id"));

        handleSheetDB(sheetIndex);

        handleSheetProps();

        handleSheetActiveUI(sheet);
    })
}


function createSheetDB() {
    let sheetDB = [];
    for (let i = 0; i < rows; i++) {
        let sheetRow = [];
        for (let j = 0; j < cols; j++) {
            let cellProp = {
                bold: false,
                italic: false,
                underline: false,
                alignment: "left",
                fontFamily: "monospace",
                fontSize: "14",
                fontColor: "#000000",
                bgColor: "#000000", //using this color , just for indication purpose.
                value: "",
                formula: "",
                children: []
            }

            sheetRow.push(cellProp);
        }

        sheetDB.push(sheetRow);
    }

    collectedSheetDB.push(sheetDB);
}

function createGraphComponentMatrix() {
    //storage -> 2d Matrix
    let graphComponentMatrix = [];

    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
            //why array -> More than 1 child relation
            row.push([]);
        }

        graphComponentMatrix.push(row);
    }

    collectedGraphComponentMatrix.push(graphComponentMatrix);
}