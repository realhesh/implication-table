import './ImplicationTable.css'; // Make sure to keep your CSS file for the borders/X's!
import {useState,useEffect} from 'react'
function nextImplicationTable(implicationData,setImplicationData,setReductionComplete){
    let nextData = JSON.parse(JSON.stringify(implicationData));
    let madeChanges=0;
    for(const [key,value] of Object.entries(nextData)){
        const [s1,s2]=key.split('-');
        for(const condition of value.conditions){
            const [c1,c2]=key.split('-');
            if(nextData[condition].status == 'False'){
                madeChanges=1;
                nextData[`${s1}-${s2}`].status='False';
                nextData[`${s2}-${s1}`].status='False';
            }
        }
    }
    if(madeChanges==0){
        console.log("Done nexxting idk");
        setReductionComplete(true);
        return 0;
    }
    setImplicationData(nextData);
    return 1;
}
function ImplicationTable({tableData, numInputs, uniqueStates,setReductionComplete,implicationData,setImplicationData}) {
    const colStates = uniqueStates.sort().slice(1);
    const rowStates = uniqueStates.sort().slice(0, -1);
    
    //let implicationData={};
    //console.log(rowStates,colStates);
    useEffect( ()=>{
        let initialData={};
    tableData.forEach(row1=>{
        tableData.forEach(row2=>{
            if(row2.presentState != row1.presentState){
                //console.log("Hi");
                //console.log("HO",row1.presentState,row2.presentState);
                const key = `${row1.presentState}-${row2.presentState}`;
                let conditions = [];
                let outDiffers=0;
                for(let i=0;i<row1.output.length;i++){
                    if(row1.output[i] != row2.output[i]){outDiffers=1;}
                }
                if(outDiffers){
                    initialData[`${row1.presentState}-${row2.presentState}`]={
                        conditions:[],status:'False'
                    }
                }
                else{
                for(let i=0;i<row1.nextStates.length;i++){
                    const s1=row1.nextStates[i],s2=row2.nextStates[i];
                    const conditionPair= s1 < s2 ? `${s1}-${s2}` : `${s2}-${s1}`;
                    if(row1.nextStates[i] != row2.nextStates[i] && !conditions.find(item=>item==`${conditionPair}`)){
                        conditions.push(`${conditionPair}`);
                    }
                }
                initialData[`${row1.presentState}-${row2.presentState}`]={
                    conditions:conditions,
                    status:(conditions.length > 0 ? 'pending':'correct')
                }
            }
            }
        })
    })
    setImplicationData(initialData);
    },[tableData]);
    //console.log("h",implicationData['B-A'].conditions);
    const coloring={'False':'red',
        'correct':'green',
        'pending':'yellow',}
    return (
        <>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px',border:'1px solid grey' }}>
            <table>
                <tbody>
                    {
                    colStates.map((element,index)=>(
                        <tr>
                            <td>{element}</td>
                            {
                                rowStates.slice(0,index+1).map(row=>{
                                    const key = element < row ? `${element}-${row}` : `${row}-${element}`;
                                    return (<td style={{border:"1px solid black",backgroundColor:coloring[implicationData[key]?.status],color:'black',fontWeight:'bold'}}>
                                    <div>
                                        {
                                            implicationData[key]?.conditions.map(condition=>(
                                                <p>{condition}</p>
                                            ))
                                        }
                                    </div>
                                    </td>);
                                })
                            }
                        </tr>
                    ))
                    }
                    <tr>
                        <td></td>
                        {
                        rowStates.map((element)=>(
                            <td>{element}</td>
                        ))
                        }
                    </tr>
                </tbody>    
            </table>
        </div>
        <button onClick={()=>nextImplicationTable(implicationData,setImplicationData,setReductionComplete)}>Do another Pass(reduced will appear after passes are done)</button>
        </>
    );
}

export default ImplicationTable;