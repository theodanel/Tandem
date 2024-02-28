// import "../stylesheets/SearchBar.scss";
// import { useState } from "react";

// function SearchBar({ projects, setProjects }) {
//   const [value, setValue] = useState("");

//   const handleChange = (e) => {
//     setValue(e.target.value);

//     let filterList = [];
//     projects.list.forEach((projects) => {
//       const tmpProjects = { ...projects };

//       const prestations = tmpProjects.prestations.filter((item) =>
//         item.name.toLowerCase().includes(e.target.value)
//       );

//       if (prestations.length > 0) {
//         tmpProjects.prestations = prestations;
//         filterList.push(tmpCategory);
//       }
//     });

//     setProjects({
//       ...projects,
//       filtered: filterList,
//     });
//   };

//   return (
//     <div className="search-bar">
//       <div>
//         <input
//           id="searchbar"
//           type="search"
//           placeholder="Chercher un projet..." 
//           onChange={handleChange}
//           value={value}
//         />
//       </div>
//     </div>
//   );
// }

// export default SearchBar;