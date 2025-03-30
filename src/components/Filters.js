import React from "react";

const Filters = ({
                     search, setSearch, filterCategory, setFilterCategory,
                     filterState, setFilterState, filterUrgent, setFilterUrgent, categories
                 }) => {
    return (
        <div>
            <input
                type="text"
                placeholder="Rechercher..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
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
        </div>
    );
};

export default Filters;
