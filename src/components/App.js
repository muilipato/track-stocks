import { useState, useEffect } from "react";

function App(){
    const[stocks, setStocks] = useState([]);
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '1ab5726860msh1964662156113f6p1d5559jsn4c21bbce5c1f',
            'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
        }
    };

    useEffect(() => {
        fetch("https://twelve-data1.p.rapidapi.com/stocks?exchange=NASDAQ",options)
        .then(res => res.json())
        .then(mystocks => {
            
            const stockSymbols = mystocks.data.map(stock=> stock.symbol);
            console.log(stockSymbols)
            fetchPriceData(stockSymbols)
            setStocks(mystocks.data); // mystocks to be an array
        })  
        
    },[])
    console.log(stocks);
    
    function fetchPriceData(symbols) {
        symbols.forEach(symbol => {
           const params= {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '1ab5726860msh1964662156113f6p1d5559jsn4c21bbce5c1f',
                    'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
                }
            };
            fetch(`https://twelve-data1.p.rapidapi.com/price?symbol=${symbol}`,params)
            .then(response => response.json())
            .then(data => {       
                setStocks(prevStocks => {
                    const updatedStocks = prevStocks.map(stock =>{
                        if (stock.symbol === symbol){
                            return {...stock, price: data.price}
                        }
                        return stock;
                    })
                    return updatedStocks;
                })
            })
            .catch(error =>console.log(error))
        });
    }
    return (
        <div>
            <h1>Stocks</h1>
            <p>{stocks[0].price}</p>
        </div>
    )

}
export default App;
