require('module-alias/register');
var con = require('@models/db');
var swal = require('sweetalert');
var sql;
var consulta;
var captionid;


function guardarUsuario()
{
    // Aqui se cargan las variables con los datos del Formulario

    var estado = document.getElementById("est_usu").value;
    var nombre = document.getElementById("nom_usu").value;
    var clave = document.getElementById("cla_usu").value;
    var email = document.getElementById("email_usu").value;
    var pregunta1 = document.getElementById("fky_pre_1").value;
    var respuesta1 = document.getElementById("res_pre_1").value;
    var pregunta2 = document.getElementById("fky_pre_2").value;
    var respuesta2 = document.getElementById("res_pre_2").value;
    var rol = document.getElementById("niv_usu").value;

    // Aqui se cargan los IDs de los DIVs que contienen los Inputs del Formulario

    var inputNombre = document.getElementById("inputNombre");
    var inputClave = document.getElementById("inputClave");
    var inputRol = document.getElementById("inputRol");
    var inputEmail = document.getElementById("inputEmail");
    var inputFkyPre1 = document.getElementById("inputFkyPre1");
    var inputResPre1 = document.getElementById("inputResPre1");
    var inputFkyPre2 = document.getElementById("inputFkyPre2");
    var inputResPre2 = document.getElementById("inputResPre2");

    // Validación de que los Inputs no estan vacios

    if(!nombre)
    {
        swal("", "Debe llenar el campo de Nombre.", "error", 
        {
            button:false,
            timer: 1500
        });
        document.getElementById("nom_usu").focus();
        inputNombre.className="form-group label-floating has-error";
        return
    }
    else
    {
        inputNombre.className="form-group label-floating";
    }

    if(!clave)
    {
        swal("", "Debe llenar el campo de Contraseña.", "error", 
        {
            button:false,
            timer: 1500
        });
        document.getElementById("cla_usu").focus();
        inputClave.className="form-group label-floating has-error";
        return
    }
    else
    {
        inputClave.className="form-group label-floating";
    }

    if(!rol)
    {
        swal("", "Debe seleccionar un Rol.", "error", 
        {
            button:false,
            timer: 1500
        });
        document.getElementById("niv_usu").focus();
        inputRol.className="form-group label-floating has-error";
        return
    }
    else
    {
        inputRol.className="form-group label-floating";
    }

    if(!email)
    {
        swal("", "Debe llenar el campo de Email.", "error", 
        {
            button:false,
            timer: 1500
        });
        document.getElementById("email_usu").focus();
        inputEmail.className="form-group label-floating has-error";
        return
    }
    else
    {
        inputEmail.className="form-group label-floating";
    }

    if(!pregunta1)
    {
        swal("", "Debe selecionar una Pregunta de Seguridad 1.", "error", 
        {
            button:false,
            timer: 1500
        });
        document.getElementById("fky_pre_1").focus();
        inputFkyPre1.className="form-group label-floating has-error";
        return
    }
    else
    {
        inputFkyPre1.className="form-group label-floating";
    }

    if(!respuesta1)
    {
        swal("", "Debe responder la Pregunta de Seguridad 1.", "error", 
        {
            button:false,
            timer: 1500
        });
        document.getElementById("res_pre_1").focus();
        inputResPre1.className="form-group label-floating has-error";
        return
    }
    else
    {
        inputResPre1.className="form-group label-floating";
    }

    if(!pregunta2)
    {
        swal("", "Debe selecionar una Pregunta de Seguridad 2.", "error", 
        {
            button:false,
            timer: 1500
        });
        document.getElementById("fky_pre_2").focus();
        inputFkyPre2.className="form-group label-floating has-error";
        return
    }
    else
    {
        inputFkyPre2.className="form-group label-floating";
    }

    if(!respuesta2)
    {
        swal("", "Debe responder la Pregunta de Seguridad 1.", "error", 
        {
            button:false,
            timer: 1500
        });
        document.getElementById("res_pre_2").focus();
        inputResPre2.className="form-group label-floating has-error";
        return
    }
    else
    {
        inputResPre2.className="form-group label-floating";
    }

    // Guardado en la Base de Datos

    sql = "SELECT * FROM usuario";
    con.query(sql, function (err, result) 
        {
            if (err) console.log(err);
        });
                        
    sql = "INSERT INTO usuario (nom_usu, cla_usu, email_usu, fky_pre_1, res_pre_1, fky_pre_2, res_pre_2, niv_usu, est_usu) VALUES ?";
            var values = [[nombre, clave, email, pregunta1, respuesta1, pregunta2, respuesta2, rol, estado]];
                      
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
            swal("", "Categoria registrada correctamente.", "success",
            {
                button:false,
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
                var tab_log = 'Usuario';
                var est_log = 'A';
                var reg_log = nombre;
                var acc_log = 'Registro';
                                    
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
                        sql = "USE academia";
                        con.query(sql, function (err, result) 
                        {
                            if (err) console.log(err);
                        });
                                            
                        sql = "CREATE USER '"+nombre+"'@localhost IDENTIFIED BY '"+clave+"';"
                                          
                        con.query(sql, function (err, result) 
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
                                if (rol=='Administrador')
                                {
                                    sql = "USE academia";
                                    con.query(sql, function (err, result) 
                                    {
                                        if (err) console.log(err);
                                    });
                                    
                                    sql = "GRANT SELECT, INSERT, UPDATE, SHOW DATABASES ON *.* TO '"+nombre+"'@'localhost';"
                                                      
                                    con.query(sql, function (err, result) 
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
                                }
                                else
                                {
                                    sql = "USE academia";
                                    con.query(sql, function (err, result) 
                                    {
                                        if (err) console.log(err);
                                    });
                                    
                                    sql = "GRANT INSERT, SELECT, SHOW DATABASES ON *.* TO '"+nombre+"'@localhost;"
                                                      
                                    con.query(sql, function (err, result) 
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
                                }
                            };
                        });
                    };
                });
            });
        };
    });
}


function consultarUsuarioPanel()
{
    con.query("SELECT * FROM usuario", function (err, result, fields) 
    {
        if (err) console.log(err);

        var tam = result.length;
        var text;
        text = "<tr>";

        for (i = 0; i < tam; i++) 
        {
            text += "<td>";
            text += result[i].id_usu;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].nom_usu;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].niv_usu;
            text += "</td>";
            text += "\t\t";
            text += "<td>";
            text += result[i].est_usu;
            text += "</td>";
            text += "\t\t";
            text += "</tr>";
            document.getElementById("tusuario").innerHTML= text;
        }
    });
}