let urlParams = new URLSearchParams(window.location.search);
let urlSymbol = urlParams.get('symbol'); //the current symbol
var ctx = document.getElementById('myChart').getContext('2d');

window.onload = webLoad();

function webLoad() {
    fetch('https://financialmodelingprep.com/api/v3/company/profile/' +
        urlSymbol).then((response) => {
        return response.json()
    }).then((data) => {
        let upArrow = document.getElementById("stockUp");
        let downArrow = document.getElementById("stockDown");
        document.getElementById("symbolPicture").src = data.profile.image;
        document.getElementById("symbolName").innerText = data.profile.companyName;
        document.getElementById("symbolDesc").innerText = data.profile.description;
        document.getElementById("symbolLink").href = data.profile.website;
        document.getElementById("stockPrice").innerText = 'Stock price: $' + data.profile.price;
        document.getElementById("stockChange").innerText = data.profile.changesPercentage;

        function arrows() {
            if (data.profile.changes > 0) {
                upArrow.classList.add("showUp");
                downArrow.classList.remove("stockDown");

            } else {
                downArrow.classList.add("showDown");
                upArrow.classList.remove("stockUp");
            }
        }
        arrows();
    })
}

function showSpinner() {
    spinner.className = "show";
    setTimeout(() => {
        spinner.className = spinner.className.replace("show", "");
    }, 600);
}

function createChart() {
	showSpinner();
    fetch('https://financialmodelingprep.com/api/v3/historical-price-full/' +
        urlSymbol + '?serietype=line').then((response) => {
        return response.json()
    }).then((data) => {
        
    let history = data.historical;
    let myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [history[0].date,
             history[Math.ceil(history.length * 0.2)].date,
             history[Math.ceil(history.length * 0.4)].date,
             history[Math.ceil(history.length * 0.6)].date,
             history[Math.ceil(history.length * 0.8)].date,
             history[history.length - 1].date
             ],
            datasets: [{
                label: 'Stock Price History',
                data: [data.historical[0].close,
                 history[Math.ceil(history.length *0.2)].close,
                 history[Math.ceil(history.length *0.4)].close,
                 history[Math.ceil(history.length *0.6)].close, 
                 history[Math.ceil(history.length *0.8)].close,
                 history[history.length -1].close],
                backgroundColor: [
                    'rgba(0, 23, 194, 1)',
                ],
                borderColor: [
                    'rgba(0, 0, 0, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 3
            }]
        },
        options: {
            tooltips: { enabled: false },
            hover: { mode: null },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
})}
createChart();