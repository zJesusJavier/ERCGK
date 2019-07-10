require('module-alias/register');
var con = require('@models/db');
var swal = require('sweetalert');
var sql;
var consulta;
var captionid;

// Consulta del Panel de Auditoria | Sesiones

function consultarSesion()
{
    con.query("SELECT * FROM sesion", function (err, result, fields) 
    {
        if (err) console.log(err);
                       
        var tam = result.length;
        var text;

        text = "<tr>";

        for (i = 0; i < tam; i++) 
        {
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
            text += result[i].date_ses.toLocaleString();
            text += "</td>";
            text += "\t\t";
            text += "</tr>";
            document.getElementById("tsesion").innerHTML= text;
        }
    });
}

// Consulta del Panel de Auditoria | Registros

function consultarRegistro()
{
    con.query("SELECT * FROM log WHERE acc_log='Registro'", function (err, result, fields) 
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
            document.getElementById("tregistro").innerHTML= text;
        }
    });
}

// Consulta del Panel de Auditoria | Ediciones

function consultarEdiciones()
{
    con.query("SELECT * FROM log WHERE acc_log='Edicion'", function (err, result, fields) 
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
    });
}

// Consulta del Panel de Auditoria | Eliminaciones

function consultarEliminacion()
{
    con.query("SELECT * FROM log WHERE acc_log='Borrado'", function (err, result, fields) 
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
    });
}
function consultarEdiciones()
{
    con.query("SELECT * FROM log WHERE acc_log='Edicion'", function (err, result, fields) 
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
    });
}
function consultarEdiciones()
{
    con.query("SELECT * FROM log WHERE acc_log='Edicion'", function (err, result, fields) 
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
    });
}

// Consulta del Panel de Auditoria | Cambio de Clave

function consultarClaves()
{
    con.query("SELECT * FROM log WHERE acc_log LIKE '%Cambio%'", function (err, result, fields) 
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
    });
}
// Consulta del Panel de Auditoria | Busqueda

function consultarBusq()
{
    con.query("SELECT * FROM log WHERE acc_log='Busqueda'", function (err, result, fields) 
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
            document.getElementById("tbusqueda").innerHTML= text;
        }
    });
}