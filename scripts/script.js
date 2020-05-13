let input = document.getElementById('searchInput')
let testing = document.getElementsByTagName('moreInfo')
let test = document.getElementById("resultsList").childElementCount;



//marq function
(async function() {
    const marquee = new Marquee(document.getElementById('stockMarq'))
    marquee.load();
})()

//debounce auto-serach
function debounce(func, wait) {
    let timeout
    return function(...args) {
        const context = this
        clearTimeout(timeout)
        timeout = setTimeout(() => func.apply(context, args), wait)
    }
}


// search related
document.getElementById("searchButton").addEventListener("click", clearResults);
document.getElementById("searchInput").addEventListener("keyup", debounce(displayBtn, 1500));

function clearResults() {

    while (resultsList.firstChild) {
        resultsList.removeChild(resultsList.firstChild);
    }
}

//creating result list
function displayBtn() {
    showSpinner();
    clearResults();
    fetch('https://financialmodelingprep.com/api/v3/search?query=' +
        input.value + '&limit=10&exchange=NASDAQ').then((response) => {
        return response.json()
    }).then((data) => {
        let resultsList = document.getElementById('resultsList');

        //no result function
        if (data.length === 0) {

            let noResult = document.createElement("p")
            noResult = document.createTextNode('No Search Results')
            let newResult = document.createElement('div');
            newResult.appendChild(noResult)
            resultsList.appendChild(newResult);
            newResult.classList.add('append-error');
        } else {

            function listOfResults() {

                for (i = 0; i < data.length; i++) {
                    let attempt = data[i]
                    fetch(`https://financialmodelingprep.com/api/v3/company/profile/` + data[i].symbol)
                        .then(response => response.json())
                        .then(details => {

                            let deepFetch = details.profile;

                            let newResult = document.createElement('div');

                            //image
                            let fetchImg = document.createElement("img");
                            fetchImg.src = deepFetch.image
                            newResult.appendChild(fetchImg);

                            //company link
                            let createLink = document.createElement('a')
                            logoLink = document.createTextNode(attempt.name)
                            createLink.appendChild(logoLink)
                            createLink.href = `company.html?symbol=${attempt.symbol}`
                            newResult.appendChild(createLink)


                            //company symbol
                            let createSymbol = document.createElement("p")
                            logoSymbol = document.createTextNode('(' + attempt.symbol + ')')
                            createSymbol.appendChild(logoSymbol)
                            newResult.appendChild(logoSymbol)


                            //stock percent
                            let createPercent = document.createElement("span")
                            if (deepFetch.changesPercentage.includes("+")) {
                                createPercent.classList.add('positive')
                            } else {
                                createPercent.classList.add('negative')
                            }
                            logoPercent = document.createTextNode('(' + deepFetch.changesPercentage + ')')
                            createPercent.appendChild(logoPercent)
                            newResult.appendChild(createPercent)

                            let percents = deepFetch.changesPercentage.slice(1, -2);
                            percents = parseFloat(percents)



                            //append to the main div
                            resultsList.appendChild(newResult);
                            newResult.classList.add('append-class');
                            newResult.id = 'moreInfo';
                            let high = input.value

                            let instance = new Mark(document.getElementById("resultsList"));
                            instance.mark(input.value);

                            //button function
                            const buttonCompare = new ButtonInTheList(newResult, deepFetch);


                        })
                }
            }
            listOfResults();

        }

    })

}

function ButtonInTheList(element, item) {
    const button = document.createElement("button")
    button.innerText = "Compare"
    button.classList.add('compareBtn')
    element.appendChild(button)

    button.onclick = () => {
        console.log(item)
    }
}

//spinner
function showSpinner() {
    spinner.className = "show";
    setTimeout(() => {
        spinner.className = spinner.className.replace("show", "");
    }, 700);
}