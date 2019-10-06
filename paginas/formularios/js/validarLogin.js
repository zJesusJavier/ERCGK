require('module-alias/register');
var con = require('@models/db');
var swal = require('sweetalert');
var os = require('os');
var user;
var fecha = new Date();
var est_ses = 'A';

function verificar() {
    var nombre = document.getElementById("nom_usu").value;
    var clave = document.getElementById("cla_usu").value;

    con.query("SELECT * FROM usuario WHERE nom_usu = '" + nombre + "' AND cla_usu = '" + clave + "'", function (err, result, fields) {
        if (err) console.log(err);
        var i, t = 0;
        var ip = os.networkInterfaces()['Loopback Pseudo-Interface 1'][1].address;
        var mac = os.networkInterfaces()['Loopback Pseudo-Interface 1'][1].mac;

        if(result.length == 0){
            swal("Error", "Por favor, verifique los datos o contacte con el Administrador.", "error", {
                button: false,
                timer: 3000
            });
        }else{
            if (result[0].ip_usu != ip || result[0].mac_usu != mac) {
                sqIP = "UPDATE usuario SET ip_usu='" + ip + "'," + "mac_usu='" + mac + "' WHERE id_usu = " + result[0].id_usu;
                con.query(sqIP, function (err, result1) {
                    if (err) {
                        console.log(err);
                        swal("Error", "Por favor, verifique los datos o contacte con el Administrador.", "error", {
                            button: false,
                            timer: 3000
                        });
                    } else {
                        swal("", "Ha cambiado su IP, en su usuario", "info", {
                            button: false,
                            timer: 3000
                        }).then(function () {});
                    }
                });
            }
        sql = "SELECT * FROM sesion";
        con.query(sql, function (err, result) {
            if (err) console.log(err);
        });

        rol = result[0].niv_usu;
        if (rol == 'undefined') {
            swal("Error", "Por favor, verifique los datos o contacte con el Administrador.", "error", {
                button: false,
                timer: 3000
            });
        }
        sql = "INSERT INTO sesion (usu_ses, niv_ses, ip_ses, mac_ses, date_ses, est_ses) VALUES ?";
        var values = [
            [nombre, rol, ip, mac, fecha, est_ses]
        ];

        localStorage.setItem('name', nombre);
        localStorage.setItem('rol', rol);
        con.query(sql, [values], function (err, result) {
            if (err) {
                console.log(err);
                swal("Error", "Por favor, verifique los datos o contacte con el Administrador.", "error", {
                    button: false,
                    timer: 3000
                });
            } else {
                audit();
                window.location.href = "home.html";
            };
        });
        }
    });
}

function olvidoContraseña() {
    var usuario = document.getElementById("usuario").value;
    var presec1 = document.getElementById("fky_pre_1").value;
    var ressec1 = document.getElementById("res_pre_1").value;
    var presec2 = document.getElementById("fky_pre_2").value;
    var ressec2 = document.getElementById("res_pre_2").value;

    con.query("SELECT * FROM usuario WHERE nom_usu ='" + usuario + "'", function (err, result1, fields1) {
        user = result1[0].id_usu;
        for (i = 0; i < result1.length; i++) {
            if ((presec1 == result1[i].fky_pre_1) && (ressec1 == result1[i].res_pre_1)) {
                if ((presec2 == result1[i].fky_pre_2) && (ressec2 == result1[i].res_pre_2)) {
                    $("#modifkey").modal("show")
                } else {
                    swal("", "Sus datos son incorrectos.", "warning", {
                        button: false,
                        timer: 3000
                    });
                }
            } else {
                swal("", "Sus datos son incorrectos.", "warning", {
                    button: false,
                    timer: 3000
                });
            }
        }
    });

}

function cambioClave() {
    var clave = document.getElementById("clave_new").value;

    con.query("SELECT * FROM usuario WHERE id_usu = '" + user + "'", function (err, result, fields) {
        for (var i = 0; i < result.length; i++) {
            sql = "UPDATE usuario SET nom_usu='" + result[i].nom_usu + "'," + "cla_usu='" + clave + "'," + "email_usu='" + result[i].email_usu +
                "'," + "fky_pre_1='" + result[i].fky_pre_1 + "'," + " res_pre_1 ='" + result[i].res_pre_1 + "'," + "fky_pre_2 ='" + result[i].fky_pre_2 + "'," + " res_pre_2 ='" + result[i].res_pre_2 + "'," +
                " niv_usu= '" + result[i].niv_usu + "'," + " est_usu='" + result[i].est_usu + "' WHERE id_usu = " + user;
        }
        rol = result[0].niv_usu;
        name = result[0].nom_usu;
        con.query(sql, function (err, result) {
            if (err) {
                console.log(err);
                swal("Error", "Por favor, verifique los datos o contacte con el Administrador.", "error", {
                    button: false,
                    timer: 3000
                });
            } else {
                sql2 = "INSERT INTO log (usu_log,tab_log,acc_log,reg_log,date_log,est_log) VALUES ?";
                var values = [
                    [name, 'usuario', 'Cambio de Clave', sql, fecha, est_ses]
                ];
                con.query(sql2, [values], function (err, result) {
                    swal("", "La clave fue cambiada correctamente.", "success", {
                        button: false,
                        timer: 3000
                    }).then(function () {
                        window.location.reload();
                    });
                });
            };
        });
    });
}

function audit() {

    nameUser = localStorage.getItem('name');
    con.query("SELECT id_usu FROM usuario WHERE nom_usu ='" + nameUser + "'", function (err, result, fields) {
        con.query("SELECT elem_audit,elem_cons,elem_panelAd, elem_reg, elemento_rep FROM elementos WHERE fky_usuario ='" + result[0].id_usu + "'", function (err, result1, fields1) {
            let arrLocal = result1[0];
            for (let elem in arrLocal) {
                localStorage.setItem(elem, arrLocal[elem]);
            }
        });
    });

    if (localStorage.getItem('elem_cons') == '0') {
        $('#consultar').hide();
    }
    if (localStorage.getItem('elem_audit') == '0') {
        $('#panelAudit').hide();
    }
    if (localStorage.getItem('elem_panelAd') == '0') {
        $('#panelAdmin').hide();
    }
    if (localStorage.getItem('elem_reg') == '0') {
        $('#registrar').hide();
    }
    if (localStorage.getItem('elemento_rep') == '0') {
        $('#reportes').hide();
    }
}