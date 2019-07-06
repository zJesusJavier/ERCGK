// Conexion con la Base de Datos y declaracion de variables Globales
require('module-alias/register');
var con = require('@models/db');
var swal = require('sweetalert');
var sql;

// Modal con el Formulario para editar datos de la Clase

function formularioEditarClase(capb)
{
	var captionid = capb;

    con.query("SELECT * FROM clase WHERE cod_cla='" + captionid + "'" , function (err, result, fields) 
    {
        if (err) console.log(err);
                       
        var tam = result.length;
        var text;

        for (i = 0; i < tam; i++) 
        {
			text = '<form autocomplete="off">'
				text += '<div class="row">'
            		text += '<div class="col-md-1">'
            			text += '<div class="form-group label-floating">'
            				text += '<label class="control-label">ID</label>'
           					text += '<input type="text" class="form-control" id="cod_clas" value="'+ result[i].cod_cla +'" readonly>'
           				text += '</div>'
            		text += '</div>'

					text += '<div class="col-md-4">'
						text += '<div class="form-group label-floating">'
							text += '<label class="control-label">Nombre</label>'
							text += '<input type="text" class="form-control" id="nom_clas" value="'+ result[i].nom_cla +'">'
						text += '</div>'
					text += '</div>'

					text += '<div class="col-md-2">'
            			text += '<div class="form-group label-floating" id="inputEstado">'
            				text += '<label class="control-label">Estado</label>'
            				text += '<select class="form-control" id="est_clas">'
                                text += '<optgroup label="Seleccionado">'
                                if (result[i].est_cla == "A") 
                                {
                                    text += '<option value="'+ result[i].est_cla +'" selected>‌Activa</option>'
                                }
                                else
                                {
                                    text += '<option value="'+ result[i].est_cla +'" selected>Inactiva</option>'
                                }
                                text += '<optgroup label="">'
                                text += '<optgroup label="Cambiar a">'
                                text += '<option value="A">Activa</option>'
                                text += '<option value="I">Inactiva</option>'
            				text += '</select>'
            			text += '</div>'
            		text += '</div>'
				text += '</div>'
			
				text += '<input type="button" class="btn btn-success pull-right" value="Actualizar registro" onclick="editarClase();">'
	            text += '<button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>'
			text += '</form>'
  		}
        document.getElementById("editClase").innerHTML= text;
        $("#editarClase").modal("show")
    });
}

// Función Editar Clase

function editarClase()
{
    var id = document.getElementById("cod_clas").value;
    var estado = document.getElementById("est_clas").value;
    var nombre = document.getElementById("nom_clas").value;

    sql = "SELECT * FROM clase";
    con.query(sql, function (err, result) 
    {
        if (err) console.log(err);
    });
            
    sql = "UPDATE clase SET nom_cla='"+ nombre +"', est_cla='"+ estado +"' WHERE cod_cla = "+ id;

    con.query(sql, function (err, result)
    {
        if (err)
        { 
            console.log(err);
            swal("Error", "Por favor, verifique los datos o contacte con el Administrador.", "error", 
            {
                button: false,
                timer: 3000
            });
        }
        else 
        {
            swal("", "Los datos fueron actualizados correctamente.", "success",
            {
                button: false,
                timer: 3000
            }).then(function() 
            {
                window.location.reload();
            });
        };
    });
}