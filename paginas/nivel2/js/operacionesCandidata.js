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
var captionid;

// Funcion de Agregar Candidatas

function guardarCandidata()
{
    // Aqui se cargan las variables con los datos del Formulario

    var estado = document.getElementById("est_can").value;
    var cedula = document.getElementById("ci_can").value;
    var nombre = document.getElementById("nom_can").value;
    var apellido = document.getElementById("ape_can").value;
    var edad = document.getElementById("edad_can").value;
    var peso = document.getElementById("peso_can").value;
    var estatura = document.getElementById("esta_can").value;
    var civil = document.getElementById("fky_civ").value;
    var ocupacion = document.getElementById("ocu_can").value;
    var categoriafk = document.getElementById("fky_cat").value;
    var direccion = document.getElementById("dir_can").value;
    var municipio = document.getElementById("fky_mun").value;
    var telefono = document.getElementById("tel_can").value;
    var email = document.getElementById("email_can").value;
    var fecha = document.getElementById("fec_can").value;

    // Aqui se cargan los IDs de los DIVs que contienen los Inputs del Formulario

    var inputCedula = document.getElementById("inputCedula");
    var inputNombre = document.getElementById("inputNombre");
    var inputApellido = document.getElementById("inputApellido");
    var inputEdad = document.getElementById("inputEdad");
    var inputPeso = document.getElementById("inputPeso");
    var inputEstatura = document.getElementById("inputEstatura");
    var inputOcupacion = document.getElementById("inputOcupacion");
    var inputEstadoCivil = document.getElementById("inputEstadoCivil");
    var inputCategoria = document.getElementById("inputCategoria");
    var inputDireccion = document.getElementById("inputDireccion");
    var inputMunicipio = document.getElementById("inputMunicipio");
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
        document.getElementById("ci_can").focus();
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
        document.getElementById("nom_can").focus();
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
        document.getElementById("ape_can").focus();
        inputApellido.className="form-group label-floating has-error";
        return
    }
    else
    {
        inputApellido.className="form-group label-floating";
    }

    if(!edad)
    {
        swal("", "Debe llenar el campo de Edad.", "error", 
        {
            button:false,
            timer: 1500
        });
        document.getElementById("edad_can").focus();
        inputEdad.className="form-group label-floating has-error";
        return
    }
    else
    {
        inputEdad.className="form-group label-floating";
    }

    if(!peso)
    {
        swal("", "Debe llenar el campo de Peso.", "error", 
        {
            button:false,
            timer: 1500
        });
        document.getElementById("peso_can").focus();
        inputPeso.className="form-group label-floating has-error";
        return
    }
    else
    {
        inputPeso.className="form-group label-floating";
    }

    if(!estatura)
    {
        swal("", "Debe llenar el campo de Estatura.", "error", 
        {
            button:false,
            timer: 1500
        });
        document.getElementById("esta_can").focus();
        inputEstatura.className="form-group label-floating has-error";
        return
    }
    else
    {
        inputEstatura.className="form-group label-floating";
    }

    if(!ocupacion)
    {
        swal("", "Debe llenar el campo de Ocupación.", "error", 
        {
            button:false,
            timer: 1500
        });
        document.getElementById("ocu_can").focus();
        inputOcupacion.className="form-group label-floating has-error";
        return
    }
    else
    {
        inputOcupacion.className="form-group label-floating";
    }

    if(!civil)
    {
        swal("", "Debe seleccionar una opción en Estado Civil.", "error", 
        {
            button:false,
            timer: 1500
        });
        document.getElementById("fky_civ").focus();
        inputEstadoCivil.className="form-group label-floating has-error";
        return
    }
    else
    {
        inputEstadoCivil.className="form-group label-floating";
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
        document.getElementById("dir_can").focus();
        inputDireccion.className="form-group label-floating has-error";
        return
    }
    else
    {
        inputDireccion.className="form-group label-floating";
    }

    if(!municipio)
    {
        swal("", "Debe llenar el campo de Municipio.", "error", 
        {
            button:false,
            timer: 1500
        });
        document.getElementById("fky_mun").focus();
        inputMunicipio.className="form-group label-floating has-error";
        return
    }
    else
    {
        inputMunicipio.className="form-group label-floating";
    }

    if(!telefono)
    {
        swal("", "Debe llenar el campo de Teléfono.", "error", 
        {
            button:false,
            timer: 1500
        });
        document.getElementById("tel_can").focus();
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
        document.getElementById("email_can").focus();
        inputEmail.className="form-group label-floating has-error";
        return
    }
    else
    {
        inputEmail.className="form-group label-floating";
    }

    // Guardado en la Base de Datos

    sql = "SELECT * FROM candidata";
    con.query(sql, function (err, result) 
        {
            if (err) console.log(err);
        });
                        
    sql = "INSERT INTO candidata (ci_can, nom_can, ape_can, peso_can, esta_can, fky_civ, ocu_can, fky_cat, edad_can, fky_mun, dir_can, tel_can, email_can, fec_can, est_can) VALUES ?";
            var values = [
               [cedula, nombre, apellido, peso, estatura, civil, ocupacion, categoriafk, edad, municipio, direccion, telefono, email, fecha, estado]];
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
            swal("", "Candidata registrada correctamente.", "success",
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

// Consulta de Candidatas de la Categoria 1 (Niñas)

function consultarCandidataC1()
{
    con.query("SELECT candidata.*, categoria.nom_cat FROM candidata INNER JOIN categoria ON candidata.fky_cat=categoria.cod_cat WHERE est_can='A' AND fky_cat='1'", function (err, result, fields) 
    {
        if (err) console.log(err);

        var tam = result.length;
        var text;
        text = "<tr>";

        for (i = 0; i < tam; i++) 
        {
            text += "<td>";
            text += result[i].cod_can;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].ci_can;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].nom_can;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].ape_can;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].edad_can;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].nom_cat;
            text += "</td>";
            text += "</tr>";
            document.getElementById("tcandidata").innerHTML= text;
        }       
    });
}

// Consulta de Candidatas de la Categoria 2 (Adultas)

function consultarCandidataC2()
{
    con.query("SELECT candidata.*, categoria.nom_cat FROM candidata INNER JOIN categoria ON candidata.fky_cat=categoria.cod_cat WHERE est_can='A' AND fky_cat='2'", function (err, result, fields) 
    {
        if (err) console.log(err);

        var tam = result.length;
        var text;
        text = "<tr>"; 

        for (i = 0; i < tam; i++) 
        {
            text += "<td>";
            text += result[i].cod_can;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].ci_can;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].nom_can;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].ape_can;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].edad_can;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].nom_cat;
            text += "</td>";
            text += "</tr>";
            document.getElementById("tcandidata").innerHTML = text;
        }       
    });
}

// Consulta del Panel de Administración

function consultarCandidataPanel()
{
    con.query("SELECT candidata.*, categoria.nom_cat FROM candidata INNER JOIN categoria ON candidata.fky_cat=categoria.cod_cat WHERE est_can='A'", function (err, result, fields) 
    {
        if (err) console.log(err);

        var tam = result.length;
        var text;
        text = "<tr>";

        for (i = 0; i < tam; i++) 
        {
            text += "<td>";
            text += result[i].cod_can;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].ci_can;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].nom_can;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].ape_can;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].nom_cat;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].edad_can;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].dir_can;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].tel_can;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].email_can;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].est_can;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += '<a type="button" rel="tooltip" title="Editar" onclick="formularioEditarCandidata('+result[i].cod_can+')"><i class="material-icons text-info" data-toggle="modal" data-target="#">mode_edit</i></a>';
            text += '<a type="button" rel="tooltip" title="Eliminar" onclick="avisoBorrarCandidata('+result[i].cod_can+')"><i class="material-icons text-danger">delete_forever</i></a>';
            text += "</td>";
            text += "</tr>";
            document.getElementById("tcandidata").innerHTML = text;
        }
    });
}

//  Modal para confirmar Eliminación de la Candidata

function avisoBorrarCandidata(capb)
{
    $("#borradoCandidatas").modal("show")
    captionid = capb;
}

// Borrado Lógico

function borrarCandidata()
{
    sql = "SELECT * FROM candidata";
    con.query(sql, function (err, result) 
    {
        if (err) console.log(err);
    });

	sql = "UPDATE candidata SET est_can='I' WHERE cod_can = " + captionid;
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
	        swal("", "Candidata eliminada correctamente.", "success",
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