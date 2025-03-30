import React from "react";

const CategoryList = ({ categories, deleteCategory, updateCategory }) => {
    return (
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
    );
};

export default CategoryList;
