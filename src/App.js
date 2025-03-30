    import { useState, useEffect } from "react";
    import data from "./jsonBD/BDGA21.json";
    import "./styles/App.css"

    const TaskManager = () => {
        // Utilisation de tableaux pour les tâches et catégories
        const [tasks, setTasks] = useState([]);
        const [categories, setCategories] = useState([]);
        const [search, setSearch] = useState("");
        const [filterCategory, setFilterCategory] = useState("");
        const [filterState, setFilterState] = useState("");
        const [filterUrgent, setFilterUrgent] = useState("");

        // Formulaire de tâche
        const [taskTitle, setTaskTitle] = useState("");
        const [taskDescription, setTaskDescription] = useState("");
        const [taskDueDate, setTaskDueDate] = useState("");
        const [taskState, setTaskState] = useState("Nouveau");
        const [taskUrgent, setTaskUrgent] = useState(false);
        const [taskCategory, setTaskCategory] = useState("");

        // Formulaire de catégorie
        const [categoryTitle, setCategoryTitle] = useState("");
        const [categoryColor, setCategoryColor] = useState("#ffffff");
        const [categoryEmoji, setCategoryEmoji] = useState("⭐");

        // Tâche actuellement sélectionnée pour modification
        const [editingTask, setEditingTask] = useState(null);

        // Initialisation des tâches et des catégories à partir du JSON
        useEffect(() => {
            setTasks(data.taches);
            setCategories(data.categories);
        }, []);  // Le tableau vide [] assure que ce useEffect ne s'exécute qu'une seule fois


        // Ajouter une tâche
        const addTask = () => {
            const newTask = {
                id: Date.now().toString(),
                title: taskTitle,
                description: taskDescription,
                dueDate: taskDueDate,
                state: taskState,
                urgent: taskUrgent,
                categoryId: taskCategory,
                createdAt: new Date().toISOString(),
            };
            setTasks([...tasks, newTask]);
            resetTaskForm();
        };

        // Modifier une tâche
        const updateTask = () => {
            const updatedTask = {
                ...editingTask,
                title: taskTitle,
                description: taskDescription,
                dueDate: taskDueDate,
                state: taskState,
                urgent: taskUrgent,
                categoryId: taskCategory,
            };

            setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
            resetTaskForm();
            setEditingTask(null); // Clear the editing task
        };

        // Supprimer une tâche
        const deleteTask = (taskId) => {
            setTasks(tasks.filter((task) => task.id !== taskId));
        };

        // Ajouter une catégorie
        const addCategory = () => {
            const newCategory = {
                id: Date.now().toString(),
                title: categoryTitle,
                color: categoryColor,
                emoji: categoryEmoji,
                isActive: true,
            };
            setCategories([...categories, newCategory]);
            resetCategoryForm();
        };

        // Supprimer une catégorie
        const deleteCategory = (categoryId) => {
            setCategories(categories.filter((category) => category.id !== categoryId));
            // Supprimer les tâches liées à la catégorie
            setTasks(tasks.filter((task) => task.categoryId !== categoryId));
        };

        // Modifier une catégorie
        const updateCategory = (updatedCategory) => {
            setCategories(categories.map((category) => (category.id === updatedCategory.id ? updatedCategory : category)));
        };

        // Filtrer les tâches
        const filteredTasks = tasks.filter((task) => {
            const matchesCategory = filterCategory ? task.categoryId === filterCategory : true;
            const matchesState = filterState ? task.state === filterState : true;
            const matchesUrgent = filterUrgent ? task.urgent.toString() === filterUrgent : true;
            const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());

            return matchesCategory && matchesState && matchesUrgent && matchesSearch;
        });

        // Reset du formulaire de tâche
        const resetTaskForm = () => {
            setTaskTitle("");
            setTaskDescription("");
            setTaskDueDate("");
            setTaskState("Nouveau");
            setTaskUrgent(false);
            setTaskCategory("");
        };

        // Reset du formulaire de catégorie
        const resetCategoryForm = () => {
            setCategoryTitle("");
            setCategoryColor("#ffffff");
            setCategoryEmoji("⭐");
        };

        return (
            <div>
                <h1>Gestion des Tâches</h1>

                {/* Recherche */}
                <input
                    type="text"
                    placeholder="Rechercher..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                {/* Filtrage */}
                <select onChange={(e) => setFilterCategory(e.target.value)} value={filterCategory}>
                    <option value="">Filtrer par catégorie</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.title}
                        </option>
                    ))}
                </select>
                <select onChange={(e) => setFilterState(e.target.value)} value={filterState}>
                    <option value="">Filtrer par état</option>
                    <option value="Nouveau">Nouveau</option>
                    <option value="En cours">En cours</option>
                    <option value="Réussi">Réussi</option>
                    <option value="En attente">En attente</option>
                    <option value="Abandonné">Abandonné</option>
                </select>
                <select onChange={(e) => setFilterUrgent(e.target.value)} value={filterUrgent}>
                    <option value="">Filtrer par urgence</option>
                    <option value="true">Urgent</option>
                    <option value="false">Non urgent</option>
                </select>

                {/* Liste des tâches */}
                <div>
                    <h2>Tâches</h2>
                    <ul>
                        {filteredTasks.map((task) => {
                            const category = categories.find((cat) => cat.id === task.categoryId);
                            return (
                                <li key={task.id} style={{ border: `2px solid ${category?.color}` }}>
                                    <strong>{task.title}</strong> ({category?.title})
                                    <p>{task.description}</p>
                                    <p>{task.state}</p>
                                    <p>{task.dueDate}</p>
                                    <p>{task.urgent ? "Urgent" : "Non urgent"}</p>
                                    <button onClick={() => { setEditingTask(task); setTaskTitle(task.title); setTaskDescription(task.description); setTaskDueDate(task.dueDate); setTaskState(task.state); setTaskUrgent(task.urgent); setTaskCategory(task.categoryId); }}>
                                        Modifier
                                    </button>
                                    <button onClick={() => deleteTask(task.id)}>Supprimer</button>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* Liste des catégories */}
                <div>
                    <h2>Catégories</h2>
                    <ul>
                        {categories.map((category) => (
                            <li key={category.id} style={{ color: category.color }}>
                                <span>{category.emoji} {category.title}</span>
                                <button onClick={() => updateCategory({ ...category, title: `${category.title} (modifié)` })}>Modifier</button>
                                <button onClick={() => deleteCategory(category.id)}>Supprimer</button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Formulaire d'ajout ou de modification de tâche */}
                <div>
                    <h2>{editingTask ? "Modifier la Tâche" : "Ajouter une Tâche"}</h2>
                    <input
                        type="text"
                        placeholder="Intitulé"
                        value={taskTitle}
                        onChange={(e) => setTaskTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Description"
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                    />
                    <input
                        type="date"
                        value={taskDueDate}
                        onChange={(e) => setTaskDueDate(e.target.value)}
                    />
                    <select value={taskState} onChange={(e) => setTaskState(e.target.value)}>
                        <option value="Nouveau">Nouveau</option>
                        <option value="En cours">En cours</option>
                        <option value="Réussi">Réussi</option>
                        <option value="En attente">En attente</option>
                        <option value="Abandonné">Abandonné</option>
                    </select>
                    <label>
                        Urgent
                        <input
                            type="checkbox"
                            checked={taskUrgent}
                            onChange={() => setTaskUrgent(!taskUrgent)}
                        />
                    </label>
                    <select
                        value={taskCategory}
                        onChange={(e) => setTaskCategory(e.target.value)}
                    >
                        <option value="">Choisir une catégorie</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.title}
                            </option>
                        ))}
                    </select>
                    <button onClick={editingTask ? updateTask : addTask}>
                        {editingTask ? "Mettre à jour" : "Ajouter"}
                    </button>
                    {editingTask && (
                        <button onClick={() => { resetTaskForm(); setEditingTask(null); }}>
                            Annuler
                        </button>
                    )}
                </div>

                {/* Formulaire d'ajout de catégorie */}
                <div>
                    <h2>Ajouter une Catégorie</h2>
                    <input
                        type="text"
                        placeholder="Titre"
                        value={categoryTitle}
                        onChange={(e) => setCategoryTitle(e.target.value)}
                    />
                    <input
                        type="color"
                        value={categoryColor}
                        onChange={(e) => setCategoryColor(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Emoji"
                        value={categoryEmoji}
                        onChange={(e) => setCategoryEmoji(e.target.value)}
                    />
                    <button onClick={addCategory}>Ajouter</button>
                </div>
            </div>
        );
    };

    export default TaskManager;
