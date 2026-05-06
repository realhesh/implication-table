
function nextChar(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
}
function dfs(graph,state,visited,currgroup){
    currgroup.push(state);
    visited[state]=1;
    graph[state].children.forEach(child=>{
        if(!visited[child]){
            dfs(graph,child,visited,currgroup);
        }
    });
    return;
}
function ReducedTable({tableData,implicationData,uniqueStates}){
    let graph={},visited={},represented={};
    uniqueStates.forEach(state=>{
        graph[state]={}
        graph[state].children=[];
        visited[state]=false;
        represented[state]=false;
    })
    console.log(graph);
    for(const[key,val] of Object.entries(implicationData)){
            if(val?.status != 'False'){
            const [fst,scnd]=key.split('-');
            if(!graph[fst].children.includes(scnd)){
                graph[fst].children.push(scnd);
                graph[scnd].children.push(fst);
            }
        }
    }
    let groups=[];
    uniqueStates.forEach(state=>{
        let currgroup=[];
        if(!visited[state]){
            dfs(graph,state,visited,currgroup);
        }
        if(currgroup.length>0 ){
        groups.push(currgroup);
        }
    });
    console.log(groups);
    let reducedTable={};
    let representative={};
    let curr = 'A';
    groups.forEach(group=>{
        group.forEach(state=>{
            representative[state]=curr;
        })
        curr=nextChar(curr);
    })

    tableData.forEach(row=>{
        if(!represented[representative[row.presentState]]){
            represented[representative[row.presentState]]=true;
            let newNextStates=[];
            row.nextStates.forEach(state=>{
                newNextStates.push(representative[state]);
            })
            reducedTable[representative[row.presentState]]={
                presentState:representative[row.presentState],
                nextStates:newNextStates,
                output:row.output
            }
        }
    });
    //console.log('hi',reducedTable['a'].nextStates);
    return(
        <>
            <div>
                <h2>Groups are :</h2> 
                <ul>
                    {groups.map(group=>(
                        <li>
                            {`{${group.join()}}`}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <table justify-content="center" align="center">
                    <thead>
                        <tr>
                            <th style={{padding:'10px'}}>Present State</th>
                            <th style={{padding:'10px'}}>Next States</th>
                            <th style={{padding:'10px'}}>Output</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.values(reducedTable).map(row=>(
                                <tr>
                                <td>{row.presentState}</td>
                                <td>
                                <div style={{display:'flex',justifyContent:'space-evenly'}}>
                                {
                                    row.nextStates.map(nextState=>(
                                        <span>{nextState}</span>
                                    ))
                                }
                                </div>
                                </td>

                                <td>
                                <div style={{display:'flex',justifyContent:'space-evenly'}}>
                                {
                                    row.output.map(output=>(
                                        <span>{output}</span>
                                    ))
                                }
                                </div>
                                </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}
export default ReducedTable;