import './styles/App.css';
import { useEffect, useState } from 'react';
import BDGA1 from './jsonBD/BDGA21.json';
import TacheList from './component/tacheList';
import FormTache from './component/formTache';

function App() {
  const [taches, setTaches] = useState([]);
  const [tachesAfficher, setTachesAfficher] = useState([]);


  useEffect(() => {
    setTaches(BDGA1.taches);
    setTachesAfficher(BDGA1.taches); 
  }, []);

  useEffect(() => {
    setTachesAfficher(taches);
  }, [taches]); 


  return (
    <div className='App-header'>
      <h2>Liste des Tâches</h2>
      <FormTache setTaches={setTaches} taches={taches} setTachesAfficher={setTachesAfficher}/>
      <TacheList  setTaches={setTaches} tachesAfficher={tachesAfficher} />
    </div>
  );
}

export default App;
