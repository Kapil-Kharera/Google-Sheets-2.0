let ctrlKey;

document.addEventListener("keydown", (e) => {
    ctrlKey = e.ctrlKey;
});

document.addEventListener("keyup", (e) => {
    ctrlKey = e.ctrlKey;
});

for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        const cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        handleSelectedCells(cell);
    }
}

const copyBtnElement = document.querySelector(".copy");
const cutBtnElement = document.querySelector(".cut");
const pasteBtnElement = document.querySelector(".paste");
// console.log(pasteBtnElement);

let rangeStorage = [];

function handleSelectedCells(cell) {
    cell.addEventListener("click", (e) => {
        //select range 
        if (!ctrlKey) return;

        if (rangeStorage.length >= 2) {
            defaultSelectedCellsUI();
            rangeStorage = [];
        }

        //UI
        cell.style.border = "3px solid #218c74";

        const rid = Number(cell.getAttribute("rid"));
        const cid = Number(cell.getAttribute("cid"));

        rangeStorage.push([rid, cid]);

        // console.log(rangeStorage);
    })
}


function defaultSelectedCellsUI() {
    for(let i = 0; i < rangeStorage.length; i++) {
        const cell = document.querySelector(`.cell[rid="${rangeStorage[i][0]}"][cid="${rangeStorage[i][1]}"]`);
        cell.style.border = "1px solid lightgray";
    }
}

let copyData = [];

copyBtnElement.addEventListener("click", (e) => {
    if (rangeStorage.length < 2) return;

    copyData = [];

    for (let i = rangeStorage[0][0]; i <= rangeStorage[1][0]; i++) {

        const copyRow = [];

        for (let j = rangeStorage[0][1]; j <= rangeStorage[1][1]; j++) {
            const cellProp = sheetDB[i][j];
            copyRow.push(cellProp);
        }

        copyData.push(copyRow);
    }
    // console.log("Copy data: ", copyData);
    defaultSelectedCellsUI();
});


cutBtnElement.addEventListener("click", (e) => {
    if (rangeStorage.length < 2) return;

    for (let i = rangeStorage[0][0]; i <= rangeStorage[1][0]; i++) {
        for (let j = rangeStorage[0][1]; j <= rangeStorage[1][1]; j++) {
            const cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
            
            //db
            const cellProp = sheetDB[i][j];
            cellProp.value = "";
            cellProp.bold = false;
            cellProp.italic = false;
            cellProp.underline = false;
            cellProp.fontSize = 14;
            cellProp.fontFamily = "monospace";
            cellProp.fontColor = "#000000";
            cellProp.bgColor = "#000000";
            cellProp.alignment = "left";

            //ui
            cell.click();

        }
    }

    defaultSelectedCellsUI();
})

pasteBtnElement.addEventListener("click", (e) => {
    // console.log(copyData);
    //paste cells data
    if(rangeStorage.length < 2) return;

    const rowDifference = Math.abs(rangeStorage[0][0] - rangeStorage[1][0]);
    const colDifference = Math.abs(rangeStorage[0][1] - rangeStorage[1][1]);

    //target
    const address = addressBarInputElement.value;
    const [startRow, startCol] = decodeIdAddress(address);
    console.log(startRow, startCol);

    //r -> referes copydata row, c -> refers copydata col
    for (let i = startRow, r = 0; i <= startRow + rowDifference; i++, r++) {
        for (let j = startCol, c = 0; j <= startCol + colDifference; j++, c++) {
            const cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
            // console.log(cell);
            if (!cell) continue;
            console.log(r,c);
            //db
            const data = copyData[r][c];
            // console.log(data);
            const cellProp = sheetDB[i][j];
            // console.log(cellProp);
            cellProp.value = data.value;
            cellProp.bold = data.bold;
            cellProp.italic = data.italic;
            cellProp.underline = data.underline;
            cellProp.fontSize = data.fontSize;
            cellProp.fontFamily = data.fontFamily;
            cellProp.fontColor = data.fontColor;
            cellProp.bgColor = data.bgColor;
            cellProp.alignment = data.alignment;

            //UI
            cell.click();
        }
    }
})


