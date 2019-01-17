// Conexion con la Base de Datos y declaracion de variables Globales

var mysql = require('mysql');
var con = mysql.createConnection(
{
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "academia"
});

con.connect(function(err) 
{
    if (err) console.log(err);
});

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
    con.query("SELECT * FROM registro", function (err, result, fields) 
    {
        if (err) console.log(err);
                       
        var tam = result.length;
        var text;
        text = "<tr>";

        for (i = 0; i < tam; i++) 
        {
            text += "<td>";
            text += result[i].cod_reg;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].usu_reg;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].tab_reg;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].fec_reg.toLocaleDateString("en-GB");
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].hora_reg;
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
    con.query("SELECT * FROM edicion", function (err, result, fields) 
    {
        if (err) console.log(err);
                       
        var tam = result.length;
        var text;
        text = "<tr>";

        for (i = 0; i < tam; i++) 
        {
            text += "<td>";
            text += result[i].cod_edi;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].usu_edi;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].tab_edi;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].fec_edi.toLocaleDateString("en-GB");
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].hora_edi;
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
    con.query("SELECT * FROM eliminacion", function (err, result, fields) 
    {
        if (err) console.log(err);
                       
        var tam = result.length;
        var text;
        text = "<tr>";

        for (i = 0; i < tam; i++) 
        {
            text += "<td>";
            text += result[i].cod_eli;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].usu_eli;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].tab_eli;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].fec_eli.toLocaleDateString("en-GB");
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].hora_eli;
            text += "</td>";
            text += "\t\t";
            text += "</tr>";
            document.getElementById("teliminacion").innerHTML= text;
        }
    });
}