import './App.css';
import TreeContainer from './components/treeContainer/TreeContainer';

function App() {
  let defaultDataArray = [
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
  return (
    <div className="App">
      <TreeContainer dataArray = {defaultDataArray} title="Default Implimentation"/>
      {/* <TreeContainer dataArray = {defaultDataArray} title="Custom Styles"/>
      <TreeContainer dataArray = {defaultDataArray} title="Custom Styles, Custom Data"/> */}
    </div>
  );
}

export default App;
