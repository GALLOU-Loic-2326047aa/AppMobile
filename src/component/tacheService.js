// Ajouter une tâche
export const ajouterTache = (taches, setTaches, nouvelleTache) => {
    if (nouvelleTache.title.trim() === "") return;
    setTaches([...taches, { id: Date.now(), ...nouvelleTache }]);
  };
  
  // Modifier une tâche
  export const modifierTache = (taches, setTaches, id) => {
    const nouveauTitre = prompt("Nouveau titre ?");
    const nouvelleDesc = prompt("Nouvelle description ?");
    setTaches(
      taches.map((tache) =>
        tache.id === id
          ? { ...tache, title: nouveauTitre || tache.title, description: nouvelleDesc || tache.description }
          : tache
      )
    );
  };
  
  // Supprimer une tâche
  export const supprimerTache = (taches, setTaches, id) => {
    setTaches(taches.filter(tache => tache.id !== id));
  };
  
  // Changer le statut fait/urgent
  export const toggleDone = (taches, setTaches, id) => {
    setTaches(taches.map(tache => 
      tache.id === id ? { ...tache, done: !tache.done } : tache
    ));
  };
  
  export const toggleUrgent = (taches, setTaches, id) => {
    setTaches(taches.map(tache => 
      tache.id === id ? { ...tache, urgent: !tache.urgent } : tache
    ));
  };
  