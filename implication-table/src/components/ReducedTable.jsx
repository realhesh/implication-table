
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
    let graph={},visited={};
    uniqueStates.forEach(state=>{
        graph[state]={}
        graph[state].children=[];
        visited[state]=false;
    })
    console.log(graph);
    for(const[key,val] of Object.entries(implicationData)){
            if(val?.status != 'false'){
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
    })
    console.log(groups);
    return(
        <>
            <div>
                Groups are : 
                <ul>
                    {groups.map(group=>(
                        <li>
                            {`{${group.join()}}`}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
export default ReducedTable;