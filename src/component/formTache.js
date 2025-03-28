import { useState } from "react";
import { ajouterTache } from "./tacheService";
import { filterUrgent, resetTaches } from "./tacheFilter";

const FormTache = ({ setTaches, taches, setTachesAfficher }) => {
    const [nouvelleTache, setNouvelleTache] = useState({
        title: "",
        description: "",
        date_creation: new Date().toISOString().split("T")[0],
        date_echeance: "",
        done: false,
        urgent: false,
        contacts: [],
    });

    const [erreur, setErreur] = useState(""); // Message d'erreur

    // Gestion des changements dans les inputs
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNouvelleTache((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    // Vérification avant d'ajouter la tâche
    const handleAddTask = () => {
        if (!nouvelleTache.title.trim() || !nouvelleTache.description.trim() || !nouvelleTache.date_echeance) {
            setErreur("Titre, description et date d'échéance sont obligatoires !");
            return;
        }

        setErreur(""); // Efface l'erreur si tout est OK
        ajouterTache(setTaches, nouvelleTache);

        // Réinitialiser le formulaire après l'ajout
        setNouvelleTache({
            title: "",
            description: "",
            date_creation: new Date().toISOString().split("T")[0],
            date_echeance: "",
            done: false,
            urgent: false,
            contacts: [],
        });
    };

    return (
        <div style={{ maxWidth: "400px", margin: "auto", padding: "20px", border: "1px solid #ccc", borderRadius: "10px" }}>
            <h2>Ajouter une tâche</h2>

            <label>Titre :</label>
            <input type="text" name="title" value={nouvelleTache.title} onChange={handleChange} />

            <label>Description :</label>
            <input type="text" name="description" value={nouvelleTache.description} onChange={handleChange} />

            <label>Date d'échéance :</label>
            <input type="date" name="date_echeance" value={nouvelleTache.date_echeance} onChange={handleChange} />

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <label>
                    <input type="checkbox" name="done" checked={nouvelleTache.done} onChange={handleChange} /> Terminé
                </label>

                <label>
                    <input type="checkbox" name="urgent" checked={nouvelleTache.urgent} onChange={handleChange} /> Urgent
                </label>
            </div>

            <label>Contacts (optionnel) :</label>
            <input type="text" name="contacts"
                   placeholder="Séparés par des virgules"
                   value={nouvelleTache.contacts.join(", ")}
                   onChange={(e) => setNouvelleTache({ ...nouvelleTache, contacts: e.target.value.split(",").map(c => c.trim()) })}
            />

            {erreur && <p style={{ color: "red" }}>{erreur}</p>} {/* Message d'erreur */}

            <button onClick={handleAddTask} style={{ marginTop: "10px" }}>Ajouter</button>
            <button onClick={() => filterUrgent(taches, setTachesAfficher)} style={{ marginLeft: "10px" }}>Urgent</button>
            <button onClick={() => resetTaches(taches, setTachesAfficher)} style={{ marginLeft: "10px" }}>Réinitialiser</button>
        </div>
    );
};

export default FormTache;
