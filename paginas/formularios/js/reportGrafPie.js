require('module-alias/register');
var con = require('@models/db');
var Highcharts = require('highcharts');
var swal = require('sweetalert');
var cand, per, cat;

function buscadorPerCat() {
    con.query("SELECT * FROM candidata WHERE est_can='A' ORDER BY fec_can DESC", function (err, result, fields) {
        con.query("SELECT * FROM categoria WHERE est_cat='A'", function (err, result1, fields) {
            var text, i;

            text = '<form autocomplete="off" role="search" >'
            text += '<p>Seleccione el Período: </p>'
            text += '<select class="form-control" id="periodo">'

            var aux = [];
            var fin = [];
            var text, i, j = 0,
                k, z = 0,
                num, ano, c = 0;

            for (i = 0; i < result.length; i++) {
                c = 0;
                num = result[i].fec_can.getFullYear();
                aux[j] = num;
                j++;
                for (k = 0; k < result.length; k++)
                    if (aux[k] == num) {

                        c = c + 1;
                    }
                if (c == 1) {
                    fin[z] = num;
                    z = z + 1;
                }
            }

            for (j = 0; j < z; j++) {
                ano = fin[j];
                text += '<option value="' + ano + '" selected>‌' + ano + '</option>'
            }

            text += '</select>'
            text += '<p>Categoria: </p>'
            text += '<select class="form-control" id="categoria">'
            for (i = 0; i < result1.length; i++) {
                text += '<option value="' + result1[i].cod_cat + '" selected>‌' + result1[i].nom_cat + '</option>'
            }
            text += '</select>'
            text += '<a type="submit" class="btn btn-primary" onclick="selectGraf();">Generar</a>'
            text += '<a href="reportes.html" type="submit" class="btn btn-success pull-center">Regresar</a>'
            text += '</form>'
            document.getElementById("perCat").innerHTML = text;
        });
    });
}

function selectGraf() {
    per = document.getElementById("periodo").value;
    cat = document.getElementById("categoria").value;

    var text, i;

    con.query("SELECT candidata.*, categoria.nom_cat FROM candidata INNER JOIN categoria ON candidata.fky_cat=categoria.cod_cat", function (err, result, fields) {
        text = '<thead class="text-oscuro">';
        text += '<td><b>';
        text += 'Cédula';
        text += '</b></td>';
        text += '\t\t';
        text += '<td><b>';
        text += 'Nombres y Apellidos';
        text += '</b></td>';
        text += '\t\t';
        text += '<td><b>';
        text += 'Categoria';
        text += '</b></td>';
        text += '\t\t';
        text += '<td><b>';
        text += 'Gráfico';
        text += '</b></td>';
        text += '</thead>';

        for (i = 0; i < result.length; i++) {

            var ano = result[i].fec_can.getFullYear();

            text += '<tbody>';
            if ((per == ano) && (cat == result[i].fky_cat)) {

                text += '<tr>';
                text += '<td>';
                text += result[i].ci_can;
                text += '</td>';
                text += '\t\t';
                text += '<td>';
                text += result[i].nom_can;
                text += ' ';
                text += result[i].ape_can;
                text += '</td>';
                text += '\t\t';
                text += '<td>';
                text += result[i].nom_cat;
                text += '</td>';
                text += '\t\t';
                text += '<td>';
                text += '<a type="button" rel="tooltip" title="Ver más" onclick="graficoPie(' + result[i].cod_can + ');"><i class="material-icons text-info" data-toggle="modal">open_in_browser</i></a>';
                text += "</td>";
                text += '</tr>';

            }
            text += '</tbody>';
            document.getElementById("resultado").innerHTML = text;
        }
    });
}

function graficoPie(c) {
    cand = c;
    document.getElementById("espacio").innerHTML = "";

    // Crear el gráfico
    con.query("SELECT * FROM calificacion WHERE fky_can='" + cand + "'", function (err, result1, fields1) {

        if (err) console.log(err);

        if (result1.length >= 1) {
            var text, i;
            var clase1 = 0,
                clase2 = 0,
                clase3 = 0,
                clase4 = 0,
                clase5 = 0,
                clase6 = 0,
                clase7 = 0,
                clase8 = 0,
                clase9 = 0,
                clase10 = 0,
                clase11 = 0,
                clase12 = 0,
                clase13 = 0,
                clase14 = 0;
            ultsem = -999;

            for (i = 0; i < result1.length; i++) {
                if (result1[i].sem_cal > ultsem) {
                    ultsem = result1[i].sem_cal;
                }
                if (result1[i].fky_cla == 1) {
                    clase1 = clase1 + 1;
                }
                if (result1[i].fky_cla == 2) {
                    clase2 = clase2 + 1;
                }
                if (result1[i].fky_cla == 3) {
                    clase3 = clase3 + 1;
                }
                if (result1[i].fky_cla == 4) {
                    clase4 = clase4 + 1;
                }
                if (result1[i].fky_cla == 5) {
                    clase5 = clase5 + 1;
                }
                if (result1[i].fky_cla == 6) {
                    clase6 = clase6 + 1;
                }
                if (result1[i].fky_cla == 7) {
                    clase7 = clase7 + 1;
                }
                if (result1[i].fky_cla == 8) {
                    clase8 = clase8 + 1;
                }
                if (result1[i].fky_cla == 9) {
                    clase9 = clase9 + 1;
                }
                if (result1[i].fky_cla == 10) {
                    clase10 = clase10 + 1;
                }
                if (result1[i].fky_cla == 11) {
                    clase11 = clase11 + 1;
                }
                if (result1[i].fky_cla == 12) {
                    clase12 = clase12 + 1;
                }
                if (result1[i].fky_cla == 13) {
                    clase13 = clase13 + 1;
                }
                if (result1[i].fky_cla == 14) {
                    clase14 = clase14 + 1;
                }
            }

            text = '<h4><b>Gráfico del Desempeño de Clases</b></h4>'
            document.getElementById("titulo").innerHTML = text;

            for (i = 0; i < result1.length; i++) {
                //var pieCanvas = document.getElementById("grafico");

                /*   Chart.defaults.global.defaultFontFamily = "Lato";
            Chart.defaults.global.defaultFontSize = 12;
            Chart.defaults.global.tooltips = false;
            Chart.defaults.global.animation.easing = 'linear';
                       
            var oilData = 
            {
                labels: ['Actuación','Animación','Baile','Comunicación', 'Estética', 'Etiqueta', 'Expresión Corporal',
                        'Fotografía', 'Maquillaje', 'Moda', 'Oratoria', 'Pasarela', 'Patronaje','Protocolo'],
                datasets: [
                {
                    data: [clase1, clase2, clase3, clase4, clase5, clase6, clase7, clase8, clase9, clase10, clase11, clase12, clase13, clase14],
                
                    backgroundColor: 
                        [
                            "#FFC312",
                            "#F79F1F",
                            "#EE5A24",
                            "#FF6384",
                            "#63FF84",
                            "#84FF63",
                            "#8463FF",
                            "#6384FF",
                            "#1B1464",
                            "#5758BB",
                            "#9980FA",
                            "#D980FA",
                            "#FDA7DF",
                            "#B53471",
                            "#833471"
                        ],
                    borderColor:
                        [
                            "#FFC312",
                            "#F79F1F",
                            "#EE5A24",
                            "#FF6384",
                            "#63FF84",
                            "#84FF63",
                            "#8463FF",
                            "#6384FF",
                            "#1B1464",
                            "#5758BB",
                            "#9980FA",
                            "#D980FA",
                            "#FDA7DF",
                            "#B53471",
                            "#833471"
                        ],
                    borderWidth: [1, 1, 1, 1, 1]
                }],
       
                options:
                {
                    legend:
                    {
                        display: true,
                        position: 'bottom',
                        labels: 
                        {
                            boxWidth: 80,
                            fontColor: 'rgb(60, 180, 100)'
                        }
                    }
                }
            };

            var pieChart = new Chart(pieCanvas, 
            {
                type: 'pie',
                data: oilData
            });*/
            }
            Highcharts.chart('grafico', {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                categories: ['Actuación', 'Animación', 'Baile', 'Comunicación', 'Estética', 'Etiqueta', 'Expresión Corporal',
                    'Fotografía', 'Maquillaje', 'Moda', 'Oratoria', 'Pasarela', 'Patronaje', 'Protocolo'
                ],
                title: {
                    text: 'Browser market shares in January, 2018'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                            }
                        }
                    }
                },
                series: [{
                    name: 'Brands',
                    colorByPoint: true,
                    data: [{
                        name: 'Baile',
                        y: 61.41,
                        sliced: true,
                        selected: true
                    }, {
                        name: 'Baile',
                        y: 11.84
                    }, {
                        name: 'Actuación',
                        y: 10.85
                    }, {
                        name: 'Baile',
                        y: 4.67
                    }, {
                        name: 'Actuación',
                        y: 4.18
                    }, {
                        name: 'Baile',
                        y: 1.64
                    }, {
                        name: 'Baile',
                        y: 1.6
                    }, {
                        name: 'Baile',
                        y: 1.2
                    }, {
                        name: 'Baile',
                        y: 2.61
                    }]
                }]
            });

        } else {
            swal("", "La candidata aún no ha sido evaluada", "info", {
                button: false,
                timer: 3000
            }).then(function () {
                window.location.reload();
            });
        }
    });
}

function graficoBar() {
    per = document.getElementById("periodo").value;
    cat = document.getElementById("categoria").value;

    con.query("SELECT * FROM calificacion", function (err, result1, fields1) {

        for (i = 0; i < result1.length; i++) {
            var pieCanvas = document.getElementById("grafico");

            Chart.defaults.global.defaultFontFamily = "Lato";
            Chart.defaults.global.defaultFontSize = 12;
            Chart.defaults.global.tooltips = false;
            Chart.defaults.global.animation.easing = 'linear';

            var oilData = {
                labels: ['Actuación', 'Animación'],
                datasets: [{
                    data: [1, 2],

                    backgroundColor: [
                        "#FFC312",
                        "#F79F1F",
                        "#EE5A24",
                        "#FF6384",
                        "#63FF84",
                        "#84FF63",
                        "#8463FF",
                        "#6384FF",
                        "#1B1464",
                        "#5758BB",
                        "#9980FA",
                        "#D980FA",
                        "#FDA7DF",
                        "#B53471",
                        "#833471"
                    ],
                    borderColor: [
                        "#FFC312",
                        "#F79F1F",
                        "#EE5A24",
                        "#FF6384",
                        "#63FF84",
                        "#84FF63",
                        "#8463FF",
                        "#6384FF",
                        "#1B1464",
                        "#5758BB",
                        "#9980FA",
                        "#D980FA",
                        "#FDA7DF",
                        "#B53471",
                        "#833471"
                    ],
                    borderWidth: [1, 1, 1, 1, 1]
                }],

                options: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            boxWidth: 80,
                            fontColor: 'rgb(60, 180, 100)'
                        }
                    }
                }
            };

            var pieChart = new Chart(pieCanvas, {
                type: 'bar',
                data: oilData
            });
        }

    });

}