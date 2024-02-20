import "../stylesheets/SearchBar.scss";
import { useState } from "react";

function SearchBar({ categories, setCategories }) {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);

    let filterList = [];
    categories.list.forEach((category) => {
      const tmpCategory = { ...category };

      const prestations = tmpCategory.prestations.filter((item) =>
        item.name.toLowerCase().includes(e.target.value)
      );

      if (prestations.length > 0) {
        tmpCategory.prestations = prestations;
        filterList.push(tmpCategory);
      }
    });

    setCategories({
      ...categories,
      filtered: filterList,
    });
  };

  return (
    <div className="search-bar">
      <div>
        <input
          id="searchbar"
          type="search"
          placeholder="Chercher un projet..." 
          onChange={handleChange}
          value={value}
        />
      </div>
    </div>
  );
}

export default SearchBar;