import './App.css';
import TreeContainer from './components/treeContainer/TreeContainer';
import TriStateCheckbox from './components/triStateCheckbox/TriStateCheckbox';
import {useRef} from "react"

function App() {
  const triStateCheckbox = useRef();
  return (
    <div className="App">
      <TreeContainer />
      <TriStateCheckbox ref = {triStateCheckbox}/>
      <button onClick={()=>{
        triStateCheckbox.current.setIntermediateState(!triStateCheckbox.current.getIntermediateState());
      }}>Toggle intermediate</button>
      <button onClick={()=>{
        triStateCheckbox.current.setCheckedState(!triStateCheckbox.current.getCheckedState());
      }}>Toggle checked</button>
    </div>
  );
}

export default App;
