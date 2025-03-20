import TacheItem from "./tacheItem";

const TacheList = ({ taches, setTaches }) => {
  return (
    <ul>
      {taches.map((tache) => (
        <TacheItem key={tache.id} tache={tache} setTaches={setTaches} taches={taches} />
      ))}
    </ul>
  );
};

export default TacheList;
