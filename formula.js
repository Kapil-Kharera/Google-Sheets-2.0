
for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        const cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        cell.addEventListener("blur", (e) => {
            const address = addressBarInputElement.value; // geting the address of cell
            const [activeCell, cellProp] = getCellAndCellProp(address); // returning that cell and its object , also changing the name of cell
            const enteredData = activeCell.innerText; //getting data of a grid cell

            if (enteredData === cellProp.value) return;

            cellProp.value = enteredData; //updating obj value prop

            //if data changed with hard coded value , after removing formula
            removeChildParentRelationship(cellProp.formula);
            cellProp.formula = "";
            updateChildrenCellsValue(address);
        });
    }
}

//selector
const formulaBarElement = document.querySelector(".formula-bar");

//event listener
formulaBarElement.addEventListener("keydown", (e) => {
    const inputFormulaValue = formulaBarElement.value;
    if (e.key === "Enter" && inputFormulaValue) {
        //acessing cell and cellProp
        const address = addressBarInputElement.value;
        const [cell, cellProp] = getCellAndCellProp(address);

        //checking if old formula is not matching the present formula
        if (inputFormulaValue !== cellProp.formula) {
            removeChildParentRelationship(cellProp.formula); //break the old relationship
        }

        const evaluatedValue = evaluateFormula(inputFormulaValue);

        //To update UI & cellProp in DB
        setCellUiAndCellProp(evaluatedValue, inputFormulaValue, address); //to update UI & db

        addChildParentRelationship(inputFormulaValue); // Adding parent child relationship

        updateChildrenCellsValue(address); //udating children value recursively

        console.log(sheetDB);
    }
});


function updateChildrenCellsValue(parentAddress) {
    const [parentCell, parentCellProp] = getCellAndCellProp(parentAddress);
    const children = parentCellProp.children;

    for (let i = 0; i < children.length; i++) {
        const childAddress = children[i];
        const [childCell, childCellProp] = getCellAndCellProp(childAddress);
        const childCellFormula = childCellProp.formula;

        const evaluatedValue = evaluateFormula(childCellFormula);

        setCellUiAndCellProp(evaluatedValue, childCellFormula, childAddress);

        updateChildrenCellsValue(childAddress); //recursively updated all children
    }
}


function addChildParentRelationship(formula) {
    const childAddress = addressBarInputElement.value; //current address
    const encodedFormula = formula.split(" "); //splitting formula

    for (let i = 0; i < encodedFormula.length; i++) {
        const asciiValue = encodedFormula[i].charCodeAt(0); //find the first character i.e "A1" -> "A"

        //checking value between A to Z
        if (asciiValue >= 65 && asciiValue <= 90) {
            const [parentCell, parentCellProp] = getCellAndCellProp(encodedFormula[i]); // accessing its cell & cellProp
            parentCellProp.children.push(childAddress); //now accessing value from cellProp
        }
    }
}

function removeChildParentRelationship(formula) {
    const childAddress = addressBarInputElement.value; //current address
    const encodedFormula = formula.split(" "); //splitting formula

    for (let i = 0; i < encodedFormula.length; i++) {
        const asciiValue = encodedFormula[i].charCodeAt(0); //find the first character i.e "A1" -> "A"

        //checking value between A to Z
        if (asciiValue >= 65 && asciiValue <= 90) {
            const [parentCell, parentCellProp] = getCellAndCellProp(encodedFormula[i]); // accessing its cell & cellProp
            const index = parentCellProp.children.indexOf(childAddress); // finding index of that address
            parentCellProp.children.splice(index, 1); // removing the relationship
        }
    }
}

//evaluate formula
function evaluateFormula(formula) {
    //split method give us an array
    const encodedFormula = formula.split(" "); //spliting formula based on space character

    for (let i = 0; i < encodedFormula.length; i++) {

        const asciiValue = encodedFormula[i].charCodeAt(0); //find the first character i.e "A1" -> "A"

        //checking value between A to Z
        if (asciiValue >= 65 && asciiValue <= 90) {
            const [cell, cellProp] = getCellAndCellProp(encodedFormula[i]); // accessing its cell & cellProp
            encodedFormula[i] = cellProp.value; //now accessing value from cellProp
        }
    }

    const decodedFormula = encodedFormula.join(" "); // joining it again with space character
    //eval doesn't work with string
    return eval(decodedFormula);
}



function setCellUiAndCellProp(evaluatedValue, formula, address) {
    // const address = addressBarInputElement.value;
    const [cell, cellProp] = getCellAndCellProp(address);

    cell.innerText = evaluatedValue; //UI update
    cellProp.value = evaluatedValue; //db update
    cellProp.formula = formula; //db update
}