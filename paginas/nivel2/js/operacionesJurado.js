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

// Funcion de Agregar Jurados

function guardarJurado()
{
	// Aqui se cargan las variables con los datos del Formulario

    var estado = document.getElementById("est_jur").value;
    var cedula = document.getElementById("ci_jur").value;
    var nombre = document.getElementById("nom_jur").value;
    var apellido = document.getElementById("ape_jur").value;
    var categoriafk = document.getElementById("fky_cat").value;
    var direccion = document.getElementById("dir_jur").value;
    var telefono = document.getElementById("tel_jur").value;
    var email = document.getElementById("email_jur").value;

    // Aqui se cargan los IDs de los DIVs que contienen los Inputs

    var inputCedula = document.getElementById("inputCedula");
    var inputNombre = document.getElementById("inputNombre");
	var inputApellido = document.getElementById("inputApellido");
	var inputCategoria = document.getElementById("inputCategoria");
	var inputDireccion = document.getElementById("inputDireccion");
	var inputTelefono = document.getElementById("inputTelefono");
	var inputEmail = document.getElementById("inputEmail");

	// Validación de que los Inputs no estan vacios

    if(!cedula)
	{
		swal("", "Debe llenar el campo de Cédula.", "error", 
        {
            button:false,
            timer: 1500
        });
		document.getElementById("ci_jur").focus();
		inputCedula.className="form-group label-floating has-error";
		return
	}
	else
	{
		inputCedula.className="form-group label-floating";
	}

	if(!nombre)
	{
		swal("", "Debe llenar el campo de Nombre.", "error", 
        {
            button:false,
            timer: 1500
        });
		document.getElementById("nom_jur").focus();
		inputNombre.className="form-group label-floating has-error";
		return
	}
	else
	{
		inputNombre.className="form-group label-floating";
	}

	if(!apellido)
	{
		swal("", "Debe llenar el campo de Apellido.", "error", 
        {
            button:false,
            timer: 1500
        });
		document.getElementById("ape_jur").focus();
		inputApellido.className="form-group label-floating has-error";
		return
	}
	else
	{
		inputApellido.className="form-group label-floating";
	}

	if(!categoriafk)
	{
		swal("", "Debe seleccionar una opción en Categoria.", "error", 
        {
            button:false,
            timer: 1500
        });
		document.getElementById("fky_cat").focus();
		inputCategoria.className="form-group label-floating has-error";
		return
	}
	else
	{
		inputCategoria.className="form-group label-floating";
	}

	if(!direccion)
	{
		swal("", "Debe llenar el campo de Dirección.", "error", 
        {
            button:false,
            timer: 1500
        });
		document.getElementById("dir_jur").focus();
		inputDireccion.className="form-group label-floating has-error";
		return
	}
	else
	{
		inputDireccion.className="form-group label-floating";
	}

	if(!telefono)
	{
		swal("", "Debe llenar el campo de Teléfono.", "error", 
        {
            button:false,
            timer: 1500
        });
		document.getElementById("tel_jur").focus();
		inputTelefono.className="form-group label-floating has-error";
		return
	}
	else
	{
		inputTelefono.className="form-group label-floating";
	}

	if(!email)
	{
		swal("", "Debe llenar el campo de Correo Electrónico.", "error", 
        {
            button:false,
            timer: 1500
        });
		document.getElementById("email_jur").focus();
		inputEmail.className="form-group label-floating has-error";
		return
	}
	else
	{
		inputEmail.className="form-group label-floating";
	}

	// Guardado en la Base de Datos

	sql = "SELECT * FROM jurado";
   	con.query(sql, function (err, result) 
    	{
            if (err) console.log(err);
        });
                        
    sql = "INSERT INTO jurado (ci_jur, nom_jur, ape_jur, fky_cat, dir_jur, tel_jur, email_jur, est_jur) VALUES ?";
            var values = [
               [cedula, nombre, apellido, categoriafk, direccion, telefono, email, estado]];
                      
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
            swal("", "Jurado registrado correctamente.", "success",
            {
                button:false,
                timer: 3000
            }).then(function() 
            {
                window.location.reload();
            });
        };
    });
}

// Funcion de Consulta de la pagina Consultar

function consultarJurado()
{
    con.query("SELECT jurado.*, categoria.nom_cat FROM jurado INNER JOIN categoria ON jurado.fky_cat=categoria.cod_cat WHERE est_jur='A'", function (err, result, fields) 
    {
        if (err) console.log(err);
                   
        var tam = result.length;
        var text;
        text = "<tr>"; 
        for (i = 0; i < tam; i++) 
        {
                        
            text += "<td>";
            text += result[i].cod_jur;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].ci_jur;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].nom_jur;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].ape_jur;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].nom_cat;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].tel_jur;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += "</tr>";
            document.getElementById("tjurado").innerHTML= text;
        }       
    });
}

// Consulta del Panel de Administración

function consultarJuradoPanel()
{
    con.query("SELECT jurado.*, categoria.nom_cat FROM jurado INNER JOIN categoria ON jurado.fky_cat=categoria.cod_cat WHERE est_jur='A'", function (err, result, fields) 
    {
        if (err) console.log(err);
                       
        var tam = result.length;
        var text;
        text = "<tr>";

        for (i = 0; i < tam; i++) 
        {
            
            text += "<td>";
            text += result[i].cod_jur;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].ci_jur;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].nom_jur;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].ape_jur;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].dir_jur;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].tel_jur;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].email_jur;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].nom_cat;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].est_jur;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += '<a type="button" rel="tooltip" title="Editar" onclick="formularioEditarJurado('+result[i].cod_jur+')"><i class="material-icons text-info" data-toggle="modal" data-target="#">mode_edit</i></a>';
            text += '<a type="button" rel="tooltip" title="Eliminar" onclick="avisoBorrarJurado('+result[i].cod_jur+')"><i class="material-icons text-danger">delete_forever</i></a>';
            text += "</td>";
            text += "</tr>";
            document.getElementById("tjurado").innerHTML= text;
        }
    });
}

//  Modal para confirmar Eliminación del Jurado

function avisoBorrarJurado(capb)
{
    $("#borradoJurados").modal("show")
    captionid = capb;
}

// Borrado Lógico

function borrarJurado()
{
    sql = "SELECT * FROM jurado";
    con.query(sql, function (err, result) 
    {
        if (err) console.log(err);
    });

    sql = "UPDATE jurado SET est_jur='I' WHERE cod_jur = " + captionid;
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
            swal("", "Jurado eliminado correctamente.", "success",
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