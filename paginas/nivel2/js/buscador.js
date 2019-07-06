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
      
        text = '<thead class="text-danger">';
        text += '<td><b>';
        text += 'Cédula';
        text += '</b></td>';
        text += '\t\t';
        text += '<td><b>';
        text += 'Nombres y Apellidos';
        text += '</b></td>';
        text += '\t\t';
        text += '<td><b>';
        text += 'Categoria';
        text += '</b></td>';
        text += '\t\t';
        text += '<td><b>';
        text += 'Municipio';
        text += '</b></td>';
        text += '\t\t';
        text += '<td><b>';
        text += 'Estado';
        text += '</b></td>';
        text += '</thead>';

        for (i = 0; i < tam; i++)
        {
           
                text += '<tbody>';
                text += '<tr>';
                text += '<td>';
                text += result[i].ci_can;
                text += '</td>';
                text += '\t\t';
                text += '<td>';
                text += result[i].nom_can;
                text += ' ';
                text += result[i].ape_can;
                text += '</td>';
                text += '\t\t';
                text += '<td>';
                text += result[i].nom_cat;
                text += '</td>';
                text += '\t\t';
                text += '<td>';
                text += result[i].nom_mun;
                text += '</td>';
                text += '\t\t';
                text += '<td>';
                text += result[i].est_can;
                text += '</td>';
                text += '\t\t';
                text += '<td>';
                text += '</td>';
                text += '</tr>';
                text += '</tbody>';
               
            }
        document.getElementById("find").innerHTML= text;
    });
}