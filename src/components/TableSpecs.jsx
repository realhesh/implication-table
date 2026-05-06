import {useState} from 'react'
function TableSpecs({typeSelection, setTypeSelection, numInputs, setNumInputs,numRows,setNumRows}) {
    return (
        <>
        <div>
            <form>
                <label htmlFor="type">Select the type of implication table:</label>
                <input type = "radio" id="mealy" name="type" value="mealy" checked={typeSelection === 'mealy'} onChange={(e) => setTypeSelection(e.target.value)} />
                <label htmlFor="mealy">Mealy</label>
                <input type = "radio" id="moore" name="type" value="moore" checked={typeSelection === 'moore'} onChange={(e) => setTypeSelection(e.target.value)} />
                <label htmlFor="moore">Moore</label>
            </form><br></br>
        </div>
        <div>
            <label htmlFor="numInputs">Number of inputs:</label>
            <input type="number" id="numInputs" name="numInputs" min="1" value={numInputs} onChange={(e) => setNumInputs(e.target.value)} onKeyDown={(e)=>e.preventDefault()} />
            <label htmlFor="numRows">Number of rows:</label>
            <input type="number" id="numRows" name="numRows" min="1" value={numRows} onChange={(e) => setNumRows(e.target.value)} onKeyDown={(e)=>e.preventDefault()} />
        </div>
        </>
    );
}
export default TableSpecs;
