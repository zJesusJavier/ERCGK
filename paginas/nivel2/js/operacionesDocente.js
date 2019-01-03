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

// Funcion de Agregar Docentes

function guardarDocente()
{
	// Aqui se cargan las variables con los datos del Formulario

    var estado = document.getElementById("est_pro").value;
    var cedula = document.getElementById("ci_pro").value;
    var nombre = document.getElementById("nom_pro").value;
    var apellido = document.getElementById("ape_pro").value;
    var categoriafk = document.getElementById("fky_cat").value;
    var clasefk = document.getElementById("fky_cla").value;
    var direccion = document.getElementById("dir_pro").value;
    var telefono = document.getElementById("tel_pro").value;
    var email = document.getElementById("email_pro").value;

    // Aqui se cargan los IDs de los DIVs que contienen los Inputs

    var inputCedula = document.getElementById("inputCedula");
    var inputNombre = document.getElementById("inputNombre");
	var inputApellido = document.getElementById("inputApellido");
	var inputCategoria = document.getElementById("inputCategoria");
	var inputClase = document.getElementById("inputClase");
	var inputDireccion = document.getElementById("inputDireccion");
	var inputTelefono = document.getElementById("inputTelefono");
	var inputEmail = document.getElementById("inputEmail");

	// Validación de que los Inputs no estan vacios

    if(!cedula)
	{
		swal("", "Debe llenar el campo de Cédula.", "error", 
        {
            button: false,
            timer: 1500
        });
		document.getElementById("ci_pro").focus();
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
            button: false,
            timer: 1500
        });
		document.getElementById("nom_pro").focus();
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
            button: false,
            timer: 1500
        });
		document.getElementById("ape_pro").focus();
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
            button: false,
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
            button: false,
            timer: 1500
        });
		document.getElementById("dir_pro").focus();
		inputDireccion.className="form-group label-floating has-error";
		return
	}
	else
	{
		inputDireccion.className="form-group label-floating";
	}

	if(!clasefk)
	{
		swal("", "Debe seleccionar una opción en Clase.", "error", 
        {
            button: false,
            timer: 1500
        });
		document.getElementById("fky_cla").focus();
		inputClase.className="form-group label-floating has-error";
		return
	}
	else
	{
		inputClase.className="form-group label-floating";
	}

	if(!telefono)
	{
		swal("", "Debe llenar el campo de Teléfono.", "error", 
        {
            button: false,
            timer: 1500
        });
		document.getElementById("tel_pro").focus();
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
            button: false,
            timer: 1500
        });
		document.getElementById("email_pro").focus();
		inputEmail.className="form-group label-floating has-error";
		return
	}
	else
	{
		inputEmail.className="form-group label-floating";
	}

	// Guardado en la Base de Datos

	sql = "SELECT * FROM profesor";
   	con.query(sql, function (err, result) 
    	{
            if (err) console.log(err);
        });
                        
    sql = "INSERT INTO profesor (ci_pro, nom_pro, ape_pro, fky_cat, fky_cla, dir_pro, tel_pro, email_pro, est_pro) VALUES ?";
            var values = [
               [cedula, nombre, apellido, categoriafk, clasefk, direccion, telefono, email, estado]];
                      
    con.query(sql, [values], function (err, result) 
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
            swal("", "Docente registrado correctamente.", "success",
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

// Funcion de Consulta de la pagina Consultar

function consultarDocente()
{
    con.query("SELECT profesor.*, clase.nom_cla, categoria.nom_cat FROM profesor INNER JOIN clase ON profesor.fky_cla=clase.cod_cla INNER JOIN categoria ON profesor.fky_cat=categoria.cod_cat WHERE est_pro='A'", function (err, result, fields) 
    {
        if (err) console.log(err);

        var tam = result.length;
        var text;
        text = "<tr>";

        for (i = 0; i < tam; i++)
        {
            text += "<td>";
            text += result[i].cod_pro;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].ci_pro;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].nom_pro;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].ape_pro;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].nom_cat;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].tel_pro;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].nom_cla;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += "</tr>";
            document.getElementById("tdocente").innerHTML= text;
        }       
    });
}

// Consulta del Panel de Administración

function consultarDocentePanel()
{
    con.query("SELECT profesor.*, clase.nom_cla, categoria.nom_cat FROM profesor INNER JOIN clase ON profesor.fky_cla=clase.cod_cla INNER JOIN categoria ON profesor.fky_cat=categoria.cod_cat WHERE est_pro='A'", function (err, result, fields) 
    {
        if (err) console.log(err);
                       
        var tam = result.length;
        var text;
        text = "<tr>";

        for (i = 0; i < tam; i++) 
        {
            text += "<td>";
            text += result[i].cod_pro;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].ci_pro;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].nom_pro;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].ape_pro;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].dir_pro;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].tel_pro;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].email_pro;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].nom_cla;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].nom_cat;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].est_pro;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += '<a type="button" rel="tooltip" title="Editar" onclick="formularioEditarDocente('+result[i].cod_pro+')"><i class="material-icons text-info" data-toggle="modal" data-target="#">mode_edit</i></a>';
            text += '<a type="button" rel="tooltip" title="Eliminar" onclick="avisoBorrarDocente('+result[i].cod_pro+')"><i class="material-icons text-danger">delete_forever</i></a>';
            text += "</td>";
            text += "</tr>";
            document.getElementById("tdocente").innerHTML= text;
        }
    });
}

//  Modal para confirmar Eliminación de la Candidata

function avisoBorrarDocente(capb)
{
    $("#borradoDocentes").modal("show")
    captionid = capb;
}

// Borrado Lógico

function borrarDocente()
{
    sql = "SELECT * FROM profesor";
    con.query(sql, function (err, result) 
    {
        if (err) console.log(err);
    });

    sql = "UPDATE profesor SET est_pro='I' WHERE cod_pro = " + captionid;
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
            swal("", "Docente eliminado correctamente.", "success",
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