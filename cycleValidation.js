//storage -> 2d Matrix
const graphComponentMatrix = [];

for(let i = 0; i < rows; i++) {
    const row = [];
    for(let j = 0; j < cols; j++) {
        //why array -> More than 1 child relation
        row.push([]);
    }

    graphComponentMatrix.push(row);
}

function isGraphCyclic(graphComponentMatrix) {
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

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (visited[i][j] === false) {
                const response = dfsCylceDetection(graphComponentMatrix, i, j, visited, dfsVisited);
            
                // found cylce
                if (response == true) return [i, j];
            }

        }
    }

    return null;
}

//start -> visited(True) , dfsVisite(T)
//end -> dfsVisite(F)
//if visited[i][j] == T, already visited path
//cylce detection -> if(visited[i][j] == true && dfsVisited[i][j] == true)
//fn -> return True/False
function dfsCylceDetection(graphComponentMatrix, srcr, srcc, visited, dfsVisited) {
    //srcr -> source row , srcc -> source column
    visited[srcr][srcc] = true;
    dfsVisited[srcr][srcc] = true;

    //A1 -> [[0,1], [3,4], [3, 8], ....]
    for(let children = 0; children < graphComponentMatrix[srcr][srcc].length; children++) {
        //nbrr -> neighbour row, nbrc -> neighbour column
        const [ nbrr, nbrc ] = graphComponentMatrix[srcr][srcc][children];

        if (visited[nbrr][nbrc] === false) {
            const response = dfsCylceDetection(graphComponentMatrix, nbrr, nbrc, visited, dfsVisited);

            if (response === true) return true;
        }else if(visited[nbrr][nbrc] === true && dfsVisited[nbrr][nbrc] === true) {
            return true;
        }
    }

    dfsVisited[srcr][srcc] = false;

    return false;
}