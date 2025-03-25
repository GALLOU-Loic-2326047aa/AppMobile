// Filtre les tâches par "urgent"
export const filterUrgent = (taches, setTachesAfficher) => {
  const tacheWithElement = taches.filter(tache => tache.urgent === true);
  setTachesAfficher(tacheWithElement);
};

// Réinitialise la liste à toutes les tâches
export const resetTaches = (taches, setTachesAfficher) => {
  setTachesAfficher(taches);
};
