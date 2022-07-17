import React, { Component } from 'react'
import "./Node.css"
import OpenedIcon from "./open.PNG";
import ClosedIcon from "./closed.PNG";
import TriStateCheckbox from '../../triStateCheckbox/TriStateCheckbox';

export default class Node extends Component {
    constructor(props) {
        super(props);
        /*
        const checkBox = useRef();
    const apis = useRef([]);
        */
        this.createState();
    }

    createState(){
        if(this.state){
            throw new Error("Do not call crateState once the state has been created.")
        }
        let myChildrenData = [];
        let allGenerationsData = [];
        this.apis = [];
        this.props.childrenData.forEach(element => {
            if(element.parentId === this.props.data.name){
                element.isBranch = (this.props.childrenData.find(child=>child.parentId===element.name)!==undefined)
                myChildrenData.push({isBranch:element.isBranch, label:element.label,name:element.name, parentId:element.parentId, data:element.data});
                this.apis.push(React.createRef());
            }else{
                allGenerationsData.push(element);
            }
        });
        this.checkBox = React.createRef();
        this.state = {
            children:myChildrenData,
            allGenerations:allGenerationsData,
            isBranch:myChildrenData.length > 0,
            isOpen:false
        }
    }

    handleChildChange = (childData, isimmediateChild)=>{
        //Propagate the change towards root
        this.props.onChange(childData, false);
    }

    handleChildUpdate = ()=>{
        this.updateCheckBoxState();
    };

    handleCheckboxChange = (checkBoxState)=>{
        this.setChildrenSelection(checkBoxState.checked)
        this.props.onChange({name:this.props.data.name,data:this.props.data.data, selection:checkBoxState}, true);
    }

    
    setChildrenSelection(isSelected){
        if(this.state.isBranch){
            this.apis.forEach(api=>{
                api.current.setChildrenSelection(isSelected)
            })
            this.checkBox.current.setCheckedState(isSelected);
        }else{
            this.checkBox.current.setCheckedState(isSelected);
        }
    }

    getSelectedChildren = ()=>{
        let returnArray = [];
        if(this.state.isBranch){
            this.apis.forEach((api)=>{
                returnArray = [...returnArray, ...api.current.getSelectedChildren()]
            })
            if(this.checkBox.current.getIntermediateState() || this.checkBox.current.getCheckedState()){
                returnArray = [...returnArray, {name:this.props.data.name, data:this.props.data.data}]
            }
        }else{
            if(this.checkBox.current.getCheckedState()){
                returnArray = [{name:this.props.data.name, data:this.props.data.data}];
            }
        }        
        return returnArray;
    };

    updateCheckBoxState=()=>{
        let isIntermediate = false;
        let isChecked_and = true;
        let isChecked_or = false;
        this.apis.forEach(api=>{
            if(api.current.checkBox.current.getIntermediateState() === true){
                //set intermediate state. and return
                isIntermediate = true;
            }
            isChecked_and = isChecked_and && api.current.checkBox.current.getCheckedState();
            isChecked_or = isChecked_or || api.current.checkBox.current.getCheckedState();
        });

        this.checkBox.current.setCheckedState(isChecked_and && isChecked_or);
        this.checkBox.current.setIntermediateState(isChecked_and !== isChecked_or || isIntermediate);
    }

    toggleOpen = ()=>{
        this.setState(prevState=>{
            return {...prevState, isOpen:!prevState.isOpen}
        })
    };

    setOpenState = (openState)=>{
        this.setState((prevState)=>{
            return {...prevState, isOpen:openState};
        });
    };

    handleExpandParent = ()=>{
        this.setOpenState(true);
        this.props.expandParent();
    }

    expandChild = (name)=>{
        if(this.state.isBranch){
            if(this.props.data.name === name)
            {
                this.setOpenState(true);
                this.props.expandParent();
            }else{
                this.apis.forEach(api=>{
                    api.current.expandChild(name);
                });
            }
        }
    }

    colapseChild = (name)=>{
        if(this.state.isBranch){
            if(this.props.data.name === name)
            {
                this.setOpenState(false);
            }else{
                this.apis.forEach(api=>{
                    api.current.colapseChild(name);
                });
            }
        }
    }

    setChildSelectionState = (selectionState, name)=>{
        if(this.props.data.name === name)
        {
            this.checkBox.current.setIntermediateState(false);
            this.checkBox.current.changeCheckedState(selectionState);
        }else if(this.state.isBranch){
            this.apis.forEach(api=>{
                api.current.setChildSelectionState(selectionState, name);
            });
        }
    };

    setAllChildrenOpenState = (openState)=>{
        if(this.state.isBranch){
            this.setOpenState(openState);
            this.apis.forEach(api=>{
                api.current.setAllChildrenOpenState(openState);
            });
        }
    };

    getImage = ()=>{
        if(this.state.isBranch){
            if(this.state.isOpen){
                return <img src={OpenedIcon} onClick={this.toggleOpen} alt="(-)"/>
            }
            return <img src={ClosedIcon} onClick={this.toggleOpen} alt="(+)"/>
        }
        return <></>
    };

    getClassNames = (index) =>{
        if(this.state.children[index].isBranch){
            // if(isOpen){
            //     return "node-branch node-opened"; 
            // }
            return "node-branch"; 
        }
        return "node-leaf"
    }

    render() {
        return (
            <div>
                <div className="node-checkbox-container">
                    {this.getImage()}
                    <TriStateCheckbox onChange={this.handleCheckboxChange} onUpdate={()=>{this.props.onUpdate();}} ref={this.checkBox}/>
                    <label onClick={this.toggleOpen}>{this.props.data.label}</label>
                </div>
                <ul className={`${!this.state.isOpen ? "hidden" : ""}`}>
                {
                    this.state.children.map((child,index) =>{
                        return (<li 
                                    key={child.name} 
                                    className={`${this.getClassNames(index)}`}>
                                        <Node 
                                            index={index} 
                                            data={child} 
                                            childrenData={this.state.allGenerations} 
                                            onUpdate={this.handleChildUpdate} 
                                            onChange={this.handleChildChange}
                                            expandParent={this.handleExpandParent}
                                            ref={this.apis[index]} /> 
                                    </li>)
                    })
                }
                </ul>
            </div>
        )
    }
}
