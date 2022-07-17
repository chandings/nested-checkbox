import React, { Component } from 'react'
import "./TriStateCheckbox.css"
export default class TriStateCheckbox extends Component {
   fireOnChange = false;

    constructor(props){
        super(props);
        let customClass = {
            unselectedOuter:"",
            unselectedInner:"",
            selectedOuter:"",
            selectedInner:"",
            intermediateOuter:"",
            intermediateInner:""
                        }
        this.state = {
            intermediate: false,
            checked: false,
            customClass:{...customClass, ...props.classNames}
        }
    }

    getOuterClassNames = ()=>{
        if(this.state.intermediate)
            return (this.state.customClass.intermediateOuter && this.state.customClass.intermediateOuter!== "")?this.state.customClass.intermediateOuter:'tsc-outer-box';
        if(this.state.checked)
            return (this.state.customClass.intermediateOuter && this.state.customClass.selectedOuter!== "")?this.state.customClass.selectedOuter:'tsc-outer-box';
        else
            return (this.state.customClass.unselectedOuter && this.state.customClass.unselectedOuter!== "")?this.state.customClass.unselectedOuter:'tsc-outer-box';
    }

    getInnerClassNames = ()=>{
        if(this.state.intermediate)
            return (this.state.customClass.intermediateInner && this.state.customClass.intermediateInner!== "")?this.state.customClass.intermediateInner:'tsc-inner-box-intermediate';
        if(this.state.checked)
        return (this.state.customClass.selectedInner && this.state.customClass.selectedInner!== "")?this.state.customClass.selectedInner:'tsc-inner-box-checked';
        else
            return (this.state.customClass.unselectedInner && this.state.customClass.unselectedInner!== "")?this.state.customClass.unselectedInner:'tsc-inner-box-unchecked';
    }
    handleCick = ()=>{
        if(this.state.intermediate){
            this.setState((prevValue)=>{
                return {intermediate:false, checked:true}
            })
        }else {
            this.setState((prevValue)=>{
                return {checked:!prevValue.checked};
            })
        }
        if(this.props.onChange){
            this.fireOnChange = true;
        }
    };

    componentDidUpdate(prevProps, prevState){
        if(this.fireOnChange){
            this.fireOnChange = false;
            this.props.onChange({intermediate:this.state.intermediate, checked:this.state.checked});
        }

        if(prevState.intermediate !== this.state.intermediate || prevState.checked !== this.state.checked){
            if(typeof  this.props.onUpdate === 'function'){
                this.props.onUpdate({intermediate:this.state.intermediate, checked:this.state.checked})
            }
        }
    }

    changeIntermediateState = (value)=>{
        this.fireOnChange = true;
        this.setState((prevValue)=>{
            return {intermediate:value};
        })
    };
    changeCheckedState = (value)=>{
        this.fireOnChange = true;
        this.setState((prevValue)=>{
            return {checked:value};
        })
    };

    setIntermediateState = (value)=>{
        this.setState((prevValue)=>{
            return {intermediate:value};
        })
    };
    setCheckedState = (value)=>{
        this.setState((prevValue)=>{
            return {checked:value};
        })
    };
    getIntermediateState = ()=>{
        return this.state.intermediate;
    };
    getCheckedState = ()=>{
        return this.state.checked;
    };
    render() {
       return <div onClick={this.handleCick} className={`${this.getOuterClassNames()}`}>
            <div className={`${this.getInnerClassNames()}`}></div>
       </div>

    }
}
