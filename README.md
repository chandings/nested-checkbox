# Nested Checkbox

This project was created as an assignment for Media.net. 

[Click to view](https://chandings.github.io/nested-checkbox/)

Project requirement:

"Create a React/Angular component for a nested checkbox input like given below:
Submission in the form of github repo with entire commit history"

Sample Data:

[
    {
    name: “0-0”,
    parentId: null
    },{
    name: “0-1”,
    parentId: null,
    },{
    name: “0-2”,
    parentId: null,
    },{
    name: “0-0-0”,
    parentId: “0-0,
    },{
    name: “0-0-0-0”,
    parentId: “0-0-0,
    },{
    name: “0-0-0-1”,
    parentId: “0-0-0,
    },{
    name: “0-0-0-2”,
    parentId: “0-0-0,
    },{
    name: “0-0-1-0”,
    parentId: “0-0-1,
    },{
    name: “0-0-1-1”,
    parentId: “0-0-1,
    },{
    name: “0-0-1-2”,
    parentId: “0-0-1,
    },{
    name: “0-0-2”,
    parentId: “0-0,
    },{
    name: “0-1-0”,
    parentId: “0-1,
    }
]

## NestedCheckbox API:

The 'NestedCheckbox' component can be used in the following way:
    <NestedCheckbox classNames={customStyles} data = {[...data]} api={(checkboxAPI)=>{api.current=checkboxAPI}}/>

    data(requred): expects and array of objects;
        {
            name:requred. This is a unique indentifier.
            parentId:requred. This should be parents name. If null the object becomes root node. If this does not match any names it is ignored.
            label: required. This is shown in the ui.
            data: optional. This can be any data associated with the node.
        }

    classNames(optional): This contains and object witll class names for the NestedCheckbox component.

    api(optional): This is a callback function that returs an Object containing functions that can be called.
    {
        getSelectedChildren(): Returns an array of selected nodes. 
        setAllChildrenSelectionState(bool): Selects/unselects all nodes.
        setAllChildrenOpenState(bool): Expands/collapses all nodes.
        expandChild(string): Expands the node whose name is passed as argument. Throws error if the given name is not found.
        colapseChild(string): Colapses the node whose name is passed as argument. Throws error if the given name is not found.
        setChildSelectionState(string, bool): Selects/unselectsthe node whose name is passed as argument. Throws error if the given name is not found.
    }
