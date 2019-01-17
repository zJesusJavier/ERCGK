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
var user;
var fecha = new Date();
var est_ses = 'A';

function verificar()
{
    var nombre = document.getElementById("nom_usu").value;
    var clave = document.getElementById("cla_usu").value;

    con.query("SELECT * FROM usuario", function (err, result, fields)
    {
        if (err) console.log(err);
            
        var tam = result.length;
        var i, t=0;
       
        for (i = 0; i < tam; i++) 
        {   
            if((nombre == result[i].nom_usu) && (clave == result[i].cla_usu))
            {
                if(result[i].niv_usu == 1)
                {
                	nivel1=1
                    t=1;
                }
                else 
                {
                	nivel2=2
                    t=2;
                }
            }
        }

        if (t==1) 
        {
        	sql = "SELECT * FROM sesion";
		   	con.query(sql, function (err, result) 
		    {
		        if (err) console.log(err);
		    });
		                        
		    sql = "INSERT INTO sesion (usu_ses, niv_ses, date_ses, est_ses) VALUES ?";
		    var values = [[nombre, nivel1, fecha, est_ses]];
		                      
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
            		window.location.href= "home.html";
		        };
		    });
        }
        else
        {
            if (t==2)
            {
	            sql = "SELECT * FROM sesion";
			   	con.query(sql, function (err, result) 
			    {
			        if (err) console.log(err);
			    });
			                        
			    sql = "INSERT INTO sesion (usu_ses, niv_ses, date_ses, est_ses) VALUES ?";
			    var values = [[nombre, nivel2, fecha, est_ses]];
			                      
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
	            		window.location.href= "paginas/nivel2/home.html";
			        };
			    });
            }
            else
            {
                swal("", "El Usuario o la Contraseña son incorrectos.", "warning",
                {
                    button: false,
                    timer: 3000
                });
            }
        }
    });
}

function olvidoContraseña()
{
    var usuario = document.getElementById("usuario").value;
    var presec1 = document.getElementById("fky_pre_1").value;
    var ressec1 = document.getElementById("res_pre_1").value;
    var presec2 = document.getElementById("fky_pre_2").value;
    var ressec2 = document.getElementById("res_pre_2").value;

    con.query("SELECT * FROM usuario", function (err, result, fields) 
    {
        if (err) console.log(err);
               
        var tam = result.length;
        var i;
                
        for(i=0; i<tam; i++)
        {
            if(usuario == result[i].nom_usu)
            {
                user = result[i].id_usu;
            }
        }

        con.query("SELECT * FROM usuario WHERE id_usu = '" + user + "'", function (err, result1, fields1) 
        {
            for(i=0; i<result1.length; i++)
            {
                if((presec1 == result1[i].fky_pre_1)&&(ressec1 == result1[i].res_pre_1))
                {
                    if((presec2 == result1[i].fky_pre_2)&&(ressec2 == result1[i].res_pre_2))
                    {
                        $("#modifkey").modal("show")
                    }
                    else
                    {
                        swal("", "El Usuario o los Datos son incorrectos.", "warning",
                        {
                            button: false,
                            timer: 3000
                        });
                    }
                }
                else
                {
                    swal("", "El Usuario o los Datos son incorrectos.", "warning",
                    {
                        button: false,
                        timer: 3000
                    });
                }
            }
        });
    });
}

function cambioClave()
{
    var clave = document.getElementById("clave_new").value;
    
    con.query("SELECT * FROM usuario WHERE id_usu = '" + user + "'", function (err, result, fields)
    {
        for(var i=0; i< result.length; i++)
        {
            sql = "UPDATE usuario SET nom_usu='"+ result[i].nom_usu +"',"+"cla_usu='"+clave+"',"+"email_usu='"+result[i].email_usu+
            "',"+"fky_pre_1='"+ result[i].fky_pre_1 +"',"+" res_pre_1 ='"+ result[i].res_pre_1 +"',"+"fky_pre_2 ='"+ result[i].fky_pre_2 +"',"+" res_pre_2 ='"+ result[i].res_pre_2 +"',"+
            " niv_usu= '"+ result[i].niv_usu +"',"+" est_usu='"+ result[i].est_usu +"' WHERE id_usu = "+ user;
        }
    
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
                swal("", "La clave fue cambiada correctamente.", "success",
                {
                    button: false,
                    timer: 3000
                }).then(function() 
                {
                    window.location.reload();
                });
            };
        });
    });
}