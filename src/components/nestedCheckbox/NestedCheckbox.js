import React,{useEffect, useState, useRef} from 'react';
import Node from './node/Node';
import "./NestedCheckbox.css"
import OpenedIcon from "./node/open.PNG";
import ClosedIcon from "./node/closed.PNG";

export default function NestedCheckbox({data, api, classNames, onChange}) {
    const [children, setChildren] = useState([]);
    const apis = useRef([]);
    const bgClass = useRef("")
    const childrenClass = useRef({
        nodeClosed:"",
        nodeOpened:"",
        leaf:"",
        checkboxClassNames:"",
        openIcon:<img src={OpenedIcon}  alt="(-)"/>,
        closeIcon:<img src={ClosedIcon} alt="(+)"/>
      })
   const [allGenerations, setAllGenerations] = useState([]);

    useEffect(()=>{
        let childrenData = [];
        let allGenerationsData = [];
        apis.current = [];

        data.forEach(element => {
            if(element.parentId){
                allGenerationsData.push(element);
            }else{
                element.isBranch = (data.find(child=>child.parentId===element.name)!==undefined)
                childrenData.push({isBranch:element.isBranch, label:element.label,name:element.name, parentId:element.parentId, data:element.data});
                apis.current.push(React.createRef());
            }
        });
        setAllGenerations(allGenerationsData);
        setChildren(childrenData);
    },[data]);

    useEffect(()=>{
        if(classNames){
            if(classNames && classNames.bgClass){
                bgClass.current = classNames.bgClass;
            }else{
                bgClass.current = "";
            }
            if(classNames.children){
                childrenClass.current = {...childrenClass.current, ...classNames.children}
            }
        }
    },[classNames]);

    useEffect(()=>{
        if(typeof api === 'function'){
            api({getSelectedChildren, setAllChildrenOpenState, setAllChildrenSelectionState, expandChild, colapseChild, setChildSelectionState})
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

    const checkIfChildExists = (name)=>{
        let nameExists = data.find((child)=>child.name === name);
        return nameExists !== undefined;
    };

    const throwNameNotFoundError = (name)=>{
        throw new Error(`Child with name "${name}" does not exist.`)
    }

    const expandChild = (name)=>{
        if(!checkIfChildExists(name)){
            throwNameNotFoundError(name);
            return;
        }
        apis.current.forEach(api=>{
            api.current.expandChild(name);
        });
    };
    const colapseChild = (name)=>{
        if(!checkIfChildExists(name)){
            throwNameNotFoundError(name);
            return;
        }
        apis.current.forEach(api=>{
            api.current.colapseChild(name);
        });
    };

    const setAllChildrenOpenState = (openState)=>{
        apis.current.forEach(api=>{
            api.current.setAllChildrenOpenState(openState);
        });
    };

    const setChildSelectionState = (selectionState, name)=>{
        if(!checkIfChildExists(name)){
            throwNameNotFoundError(name);
            return;
        }
        apis.current.forEach(api=>{
            api.current.setChildSelectionState(selectionState, name);
        });
    };

    const setAllChildrenSelectionState = (selectionState)=>{
        apis.current.forEach(api=>{
            api.current.checkBox.current.setIntermediateState(false);
            api.current.checkBox.current.changeCheckedState(selectionState);
        });
    };

    const getSelectedChildren = ()=>{
        let returnArray = [];
        apis.current.forEach((api)=>{
            returnArray = [...returnArray, ...api.current.getSelectedChildren()]
        })
        return returnArray;
    };
    const getBGClassName=()=>{
        return bgClass.current;
    }

    return (
        <div className={`nested-checkbox-container ${getBGClassName()}`}>
            <ul >
            {
                children.map((child,index) =>{
                    return (<li 
                        className={`${getClassNames(index)}`} 
                        key={child.name}>
                            <Node 
                                classNames={childrenClass.current} 
                                index={index} ref={apis.current[index]} 
                                data={child} 
                                childrenData={allGenerations} 
                                onChange={
                                    (childData)=>{
                                        if(typeof onChange === 'function'){
                                            onChange(childData);
                                        }
                                }} 
                                expandParent={()=>{}} 
                                onUpdate={()=>{}} /> </li>)
                })
            }
                
            </ul>
        </div>
    )
}
