require('module-alias/register');
var con = require('@models/db');
var Highcharts = require('highcharts');
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);

var swal = require('sweetalert');
var cand, per, cat;

function auditUser() {

    var categories = [],
        pie_data = [],
        text, datePickInit, datePickFin, sql;
    var date = new Date();
    var date = date.toLocaleDateString();
    text = "<div> <b>Filtro</b><br><br> Desde <input id='inicio' type='date'>";
    text += "    Hasta<input id='fin' type='date' max=" + date + ">";
    text += "    <input type='button' class='btn btn-success btn-sm' value='Buscar' onclick='FiltroAuditUser()'></div>";
    document.getElementById("datep").innerHTML = text;

    con.query("SELECT usu_ses AS name,	COUNT(usu_ses) AS y FROM sesion GROUP BY usu_ses", function (err, result, fields) {
        for (data in result) {
            let name = result[data]['name'];
            let freq = result[data]['y'];
            pie_data.push({
                name: name,
                y: freq
            });
        }

        Highcharts.chart('grafico', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },

            categories: categories,
            title: {
                text: 'Sesion de Usuarios'
            },
            tooltip: {
                pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.y:.0f} veces',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    },
                    showInLegend: true,
                    size: 200,
                }
            },
            credits: {
                enabled: false
            },
            exporting: {
                enabled: true
            },
            series: [{
                name: '',
                colorByPoint: true,
                data: pie_data,
            }]
        });
    });
}

function FiltroAuditUser() {
    var pie_data = [];
    datePickInit = document.getElementById('inicio').value;
    datePickFin = document.getElementById('fin').value;
    if (datePickInit || datePickFin) {
        sql = "SELECT usu_ses AS name,	COUNT(usu_ses) AS y FROM sesion WHERE date_ses BETWEEN  '" + datePickInit + "' AND '" + datePickFin + "'  GROUP BY usu_ses";
    }
    con.query(sql, function (err, result, fields) {
        for (data in result) {
            let name = result[data]['name'];
            let freq = result[data]['y'];
            pie_data.push({
                name: name,
                y: freq
            });
        }

        Highcharts.chart('grafico', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },

            title: {
                text: 'Sesion de Usuarios'
            },
            tooltip: {
                pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
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
                    },
                    showInLegend: true,
                    size: 200,
                }
            },
            credits: {
                enabled: false
            },
            exporting: {
                enabled: true
            },
            series: [{
                name: '',
                colorByPoint: true,
                data: pie_data,
            }]
        });
    });
}

function nivelUser() {

    var categories = [];
    var pie_data = [],
        drilld = [];
    var date = new Date();
    var date = date.toLocaleDateString();

    text = "<div> <b>Filtro</b><br><br> Desde <input id='inicio' type='date'>";
    text += "    Hasta<input id='fin' type='date' max=" + date + ">";
    text += "    <input type='button' class='btn btn-success btn-sm' value='Buscar' onclick='FiltroNivelUser()'></div>";
    document.getElementById("datep").innerHTML = text;

    con.query("SELECT usu_ses AS name, niv_ses AS descrip, COUNT(usu_ses) AS y FROM sesion GROUP BY niv_ses, usu_ses", function (err, result, fields) {
        for (data in result) {
            let name = result[data]['descrip'];
            let freq = result[data]['y'];
            let drill = result[data]['descrip'];
            pie_data.push({
                name: name,
                y: freq
            });
        }
        Highcharts.chart('grafico', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },

            categories: categories,
            title: {
                text: 'Niveles de Usuarios'
            },
            tooltip: {
                pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>',
                useHTML: true,
                shared: true
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
                    },
                    showInLegend: true,
                    size: 200,
                }
            },
            credits: {
                enabled: false
            },
            exporting: {
                enabled: true
            },
            series: [{
                name: '',
                colorByPoint: true,
                data: pie_data,
            }],

        });
    });
}

function FiltroNivelUser() {

    var categories = [];
    var pie_data = [],
        drilld = [];
    var date = new Date();
    var date = date.toLocaleDateString();
    var pie_data = [],
        datePickInit, datePickFin;
    datePickInit = document.getElementById('inicio').value;
    datePickFin = document.getElementById('fin').value;
    if (datePickInit || datePickFin) {
        sql = "SELECT niv_ses AS name,	COUNT(niv_ses) AS y FROM sesion WHERE date_ses BETWEEN  '" + datePickInit + "' AND '" + datePickFin + "'  GROUP BY niv_ses";
    }
    con.query(sql, function (err, result, fields) {
        for (data in result) {
            let name = result[data]['name'];
            let freq = result[data]['y'];
            pie_data.push({
                name: name,
                y: freq
            });
        }
        Highcharts.chart('grafico', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },

            categories: categories,
            title: {
                text: 'Niveles de Usuarios'
            },
            tooltip: {
                pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>',
                useHTML: true,
                shared: true
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
                    },
                    showInLegend: true,
                    size: 200,
                }
            },
            credits: {
                enabled: false
            },
            exporting: {
                enabled: true
            },
            series: [{
                name: '',
                colorByPoint: true,
                data: pie_data,
            }],
        });

    });
}

function accLogs() {

    var categories = [],
        pie_data = [];
    var date = new Date();
    var date = date.toLocaleDateString();

    text = "<div> <b>Filtro</b><br><br> Desde <input id='inicio' type='date'>";
    text += "    Hasta<input id='fin' type='date' max=" + date + ">";
    text += "    <input type='button' class='btn btn-success btn-sm' value='Buscar' onclick='FiltroAccLogs()'></div>";
    document.getElementById("datep").innerHTML = text;

    con.query("SELECT acc_log AS name, COUNT(acc_log) AS y FROM log  GROUP BY acc_log", function (err, result, fields) {
        for (data in result) {
            let name = result[data]['name'];
            let y = result[data]['y'];
            pie_data.push({
                name,
                y
            });
        }
        Highcharts.chart('grafico', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'column'
            },
            title: {
                text: 'Acciones Utilizadas'
            },
            xAxis: {
                type: 'category',
                labels: {
                    rotation: -45,
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            },
            yAxis: {
                min: 0,
            },
            legend: {
                enabled: false
            },
            tooltip: {
                pointFormat: '<b>{point.y:.0f}</b>'
            },
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                format: '{point.y:.0f}',
                y: 10,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            },
            credits: {
                enabled: false
            },
            exporting: {
                enabled: true
            },
            series: [{
                name: '',
                data: pie_data,
            }],

        });
    });
}

function FiltroAccLogs() {

    var categories = [],
        pie_data = [];
    var date = new Date();
    var date = date.toLocaleDateString();
    var pie_data = [],
        datePickInit, datePickFin;
    datePickInit = document.getElementById('inicio').value;
    datePickFin = document.getElementById('fin').value;
    if (datePickInit || datePickFin) {
        sql = "SELECT acc_log AS name,	COUNT(acc_log) AS y FROM log WHERE date_log BETWEEN  '" + datePickInit + "' AND '" + datePickFin + "'  GROUP BY acc_log";
    }
    con.query(sql, function (err, result, fields) {

        for (data in result) {
            let name = result[data]['name'];
            let y = result[data]['y'];
            pie_data.push({
                name,
                y
            });
        }
        Highcharts.chart('grafico', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'column'
            },
            title: {
                text: 'Acciones Utilizadas'
            },
            xAxis: {
                type: 'category',
                labels: {
                    rotation: -45,
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            },
            yAxis: {
                min: 0,
            },
            legend: {
                enabled: false
            },
            tooltip: {
                pointFormat: '<b>{point.y:.0f}</b>'
            },
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                format: '{point.y:.0f}',
                y: 10,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            },
            credits: {
                enabled: false
            },
            exporting: {
                enabled: true
            },
            series: [{
                name: '',
                data: pie_data,
            }],

        });
    });
}

function tabLogs() {

    var categories = [],
        pie_data = [];
    var date = new Date();
    var date = date.toLocaleDateString();

    text = "<div> <b>Filtro</b><br><br> Desde <input id='inicio' type='date'>";
    text += "    Hasta<input id='fin' type='date' max=" + date + ">";
    text += "    <input type='button' class='btn btn-success btn-sm' value='Buscar' onclick='FiltroTabLogs()'></div>";
    document.getElementById("datep").innerHTML = text;

    con.query("SELECT tab_log AS name, COUNT(*) AS y FROM log  GROUP BY tab_log", function (err, result, fields) {
        for (data in result) {
            let name = result[data]['name'];
            let y = result[data]['y'];
            pie_data.push({
                name,
                y
            });
        }
        Highcharts.chart('grafico', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'column'
            },
            title: {
                text: 'Tablas Utilizadas'
            },
            xAxis: {
                type: 'category',
                labels: {
                    rotation: -45,
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            },
            yAxis: {
                min: 0,
            },
            legend: {
                enabled: false
            },
            tooltip: {
                pointFormat: '<b>{point.y:.0f}</b>'
            },
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                format: '{point.y:.0f}',
                y: 10,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            },
            credits: {
                enabled: false
            },
            exporting: {
                enabled: true
            },
            series: [{
                name: '',
                data: pie_data,
            }],

        });
    });
}

function FiltroTabLogs() {

    var categories = [],
        pie_data = [];
    var date = new Date();
    var date = date.toLocaleDateString();
    var pie_data = [],
        datePickInit, datePickFin;
    datePickInit = document.getElementById('inicio').value;
    datePickFin = document.getElementById('fin').value;
    if (datePickInit || datePickFin) {
        sql = "SELECT tab_log AS name,	COUNT(tab_log) AS y FROM log WHERE date_log BETWEEN  '" + datePickInit + "' AND '" + datePickFin + "'  GROUP BY tab_log";
    }

    con.query(sql, function (err, result, fields) {
        for (data in result) {
            let name = result[data]['name'];
            let y = result[data]['y'];
            pie_data.push({
                name,
                y
            });
        }
        Highcharts.chart('grafico', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'column'
            },
            title: {
                text: 'Tablas Utilizadas'
            },
            xAxis: {
                type: 'category',
                labels: {
                    rotation: -45,
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            },
            yAxis: {
                min: 0,
            },
            legend: {
                enabled: false
            },
            tooltip: {
                pointFormat: '<b>{point.y:.0f}</b>'
            },
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                format: '{point.y:.0f}',
                y: 10,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            },
            credits: {
                enabled: false
            },
            exporting: {
                enabled: true
            },
            series: [{
                name: '',
                data: pie_data,
            }],

        });
    });
}