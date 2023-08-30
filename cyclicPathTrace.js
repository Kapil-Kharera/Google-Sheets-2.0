//for delay and wait
function colorPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 1000)
    });
}

async function isGraphCyclicTracePath(graphComponentMatrix, cycleResponse) {
    const [srcr, srcc] = cycleResponse;
    const visited = []; //Node visit trace
    const dfsVisited = []; //Stack visit trace

    for(let i = 0; i < rows; i++) {
        const visitedRow = [];
        const dfsVisitedRow = [];

        for (let j = 0; j < cols; j++) {
            visitedRow.push(false);
            dfsVisitedRow.push(false);
        }

        visited.push(visitedRow);
        dfsVisited.push(dfsVisitedRow);
    }

    const response = await dfsCylceDetectionTracePath(graphComponentMatrix, srcr, srcc, visited, dfsVisited);

    if (response === true) return Promise.resolve(true);

    return Promise.resolve(false);
}

//color cells tracking
async function dfsCylceDetectionTracePath(graphComponentMatrix, srcr, srcc, visited, dfsVisited) {
    console.log(srcr, srcc);
    //srcr -> source row , srcc -> source column
    visited[srcr][srcc] = true;
    dfsVisited[srcr][srcc] = true;

    const cell = document.querySelector(`.cell[rid="${srcr}"][cid="${srcc}"]`);
    cell.style.backgroundColor = "lightblue";
    
    await colorPromise();


    //A1 -> [[0,1], [3,4], [3, 8], ....]
    for(let children = 0; children < graphComponentMatrix[srcr][srcc].length; children++) {
        //nbrr -> neighbour row, nbrc -> neighbour column
        const [ nbrr, nbrc ] = graphComponentMatrix[srcr][srcc][children];

        if (visited[nbrr][nbrc] === false) {
            const response = await dfsCylceDetectionTracePath(graphComponentMatrix, nbrr, nbrc, visited, dfsVisited);

            if (response === true) {
                cell.style.backgroundColor = "transparent";
                const response_2 = await colorPromise();
                console.log(response_2);
                return Promise.resolve(true);
            };
        }else if(visited[nbrr][nbrc] === true && dfsVisited[nbrr][nbrc] === true) {
            const cyclicCell = document.querySelector(`.cell[rid="${nbrr}"][cid="${nbrc}"]`);
            
            cyclicCell.style.backgroundColor = "lightsalmon";
            await colorPromise();
        
            cyclicCell.style.backgroundColor = "transparent";

            cell.style.backgroundColor = "transparent";
            await colorPromise();
        

            return Promise.resolve(true);
        }
    }

    dfsVisited[srcr][srcc] = false;

    return Promise.resolve(false);
}