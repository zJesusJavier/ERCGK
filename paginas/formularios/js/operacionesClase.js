// Conexion con la Base de Datos
require('module-alias/register');
var con = require('@models/db');
var swal = require('sweetalert');
var sql;
var consulta;

// Funcion de Agregar Clase

function guardarClase() {
    // Aqui se cargan las variables con los datos del Formulario

    var estado = document.getElementById("est_cla").value;
    var nombre = document.getElementById("nom_cla").value;

    // Aqui se cargan los IDs de los DIVs que contienen los Inputs

    var inputNombre = document.getElementById("inputNombreClase");

    // Validación de que los Inputs no estan vacios

    if (!nombre) {
        swal("", "Debe llenar el campo de Nombre.", "error", {
            button: false,
            timer: 1500
        });
        document.getElementById("nom_cla").focus();
        inputNombre.className = "form-group label-floating has-error";
        return
    } else {
        inputNombre.className = "form-group label-floating";
    }

    // Guardado en la Base de Datos

    sql = "SELECT * FROM clase";
    con.query(sql, function (err, result) {
        if (err) console.log(err);
    });

    sql = "INSERT INTO clase (nom_cla, est_cla) VALUES ?";
    var values = [
        [nombre, estado]
    ];

    con.query(sql, [values], function (err, result) {
        if (err) {
            console.log(err);
            swal("Error", "Por favor, verifique los datos o contacte con el Administrador.", "error", {
                button: false,
                timer: 3000
            });
        } else {
            swal("", "Clase registrada correctamente.", "success", {
                button: false,
                timer: 3000
            }).then(function () {
                nameUser = localStorage.getItem('name');
                date_log = new Date();

                sql2 = "INSERT INTO log (usu_log, tab_log, acc_log, reg_log, date_log, est_log) VALUES ?";
                var values2 = [
                    [nameUser, 'clase', 'Registro', sql + "(" + values + ")", date_log, 'A']
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

// Consulta del Panel de Administración

function consultarClasePanel(ini, fin) {
    var init = ini;
    if (!init) {
        init = 0;
        fin = 15;
    }
    con.query("SELECT * FROM clase ", function (err, result1, fields) {
        var pag = Math.ceil(result1.length / 15);
        con.query("SELECT * FROM clase LIMIT " + init + "," + fin, function (err, result, fields) {
            if (err) console.log(err);

            var tam = result.length;
            var text, paginas = "";
            text = "<tr>";

            for (i = 0; i < tam; i++) {
                text += "<td>";
                text += result[i].cod_cla;
                text += "</td>";
                text += "\t\t";
                text += "<td>";
                text += result[i].nom_cla;
                text += "</td>";
                text += "\t\t";
                text += "<td>";
                text += result[i].est_cla;
                text += "</td>";
                text += "\t\t";
                text += "<td>";
                text += '<a type="button" rel="tooltip" title="Editar" onclick="formularioEditarClase(' + result[i].cod_cla + ')"><i class="material-icons text-info" data-toggle="modal">mode_edit</i></a>';
                text += '<a type="button" rel="tooltip" title="Eliminar" onclick="avisoBorrarClase(' + result[i].cod_cla + ')"><i class="material-icons text-danger">delete_forever</i></a>';
                text += "</td>";
                text += "</tr>";
                document.getElementById("tclase").innerHTML = text;
            }
            paginas += '<div align="center">'
            for (i = 1; i <= pag; i++) {
                var ini = i * 15 - 15;
                var fin = ini + 14;
                paginas += '<button id="piePag" onClick="paginadorCla(' + ini + ',' + fin + ')">' + i + '</button>';

            }
            paginas += '</div">'
            document.getElementById("pagCla").innerHTML = paginas;
        });
    });
}


function paginadorCla(ini, fin) {
    this.consultarClasePanel(ini, fin);
    this.scrollPaginador(500, 'pag')
    console.log(ini, fin);
}

//scroll paginador numeradores
function scrollPaginador(time, elemento) {
    console.log('prueba', elemento);
    setTimeout(() => {
        let top = document.getElementById(elemento);
        if (!top) {
            top.scrollIntoView({
                behavior: "smooth",
                block: "end"
            });
            top = null;
        }
    }, time ? time : 500);
}
//  Modal para confirmar Eliminación de la Clase

function avisoBorrarClase(capb) {
    $("#borradoClases").modal("show")
    captionid = capb;
}

// Borrado Lógico

function borrarClase() {
    sql = "SELECT * FROM clase";
    con.query(sql, function (err, result) {
        if (err) console.log(err);
    });

    sql = "UPDATE clase SET est_cla='I' WHERE cod_cla = " + captionid;
    con.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            swal("Error", "Por favor, verifique los datos o contacte con el Administrador.", "error", {
                button: false,
                timer: 3000
            });
        } else {
            swal("", "Clase eliminada correctamente.", "success", {
                button: false,
                timer: 3000
            }).then(function () {
                nameUser = localStorage.getItem('name');
                date_log = new Date();

                con.query("SELECT MAX(cod_log) as id FROM log", function (err, result1, fields) {
                    if (err) console.log(err);
                    else idMax = result1[0].id;

                    updateUser = "UPDATE log SET usu_log='" + nameUser + "' WHERE cod_log='" + idMax + "'";
                    con.query(updateUser, function (err, result) {
                        if (err) {
                            console.log(err);

                        } else {

                            window.location.reload();
                        }
                    });
                });
            });
        }
    });
}