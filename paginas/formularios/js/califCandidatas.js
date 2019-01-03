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
var captioncand, ultsem, porc_des, capcand;


function buscadorCalif()
{
    con.query("SELECT * FROM candidata WHERE est_can='A' ORDER BY fec_can DESC" ,function (err, result, fields)
    {
        var aux = [];
        var fin = [];
        var text, i, j=0, k, z=0, num, ano, c=0;
        text = '<form autocomplete="off" role="search" class="form-inline">'
        text += '<div align="center">'
        text += '<select class="form-control form-control-lg" placeholder="Fecha" id="busqueda">'
       

            for (i=0;i<result.length;i++) {
                c=0;
                num=result[i].fec_can.getFullYear();
                aux[j]=num;
                j++;
                for (k=0;k<result.length;k++)
               

                        if ( aux[k] == num ){

                                c= c+1;
                        }
                   
                if ( c == 1 ) {
                        fin[z]=num;
                        z=z+1;
                }
        }
    
       

            for(j=0; j<z; j++){
               ano = fin[j];
                text += '<option value="'+ ano +'" selected>‌'+ ano+'</option>'
               
                
            }
        
        text += '</select>'
        text += '<a type="submit" class="btn btn-white btn-just-icon btn-lg" onclick="busquedaCalif('+ano+');"><i class="material-icons">search</i></a>'
        text += '</div>'
        text += '</form>'
        document.getElementById("buscadorCalif").innerHTML= text;
    });
}


function busquedaCalif()
{
    var busqueda = document.getElementById("busqueda").value;
  
    con.query("SELECT candidata.*, categoria.nom_cat FROM candidata INNER JOIN categoria ON candidata.fky_cat=categoria.cod_cat WHERE est_can='A'" ,function (err, result, fields)
    {
        con.query("SELECT * FROM calificacion WHERE est_cal='A'", function (err, result1, fields)
        {

            if (err) console.log(err);

                var tam = result.length;
                var text;
                        
                text = '<thead class="text-oscuro">';
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
                text += 'Peso';
                text += '</b></td>';
                text += '\t\t';
                text += '<td><b>';
                text += 'Estatura';
                text += '</b></td>';
                text += '\t\t';
                text += '<td><b>';
                text += 'Detalles del Desempeño';
                text += '</b></td>';
                text += '</thead>';

                var i, j=0, cont= 0, porc_cal=0, acum=0, nota=0;

                

            for (i = 0; i < tam; i++)
            {
                var year = result[i].fec_can.getUTCFullYear();
                var ultsem = -99999;
            
        
                if(year == busqueda )
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
                    text += result[i].peso_can;
                    text += ' Kg</td>';
                    text += '\t\t';
                    text += '<td>';
                    text += result[i].esta_can;
                    text += ' cm </td>';
                    text += '\t\t';
                    text += '<td>';
                    text += '<a type="button" rel="tooltip" title="Ver más" onclick="detalleCalif('+result[i].cod_can+');"><i class="material-icons text-info" data-toggle="modal">settings_ethernet</i></a>';
                    text += "</td>";
                    text += '</tr>';
                    text += '</tbody>';
                }
                document.getElementById("califcan").innerHTML= text;
            }  
        });
    });
}

function detalleCalif(cand){
    captioncand = cand;

    con.query("SELECT candidata.*, categoria.nom_cat, certamen.des_cer FROM candidata INNER JOIN categoria ON candidata.fky_cat=categoria.cod_cat INNER JOIN certamen ON candidata.fky_cer=certamen.cod_cer WHERE cod_can='" + captioncand + "'", function (err, result, fields) 
    {
        con.query("SELECT calificacion.*, clase.nom_cla, profesor.nom_pro, profesor.ape_pro FROM calificacion INNER JOIN clase ON calificacion.fky_cla = clase.cod_cla INNER JOIN profesor ON calificacion.fky_pro = profesor.cod_pro WHERE fky_can='" + captioncand + "'", function (err, result1, fields) 
        {

            con.query("SELECT * FROM clase WHERE est_cla='A'", function (err, result2, fields) 
            {
            
            if (err) console.log(err);
			                     
                    var tam = result.length;
                    var j=0, porc;
                    var cant_not=0, cont_cal=0;
                    var text;

                    ultsem=-999;

                    text = '<div class="col-md-12">'
                        text += '<div class="col-md-6">'
                        for (i = 0; i < tam; i++) 
                            {
                                text +='<h4> <b>Nombres y Apellidos</b><br/>'+result[i].nom_can+' '+result[i].ape_can+'<br/><b>Cédula</b> \t\t'+result[i].ci_can+'<br/><b>Categoria</b> \t\t'+result[i].nom_cat+'<br/><b>Certamen: \t\t</b>'+result[i].des_cer+'</h4>';
                            }		
                        
                            for (i = 0; i < result1.length; i++) 
                                {
                                        if(result1[i].sem_cal>ultsem)
                                        {
                                            ultsem= result1[i].sem_cal;
                                        }
                                    cant_not=(result1[i].sem_cal* result2.length);
                                    
                                        if(result1[i].fky_can== captioncand)
                                        {
                                        cont_cal=cont_cal+1;
                                        }

                                        if(cant_not == cont_cal)
                                        {
                                            porc= 100;
                                        }
                                        else{
                                            porc=(cont_cal*100)/cant_not;
                                        }

                                }
                            porc_des=porc.toFixed();
                            text += '</div>'

                        text += '<div class="col-md-3">'
                            text += '<h4><b>Última Semana Evaluada</b></h4>'
                            text += ultsem;
                        text += '</div>'
                        text += '<div class="col-md-3">'
                            text +='<h4><b>Porcentaje Desempeño hasta la Semana '+ultsem+'</b></h4>'
                            text += porc_des+' %';
                        text += '</div>'
                       
                    text += '</div>'
                    text += '<form autocomplete="off">'
                        text += '<div class="col-md-10">'
                        text += '<select class="form-control" id="clase">'
                                for (j = 0; j < result2.length; j++) 
                                    {    
                                    text += '<option value="'+ result2[j].cod_cla +'">‌'+ result2[j].nom_cla +'</option>'
                                    }						
                                    
                        text += '</select>'
                        text += '</div>'

                        text += '<a type="submit" class="btn btn-white btn-just-icon btn-lg" onclick="materiaCalif();"><i class="material-icons">search</i></a>'
                    text += '</form>'   


                  capcand = captioncand;
                    document.getElementById("selectnota").innerHTML= text;
                    $("#mostrarNotas").modal("show")
        });
    });	
    });
   
}

               
function materiaCalif()
{
     var materia = document.getElementById("clase").value;
     var text, i;

    con.query("SELECT calificacion.*, profesor.nom_pro, profesor.ape_pro FROM calificacion INNER JOIN profesor ON calificacion.fky_pro = profesor.cod_pro WHERE fky_can='" + captioncand + "'", function (err, result1, fields) 
    {
        con.query("SELECT * FROM clase WHERE cod_cla='" +materia+ "'",  function (err, result2, fields) 
        {
            if (err) console.log(err);
                  
            text ='<table class="table table-hover">';
            text += '<thead class="text-primary">';
            text += '<td><b>';
            text += 'Profesor';
            text += '</b></td>';
            text += '\t\t';
            text += '<td><b>';
            text += 'Calificacion';
            text += '</b></td>';
            text += '\t\t';
            text += '<td><b>';
            text += 'Observación';
            text += '</b></td>';
            text += '\t\t';
            text += '<td><b>';
            text += 'Semana';
            text += '</b></td>';
            text += '</thead>';

            for (i = 0; i < result1.length; i++) 
            {
                if(result1[i].fky_cla == materia)
                {
                    text += '<tbody>';
                    text += '<tr>';
                    text += '<td>';
                    text += result1[i].nom_pro;
                    text += ' ';
                    text += result1[i].ape_pro;
                    text += '</td>';
                    text += '\t\t';
                    text += '<td>';
                    text += result1[i].cal_cal;
                    text += '</td>';
                    text += '\t\t';
                    text += '<td>';
                    text += result1[i].obs_cal;
                    text += '</td>';
                    text += '\t\t';
                    text += '<td>';
                    text += result1[i].sem_cal;
                    text += '</td>';
                    text += '\t\t';
                }
            }
            
            text += '</table>';
            text += '</tbody>';

            document.getElementById("notas").innerHTML= text;
            $("#mostrarNotas").modal("show")
        });
    });
    
}

