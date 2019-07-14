require('module-alias/register');
var $ = require("jquery")
var con = require('@models/db');
var swal = require('sweetalert');
var sql;
var consulta;
var captionid;

function formularioEditarUsuario(capb) {
    var captionid = capb;

    con.query("SELECT * FROM usuario LEFT JOIN elementos ON fky_usuario='" + captionid + "' WHERE id_usu='" + captionid + "'", function (err, result, fields) {
        if (err) console.log(err);
        var tam = result.length;
        var text;

        for (i = 0; i < tam; i++) {
            text = '<form autocomplete="off" id="find">'
            text += '<div class="row">'
            text += '<div class="col-md-12">'
            text += '<div class="form-group label-floating col-md-6" id="inputNombre" style="float:left;">'
            text += '<label class="control-label">Nombre</label>'
            text += '<input type="text" class="form-control" id="nom_usu" value=' + result[i].nom_usu + '>'
            text += '</div>'
            text += '<div class="form-group label-floating col-md-6" id="inputRol">'
            text += '<label class="control-label">Rol</label>'
            text += '<select class="form-control" id="niv_usu">'
            text += '<option value=' + result[i].niv_usu + ' selected>' + result[i].niv_usu + '</option>'
            text += '<option value="Administrador">Administrador</option>'
            text += '<option value="Usuario">Usuario</option>'
            text += '<option value="Auditor">Auditor</option>'
            text += '</select>'
            text += '</div>'
            text += '<div class="form-group label-floating col-md-12" id="inputEmail">'
            text += '<label class="control-label">Email</label>'
            text += '<input type="text" class="form-control" id="email_usu" value=' + result[i].email_usu + '>'
            text += '</div>'
            text += '<div class="form-group label-floating" id="ListCheck" style="float:left; padding-left:15px;">'
            text += '<label class="control-label">Permisos</label>'
            text += '<input type="checkbox" name="registrar"'
            if (result[i].elem_reg == 1) {
                text += 'checked'
            }
            text += '>Registrar<br>'
            text += '<input type="checkbox" name="consultar"'
            if (result[i].elem_cons == 1) {
                text += 'checked'
            }
            text += '>Consultar<br>'
            text += '<input type="checkbox" name="reportes"'
            if (result[i].elemento_rep == 1) {
                text += 'checked'
            }
            text += '>Reportes<br>'
            text += '<input type="checkbox" name="panelAd"'
            if (result[i].elem_panelAd == 1) {
                text += 'checked'
            }
            text += '>Panel de Administracion<br>'
            text += '<input type="checkbox" name="panelAudit"'
            if (result[i].elem_audit == 1) {
                text += 'checked'
            }
            text += '>Panel de Auditoria<br>'

            text += '</div>'
            text += '</div>'
            text += '</div>'
            text += '<input type="button" class="btn btn-success pull-right" value="Actualizar registro" onclick="editarUsuario(' + captionid + ');">'
            text += '<button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>'
            text += '<div class="clearfix"></div>'
            text += '</form>'
        }
        document.getElementById("editUsuario").innerHTML = text;
        $("#editarUsuario").modal("show")
    });

}

function editarUsuario(user) {
    var nombre = $("#find").find("#nom_usu")[0].value;
    var email = $("#find").find("#email_usu")[0].value;
    var rol = $("#find").find("#niv_usu")[0].value;
    var Checkbox = document.getElementById("ListCheck");
    var sql1;

    elem_reg = $("#find").find("#ListCheck")[0].children[1].checked;
    elem_cons = $("#find").find("#ListCheck")[0].children[3].checked;
    elemento_rep = $("#find").find("#ListCheck")[0].children[5].checked;
    elem_audit = $("#find").find("#ListCheck")[0].children[7].checked;
    elem_panelAd = $("#find").find("#ListCheck")[0].children[9].checked;


    sql = "SELECT * FROM usuario";
    con.query(sql, function (err, result) {
        if (err) console.log(err);
    });
    sql1 = "SELECT * FROM elementos";
    con.query(sql, function (err, result) {
        if (err) console.log(err);
    });

    sql = "UPDATE usuario SET nom_usu='" + nombre + "'," + "email_usu='" + email + "'," + "niv_usu= '" + rol + "' WHERE id_usu = " + user;
    con.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            swal("Error", "Por favor, verifique los datos o contacte con el Administrador.", "error",
                {
                    button: false,
                    timer: 3000
                });
        }
        else {
            swal("", "Usuario modificado correctamente.", "success",
                {
                    button: false,
                    timer: 3000
                }).then(function () {

                    nameUser = localStorage.getItem('name');
                    date_log = new Date();

                    sq = "INSERT INTO log (usu_log, tab_log, acc_log, reg_log, date_log, est_log) VALUES ?";
                    var val = [[nameUser, 'usuario', 'Modificar', sql, date_log, 'A']];

                    con.query(sq, [val], function (err, result) {
                        if (err) {
                            console.log(err);
                        } else { }
                    });
                    sql1 = "UPDATE elementos SET elemento_rep=" + elemento_rep + "," + " elem_cons=" + elem_cons + "," + " elem_reg=" + elem_reg + "," +
                        " elem_audit=" + elem_audit + "," + " elem_panelAd=" + elem_panelAd + " WHERE fky_usuario = " + user;
                    con.query(sql1, function (err, result) {
                        if (err) {
                            console.log(err);
                            swal("Error", "Por favor, verifique los datos o contacte con el Administrador.", "error",
                                {
                                    button: false,
                                    timer: 3000
                                });
                        }
                        else {
                            nameUser = localStorage.getItem('name');
                            date_log = new Date();

                            sql2 = "INSERT INTO log (usu_log, tab_log, acc_log, reg_log, date_log, est_log) VALUES ?";
                            var values = [[nameUser, 'permisos', 'Modificar', sql1, date_log, 'A']];

                            con.query(sql2, [values], function (err, result) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    window.location.reload();
                                }
                            });
                        };
                    });

                });
        }
    });


}