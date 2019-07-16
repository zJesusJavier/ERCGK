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