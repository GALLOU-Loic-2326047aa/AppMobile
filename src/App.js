import React, { useState } from "react";
import "./styles/App.css";
import TaskForm from "./components/TaskForm";
import CategoryForm from "./components/CategoryForm";
import TaskList from "./components/TaskList";
import CategoryList from "./components/CategoryList";
import Filters from "./components/Filters";

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState("");
    const [filterCategory, setFilterCategory] = useState("");
    const [filterState, setFilterState] = useState("");
    const [filterUrgent, setFilterUrgent] = useState("");

    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskDueDate, setTaskDueDate] = useState("");
    const [taskState, setTaskState] = useState("Nouveau");
    const [taskUrgent, setTaskUrgent] = useState(false);
    const [taskCategory, setTaskCategory] = useState("");

    const [categoryTitle, setCategoryTitle] = useState("");
    const [categoryColor, setCategoryColor] = useState("#ffffff");
    const [categoryEmoji, setCategoryEmoji] = useState("⭐");

    const [editingTask, setEditingTask] = useState(null);

    const filteredTasks = tasks.filter((task) => {
        const matchesCategory = filterCategory ? task.categoryId === filterCategory : true;
        const matchesState = filterState ? task.state === filterState : true;
        const matchesUrgent = filterUrgent ? task.urgent.toString() === filterUrgent : true;
        const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
        return matchesCategory && matchesState && matchesUrgent && matchesSearch;
    });

    // Ajouter une tâche
    const addTask = (newTask) => {
        setTasks([...tasks, newTask]);
    };

    // Modifier une tâche
    const updateTask = (updatedTask) => {
        setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
    };

    // Supprimer une tâche
    const deleteTask = (taskId) => {
        setTasks(tasks.filter((task) => task.id !== taskId));
    };

    // Ajouter une catégorie
    const addCategory = (newCategory) => {
        setCategories([...categories, newCategory]);
    };

    // Modifier une catégorie
    const updateCategory = (updatedCategory) => {
        setCategories(categories.map((category) => (category.id === updatedCategory.id ? updatedCategory : category)));
    };

    // Supprimer une catégorie
    const deleteCategory = (categoryId) => {
        setCategories(categories.filter((category) => category.id !== categoryId));
        setTasks(tasks.filter((task) => task.categoryId !== categoryId)); // Supprimer les tâches liées
    };

    return (
        <div>
            <h1>Gestion des Tâches</h1>
            <Filters
                search={search}
                setSearch={setSearch}
                filterCategory={filterCategory}
                setFilterCategory={setFilterCategory}
                filterState={filterState}
                setFilterState={setFilterState}
                filterUrgent={filterUrgent}
                setFilterUrgent={setFilterUrgent}
                categories={categories}
            />
            <TaskForm
                taskTitle={taskTitle}
                setTaskTitle={setTaskTitle}
                taskDescription={taskDescription}
                setTaskDescription={setTaskDescription}
                taskDueDate={taskDueDate}
                setTaskDueDate={setTaskDueDate}
                taskState={taskState}
                setTaskState={setTaskState}
                taskUrgent={taskUrgent}
                setTaskUrgent={setTaskUrgent}
                taskCategory={taskCategory}
                setTaskCategory={setTaskCategory}
                addTask={addTask}
                updateTask={updateTask}
                editingTask={editingTask}
                setEditingTask={setEditingTask}
            />
            <TaskList
                tasks={filteredTasks}
                categories={categories}
                deleteTask={deleteTask}
                setEditingTask={setEditingTask}
            />
            <CategoryForm
                categoryTitle={categoryTitle}
                setCategoryTitle={setCategoryTitle}
                categoryColor={categoryColor}
                setCategoryColor={setCategoryColor}
                categoryEmoji={categoryEmoji}
                setCategoryEmoji={setCategoryEmoji}
                addCategory={addCategory}
            />
            <CategoryList
                categories={categories}
                deleteCategory={deleteCategory}
                updateCategory={updateCategory}
            />
        </div>
    );
};

export default App;
