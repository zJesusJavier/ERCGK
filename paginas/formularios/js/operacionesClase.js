// Conexion con la Base de Datos

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

// Funcion de Agregar Clase

function guardarClase()
{
	// Aqui se cargan las variables con los datos del Formulario

    var estado = document.getElementById("est_cla").value;
    var nombre = document.getElementById("nom_cla").value;

    // Aqui se cargan los IDs de los DIVs que contienen los Inputs

    var inputNombre = document.getElementById("inputNombreClase");

	// Validación de que los Inputs no estan vacios

    if(!nombre)
	{
		swal("", "Debe llenar el campo de Nombre.", "error", 
        {
            button:false,
            timer: 1500
        });
        document.getElementById("nom_cla").focus();
		inputNombre.className="form-group label-floating has-error";
		return
	}
	else
	{
		inputNombre.className="form-group label-floating";
	}

	// Guardado en la Base de Datos

	sql = "SELECT * FROM clase";
   	con.query(sql, function (err, result) 
    	{
            if (err) console.log(err);
        });
                            
    sql = "INSERT INTO clase (nom_cla, est_cla) VALUES ?";
    var values = [[nombre, estado]];
                          
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
            swal("", "Clase registrada correctamente.", "success",
            {
                button:false,
                timer: 3000
            }).then(function() 
            {
                sql = "SELECT * FROM registro";
                con.query(sql, function (err, result) 
                {
                    if (err) console.log(err);
                });

                var date_reg = new Date();
                var usu_reg = 'admin';
                var tab_reg = 'clase';
                var est_reg = 'A';
                var new_reg = nombre;
                                    
                sql = "INSERT INTO registro (usu_reg, tab_reg, new_reg, date_reg, est_reg) VALUES ?";
                var values = [[usu_reg, tab_reg, new_reg, date_reg, est_reg]];
                                  
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

// Consulta del Panel de Administración

function consultarClasePanel()
{
    con.query("SELECT * FROM clase", function (err, result, fields) 
    {
        if (err) console.log(err);
                       
        var tam = result.length;
        var text;
        text = "<tr>";

        for (i = 0; i < tam; i++) 
        {
            text += "<td>";
            text += result[i].cod_cla;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].nom_cla;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].est_cla;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += '<a type="button" rel="tooltip" title="Editar" onclick="formularioEditarClase('+result[i].cod_cla+')"><i class="material-icons text-info" data-toggle="modal">mode_edit</i></a>';
            text += '<a type="button" rel="tooltip" title="Eliminar" onclick="avisoBorrarClase('+result[i].cod_cla+')"><i class="material-icons text-danger">delete_forever</i></a>';
            text += "</td>";
            text += "</tr>";
            document.getElementById("tclase").innerHTML= text;
        }
    });
}

//  Modal para confirmar Eliminación de la Clase

function avisoBorrarClase(capb)
{
    $("#borradoClases").modal("show")
    captionid = capb;
}

// Borrado Lógico

function borrarClase()
{
    sql = "SELECT * FROM clase";
    con.query(sql, function (err, result) 
    {
        if (err) console.log(err);
    });

    sql = "UPDATE clase SET est_cla='I' WHERE cod_cla = " + captionid;
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
            swal("", "Clase eliminada correctamente.", "success",
            {
                button: false,
                timer: 3000
            }).then(function() 
            {
                sql = "SELECT * FROM eliminacion";
                con.query(sql, function (err, result) 
                {
                    if (err) console.log(err);
                });

                var date_eli = new Date();
                var usu_eli = 'admin';
                var tab_eli = 'clase';
                var est_eli = 'A';
                var reg_eli = captionid;
                                    
                sql = "INSERT INTO eliminacion (usu_eli, tab_eli, reg_eli, date_eli, est_eli) VALUES ?";
                var values = [[usu_eli, tab_eli, reg_eli, date_eli, est_eli]];
                                  
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