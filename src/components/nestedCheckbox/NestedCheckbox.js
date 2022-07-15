import {useEffect, useState} from 'react';
import Node from './node/Node';
import "./NestedCheckbox.css"

export default function NestedCheckbox({data, api}) {
    const [children, setChildren] = useState([]);
    const [allGenerations, setAllGenerations] = useState([]);

    useEffect(()=>{
        let childrenData = [];
        let allGenerationsData = [];

        data.forEach(element => {
            if(element.parentId){
                allGenerationsData.push(element);
            }else{
                element.isBranch = (data.find(child=>child.parentId===element.name)!==undefined)
                childrenData.push({isBranch:element.isBranch, label:element.label,name:element.name, parentId:element.parentId, data:element.data, api:{}});
            }
        });

        

        setAllGenerations(allGenerationsData);
        setChildren(childrenData);
    },[data]);

    useEffect(()=>{
        if(typeof api === 'function'){
            api({getSelectedChildren})
        }
    },[api]);

    const getClassNames = (index)=>{
        if(children[index].isBranch){
            // if(isOpen){
            //     return "node-branch node-opened"; 
            // }
            return "node-branch node-closed"; 
        }
        return "node-leaf"
    };

    const getSelectedChildren = ()=>{
        console.log(children);
        let returnArray = [];
        children.forEach((child)=>{
            returnArray = [...returnArray, ...child.api.getSelectedChildren()]
        })
        return returnArray;
    };

    return (
        <div className="nested-checkbox-container">
            <ul >
            {
                children.map((child,index) =>{
                    return (<li className={`${getClassNames(index)}`} key={child.name}><Node index={index} api={(api)=>{child.api = api}} data={child} childrenData={allGenerations} onChange={()=>{}} onUpdate={()=>{}} /> </li>)
                })
            }
                
            </ul>
        </div>
    )
}
