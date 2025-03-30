import React from "react";

const TaskList = ({ tasks, categories, deleteTask, setEditingTask }) => {
    return (
        <div>
            <h2>Tâches</h2>
            <ul>
                {tasks.map((task) => {
                    const category = categories.find((cat) => cat.id === task.categoryId);
                    return (
                        <li key={task.id} style={{ border: `2px solid ${category?.color}` }}>
                            <strong>{task.title}</strong> ({category?.title})
                            <p>{task.description}</p>
                            <p>{task.state}</p>
                            <p>{task.dueDate}</p>
                            <p>{task.urgent ? "Urgent" : "Non urgent"}</p>
                            <button onClick={() => { setEditingTask(task); }}>
                                Modifier
                            </button>
                            <button onClick={() => deleteTask(task.id)}>Supprimer</button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default TaskList;
