import { modifierTache, supprimerTache, toggleDone, toggleUrgent } from "./tacheService";
import ContactManager from "./contactManager";

const TacheItem = ({ tache, setTaches, tachesAfficher }) => {
  return (
    <li>
      <strong>{tache.title}</strong> - {tache.description}
      <p>📅 Créée le : {tache.date_creation}</p>
      <p>⏳ Échéance : {tache.date_echeance || "Non définie"}</p>
      <p>✅ Statut : {tache.done ? "Terminé" : "En cours"} <button onClick={() => toggleDone(tachesAfficher, setTaches, tache.id)}>Changer</button></p>
      <p>⚠️ Urgent : {tache.urgent ? "Oui" : "Non"} <button onClick={() => toggleUrgent(tachesAfficher, setTaches, tache.id)}>Changer</button></p>

      <ContactManager tache={tache} setTaches={setTaches} taches={tachesAfficher} />

      <button onClick={() => modifierTache(tachesAfficher, setTaches, tache.id)}>✏️ Modifier</button>
      <button onClick={() => supprimerTache(tachesAfficher, setTaches, tache.id)}>🗑️ Supprimer</button>
    </li>
  );
};

export default TacheItem;
