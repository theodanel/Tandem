// Source : https://dev.to/salehmubashar/search-bar-in-react-js-545l
import { React, useState } from "react";
import "../stylesheets/SearchBar.scss";

const SearchsBar = () => {
    const [inputText, setInputText] = useState("");
    let inputHandler = (e) => {
        //Convertie le text en minuscule
        var lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    };

    return (
        <div className="main">
            <div className="search">
                <input
                    id="outlined-basic"
                    onChange={inputHandler}
                    variant="outlined"
                    fullWidth
                    label="Search"
                />
            </div>
            {/* <List input={inputText} /> */}
        </div>
    );
}


export default SearchsBar;