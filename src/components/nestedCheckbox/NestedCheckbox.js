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
                childrenData.push(element);
            }
        });

        setAllGenerations(allGenerationsData);
        setChildren(childrenData);
    },[data]);

    useEffect(()=>{
        if(typeof api === 'undefined'){
            api({})
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

    return (
        <div className="nested-checkbox-container">
            <ul >
            {
                children.map((child,index) =>{
                    return (<li className={`${getClassNames(index)}`} key={child.name}><Node index={index} data={child} childrenData={allGenerations} onChange={()=>{}} onUpdate={()=>{}} /> </li>)
                })
            }
                
            </ul>
        </div>
    )
}
