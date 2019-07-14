require('module-alias/register');
var con = require('@models/db');
var swal = require('sweetalert');
var os = require('os');

console.log(os);
function enter(e)
{
    var tecla = (document.all) ? e.keyCode : e.which;
    if (tecla==13) buscar();
    return (tecla!=13);
}

function buscar()
{
    var aux = document.getElementById("busqueda").value;
    var busqueda = aux.toUpperCase();
    con.query("SELECT candidata.*, municipio.nom_mun, categoria.nom_cat, certamen.des_cer FROM candidata"
                +" INNER JOIN municipio ON candidata.fky_mun=municipio.cod_mun"
                +" INNER JOIN categoria ON candidata.fky_cat=categoria.cod_cat"
                +" INNER JOIN certamen ON candidata.fky_cer=certamen.cod_cer"
                +" WHERE UPPER(nom_can) LIKE '%"+busqueda+"%' OR UPPER(ci_can) LIKE '%"+busqueda+"%'"
                +" OR UPPER(ape_can) LIKE '%"+busqueda+"%' OR UPPER(dir_can) LIKE '%"+busqueda+"%'"
                +" OR UPPER(ocu_can) LIKE '%"+busqueda+"%' OR UPPER(email_can) LIKE '%"+busqueda+"%'"
                +" OR  YEAR(fec_can) LIKE '%"+busqueda+"%' OR UPPER(des_cer) LIKE '%"+busqueda+"%'"
                +" OR  UPPER(nom_cat) LIKE '%"+busqueda+"%'"
                +" OR CONCAT(UPPER(nom_can),' ', UPPER(ape_can)) LIKE '%"+busqueda+"%'", function (err, result, fields)
    {
        if (err) console.log(err);
     
        var tam = result.length;
        var text;
        text = '<tbody>';
        for (i = 0; i < tam; i++)
        {
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
                text += '<td>';
                text += '<a type="button" rel="tooltip" title="Editar" onclick="formularioEditarCandidata('+result[i].cod_can+')"><i class="material-icons text-info" data-toggle="modal">mode_edit</i></a>';
                text += '<a type="button" rel="tooltip" title="Eliminar" onclick="avisoBorrarCandidata('+result[i].cod_can+')"><i class="material-icons text-danger">delete_forever</i></a>';
                text += '</td>';
                text += '</tr>';
            }
        text += '</tbody>';
        document.getElementById("tcandidata").innerHTML= text;

    });
}

function buscarC()
{
    var aux = document.getElementById("busqueda").value;
    var busqueda = aux.toLowerCase();

    con.query("SELECT candidata.*, municipio.nom_mun, categoria.nom_cat, certamen.des_cer FROM candidata"
                +" INNER JOIN municipio ON candidata.fky_mun=municipio.cod_mun"
                +" INNER JOIN categoria ON candidata.fky_cat=categoria.cod_cat"
                +" INNER JOIN certamen ON candidata.fky_cer=certamen.cod_cer"
                +" WHERE UPPER(nom_can) LIKE '%"+busqueda+"%' OR UPPER(ci_can) LIKE '%"+busqueda+"%'"
                +" OR UPPER(ape_can) LIKE '%"+busqueda+"%' OR UPPER(dir_can) LIKE '%"+busqueda+"%'"
                +" OR UPPER(ocu_can) LIKE '%"+busqueda+"%' OR UPPER(email_can) LIKE '%"+busqueda+"%'"
                +" OR  YEAR(fec_can) LIKE '%"+busqueda+"%' OR UPPER(des_cer) LIKE '%"+busqueda+"%'"
                +" OR  UPPER(nom_cat) LIKE '%"+busqueda+"%'"
                +" OR CONCAT(UPPER(nom_can),' ', UPPER(ape_can)) LIKE '%"+busqueda+"%'", function (err, result, fields)
    {
        if (err) console.log(err);
     
        var tam = result.length;
        var text;

        text = '<tbody>';
        for (i = 0; i < tam; i++)
        {
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
            document.getElementById("tcandidata").innerHTML= text;
    });
}