// Grafica de Torta o Sectores

var pieCanvas = document.getElementById("pie");

Chart.defaults.global.defaultFontFamily = "Lato";
Chart.defaults.global.defaultFontSize = 8;
Chart.defaults.global.tooltips = false;
Chart.defaults.global.animation.easing = 'linear';

var oilData = 
{
    labels: [],
    datasets: 
    [{
        data: [133.3, 86.2, 52.2, 51.2, 50.2],
        backgroundColor: 
        [
            "#FF6384",
            "#63FF84",
            "#84FF63",
            "#8463FF",
            "#6384FF"
        ],
        borderColor:
        [
            "#FF6384",
            "#63FF84",
            "#84FF63",
            "#8463FF",
            "#6384FF"
        ],
        borderWidth: [1, 1, 1, 1, 1]
    }]
};

var pieChart = new Chart(pieCanvas, 
{
    type: 'pie',
    data: oilData
});

// Grafica de Lineas

var speedCanvas = document.getElementById("line");

Chart.defaults.global.defaultFontFamily = "Lato";
Chart.defaults.global.defaultFontSize = 8;
Chart.defaults.global.tooltips = false;
Chart.defaults.global.legend = false;
Chart.defaults.global.animation.easing = 'linear';

var speedData = 
{
    labels: ["0s", "10s", "20s", "30s", "40s", "0"],
    datasets: [
    {
        label: "",
        data: [0, 59, 75, 20, 20, 0],
        borderColor: 'black',
        pointBorderColor: 'black',
        fill: true,
        backgroundColor: '#cecece',
        pointBackgroundColor: 'orange',
        pointRadius: 5,
        pointHoverRadius: 10,
        pointHitRadius: 10,
        pointBorderWidth: 2,
        pointStyle: 'Rounded'
    }]
};

var chartOptions = 
{
    responsive: true,
    scales: 
    {
        xAxes: [
        {
            ticks: 
            {
                display: false
            },
            gridLines: 
            {
                display:false
            }
        }],

        yAxes: [
        {
        	display: false,
            ticks: 
            {
                display: false
            },
            gridLines: 
            {
                display:false
            }
        }]
    }
};

var lineChart = new Chart(speedCanvas, 
{
    type: 'line',
    data: speedData,
    options: chartOptions
});

// Grafica de Barras

var densityCanvas = document.getElementById("bar");

Chart.defaults.global.defaultFontFamily = "Lato";
Chart.defaults.global.defaultFontSize = 8;
Chart.defaults.global.tooltips = false;
Chart.defaults.global.legend = false;
Chart.defaults.global.animation.easing = 'linear';

var densityData =
{
    labels: ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"],
    datasets: [
    {
        label: "",
        data: [3427, 2243, 5014, 3933, 1726, 2687, 2071, 2638],
        backgroundColor: 
        [
            "#FF6384",
            "#f17a03",
            "#84FF63",
            "#8463FF",
            "#42f4bf",
            "#EEEEEE",
            "#f441d6",
            "#f20444"
        ]
    }]
    
};

var chartOptions = 
{
    responsive: true,
    scales: 
    {
        xAxes: [
        {
            ticks: 
            {
                display: false
            },
            gridLines: 
            {
                display:false
            }
        }],

        yAxes: [
        {
        	display: false,
            ticks: 
            {
                display: false
            },
            gridLines: 
            {
                display:false
            }
        }]
    }
};

var barChart = new Chart(densityCanvas, 
{
    type: 'bar',
    data: densityData,
    options: chartOptions
});

