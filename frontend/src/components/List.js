import { React, useState } from 'react'
import data from "./ListData.json"

const List = (props) => {
    //créer un nouveau tableau en filtrant le tableau d'origine
    const filteredData = data.filter((el) => {
        //if si aucune entrée, renvoie l'original
        if (props.input === '') {
            return el;
        }
        //renvoie l'élément qui contient l'entrée
        else {
            return el.text.toLowerCase().includes(props.input)
        }
    })
    return (
        <ul>
            {filteredData.map((item) => (
                <li key={item.id}>{item.text}</li>
            ))}
        </ul>
    )
}

export default List