import {useState, useEffect, useRef} from 'react';
import NestedCheckbox from '../nestedCheckbox/NestedCheckbox';
import "./TreeContainer.css"

export default function TreeContainer({dataArray, customStyles, title}) {
    const [data, setData] = useState([]);
    const [processedData, setProcessedData] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [nodeName, setNodeName] = useState("");
    const api = useRef({});
    useEffect(() =>{
        dataArray.forEach(element=>element.label = element.name);

        setData(dataArray)

    },[dataArray])

    const handleExpandNode = ()=>{
        //api.current.expandChild(nodeName);
        setErrorMessage("")
        try{
            api.current.expandChild(nodeName);
        }catch(error){
            setErrorMessage("Error: " + error.message)
        }
    };

    const handleColapseNode = ()=>{
        //api.current.colapseChild(nodeName);
        setErrorMessage("")
        try{
            api.current.colapseChild(nodeName);
        }catch(error){
            setErrorMessage("Error: " + error.message)
        }
    };

    const handleChildSelection = (selectionState)=>{
        //api.current.setChildSelectionState(selectionState, nodeName);
        setErrorMessage("")
        try{
            api.current.setChildSelectionState(selectionState,nodeName);
        }catch(error){
            setErrorMessage("Error: " + error.message)
        }
    };


  
    return (
    <div className='tree-container'>
    <h3>{title}</h3>
        <NestedCheckbox classNames={customStyles} data = {[...data]} api={(checkboxAPI)=>{api.current=checkboxAPI}}/>
        <button onClick={()=>{setProcessedData(api.current.getSelectedChildren())}}>Get Selected Labels</button>
        <br/>
        <button onClick={()=>{api.current.setAllChildrenSelectionState(true)}}>Select All</button>
        <button onClick={()=>{api.current.setAllChildrenSelectionState(false)}}>Unselect All</button>
        <br/>
        <button onClick={()=>{api.current.setAllChildrenOpenState(true)}}>Expand All</button>
        <button onClick={()=>{api.current.setAllChildrenOpenState(false)}}>Colapse All</button>
        <br/>
        <input className='text' type="text" onChange={(event)=>{setNodeName(event.target.value);}} placeholder='Label of the node'></input>
        <br/>
        <button onClick={()=>{handleChildSelection(true)}}>Select Node</button>
        <button onClick={()=>{handleChildSelection(false)}}>Unselect Node</button>
        <br/>
        <button onClick={handleExpandNode}>Expand Node</button>
        <button onClick={handleColapseNode}>Colapse Node</button>
        <br/>
        <p className='error'>{errorMessage}</p>
        <ul>
            {processedData.map((data,index)=>{
                return <li key={index}>{data.name}</li>;
            })}
        </ul>
    </div>
  )
}
