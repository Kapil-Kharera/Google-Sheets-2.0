let rows = 100;
let cols = 26;

//selectors
const addressColConElement = document.querySelector(".address-col-container");
const addressRowConElement = document.querySelector(".address-row-container");
const cellsContainerElement = document.querySelector(".cells-container");
const addressBarInputElement = document.querySelector(".address-bar");

//creating address cols which represents rows
for(let i = 0; i < rows; i++) {
    let addressCol = document.createElement("div");
    addressCol.setAttribute("class", "address-col");
    addressCol.innerText = i + 1;
    addressColConElement.appendChild(addressCol);
}

//creating address rows which represents columns
for(let i = 0; i < cols; i ++) {
    let addressRow = document.createElement("div");
    addressRow.setAttribute("class", "address-row");
    addressRow.innerText = String.fromCharCode(65 + i);
    addressRowConElement.appendChild(addressRow);
}

//creating cells
//outer loop for -> cols (dir)
//inner loop for -> rows (dir)
for(let i = 0; i < rows; i++) {
    let rowCellContainer = document.createElement("div");
    rowCellContainer.setAttribute("class", "rowCellContainer");
    for(let j = 0; j < cols; j++) {
        let cell = document.createElement("div");
        cell.setAttribute("class", "cell");
        cell.setAttribute("contenteditable", "true");
        cell.setAttribute("spellcheck", "false");

        //to access the cell later
        cell.setAttribute("rid", i);
        cell.setAttribute("cid", j);

        rowCellContainer.appendChild(cell);
        addressBarDisplay(cell, i, j);
    }

    cellsContainerElement.appendChild(rowCellContainer);
}

function addressBarDisplay(cell, i, j) {
    cell.addEventListener("click", (e) => {
        let rowId = i + 1;
        let colId = String.fromCharCode(65 + j);

        addressBarInputElement.value = `${colId}${rowId}`
    })
}






