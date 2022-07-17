import "./App.css";
import TreeContainer from "./components/treeContainer/TreeContainer";
import TriStateCheckbox from "./components/triStateCheckbox/TriStateCheckbox";
import { FaFolderOpen } from "react-icons/fa";
import { FaFolder } from "react-icons/fa";

function App() {
  const defaultDataArray = [
    {
      name: "0-0",
      parentId: null,
    },
    {
      name: "0-1",
      parentId: null,
    },
    {
      name: "0-2",
      parentId: null,
    },
    {
      name: "0-0-0",
      parentId: "0-0",
    },
    {
      name: "0-0-0-0",
      parentId: "0-0-0",
    },
    {
      name: "0-0-0-1",
      parentId: "0-0-0",
    },
    {
      name: "0-0-0-2",
      parentId: "0-0-0",
    },
    {
      name: "0-0-0-2-0",
      parentId: "0-0-0-2",
    },
    {
      name: "0-0-0-2-1",
      parentId: "0-0-0-2",
    },
    {
      name: "0-0-1-0",
      parentId: "0-0-1",
    },
    {
      name: "0-0-1-1",
      parentId: "0-0-1",
    },
    {
      name: "0-0-1-2",
      parentId: "0-0-1",
    },
    {
      name: "0-0-2",
      parentId: "0-0",
    },
    {
      name: "0-1-0",
      parentId: "0-1",
    },
  ];

  const customDataArrays = [
    {
      name: "Living Things",
      parentId: null,
    },
    {
      name: "Single Cell",
      parentId: "Living Things",
    },
    {
      name: "Multi Cell",
      parentId: "Living Things",
    },
    {
      name: "Bacteria",
      parentId: "Single Cell",
    },
    {
      name: "Protozoa",
      parentId: "Single Cell",
    },
    {
      name: "Virus",
      parentId: "Single Cell",
    },
    {
      name: "Lactobaccilus Acidophilus",
      parentId: "Bacteria",
    },
    {
      name: "Lactobacillus Rhamnosus",
      parentId: "Bacteria",
    },
    {
      name: "Bifidobacterium",
      parentId: "Bacteria",
    },
    {
      name: "Bacillus Coagulans",
      parentId: "Bacteria",
    },
    {
      name: "Lactococcus Lactis",
      parentId: "Bacteria",
    },
    {
      name: "Giardia",
      parentId: "Protozoa",
    },
    {
      name: "Trypanosoma",
      parentId: "Protozoa",
    },
    {
      name: "Trichonympha",
      parentId: "Protozoa",
    },
    {
      name: "Leishmania",
      parentId: "Protozoa",
    },
    {
      name: "Rotavirus",
      parentId: "Virus",
    },
    {
      name: "Human immunodeficiency virus (HIV)",
      parentId: "Virus",
    },
    {
      name: "Ebola virus",
      parentId: "Virus",
    },
    {
      name: "Influenza",
      parentId: "Virus",
    },
    {
      name: "Plants&Trees",
      parentId: "Multi Cell",
    },
    {
      name: "Animals",
      parentId: "Multi Cell",
    },
    {
      name: "Ferns",
      parentId: "Plants&Trees",
    },
    {
      name: "Mushrooms",
      parentId: "Plants&Trees",
    },
    {
      name: "Banian",
      parentId: "Plants&Trees",
    },
    {
      name: "Mango",
      parentId: "Plants&Trees",
    },
    {
      name: "Mamals",
      parentId: "Animals",
    },
    {
      name: "Birds",
      parentId: "Animals",
    },
    {
      name: "Reptiles",
      parentId: "Animals",
    },
    {
      name: "Human",
      parentId: "Mamals",
    },
    {
      name: "Dog",
      parentId: "Mamals",
    },
    {
      name: "Cat",
      parentId: "Mamals",
    },
    {
      name: "Mamals",
      parentId: "Mamals",
    },
    {
      name: "Bat",
      parentId: "Mamals",
    },
    {
      name: "Sparrow",
      parentId: "Birds",
    },
    {
      name: "Crow",
      parentId: "Birds",
    },
    {
      name: "Penguin",
      parentId: "Birds",
    },
    {
      name: "Kiwi",
      parentId: "Birds",
    },
    {
      name: "Alligator",
      parentId: "Reptiles",
    },
    {
      name: "Tortoise",
      parentId: "Reptiles",
    },
    {
      name: "Snake",
      parentId: "Reptiles",
    },
    {
      name: "Comodo",
      parentId: "Reptiles",
    },
  ];
  const checkboxClassNames = {
    unselectedOuter: "unselectedOuter",
    unselectedInner: "unselectedInner",
    selectedOuter: "selectedOuter",
    selectedInner: "selectedInner",
    intermediateOuter: "intermediateOuter",
    intermediateInner: "intermediateInner",
  };
  const customStyles = {
    bgClass: "ncb-background",
    children: {
      nodeClosed: "ncb-node-closed",
      nodeOpened: "ncb-node-opened",
      leaf: "ncb-leaf",
      openIcon: <FaFolderOpen className="folder-open" />,
      closeIcon: <FaFolder className="folder" />,
      checkboxClassNames: checkboxClassNames,
    },
  };
  return (
    <div className="App">
      <TreeContainer
        customStyles=""
        dataArray={defaultDataArray}
        title="Default Implimentation"
      />
      <TreeContainer
        customStyles={customStyles}
        dataArray={defaultDataArray}
        title="Custom Styles, Original Data"
      />
      <TreeContainer
        customStyles={customStyles}
        dataArray={customDataArrays}
        title="Custom Styles, Custom Data"
      />
    </div>
  );
}

export default App;
