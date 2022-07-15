import {useState, useEffect, useRef} from 'react';
import NestedCheckbox from '../nestedCheckbox/NestedCheckbox';
import "./TreeContainer.css"

export default function TreeContainer() {
    const [data, setData] = useState([]);
    const [processedData, setProcessedData] = useState([]);
    const api = useRef({});
    useEffect(() =>{
        let dataArray = [
            {
            name: "0-0",
            parentId: null
            },{
            name: "0-1",
            parentId: null,
            },{
            name: "0-2",
            parentId: null,
            },{
            name: "0-0-0",
            parentId: "0-0",
            },{
            name: "0-0-0-0",
            parentId: "0-0-0",
            },{
            name: "0-0-0-1",
            parentId: "0-0-0",
            },{
            name: "0-0-0-2",
            parentId: "0-0-0",
            },{
            name: "0-0-0-2-0",
            parentId: "0-0-0-2",
            },{
            name: "0-0-0-2-1",
            parentId: "0-0-0-2",
            },{
            name: "0-0-1-0",
            parentId: "0-0-1",
            },{
            name: "0-0-1-1",
            parentId: "0-0-1",
            },{
            name: "0-0-1-2",
            parentId: "0-0-1",
            },{
            name: "0-0-2",
            parentId: "0-0",
            },{
            name: "0-1-0",
            parentId: "0-1",
            }
        ]

        dataArray.forEach(element=>element.label = element.name);

        setData(dataArray)

    },[])


  
    return (
    <div className='tree-container'>
    <h3>Default Implementation</h3>
        <NestedCheckbox  data = {[...data]} api={(checkboxAPI)=>{api.current=checkboxAPI}}/>
        <button onClick={()=>{setProcessedData(api.current.getSelectedChildren())}}>Get Selected</button>
        <ul>
            {processedData.map(data=>{
                return <li>{data.name}</li>;
            })}
        </ul>
    </div>
  )
}
