require('module-alias/register');
var $ = require("jquery")
var con = require('@models/db');
var swal = require('sweetalert');
var sql, result, nameUser;

$(document).ready({


});

function main() {
    let main = "<ul class='nav'>" +
        "<li id='home' class='active'><a href='home.html'>" +
        "<i class='material-icons'>home</i><p><b>Inicio</b></p>" +
        "</a></li>" +

        "<li id='registrar' ><a href='paginas/registro.html'>" +
        "<i class='material-icons'>person_add</i><p><b>Registrar</b></p>" +
        "</a></li>" +

        "<li id='consultar'><a href='paginas/consultar.html'>" +
        "<i class='material-icons'>content_paste</i><p><b>Consultar</b></p>" +
        "</a></li>" +

        "<li id='reportes'><a href='paginas/reportes.html'>" +
        "<i class='material-icons'>library_books</i>" +
        "<p><b>Reportes</b></p>" +
        "</a></li>" +

        "<li id='panelAdmin'><a data-toggle='modal' data-target='#panelAdministrador'>" +
        "<i class='material-icons'>settings</i><p><b>Panel de Administración</b></p></a>" +
        "</li>" +

        "<li id='panelAudit'><a href='paginas/panel_auditoria.html'>" +
        "<i class='material-icons'>security</i><p><b>Panel de Auditoría</b></p>" +
        " </a></li>" +
        "</ul>";
    $('.sidebar-wrapper').html(main);
}

function audit() {
    nameUser = localStorage.getItem('name');

    con.query("SELECT id_usu FROM usuario WHERE nom_usu ='" + nameUser + "'", function (err, result, fields) {
        con.query("SELECT elem_audit,elem_cons,elem_panelAd, elem_reg, elemento_rep FROM elementos WHERE fky_usuario ='" + result[0].id_usu + "'", function (err, result1, fields1) {
            let arrLocal = result1[0];
            for (let elem in arrLocal) {
                localStorage.setItem(elem, arrLocal[elem]);
            }
        });
    });

    if (localStorage.getItem('elem_cons') == '0') {
        $('#consultar').hide();
    }
    if (localStorage.getItem('elem_audit') == '0') {
        $('#panelAudit').hide();
    }
    if (localStorage.getItem('elem_panelAd') == '0') {
        $('#panelAdmin').hide();
    }
    if (localStorage.getItem('elem_reg') == '0') {
        $('#registrar').hide();
    }
    if (localStorage.getItem('elemento_rep') == '0') {
        $('#reportes').hide();
    }
}