import { modifierTache, supprimerTache, toggleDone, toggleUrgent } from "./tacheService";
import ContactManager from "./contactManager";

const TacheItem = ({ tache, setTaches, taches }) => {
  return (
    <li>
      <strong>{tache.title}</strong> - {tache.description}
      <p>📅 Créée le : {tache.date_creation}</p>
      <p>⏳ Échéance : {tache.date_echeance || "Non définie"}</p>
      <p>✅ Statut : {tache.done ? "Terminé" : "En cours"} <button onClick={() => toggleDone(taches, setTaches, tache.id)}>Changer</button></p>
      <p>⚠️ Urgent : {tache.urgent ? "Oui" : "Non"} <button onClick={() => toggleUrgent(taches, setTaches, tache.id)}>Changer</button></p>

      <ContactManager tache={tache} setTaches={setTaches} taches={taches} />

      <button onClick={() => modifierTache(taches, setTaches, tache.id)}>✏️ Modifier</button>
      <button onClick={() => supprimerTache(taches, setTaches, tache.id)}>🗑️ Supprimer</button>
    </li>
  );
};

export default TacheItem;
