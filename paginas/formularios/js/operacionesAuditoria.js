require('module-alias/register');
var con = require('@models/db');
var swal = require('sweetalert');
var sql;
var consulta;
var captionid;

// Consulta del Panel de Auditoria | Sesiones

function consultarSesion(ini, fin)
{
    var init = ini, paginas="";
    if (!init) {
        init = 0;
        fin = 15;
    }
    con.query("SELECT * FROM sesion", function (err, result1, fields) 
    {
        var pag = Math.ceil(result1.length / 15);

        con.query("SELECT * FROM sesion LIMIT "+init+","+fin, function (err, result, fields) 
        {
        if (err) console.log(err);
                       
        var tam = result.length;
        var text, estatus;

        text = "<tr>";

        for (i = 0; i < tam; i++) 
        {
            if (result[i].est_ses == "A") {
                estatus = "Inicio Sesion";
            } else { 
                estatus = "Cierre de Sesion";
            }
            
            text += "<td>";
            text += result[i].cod_ses;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].usu_ses;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].niv_ses;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].ip_ses;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].mac_ses;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].date_ses.toLocaleString();
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += estatus;
            text += "</td>";
            text += "\t\t";
            text += "</tr>";
            document.getElementById("tsesion").innerHTML= text;
        }
        paginas += '<div align="center">'
        for (i = 1; i <= pag; i++) {
            init = i * 15 - 15;
            fin = init + 14;
            paginas += '<button id="piePag" onClick="paginadorAudit(' + init + ',' + fin + ')">' + i + '</button>';
        }
        paginas += '</div">'
        document.getElementById("pagSes").innerHTML = paginas;   
        });
    });
}

// Consulta del Panel de Auditoria | Registros

function consultarRegistro(ini,fin)
{
    var busqueda = document.getElementById('busquedaRegistro').value;
    var init = ini, paginas = "";
    if (!init) {
        init = 0;
        fin = 15;
    }
    if (busqueda) {
        sqlInit = "SELECT * FROM log WHERE acc_log LIKE '%Registro%' " +
            " AND usu_log LIKE '%" + busqueda + "%'" +
            " OR tab_log LIKE '%" + busqueda + "%'" ;
        sql = "SELECT * FROM log WHERE acc_log LIKE '%Registro%' " +
            " AND usu_log LIKE '%" + busqueda + "%'" +
            " OR tab_log LIKE '%" + busqueda + "%'" +
            " LIMIT " + init + ", " + fin;
    } else { 
        sqlInit = "SELECT * FROM log WHERE acc_log LIKE '%Registro%'";
        sql = "SELECT * FROM log WHERE acc_log LIKE '%Registro%' LIMIT "+init+","+fin;
    }

    con.query(sqlInit, function (err, result1, fields) 
    {
        var pag = Math.ceil(result1.length / 15);

        con.query(sql, function (err, result, fields) 
    {
        if (err) console.log(err);
                       
        var tam = result.length;
        var text;
            text = "<tr>";
            if (result.length == 0) { 
                text += "<td colspan='15'><b> No existe la consulta solicitada </b></td>";
                text += "</tr>";
                document.getElementById("tregistro").innerHTML = text;
            }

        for (i = 0; i < tam; i++) 
        {
            text += "<td>";
            text += result[i].cod_log;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].usu_log;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].acc_log;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].tab_log;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].reg_log;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].date_log.toLocaleString();
            text += "</td>";
            text += "\t\t";
            text += "</tr>";
            document.getElementById("tregistro").innerHTML= text;
        }
        paginas += '<div align="center">'
        for (i = 1; i <= pag; i++) {
            init = i * 15 - 15;
            fin = init + 14;
            paginas += '<button id="piePag" onClick="paginadorAudit(' + init + ',' + fin + ')">' + i + '</button>';
        }
        paginas += '</div">'
        document.getElementById("pagReg").innerHTML = paginas;   
        });
    });
   
}
function paginadorAudit(ini, fin) {
    this.consultarEdiciones(ini, fin);
    this.consultarRegistro(ini, fin);
    this.consultarEliminacion(ini, fin);
    this.consultarSesion(ini, fin);
    this.consultarClaves(ini, fin);
}

// Consulta del Panel de Auditoria | Ediciones

function consultarEdiciones(ini, fin)
{
    var init = ini, paginas = "";
    if (!init) {
        init = 0;
        fin = 15;
    }
    con.query("SELECT * FROM log WHERE acc_log LIKE '%Modificar%'", function (err, result1, fields) 
    {
        var pag = Math.ceil(result1.length / 15);
        con.query("SELECT * FROM log WHERE acc_log LIKE '%Modificar%' LIMIT "+init+","+fin, function (err, result, fields) 
    {
        if (err) console.log(err);
                       
        var tam = result.length;
        var text;
        text = "<tr>";

        for (i = 0; i < tam; i++) 
        {
            text += "<td>";
            text += result[i].cod_log;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].usu_log;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].acc_log;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].tab_log;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].reg_log;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].date_log.toLocaleString();
            text += "</td>";
            text += "\t\t";
            text += "</tr>";
            document.getElementById("tedicion").innerHTML= text;
        }
        paginas += '<div align="center">'
        for (i = 1; i <= pag; i++) {
            init = i * 15 - 15;
            fin = init + 14;
            paginas += '<button id="piePag" onClick="paginadorAudit(' + init + ',' + fin + ')">' + i + '</button>';
        }
        paginas += '</div">'
        document.getElementById("pagEdi").innerHTML = paginas; 
        });
    });
}

// Consulta del Panel de Auditoria | Eliminaciones

function consultarEliminacion(ini,fin)
{
    var init = ini, paginas = "";
    if (!init) {
        init = 0;
        fin = 15;
    }
    con.query("SELECT * FROM log WHERE acc_log LIKE '%Borrado%'", function (err, result1, fields) 
    {
        var pag = Math.ceil(result1.length / 15);

        con.query("SELECT * FROM log WHERE acc_log LIKE '%Borrado%' LIMIT "+init+","+fin, function (err, result, fields) 
        {   
        if (err) console.log(err);
                       
        var tam = result.length;
        var text;
        text = "<tr>";

        for (i = 0; i < tam; i++) 
        {
            text += "<td>";
            text += result[i].cod_log;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].usu_log;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].acc_log;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].tab_log;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].reg_log;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].date_log.toLocaleString();
            text += "</td>";
            text += "\t\t";
            text += "</tr>";
            document.getElementById("teliminacion").innerHTML= text;
        }
        paginas += '<div align="center">'
        for (i = 1; i <= pag; i++) {
            init = i * 15 - 15;
            fin = init + 14;
            paginas += '<button id="piePag" onClick="paginadorAudit(' + init + ',' + fin + ')">' + i + '</button>';
        }
        paginas += '</div">'
        document.getElementById("pagElim").innerHTML = paginas; 
        });
    });
}

// Consulta del Panel de Auditoria | Cambio de Clave

function consultarClaves(ini, fin)
{
    var init = ini, paginas="";
    if (!init) {
        init = 0;
        fin = 15;
    }
    con.query("SELECT * FROM log WHERE acc_log LIKE '%Cambio%'", function (err, result1, fields) 
    {
        var pag = Math.ceil(result1.length / 15);
        con.query("SELECT * FROM log WHERE acc_log LIKE '%Cambio%' LIMIT "+init+","+fin, function (err, result, fields) 
        {
        if (err) console.log(err);
                       
        var tam = result.length;
        var text;
        text = "<tr>";

        for (i = 0; i < tam; i++) 
        {
            text += "<td>";
            text += result[i].cod_log;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].usu_log;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].acc_log;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].tab_log;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].date_log.toLocaleString();
            text += "</td>";
            text += "\t\t";
            text += "</tr>";
            document.getElementById("tclaves").innerHTML= text;
        }
        paginas += '<div align="center">'
        for (i = 1; i <= pag; i++) {
            init = i * 15 - 15;
            fin = init + 14;
            paginas += '<button id="piePag" onClick="paginadorAudit(' + init + ',' + fin + ')">' + i + '</button>';
        }
        paginas += '</div">'
        document.getElementById("pagCla").innerHTML = paginas;   
        });
    });
}
