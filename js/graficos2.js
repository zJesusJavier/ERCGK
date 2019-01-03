// Grafica de Barras

var densityCanvas = document.getElementById("reportes");

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