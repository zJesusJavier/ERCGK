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
    var busqueda = aux.toLowerCase();

    con.query("SELECT candidata.*, municipio.nom_mun, categoria.nom_cat FROM candidata INNER JOIN municipio ON candidata.fky_mun=municipio.cod_mun INNER JOIN categoria ON candidata.fky_cat=categoria.cod_cat", function (err, result, fields)
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
            if ((busqueda == result[i].nom_can.toLowerCase()) 
                || (busqueda == result[i].ci_can) 
                || (busqueda == result[i].ape_can.toLowerCase()) 
                || (busqueda == result[i].ocu_can.toLowerCase()) 
                || (busqueda == result[i].email_can.toLowerCase()) 
                || (busqueda == result[i].nom_can.toLowerCase()+" "+result[i].ape_can.toLowerCase()))
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
        }
    });
}