import TacheItem from "./tacheItem";

const TacheList = ( {setTaches, tachesAfficher }) => {
  return (
    <ul>
      {tachesAfficher.map((tache) => (
        <TacheItem key={tache.id} tache={tache} setTaches={setTaches} tachesAfficher={tachesAfficher} />
      ))}
    </ul>
  );
};

export default TacheList;
