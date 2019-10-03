// Conexion con la Base de Datos y declaracion de variables Globales
require('module-alias/register');
var con = require('@models/db');
var swal = require('sweetalert');
var sql, consulta, captionid;

// Funcion de Agregar Categoria

function guardarCategoria() {
    // Aqui se cargan las variables con los datos del Formulario

    var estado = document.getElementById("est_cat").value;
    var nombre = document.getElementById("nom_cat").value;

    // Aqui se cargan los IDs de los DIVs que contienen los Inputs del Formulario

    var inputNombre = document.getElementById("inputNombre");

    // Validación de que los Inputs no estan vacios

    if (!nombre) {
        swal("", "Debe llenar el campo de Nombre.", "error", {
            button: false,
            timer: 1500
        });
        document.getElementById("nom_cat").focus();
        inputNombre.className = "form-group label-floating has-error";
        return
    } else {
        inputNombre.className = "form-group label-floating";
    }

    // Guardado en la Base de Datos

    sql = "SELECT * FROM categoria";
    con.query(sql, function (err, result) {
        if (err) console.log(err);
    });

    sql = "INSERT INTO categoria (nom_cat, est_cat) VALUES ?";
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
            swal("", "Categoria registrada correctamente.", "success", {
                button: false,
                timer: 3000
            }).then(function () {
                nameUser = localStorage.getItem('name');
                date_log = new Date();

                sql2 = "INSERT INTO log (usu_log, tab_log, acc_log, reg_log, date_log, est_log) VALUES ?";
                var values2 = [
                    [nameUser, 'categoria', 'Registro', sql + "(" + values + ")", date_log, 'A']
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

function consultarCategoriaPanel(ini, fin) {
    var init = ini;
    var paginas = "";
    if (!init) {
        init = 0;
        fin = 15;
    }
    con.query("SELECT * FROM categoria", function (err, result1, fields) {
        var pag = Math.ceil(result1.length / 15);
        con.query("SELECT * FROM categoria LIMIT " + init + "," + fin, function (err, result, fields) {
            if (err) console.log(err);

            var tam = result.length;
            var text;
            text = "<tr>";

            for (i = 0; i < tam; i++) {

                text += "<td>";
                text += result[i].cod_cat;
                text += "</td>";
                text += "\t\t";
                text += "<td>";
                text += result[i].nom_cat;
                text += "</td>";
                text += "\t\t";
                text += "<td>";
                text += result[i].est_cat;
                text += "</td>";
                text += "\t\t";
                text += "<td>";
                text += '<a type="button" rel="tooltip" title="Editar" onclick="formularioEditarCategoria(' + result[i].cod_cat + ')"><i class="material-icons text-info" data-toggle="modal">mode_edit</i></a>';
                text += '<a type="button" rel="tooltip" title="Eliminar" onclick="avisoBorrarCategoria(' + result[i].cod_cat + ')"><i class="material-icons text-danger">delete_forever</i></a>';
                text += "</td>";
                text += "</tr>";
                document.getElementById("tcategoria").innerHTML = text;
            }
            paginas += '<div align="center">'
            for (i = 1; i <= pag; i++) {
                init = i * 15 - 15;
                fin = init + 14;
                paginas += '<button id="piePag" onClick="paginadorCat(' + init + ',' + fin + ')">' + i + '</button>';
            }
            paginas += '</div">'
            document.getElementById("pagCat").innerHTML = paginas;
        });
    });
}

function paginadorCat(ini, fin) {
    this.consultarCategoriaPanel(ini, fin);
}

//  Modal para confirmar Eliminación de la Categoria

function avisoBorrarCategoria(capb) {
    $("#borradoCategorias").modal("show")
    captionid = capb;
}

// Borrado Lógico

function borrarCategoria() {
    sql = "SELECT * FROM categoria";
    con.query(sql, function (err, result) {
        if (err) console.log(err);
    });

    sql = "UPDATE categoria SET est_cat='I' WHERE cod_cat = " + captionid;
    con.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            swal("Error", "Por favor, verifique los datos o contacte con el Administrador.", "error", {
                button: false,
                timer: 3000
            });
        } else {
            swal("", "Categoria eliminada correctamente.", "success", {
                button: false,
                timer: 3000
            }).then(function () {
                nameUser = localStorage.getItem('name');
                date_log = new Date();

                sql2 = "INSERT INTO log (usu_log, tab_log, acc_log, reg_log, date_log, est_log) VALUES ?";
                var values = [
                    [nameUser, 'categoria', 'Borrado Logico', sql, date_log, 'A']
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