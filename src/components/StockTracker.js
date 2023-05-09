import { useState, useEffect } from "react";

function StockTable(){
    const[stocks, setStocks] = useState([]);
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '1ab5726860msh1964662156113f6p1d5559jsn4c21bbce5c1f',
            'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
        }
    };

    useEffect(() => {
        fetch("'https://twelve-data1.p.rapidapi.com/stocks?exchange=NASDAQ&format=json",options)
        .then(res => res.json())
        .then(data =>console.log(data))
    })

}
export default StockTable;
