// Conexion con la Base de Datos y declaracion de variables Globales
require('module-alias/register');
var con = require('@models/db');
var swal = require('sweetalert');
var sql;

function formularioEditarCertamen(capb) {
    var captionid = capb;

    con.query("SELECT * FROM certamen WHERE cod_cer='" + captionid + "'", function (err, result, fields) {
        if (err) console.log(err);

        var tam = result.length;
        var text;

        for (i = 0; i < tam; i++) {
            text = '<form autocomplete="off">'
            text += '<div class="row">'
            text += '<div class="col-md-1">'
            text += '<div class="form-group label-floating">'
            text += '<label class="control-label">ID</label>'
            text += '<input type="text" class="form-control" id="cod_cer" value="' + result[i].cod_cer + '" readonly>'
            text += '</div>'
            text += '</div>'

            text += '<div class="col-md-3">'
            text += '<div class="form-group label-floating">'
            text += '<label class="control-label">Descripción</label>'
            text += '<input type="text" class="form-control" id="des_cer" value="' + result[i].des_cer + '">'
            text += '</div>'
            text += '</div>'

            text += '<div class="col-md-3">'
            text += '<div class="form-group label-static">'
            text += '<label class="control-label">Fecha de Inicio</label>'
            text += '<input type="text" class="form-control" id="feci_cer" value="' + result[i].feci_cer.toLocaleDateString("en-GB") + '">'
            text += '</div>'
            text += '</div>'

            text += '<div class="col-md-3">'
            text += '<div class="form-group label-static">'
            text += '<label class="control-label">Fecha de finalización</label>'
            text += '<input type="text" class="form-control" id="fecf_cer" value="' + result[i].fecf_cer.toLocaleDateString("en-GB") + '">'
            text += '</div>'
            text += '</div>'

            text += '</div>'

            text += '<input type="button" class="btn btn-success pull-right" value="Actualizar registro" onclick="editarCertamen();">'
            text += '<button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>'
            text += '</form>'
        }
        document.getElementById("editCertamen").innerHTML = text;
        $("#editarCertamen").modal("show")
    });
}

function editarCertamen() {
    var id = document.getElementById("cod_cer").value;
    var descri = document.getElementById("des_cer").value;
    var fechai = document.getElementById("feci_cer").value;
    var fechaf = document.getElementById("fecf_cer").value;


    sql = "SELECT * FROM certamen";
    con.query(sql, function (err, result) {
        if (err) console.log(err);
    });

    sql = "UPDATE certamen SET des_cer='" + descri + "', feci_cer='" + fechai + "', fecf_cer='" + fechaf + "' WHERE cod_cer = " + id;

    con.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            swal("Error", "Por favor, verifique los datos o contacte con el Administrador.", "error", {
                button: false,
                timer: 3000
            });
        } else {
            swal("", "Los datos fueron actualizados correctamente.", "success", {
                button: false,
                timer: 3000
            }).then(function () {
                nameUser = localStorage.getItem('name');
                date_log = new Date();

                sql2 = "INSERT INTO log (usu_log, tab_log, acc_log, reg_log, date_log, est_log) VALUES ?";
                var values = [
                    [nameUser, 'certamen', 'Modificar', sql, date_log, 'A']
                ];

                con.query(sql2, [values], function (err, result) {
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