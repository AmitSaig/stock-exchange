class Marquee {
    constructor(area) {
        this.area = area;
    }
    load() {
        fetch('https://financialmodelingprep.com/api/v3/stock/real-time-price/?_limit=10')
            .then((response) => {
                return response.json()
            }).then((data) => {

                let createMarq = document.createElement("div")
                createMarq.classList.add('marq-style')
                for (let i = 0; i < 10; i++) {
                    let marqI = data.stockList[i];
                    let marqTest = document.createElement("p")
                    let marqList = document.createTextNode(' |  ' + marqI.symbol + '' )
                    let marqPrice = document.createTextNode(' ($' + marqI.price + ')  ')
                    marqTest.appendChild(marqPrice)
                    createMarq.appendChild(marqList)
                    createMarq.appendChild(marqTest)
                    this.area.appendChild(createMarq)
                }
            })
    }
}








/*presentStocks();*/

/*function Marquee(symbol, price) {
    this.data.stockList[2].symbol = symbol;
    this.data.stockList[2].price = price;
    console.log('hi' + symbol + 'hi' + price)
}*/