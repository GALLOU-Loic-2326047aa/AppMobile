export const ajouterTache = (setTaches, nouvelleTache) => {
  if (nouvelleTache.title.trim() === "") return;

  setTaches(prevTaches => {
    const lastId = prevTaches.length > 0 ? Math.max(...prevTaches.map(t => t.id)) : 101;
    const newTache = { id: lastId + 1, ...nouvelleTache };

    return [...prevTaches, newTache]; 
  });
};
  
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
  
  export const supprimerTache = (taches, setTaches, id) => {
    setTaches(taches.filter(tache => tache.id !== id));
  };
  
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
  