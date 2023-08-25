//contians data for complete grid of cells
let sheetDB = [];

//there we 100 rows (arrays) created
//and each array carry 28 objects inside it
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


//selectors
const boldElement = document.querySelector(".bold");
const itlaicElement = document.querySelector(".italic");
const underlineElement = document.querySelector(".underline");
const fontSizeElement = document.querySelector(".font-size-prop");
const fontFamilyElement = document.querySelector(".font-family-prop");
const fontColorElement = document.querySelector(".font-color-prop");
const bgColorElement = document.querySelector(".bg-color-prop");

const alignmentElement = document.querySelectorAll(".alignment");

const leftAlignElement = alignmentElement[0];
const centreAlignElement = alignmentElement[1];
const rightAlignElement = alignmentElement[2];

//color variable
const acitveColorProp = "#d1d8e0";
const inactiveColorProp = "#ecf0f1";

//Application of two way binding
//attach listener to the selected elements
boldElement.addEventListener("click", (e) => {
    const address = addressBarInputElement.value;
    const [cell, cellProp] = getCellAndCellProp(address);

    //modification
    cellProp.bold = !cellProp.bold //data change
    cell.style.fontWeight = cellProp.bold ? "bold" : "normal"; // UI Change part-1
    boldElement.style.backgroundColor = cellProp.bold ? acitveColorProp : inactiveColorProp; //UI change part-2
});


//two way binding for italic
itlaicElement.addEventListener("click", (e) => {
    const address = addressBarInputElement.value;
    const [cell, cellProp] = getCellAndCellProp(address);

    //modification
    cellProp.italic = !cellProp.italic //data change
    cell.style.fontStyle = cellProp.italic ? "italic" : "normal"; // UI Change part-1
    itlaicElement.style.backgroundColor = cellProp.italic ? acitveColorProp : inactiveColorProp; //UI change part-2
});


//two way binding for underline
underlineElement.addEventListener("click", (e) => {
    const address = addressBarInputElement.value;
    const [cell, cellProp] = getCellAndCellProp(address);

    //modification
    cellProp.underline = !cellProp.underline //data change
    cell.style.textDecoration = cellProp.underline ? "underline" : "none"; // UI Change part-1
    underlineElement.style.backgroundColor = cellProp.underline ? acitveColorProp : inactiveColorProp; //UI change part-2
});

//two way binding for font family
fontFamilyElement.addEventListener("change", (e) => {
    const address = addressBarInputElement.value;
    const [cell, cellProp] = getCellAndCellProp(address);

    //modification
    cellProp.fontFamily = fontFamilyElement.value;
    cell.style.fontFamily = cellProp.fontFamily;
    fontFamilyElement.value = cellProp.fontFamily; //although its working fine without it also.
});

//two way binding for font size
fontSizeElement.addEventListener("change", (e) => {
    const address = addressBarInputElement.value;
    const [cell, cellProp] = getCellAndCellProp(address);

    //modification
    cellProp.fontSize = fontSizeElement.value;
    cell.style.fontSize = cellProp.fontSize + "px";
    fontSizeElement.value = cellProp.fontSize; //although its working fine without it also.
});

//two binding for font color
fontColorElement.addEventListener("change", (e) => {
    const address = addressBarInputElement.value;
    const [cell, cellProp] = getCellAndCellProp(address);

    //modification
    cellProp.fontColor = fontColorElement.value;
    cell.style.color = cellProp.fontColor;

    fontColorElement.value = cellProp.fontColor; //it's works fine without it also
});


//two binding for bg color
bgColorElement.addEventListener("change", (e) => {
    //cell access
    const address = addressBarInputElement.value;
    const [cell, cellProp] = getCellAndCellProp(address);

    //modification
    cellProp.bgColor = bgColorElement.value;
    cell.style.backgroundColor = cellProp.bgColor;

    bgColorElement.value = cellProp.bgColor; //it's works fine without it also
});

alignmentElement.forEach((alignElement) => {
    alignElement.addEventListener("click", (e) => {
        //cell access
        const address = addressBarInputElement.value;
        const [cell, cellProp] = getCellAndCellProp(address);

        const alignValue = e.target.classList[0];

        cellProp.alignment = alignValue; //data change
        cell.style.textAlign = cellProp.alignment; //UI change

        switch (alignValue) {
            case "left":
                leftAlignElement.style.backgroundColor = acitveColorProp;
                centreAlignElement.style.backgroundColor = inactiveColorProp;
                rightAlignElement.style.backgroundColor = inactiveColorProp;
                break;
            case "center":
                leftAlignElement.style.backgroundColor = inactiveColorProp;
                centreAlignElement.style.backgroundColor = acitveColorProp;
                rightAlignElement.style.backgroundColor = inactiveColorProp;
                break;
            case "right":
                leftAlignElement.style.backgroundColor = inactiveColorProp;
                centreAlignElement.style.backgroundColor = inactiveColorProp;
                rightAlignElement.style.backgroundColor = acitveColorProp;
                break;
        }
    })
});

const allCells = document.querySelectorAll(".cell");

for (let i = 0; i < allCells.length; i++) {
    addListenerToCellProps(allCells[i]);
}

//on cell click UI change
function addListenerToCellProps(cell) {
    cell.addEventListener("click", (e) => {
        //accessing ids
        const address = addressBarInputElement.value;
        const [rid, cid] = decodeIdAddress(address);
        const cellProp = sheetDB[rid][cid];

        //cell properties
        cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
        cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
        cell.style.textDecoration = cellProp.underline ? "underline" : "none";
        cell.style.fontSize = cellProp.fontSize + "px";
        cell.style.fontFamily = cellProp.fontFamily;
        cell.style.color = cellProp.fontColor;
        cell.style.backgroundColor = cellProp.bgColor === "#000000" ? "transparent" : cellProp.bgColor;
        cell.style.textAlign = cellProp.alignment;

        //apply UI for icons (to display, this property is applied)
        boldElement.style.backgroundColor = cellProp.bold ? acitveColorProp : inactiveColorProp;
        itlaicElement.style.backgroundColor = cellProp.italic ? acitveColorProp : inactiveColorProp;
        underlineElement.style.backgroundColor = cellProp.underline ? acitveColorProp : inactiveColorProp;
        fontColorElement.value = cellProp.fontColor;
        bgColorElement.value = cellProp.bgColor;
        fontSizeElement.value = cellProp.fontSize;
        fontFamilyElement.value = cellProp.fontFamily;

        switch (cellProp.alignment) {
            case "left":
                leftAlignElement.style.backgroundColor = acitveColorProp;
                centreAlignElement.style.backgroundColor = inactiveColorProp;
                rightAlignElement.style.backgroundColor = inactiveColorProp;
                break;
            case "center":
                leftAlignElement.style.backgroundColor = inactiveColorProp;
                centreAlignElement.style.backgroundColor = acitveColorProp;
                rightAlignElement.style.backgroundColor = inactiveColorProp;
                break;
            case "right":
                leftAlignElement.style.backgroundColor = inactiveColorProp;
                centreAlignElement.style.backgroundColor = inactiveColorProp;
                rightAlignElement.style.backgroundColor = acitveColorProp;
                break;
        }

        //removing the last formula in input Element after clicking to the next cell
        const formulaBarInputElement = document.querySelector(".formula-bar");
        formulaBarInputElement.value = cellProp.formula;
        cell.value = cellProp.value;
    });
}


function getCellAndCellProp(address) {
    const [rid, cid] = decodeIdAddress(address);

    //acess cell and storage object
    const cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    const cellProp = sheetDB[rid][cid];
    return [cell, cellProp];
}

function decodeIdAddress(address) {
    const rid = Number(address.slice(1) - 1);
    const cid = Number(address.charCodeAt(0)) - 65;
    return [rid, cid];
}




