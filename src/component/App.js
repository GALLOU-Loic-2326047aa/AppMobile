import '../styles/App.css';
import { useEffect, useState } from 'react';
import BDGA1 from '../jsonBD/BDGA21.json'

function App() {

  const [nombre,setNombre] = useState(0);

  const [taches, setTaches] = useState([]);

  const ajout = () => {
    setNombre(nombre+1);
  };

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
