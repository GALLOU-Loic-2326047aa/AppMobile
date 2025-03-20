import '../styles/App.css';
import { useEffect, useState } from 'react';
import BDGA1 from '../jsonBD/BDGA21.json'

function App() {

  const [taches, setTaches] = useState([]);

  useEffect(() =>{
    setTaches(BDGA1.taches);
  },[]);


  return (
    <div className='App-header'>
      {taches.map((tache) => (
        <p>{tache.title}</p>
      ))}
    </div>
  );
}

export default App;
