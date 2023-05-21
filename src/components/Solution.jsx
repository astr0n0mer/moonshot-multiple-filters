import { useState } from "react";
import "./style.css";

import { filters } from "./filters";
import { items } from "./items";

export default function Solution() {
  const [activeFilters, setActiveFilters] = useState([]);

  return (
    <main className="container">
      <h2 style={{ textAlign: "center" }}>MoonshotX Filters</h2>

      <div className="buttons-container">
        {filters.map((filter) => (
          <FilterButton
            key={filter}
            filterValue={filter}
            setActiveFilters={setActiveFilters}
          />
        ))}
      </div>

      <div className="items-container">
        {items
          .filter(
            (item) =>
              activeFilters.length === 0 ||
              activeFilters.includes(item.category)
          )
          .map(({ name, category }) => (
            <ProductCard
              key={name}
              name={name}
              category={category}
              data-testid={name}
            />
          ))}
      </div>
    </main>
  );
}

function FilterButton({ filterValue, setActiveFilters, ...props }) {
  const [isActive, setIsActive] = useState(false);

  function toggleIsActive() {
    setIsActive((isActive) => !isActive);

    if (!isActive) {
      setActiveFilters((activeFilters) => [...activeFilters, filterValue]);
    } else {
      setActiveFilters((activeFilters) =>
        activeFilters.filter((activeFilter) => activeFilter !== filterValue)
      );
    }
  }

  return (
    <button
      className={`button ${isActive ? "active" : ""}`}
      onClick={toggleIsActive}
      data-testid={`${filterValue}-button`}
      {...props}
    >
      {filterValue}
    </button>
  );
}

function ProductCard({ name, category, ...props }) {
  return (
    <div className="item" {...props}>
      {name}
      <p className="category">{category}</p>
    </div>
  );
}
