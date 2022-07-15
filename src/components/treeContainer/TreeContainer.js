import {useState, useEffect} from 'react';
import NestedCheckbox from '../nestedCheckbox/NestedCheckbox';
import "./TreeContainer.css"

export default function TreeContainer() {
    const [data, setData] = useState([]);
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
            name: ">>>>>",
            parentId: "0-0-0-2",
            },{
            name: "fgdfggdf",
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
        <NestedCheckbox  data = {[...data]}/>
        <button>Get Selected</button>
    </div>
  )
}
