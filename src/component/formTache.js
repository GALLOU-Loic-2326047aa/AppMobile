import { useState } from "react";
import { ajouterTache } from "./tacheService";

const FormTache = ({ setTaches }) => {
  const [nouvelleTache, setNouvelleTache] = useState({
    title: "",
    description: "",
    date_creation: new Date().toISOString().split("T")[0],
    date_echeance: "",
    done: false,
    urgent: false,
    contacts: []
  });

  return (
    <div>
      <input type="text" placeholder="Titre" value={nouvelleTache.title}
        onChange={(e) => setNouvelleTache({ ...nouvelleTache, title: e.target.value })}
      />
      <button onClick={() => ajouterTache([], setTaches, nouvelleTache)}>Ajouter</button>
    </div>
  );
};

export default FormTache;
