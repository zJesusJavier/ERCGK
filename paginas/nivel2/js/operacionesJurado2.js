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

// Modal con el Formulario para editar datos de la Candidata

function formularioEditarJurado(capb)
{
	var captionid = capb;

    con.query("SELECT jurado.*, categoria.nom_cat FROM jurado INNER JOIN categoria ON jurado.fky_cat=categoria.cod_cat WHERE cod_jur='" + captionid + "'" , function (err, result, fields) 
    {
        con.query("SELECT * FROM categoria WHERE est_cat='A'", function (err, result1, fields) 
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
               					text += '<input type="text" class="form-control" id="cod_jur" value="'+ result[i].cod_jur +'" readonly>'
               				text += '</div>'
                		text += '</div>'

        					text += '<div class="col-md-2">'
               				text += '<div class="form-group label-floating" id="inputCedula">'
                				text += '<label class="control-label">Cédula</label>'
                				text += '<input type="text" class="form-control" id="ci_jur" maxlength="8" onkeypress="return validarNumero(event)" value="'+ result[i].ci_jur +'">'
                			text += '</div>'
                		text += '</div>'

                		text += '<div class="col-md-3">'
                			text += '<div class="form-group label-floating" id="inputNombre">'
        			            text += '<label class="control-label">Nombres</label>'
        			            text += '<input type="text" class="form-control" id="nom_jur" maxlength="30" value="'+ result[i].nom_jur +'">'
                			text += '</div>'
                		text += '</div>'

                		text += '<div class="col-md-3">'
        		            text += '<div class="form-group label-floating" id="inputApellido">'
        			            text += '<label class="control-label">Apellidos</label>'
        			            text += '<input type="text" class="form-control" id="ape_jur" maxlength="30" value="'+ result[i].ape_jur +'">'
        		            text += '</div>'
        		        text += '</div>'

        		        text += '<div class="col-md-2">'
        	            	text += '<div class="form-group label-floating" id="inputCategoria">'
        			            text += '<label class="control-label">Categoria</label>'
        			            text += '<select class="form-control" id="fky_cat">'
									text += '<optgroup label="Seleccionado">'
									text += '<option value="'+ result[i].fky_cat +'" selected>‌'+ result[i].nom_cat +'</option>'
									text += '<optgroup label="">'
									text += '<optgroup label="Cambiar a">'
									for(var j=0; j<result1.length; j++)
									{
										text += '<option value="'+result1[j].cod_cat+'">‌'+ result1[j].nom_cat +'</option>'
									}
        	            		text += '</select>'
        	            	text += '</div>'
        	            text += '</div>'
        			text += '</div>'

                	text += '<div class="row">'
        	            text += '<div class="col-md-12">'
        		            text += '<div class="form-group label-floating" id="inputDireccion">'
        			            text += '<label class="control-label">Dirección</label>'
        			            text += '<input type="text" class="form-control" id="dir_jur" maxlength="50" value="'+ result[i].dir_jur +'">'
        		            text += '</div>'
        	            text += '</div>'
        	        text += '</div>'

        	        text += '<div class="row">'
                    	text += '<div class="col-md-3">'
                    		text += '<div class="form-group label-floating" id="inputTelefono">'
        			            text += '<label class="control-label">Teléfono</label>'
        			            text += '<input type="text" class="form-control input-masked" id="tel_jur" name="tel_can" maxlength="12" onkeypress="return validarTelefono(event)" value="'+ result[i].tel_jur +'">'
                    		text += '</div>'
                    	text += '</div>'

                    	text += '<div class="col-md-5">'
                    		text += '<div class="form-group label-floating" id="inputEmail">'
        			            text += '<label class="control-label">Correo Electrónico</label>'
        			            text += '<input type="text" class="form-control" id="email_jur" maxlength="50" value="'+ result[i].email_jur +'">'
                    		text += '</div>'
                    	text += '</div>'

                    	text += '<div class="col-md-2">'
                			text += '<div class="form-group label-floating" id="inputEstado">'
                				text += '<label class="control-label">Estado</label>'
                				text += '<select class="form-control" id="est_jur">'
									text += '<optgroup label="Seleccionado">'
									if (result[i].est_jur == "A") 
									{
										text += '<option value="'+ result[i].est_jur +'" selected>‌Activo</option>'
									}
									text += '<optgroup label="">'
									text += '<optgroup label="Cambiar a">'
									text += '<option value="A">Activo</option>'
									text += '<option value="I">Inactivo</option>'
                				text += '</select>'
                			text += '</div>'
                		text += '</div>'
        			text += '</div>'

                    text += '<input type="button" class="btn btn-success pull-right" value="Actualizar registro" onclick="editarJurado();">'
                    text += '<button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>'
                text += '</form>'
        	}
            document.getElementById("editJurado").innerHTML= text;
            $("#editarJurado").modal("show")
        });
    });
}

// Función Editar Candidata

function editarJurado()
{
	var id = document.getElementById("cod_jur").value;
    var estado = document.getElementById("est_jur").value;
    var cedula = document.getElementById("ci_jur").value;
    var nombre = document.getElementById("nom_jur").value;
    var apellido = document.getElementById("ape_jur").value;
    var categoriafk = document.getElementById("fky_cat").value;
    var direccion = document.getElementById("dir_jur").value;
    var telefono = document.getElementById("tel_jur").value;
    var email = document.getElementById("email_jur").value;

	sql = "SELECT * FROM jurado";
	con.query(sql, function (err, result) 
	{
	    if (err) console.log(err);
	});
	        
	sql = "UPDATE jurado SET ci_jur='"+ cedula +"',"+"nom_jur='"+nombre+"',"+"ape_jur='"+apellido+
	"',"+"fky_cat= '"+ categoriafk +"',"+" dir_jur ='"+ direccion +"',"+" tel_jur ='"+ telefono +"',"+" email_jur ='"+ email +
	"',"+"est_jur ='"+ estado +"' WHERE cod_jur = "+ id;

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