import { useState } from "react";

const ContactManager = ({ tache, setTaches, taches }) => {
  const [nouveauContact, setNouveauContact] = useState("");

  const ajouterContact = (id) => {
    if (nouveauContact.trim() === "") return;

    const tachesModifiees = taches.map(tache =>
      tache.id === id
        ? { ...tache, contacts: [...tache.contacts, { name: nouveauContact }] }
        : tache
    );

    setTaches(tachesModifiees);
    setNouveauContact("");
  };

  const supprimerContact = (idTache, nomContact) => {
    const tachesModifiees = taches.map(tache =>
      tache.id === idTache
        ? { ...tache, contacts: tache.contacts.filter(contact => contact.name !== nomContact) }
        : tache
    );

    setTaches(tachesModifiees);
  };

  return (
    <div>
      <p>👥 Contacts :</p>
      <ul>
        {tache.contacts.length > 0 ? (
          tache.contacts.map((contact, index) => (
            <li key={index}>
              {contact.name} <button onClick={() => supprimerContact(tache.id, contact.name)}>❌</button>
            </li>
          ))
        ) : (
          <li>Aucun contact</li>
        )}
      </ul>
      <input type="text" placeholder="Ajouter un contact" value={nouveauContact}
        onChange={(e) => setNouveauContact(e.target.value)}
      />
      <button onClick={() => ajouterContact(tache.id)}>➕ Ajouter</button>
    </div>
  );
};

export default ContactManager;
