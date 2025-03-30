import React from "react";

const CategoryForm = ({ categoryTitle, setCategoryTitle, categoryColor, setCategoryColor, categoryEmoji, setCategoryEmoji, addCategory }) => {
    const handleSubmit = () => {
        const newCategory = {
            id: Date.now().toString(),
            title: categoryTitle,
            color: categoryColor,
            emoji: categoryEmoji,
            isActive: true,
        };
        addCategory(newCategory);
        setCategoryTitle("");
        setCategoryColor("#ffffff");
        setCategoryEmoji("⭐");
    };

    return (
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
            <button onClick={handleSubmit}>Ajouter</button>
        </div>
    );
};

export default CategoryForm;
