
import {useState,useEffect} from 'react';
import './StateTable.css';
function isStateTableDataComplete(tableData,numInputs,setUniqueStates) {
    //i will put all unique states in input and outputs.
    const uniqueStates = new Set();
    for (const row of tableData) {
        if (row.presentState != '') {
            uniqueStates.add(row.presentState);
        }
        for(const nextState of row.nextStates) {
            if (nextState != '') {
                uniqueStates.add(nextState);
            }
        }
    }
    for (const states of uniqueStates) {
        const foundIn = tableData.find(row => row.presentState === states);
        //ensure that foundIn.nextStates and foundIn.output is not empty.
        if(!foundIn){return false;}
        if(foundIn.nextStates.some(state => state === '') || foundIn.output.some(output => output === '')) {
            return false;
        }
       // console.log(states,foundIn);
    }
    setUniqueStates(Array.from(uniqueStates));
    return true;
}
function StateTable({typeSelection, numInputs,tableData, setTableData,tableDataComplete,setTableDataComplete,setUniqueStates,numRows}) {
    const numOutputs = typeSelection === 'mealy' ? 2 : 1;
    const numStates = Math.pow(2, numInputs);
    //console.log(numInputs,numStates);

    useEffect(() => {
        let newTableData = tableData;
        if(numRows < tableData.length){
            newTableData.pop();
        }
        else if(numRows > tableData.length){
            const newEntry={presentState: '',
                nextStates: Array(Number(numStates)).fill(''),
                output: Array(Number(numOutputs)).fill(''),
            }
            newTableData=[...tableData,newEntry];
        }
        setTableDataComplete(isStateTableDataComplete(newTableData,numInputs,setUniqueStates));
        setTableData(
          newTableData
        )
      }, [numInputs,numOutputs,numRows])
    const handleInputChange = (rowIndex,field,innerIndex,value) => {
        const updatedTableData = [...tableData];
        if(field === 'presentState') {
            updatedTableData[rowIndex].presentState = value;
        } else if (field === 'nextState') {
            updatedTableData[rowIndex].nextStates[innerIndex] = value;
        } else if (field === 'output') {
            updatedTableData[rowIndex].output[innerIndex] = value;
        }
        setTableData(updatedTableData);
        if(isStateTableDataComplete(updatedTableData,numInputs,setUniqueStates)) {
            console.log("State Table Data is complete");
            setTableDataComplete(true);
        } else {
            setTableDataComplete(false);
        }
        //console.log(isStateTableDataComplete(updatedTableData,numInputs,setUniqueStates));
    }
  return (
    <div>
      <h2>State Table</h2>
        <table justify-content="center" align="center">
            <thead>
                <tr>
                    <th>Present State</th>
                    <th>Next State</th>
                    <th>Output</th>
                </tr>
            </thead>
            <tbody>
                {tableData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        <td>
                            <input
                                type="text"
                                value={row.presentState}
                                onChange={(e) => handleInputChange(rowIndex, 'presentState', null, e.target.value)}
                            />
                        </td>
                        <td>
                            {row.nextStates.map((nextState, innerIndex) => (
                                <input
                                    key={innerIndex}
                                    type="text"
                                    value={nextState}
                                    onChange={(e) => handleInputChange(rowIndex, 'nextState', innerIndex, e.target.value)}
                                />
                            ))}
                        </td>
                        <td>
                            {row.output.map((output, innerIndex) => (
                                <input
                                    key={innerIndex}
                                    type="text"
                                    value={output}
                                    onChange={(e) => handleInputChange(rowIndex, 'output', innerIndex, e.target.value)}
                                />
                            ))}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
}
export default StateTable;