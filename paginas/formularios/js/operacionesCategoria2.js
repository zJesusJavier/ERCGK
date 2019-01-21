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

// Modal con el Formulario para editar datos de la Categoria

function formularioEditarCategoria(capb)
{
	var captionid = capb;

    con.query("SELECT * FROM categoria WHERE cod_cat='" + captionid + "'" , function (err, result, fields) 
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
           					text += '<input type="text" class="form-control" id="cod_cate" value="'+ result[i].cod_cat +'" readonly>'
           				text += '</div>'
            		text += '</div>'

					text += '<div class="col-md-4">'
						text += '<div class="form-group label-floating">'
							text += '<label class="control-label">Nombre</label>'
							text += '<input type="text" class="form-control" id="nom_cate" value="'+ result[i].nom_cat +'">'
						text += '</div>'
					text += '</div>'

					text += '<div class="col-md-2">'
            			text += '<div class="form-group label-floating" id="inputEstado">'
            				text += '<label class="control-label">Estado</label>'
            				text += '<select class="form-control" id="est_cate">'
                                text += '<optgroup label="Seleccionado">'
                                if (result[i].est_cat == "A") 
                                {
                                    text += '<option value="'+ result[i].est_cat +'" selected>‌Activa</option>'
                                }
                                else
                                {
                                    text += '<option value="'+ result[i].est_cat +'" selected>‌Inactiva</option>'
                                }
                                text += '<optgroup label="">'
                                text += '<optgroup label="Cambiar a">'
                                text += '<option value="A">Activa</option>'
                                text += '<option value="I">Inactiva</option>'
            				text += '</select>'
            			text += '</div>'
            		text += '</div>'
				text += '</div>'
			
				text += '<input type="button" class="btn btn-success pull-right" value="Actualizar registro" onclick="editarCategoria();">'
	            text += '<button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>'
			text += '</form>'
  		}
        document.getElementById("editCategoria").innerHTML= text;
        $("#editarCategoria").modal("show")
    });
}

// Función Editar Categoria

function editarCategoria()
{
    var id = document.getElementById("cod_cate").value;
    var estado = document.getElementById("est_cate").value;
    var nombre = document.getElementById("nom_cate").value;

    sql = "SELECT * FROM categoria";
    con.query(sql, function (err, result) 
    {
        if (err) console.log(err);
    });
                
    sql = "UPDATE categoria SET nom_cat='"+ nombre +"', est_cat='"+ estado +"' WHERE cod_cat = "+ id;
    
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
                sql = "SELECT * FROM log";
                con.query(sql, function (err, result) 
                {
                    if (err) console.log(err);
                });

                var date_log = new Date();
                var usu_log = 'admin';
                var tab_log = 'Categoria';
                var est_log = 'A';
                var reg_log = id;
                var acc_log = 'Edicion';
                                    
                sql = "INSERT INTO log (usu_log, tab_log, acc_log, reg_log, date_log, est_log) VALUES ?";
                var values = [[usu_log, tab_log, acc_log, reg_log, date_log, est_log]];
                                  
                con.query(sql, [values], function (err, result) 
                {
                    if (err)
                    { 
                        console.log(err);
                        swal("Error", "Por favor, verifique los datos o contacte con el Administrador.", "error", 
                        {
                            button:false,
                            timer: 3000
                        });
                    }
                    else 
                    {
                        window.location.reload();
                    };
                });
            });
        };
    });
}