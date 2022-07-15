import React, { Component } from 'react'
import "./TriStateCheckbox.css"
export default class TriStateCheckbox extends Component {
   fireOnChange = false;

    constructor(props){
        super(props);
        this.state = {
            intermediate: false,
            checked: false
        }
    }

    getCurrentClassName = ()=>{
        if(this.state.intermediate)
            return 'tsc-inner-box-intermediate';
        if(this.state.checked)
            return 'tsc-inner-box-checked';
        else
            return 'tsc-inner-box-unchecked';
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
       return <div onClick={this.handleCick} className="tsc-outer-box">
            <div className={`${this.getCurrentClassName()}`}></div>
       </div>

    }
}
