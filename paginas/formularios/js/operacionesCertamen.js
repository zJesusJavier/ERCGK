// Conexion con la Base de Datos y declaracion de variables Globales
require('module-alias/register');
var con = require('@models/db');
var swal = require('sweetalert');
var sql, result;
var captionid;

function guardarCertamen() {
    var estado = document.getElementById("est_cer").value;
    var descri = document.getElementById("des_cer").value;
    var fechai = document.getElementById("feci_cer").value;
    var fechaf = document.getElementById("fecf_cer").value;

    var inputDescripcion = document.getElementById("inputDescripcion");
    var inputFechaInicio = document.getElementById("inputFechaInicio");
    var inputFechaFinal = document.getElementById("inputFechaFinal");

    if (!descri) {
        swal("", "Debe llenar el campo de Descripción.", "error", {
            button: false,
            timer: 1500
        });
        document.getElementById("des_cer").focus();
        inputDescripcion.className = "form-group label-floating has-error";
        return
    } else {
        inputDescripcion.className = "form-group label-floating";
    }

    if (!fechai) {
        swal("", "Debe llenar el campo de Fecha de Inicio.", "error", {
            button: false,
            timer: 1500
        });
        document.getElementById("feci_cer").focus();
        inputFechaInicio.className = "form-group label-floating has-error";
        return
    } else {
        inputFechaInicio.className = "form-group label-floating";
    }

    if (!fechaf) {
        swal("", "Debe llenar el campo de Fecha de Finalización.", "error", {
            button: false,
            timer: 1500
        });
        document.getElementById("fecf_cer").focus();
        inputFechaFinal.className = "form-group label-floating has-error";
        return
    } else {
        inputFechaFinal.className = "form-group label-floating";
    }


    // Guardado en la Base de Datos

    sql = "SELECT * FROM certamen";
    con.query(sql, function (err, result) {
        if (err) console.log(err);
    });

    sql = "INSERT INTO certamen (des_cer, feci_cer, fecf_cer, est_cer) VALUES ?";
    var values = [
        [descri, fechai, fechaf, estado]
    ];

    con.query(sql, [values], function (err, result) {
        if (err) {
            console.log(err);
            swal("Error", "Por favor, verifique los datos o contacte con el Administrador.", "error", {
                button: false,
                timer: 3000
            });
        } else {
            swal("", "Certamen registrado correctamente.", "success", {
                button: false,
                timer: 3000
            }).then(function () {
                nameUser = localStorage.getItem('name');
                date_log = new Date();

                sql2 = "INSERT INTO log (usu_log, tab_log, acc_log, reg_log, date_log, est_log) VALUES ?";
                var values2 = [
                    [nameUser, 'certamen', 'Registro', sql + "(" + values + ")", date_log, 'A']
                ];

                con.query(sql2, [values2], function (err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        window.location.reload();
                    }
                });
            });
        };
    });
}


function consultarCertamen(ini, fin) {
    var init = ini;
    if (!init) {
        init = 0;
        fin = 15;
    }
    con.query("SELECT * FROM certamen WHERE est_cer='A'", function (err, result1, fields) {
        var pag = Math.ceil(result1.length / 15);

        con.query("SELECT cod_cer, des_cer, DATE(feci_cer) As dateI, DATE(feci_cer) As dateF FROM certamen WHERE est_cer='A' LIMIT " + init + ',' + fin, function (err, result, fields) {
            if (err) console.log(err);

            var tam = result.length;
            var text, paginas = "";
            text = "<tr>";

            for (i = 0; i < tam; i++) {
                text += "<td>";
                text += result[i].cod_cer;
                text += "</td>";
                text += "\t\t";
                text += "<td>";
                text += result[i].des_cer;
                text += "</td>";
                text += "\t\t";
                text += "<td>";
                text += result[i].dateI.toLocaleDateString("en-GB");
                text += "</td>";
                text += "\t\t";
                text += "<td>";
                text += result[i].dateF.toLocaleDateString("en-GB");
                text += "</td>";
                text += "\t\t";
                text += "</tr>";
                document.getElementById("tcertamen").innerHTML = text;
            }
            paginas += '<div align="center">'
            for (i = 1; i <= pag; i++) {
                init = i * 15 - 15;
                fin = init + 14;
                paginas += '<button id="piePag" onClick="paginadorCer(' + init + ',' + fin + ')">' + i + '</button>';
            }
            paginas += '</div">'
            document.getElementById("pagCer").innerHTML = paginas;
        });
    });
}

function paginadorCer(ini, fin) {
    this.consultarCertamen(ini, fin);
    this.consultarCertamenPanel(ini, fin);
}

function consultarCertamenPanel(ini, pag) {
    var init = ini;
    if (!init) {
        init = 0;
        fin = 15;
    }
    con.query("SELECT * FROM certamen", function (err, result1, fields) {
        var pag = Math.ceil(result1.length / 15);
        con.query("SELECT * FROM certamen LIMIT " + init + "," + fin, function (err, result, fields) {
            if (err) console.log(err);

            var tam = result.length;
            var text, paginas = "";
            text = "<tr>";

            for (i = 0; i < tam; i++) {
                text += "<td>";
                text += result[i].cod_cer;
                text += "</td>";
                text += "\t\t";
                text += "<td>";
                text += result[i].des_cer;
                text += "</td>";
                text += "\t\t";
                text += "<td>";
                text += result[i].feci_cer.toLocaleDateString("en-GB");
                text += "</td>";
                text += "\t\t";
                text += "<td>";
                text += result[i].fecf_cer.toLocaleDateString("en-GB");
                text += "</td>";
                text += "\t\t";
                text += "<td>";
                text += result[i].est_cer;
                text += "</td>";
                text += "\t\t";
                text += "<td>";
                text += '<a type="button" rel="tooltip" title="Eliminar" onclick="avisoBorrarCertamen(' + result[i].cod_cer + ')"><i class="material-icons text-danger">delete_forever</i></a>';
                text += "</td>";
                text += "</tr>";
                document.getElementById("tcertamen").innerHTML = text;
            }
            paginas += '<div align="center">'
            for (i = 1; i <= pag; i++) {
                init = i * 15 - 15;
                fin = init + 14;
                paginas += '<button id="piePag" onClick="paginadorCer(' + init + ',' + fin + ')">' + i + '</button>';
            }
            paginas += '</div">'
            document.getElementById("pagCer").innerHTML = paginas;
        });
    });
}

function avisoBorrarCertamen(capb) {
    $("#borradoCertamen").modal("show")
    captionid = capb;
}

// Borrado Lógico

function borrarCertamen() {
    sql = "SELECT * FROM certamen";
    con.query(sql, function (err, result) {
        if (err) console.log(err);
    });

    sql = "UPDATE certamen SET est_cer='I' WHERE cod_cer = " + captionid;
    con.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            swal("Error", "Por favor, verifique los datos o contacte con el Administrador.", "error", {
                button: false,
                timer: 3000
            });
        } else {
            swal("", "Certamen eliminado correctamente.", "success", {
                button: false,
                timer: 3000
            }).then(function () {
                nameUser = localStorage.getItem('name');
                date_log = new Date();

                sql2 = "INSERT INTO log (usu_log, tab_log, acc_log, reg_log, date_log, est_log) VALUES ?";
                var values = [
                    [nameUser, 'certamen', 'Borrado Logico', sql, date_log, 'A']
                ];

                con.query(sql2, [values], function (err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        nameUser = localStorage.getItem('name');
                        date_log = new Date();

                        con.query("SELECT MAX(cod_log) as id FROM log", function (err, result1, fields) {
                            if (err) console.log(err);
                            else idMax = (result1[0].id) - 1;

                            updateUser = "UPDATE log SET usu_log='" + nameUser + "' WHERE cod_log='" + idMax + "'";
                            con.query(updateUser, function (err, result) {
                                if (err) {
                                    console.log(err);

                                } else {

                                    window.location.reload();
                                }
                            });
                        });
                    }
                });
            });
        };
    });
}