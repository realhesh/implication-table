import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import TableSpecs from './components/TableSpecs'
import './App.css'
import StateTable from './components/StateTable'
import ImplicationTable from './components/ImplicationTable'
import ReducedTable from './components/ReducedTable'
//import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  const [count, setCount] = useState(0)
  const [typeSelection, setTypeSelection] = useState('moore')
  const [numInputs, setNumInputs] = useState(1)
  const numStates = Math.pow(2, numInputs);

  let numOutputs = typeSelection === 'mealy' ? 2 : 1;
  useEffect(()=>{
    numOutputs = typeSelection === 'mealy' ? 2 : 1;
  },[typeSelection]);
  console.log("Num outputs is ",numOutputs);
  const [tableData, setTableData] = useState(
    Array(numStates).fill(null).map(()=>({
        presentState:'',
        nextStates:Array(numStates).fill(''),
        output:Array(numOutputs).fill('')
    }))
)
  const [tableDataComplete, setTableDataComplete] = useState(false);
  const [uniqueStates, setUniqueStates] = useState([]);
  const [numRows, setNumRows] = useState(2);
  const [reductionComplete,setReductionComplete]=useState(false);
  const [implicationData,setImplicationData] = useState({});
  return (
    <>
      <TableSpecs 
      typeSelection={typeSelection}
      setTypeSelection={setTypeSelection}
      numInputs={numInputs}
      setNumInputs={setNumInputs}
      numRows={numRows}
      setNumRows={setNumRows}
      />
      <StateTable 
      typeSelection={typeSelection}
      numInputs={numInputs}
      tableData={tableData}
      setTableData={setTableData}
      tableDataComplete={tableDataComplete}
      setTableDataComplete={setTableDataComplete}
      setUniqueStates={setUniqueStates}
      numRows={numRows}
      setReductionComplete={setReductionComplete}
      numOutputs={numOutputs}
      />
      {tableDataComplete && (
        <ImplicationTable 
          tableData={tableData}
          numInputs={numInputs}
          uniqueStates={uniqueStates}
          setReductionComplete={setReductionComplete}
          implicationData={implicationData}
          setImplicationData={setImplicationData}
        />
      )}
      {reductionComplete && (
        <ReducedTable 
            tableData={tableData}
            implicationData={implicationData}     
            uniqueStates={uniqueStates}  
        />
      )}
    </>
  )
}

export default App
