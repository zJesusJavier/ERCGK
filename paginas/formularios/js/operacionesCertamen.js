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

function guardarCertamen()
{
    var estado = document.getElementById("est_cer").value;
    var descri = document.getElementById("des_cer").value;
    var fechai = document.getElementById("feci_cer").value;
    var fechaf = document.getElementById("fecf_cer").value;

    var inputDescripcion = document.getElementById("inputDescripcion");
    var inputFechaInicio = document.getElementById("inputFechaInicio");
    var inputFechaFinal = document.getElementById("inputFechaFinal");

    if(!descri)
    {
        swal("", "Debe llenar el campo de Descripción.", "error", 
        {
            button:false,
            timer: 1500
        });
        document.getElementById("des_cer").focus();
        inputDescripcion.className="form-group label-floating has-error";
        return
    }
    else
    {
        inputDescripcion.className="form-group label-floating";
    }

    if(!fechai)
    {
        swal("", "Debe llenar el campo de Fecha de Inicio.", "error", 
        {
            button:false,
            timer: 1500
        });
        document.getElementById("feci_cer").focus();
        inputFechaInicio.className="form-group label-floating has-error";
        return
    }
    else
    {
        inputFechaInicio.className="form-group label-floating";
    }

    if(!fechaf)
    {
        swal("", "Debe llenar el campo de Fecha de Finalización.", "error", 
        {
            button:false,
            timer: 1500
        });
        document.getElementById("fecf_cer").focus();
        inputFechaFinal.className="form-group label-floating has-error";
        return
    }
    else
    {
        inputFechaFinal.className="form-group label-floating";
    }

	sql = "SELECT * FROM certamen";
    con.query(sql, function (err, result) 
        {
            if (err) console.log(err);
        });
                            
    sql = "INSERT INTO certamen (des_cer, feci_cer, fecf_cer, est_cer) VALUES ?";
            var values = [
                [descri, fechai, fechaf, estado]];
                          
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
            swal("", "Certamen registrado correctamente.", "success",
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
                var tab_reg = 'certamen';
                var est_reg = 'A';
                var new_reg = descri;
                                    
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


function consultarCertamen()
{
    con.query("SELECT * FROM certamen WHERE est_cer='A'", function (err, result, fields) 
    {
        if (err) console.log(err);

        var tam = result.length;
        var text;
        text = "<tr>";

        for (i = 0; i < tam; i++) 
        {
            text += "<td>";
            text += result[i].cod_cer;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].des_cer;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].feci_cer.toLocaleDateString('en-GB');
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].fecf_cer.toLocaleDateString('en-GB');
            text += "</td>";
            text += "\t\t";
            text += "</tr>";
            document.getElementById("tcertamen").innerHTML= text;
        }       
    });
}

function consultarCertamenPanel()
{
    con.query("SELECT * FROM certamen", function (err, result, fields) 
    {
        if (err) console.log(err);

        var tam = result.length;
        var text;
        text = "<tr>";

        for (i = 0; i < tam; i++) 
        {
            text += "<td>";
            text += result[i].cod_cer;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].des_cer;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].feci_cer.toLocaleDateString('en-GB');
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].fecf_cer.toLocaleDateString('en-GB');
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += '<a type="button" rel="tooltip" title="Eliminar" onclick="avisoBorrarCertamen('+result[i].cod_cer+')"><i class="material-icons text-danger">delete_forever</i></a>';
            text += "</td>";
            text += "</tr>";
            document.getElementById("tcertamen").innerHTML = text;
        }
    });
}

function avisoBorrarCertamen(capb)
{
    $("#borradoCertamen").modal("show")
    captionid = capb;
}

// Borrado Lógico

function borrarCertamen()
{
    sql = "SELECT * FROM certamen";
    con.query(sql, function (err, result) 
    {
        if (err) console.log(err);
    });

	sql = "UPDATE certamen SET est_cer='I' WHERE cod_cer = " + captionid;
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
	        swal("", "Certamen eliminado correctamente.", "success",
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
                var tab_eli = 'certamen';
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