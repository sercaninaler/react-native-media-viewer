import React, { useState } from 'react';
import axios from 'axios';
import './index.css';
import './App.css';

export const treesURL = 'https://s3.eu-central-1.amazonaws.com/ecosia-frontend-developer/trees.json';

const App = () => {
  const [ trees, setTrees ] = useState([]);

  const getTrees = async () => {
    const response = await axios.get(treesURL)
    const trees = response.data.trees
    setTrees(trees);
  }

  /*
  useEffect(() => {
    getTrees();
  }, []);
  */

  const toggleTree = id => {
    const newTrees = [...trees];
    newTrees[id].showImage = !newTrees[id].showImage;
    setTrees(newTrees);
  }

  return (
    <div className="App">
      <div className="App-tree-items-holder">
        {trees && trees.length !== 0 ? <div className="App-tree-items">
          {trees.map((tree, index) => (
            <div className="App-tree-item" key={tree.name} data-testid="row">
              <h1 className="App-tree-item-title">{tree.name}</h1>
              <div className="App-tree-item-subtitle">{tree.species_name}</div>

              {tree.showImage && <img src={tree.image} alt={tree.name} className="App-tree-item-image" />}

              <button
                name={index}
                type="submit"
                className="App-tree-item-button"
                onClick={() => toggleTree(index)}
              >
                {tree.showImage ? 'Hide' : 'Show' } Image
              </button>
            </div>
          ))}
        </div> : <div>
          <button onClick={getTrees} className="App-tree-item-button">
            Load some pictures
          </button>
        </div>}
      </div>
    </div>
  );
}

export default App;