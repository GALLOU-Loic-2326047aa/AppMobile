import React, { useState, useEffect } from "react";

const TaskForm = ({
                      taskTitle, setTaskTitle, taskDescription, setTaskDescription,
                      taskDueDate, setTaskDueDate, taskState, setTaskState,
                      taskUrgent, setTaskUrgent, taskCategory, setTaskCategory,
                      addTask, updateTask, editingTask, setEditingTask
                  }) => {

    useEffect(() => {
        if (editingTask) {
            setTaskTitle(editingTask.title);
            setTaskDescription(editingTask.description);
            setTaskDueDate(editingTask.dueDate);
            setTaskState(editingTask.state);
            setTaskUrgent(editingTask.urgent);
            setTaskCategory(editingTask.categoryId);
        }
    }, [editingTask, setTaskTitle, setTaskDescription, setTaskDueDate, setTaskState, setTaskUrgent, setTaskCategory]);

    const handleSubmit = () => {
        const task = {
            id: Date.now().toString(),
            title: taskTitle,
            description: taskDescription,
            dueDate: taskDueDate,
            state: taskState,
            urgent: taskUrgent,
            categoryId: taskCategory,
            createdAt: new Date().toISOString(),
        };
        if (editingTask) {
            updateTask(task);
        } else {
            addTask(task);
        }
        resetForm();
    };

    const resetForm = () => {
        setTaskTitle("");
        setTaskDescription("");
        setTaskDueDate("");
        setTaskState("Nouveau");
        setTaskUrgent(false);
        setTaskCategory("");
        setEditingTask(null);
    };

    return (
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
                {/* Categories list */}
            </select>
            <button onClick={handleSubmit}>
                {editingTask ? "Mettre à jour" : "Ajouter"}
            </button>
        </div>
    );
};

export default TaskForm;
