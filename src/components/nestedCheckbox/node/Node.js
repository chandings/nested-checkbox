import {useEffect, useState, useRef} from 'react'
import TriStateCheckbox from '../../triStateCheckbox/TriStateCheckbox';
import "./Node.css";
import OpenedIcon from "./open.PNG";
import ClosedIcon from "./closed.PNG";


export default function Node({index, data, childrenData, onChange, onUpdate, api}) {
    const checkBox = useRef();
    const [children, setChildren] = useState([]);
    const [isBranch, setIsBranch] = useState(false);
    const [allGenerations, setAllGenerations] = useState([]);
    const [isOpen, setIsOpen] = useState(true);

    useEffect(()=>{
        let myChildrenData = [];
        let allGenerationsData = [];
        childrenData.forEach(element => {
            if(element.parentId === data.name){
                element.isBranch = (childrenData.find(child=>child.parentId===element.name)!==undefined)
                myChildrenData.push({isBranch:element.isBranch, label:element.label,name:element.name, parentId:element.parentId, data:element.data, api:{}});
            }else{
                allGenerationsData.push(element);
            }
        });

        setIsBranch(myChildrenData.length > 0);
        setAllGenerations(allGenerationsData);
        setChildren(myChildrenData);
    },[childrenData]);

    useEffect(()=>{
        if(typeof api === 'function'){
            api({setChildrenSelection,checkBox,getSelectedChildren}, index);
        }
    },[api]);

    const handleChildChange = (childData, isimmediateChild)=>{
        console.log(data.name)
        //Propagate the change towards root
        onChange(childData, false);
    }

    const handleChildUpdate = ()=>{
        updateCheckBoxState();
    }

    const handleCheckboxChange = (checkBoxState)=>{
        setChildrenSelection(checkBoxState.checked)
        if(onChange){
            onChange({name:data.name,data:data.data, selection:checkBoxState}, true);
        }
    }

    const setChildrenSelection = (isSelected) => {
        console.log(data.name);
        console.log(children);
        if(isBranch){
            children.forEach(child=>{
                child.api.setChildrenSelection(isSelected)
            })
            checkBox.current.setCheckedState(isSelected);
        }else{
            checkBox.current.setCheckedState(isSelected);
        }
    }

    const updateCheckBoxState = ()=>{
        let isIntermediate = false;
        let isChecked_and = true;
        let isChecked_or = false;
        children.forEach(child=>{
            if(child.api.checkBox.current.getIntermediateState() === true){
                //set intermediate state. and return
                isIntermediate = true;
            }
            isChecked_and = isChecked_and && child.api.checkBox.current.getCheckedState();
            isChecked_or = isChecked_or || child.api.checkBox.current.getCheckedState();
        });

        checkBox.current.setCheckedState(isChecked_and && isChecked_or);
        checkBox.current.setIntermediateState(isChecked_and !== isChecked_or || isIntermediate);
    }
    const toggleOpen = ()=>{
        setIsOpen(prev=>!prev);
    };
    const getClassNames = (index)=>{
        if(children[index].isBranch){
            if(isOpen){
                return "node-branch node-opened"; 
            }
            return "node-branch node-closed"; 
        }
        return "node-leaf"
    };
    const getImage = ()=>{
        if(isBranch){
            if(isOpen){
                return <img src={OpenedIcon} onClick={toggleOpen}/>
            }
            return <img src={ClosedIcon} onClick={toggleOpen}/>
        }
        return <></>
    }

    const getSelectedChildren = ()=>{
        let returnArray = [];
        if(isBranch){
            children.forEach((child)=>{
                returnArray = [...returnArray, ...child.api.getSelectedChildren()]
            })
            if(checkBox.current.getIntermediateState() || checkBox.current.getCheckedState()){
                returnArray = [...returnArray, {name:data.name, data:data.data}]
            }
        }else{
            if(checkBox.current.getCheckedState()){
                returnArray = [{name:data.name, data:data.data}];
            }
        }        
        return returnArray;
    };
  return (
    <div>
        <div className="node-checkbox-container">
            {getImage()}
            <TriStateCheckbox onChange={handleCheckboxChange} onUpdate={()=>{onUpdate();}} ref={checkBox}/>
            <label onClick={toggleOpen}>{data.label}</label>
        </div>
        <ul className={`${!isOpen ? "hidden" : ""}`}>
        {
            children.map((child,index) =>{
                return (<li key={child.name} className={`${getClassNames(index)}`}><Node api={(api)=>{child.api = api}} index={index} data={child} childrenData={allGenerations} onUpdate={handleChildUpdate} onChange={handleChildChange} /> </li>)
            })
        }
        </ul>
    </div>
  )
}
