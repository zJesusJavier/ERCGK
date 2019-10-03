require('module-alias/register');
var con = require('@models/db');
var swal = require('sweetalert');
var os = require('os');

console.log(os);

function enter(e) {
    var tecla = (document.all) ? e.keyCode : e.which;
    if (tecla == 13) buscar();
    return (tecla != 13);
}

function buscar() {
    var aux = document.getElementById("busqueda").value;
    var busqueda = aux.toUpperCase();
    con.query("SELECT candidata.*, municipio.nom_mun, categoria.nom_cat, certamen.des_cer FROM candidata" +
        " INNER JOIN municipio ON candidata.fky_mun=municipio.cod_mun" +
        " INNER JOIN categoria ON candidata.fky_cat=categoria.cod_cat" +
        " INNER JOIN certamen ON candidata.fky_cer=certamen.cod_cer" +
        " WHERE UPPER(nom_can) LIKE '%" + busqueda + "%' OR UPPER(ci_can) LIKE '%" + busqueda + "%'" +
        " OR UPPER(ape_can) LIKE '%" + busqueda + "%' OR UPPER(dir_can) LIKE '%" + busqueda + "%'" +
        " OR UPPER(ocu_can) LIKE '%" + busqueda + "%' OR UPPER(email_can) LIKE '%" + busqueda + "%'" +
        " OR  YEAR(fec_can) LIKE '%" + busqueda + "%' OR UPPER(des_cer) LIKE '%" + busqueda + "%'" +
        " OR  UPPER(nom_cat) LIKE '%" + busqueda + "%'" +
        " OR CONCAT(UPPER(nom_can),' ', UPPER(ape_can)) LIKE '%" + busqueda + "%'",
        function (err, result, fields) {
            if (err) console.log(err);

            var tam = result.length;
            var text;
            text = '<tbody>';
            for (i = 0; i < tam; i++) {
                text += '<tr>';
                text += '<td>';
                text += result[i].cod_can;
                text += '</td>';
                text += '<td>';
                text += result[i].ci_can;
                text += '</td>';
                text += '\t\t';
                text += '<td>';
                text += result[i].nom_can;
                text += '</td>';
                text += '\t\t';
                text += '<td>';
                text += result[i].ape_can;
                text += '</td>';
                text += '\t\t';
                text += '<td>';
                text += result[i].nom_cat;
                text += '</td>';
                text += '\t\t';
                text += '<td>';
                text += result[i].edad_can;
                text += '</td>';
                text += '\t\t';
                text += '<td>';
                text += result[i].dir_can;
                text += '</td>';
                text += '\t\t';
                text += '<td>';
                text += result[i].tel_can;
                text += '</td>';
                text += '\t\t';
                text += '<td>';
                text += result[i].email_can;
                text += '</td>';
                text += '\t\t';
                text += '<td>';
                text += result[i].est_can;
                text += '</td>';
                text += '\t\t';
                text += '</tr>';
            }
            text += '</tbody>';
            document.getElementById("tcandidata").innerHTML = text;

        });
}

function filtroSesion() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("busquedaSesion");
    filter = input.value.toUpperCase();
    table = document.getElementById("tablaSesion");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function filtroRegistro() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("busquedaRegistro");
    filter = input.value.toUpperCase();
    table = document.getElementById("tablaRegistro");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function filtroEdicion() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("busquedaEdicion");
    filter = input.value.toUpperCase();
    table = document.getElementById("tablaEdicion");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function filtroEliminacion() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("busquedaEliminacion");
    filter = input.value.toUpperCase();
    table = document.getElementById("tablaEliminacion");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function filtroCategoriaCandidata() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("busquedaCandidata");
    filter = input.value.toUpperCase();
    table = document.getElementById("tablaCandidata");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[5];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function buscarC() {
    var aux = document.getElementById("busqueda").value;
    var busqueda = aux.toLowerCase();

    con.query("SELECT candidata.*, municipio.nom_mun, categoria.nom_cat, certamen.des_cer FROM candidata" +
        " INNER JOIN municipio ON candidata.fky_mun=municipio.cod_mun" +
        " INNER JOIN categoria ON candidata.fky_cat=categoria.cod_cat" +
        " INNER JOIN certamen ON candidata.fky_cer=certamen.cod_cer" +
        " WHERE UPPER(nom_can) LIKE '%" + busqueda + "%' OR UPPER(ci_can) LIKE '%" + busqueda + "%'" +
        " OR UPPER(ape_can) LIKE '%" + busqueda + "%' OR UPPER(dir_can) LIKE '%" + busqueda + "%'" +
        " OR UPPER(ocu_can) LIKE '%" + busqueda + "%' OR UPPER(email_can) LIKE '%" + busqueda + "%'" +
        " OR  YEAR(fec_can) LIKE '%" + busqueda + "%' OR UPPER(des_cer) LIKE '%" + busqueda + "%'" +
        " OR  UPPER(nom_cat) LIKE '%" + busqueda + "%'" +
        " OR CONCAT(UPPER(nom_can),' ', UPPER(ape_can)) LIKE '%" + busqueda + "%'",
        function (err, result, fields) {
            if (err) console.log(err);

            var tam = result.length;
            var text;

            text = '<tbody>';
            for (i = 0; i < tam; i++) {
                text += '<tr>';
                text += '<td>';
                text += result[i].cod_can;
                text += '</td>';
                text += '<td>';
                text += result[i].ci_can;
                text += '</td>';
                text += '\t\t';
                text += '<td>';
                text += result[i].nom_can;
                text += '</td>';
                text += '\t\t';
                text += '<td>';
                text += result[i].ape_can;
                text += '</td>';
                text += '\t\t';
                text += '<td>';
                text += result[i].nom_cat;
                text += '</td>';
                text += '\t\t';
                text += '<td>';
                text += result[i].edad_can;
                text += '</td>';
                text += '\t\t';
                text += '<td>';
                text += result[i].dir_can;
                text += '</td>';
                text += '\t\t';
                text += '<td>';
                text += result[i].tel_can;
                text += '</td>';
                text += '\t\t';
                text += '<td>';
                text += result[i].email_can;
                text += '</td>';
                text += '\t\t';
                text += '<td>';
                text += result[i].est_can;
                text += '</td>';
                text += '</tr>';
            }
            text += '</tbody>';
            document.getElementById("tcandidata").innerHTML = text;
        });
}