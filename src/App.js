import './styles/App.css';
import { useEffect, useState } from 'react';
import BDGA1 from './jsonBD/BDGA21.json';
import TacheList from './component/tacheList';
import FormTache from './component/formTache';

function App() {
  const [taches, setTaches] = useState([]);

  useEffect(() => {
    setTaches(BDGA1.taches);
  }, []);

  return (
    <div className='App-header'>
      <h2>Liste des Tâches</h2>
      <FormTache setTaches={setTaches} />
      <TacheList taches={taches} setTaches={setTaches} />
    </div>
  );
}

export default App;
