require('module-alias/register');
var con = require('@models/db');
var swal = require('sweetalert');
var os = require('os');

function cerrarSesionHome() {
    var ip = os.networkInterfaces()['Loopback Pseudo-Interface 1'][1].address;
    var mac = os.networkInterfaces()['Loopback Pseudo-Interface 1'][1].mac;
    var name = localStorage.getItem('name');
    var rol = localStorage.getItem('rol');
    var fecha = new Date();

    var sql = "INSERT INTO sesion (usu_ses, niv_ses, ip_ses, mac_ses, date_ses, est_ses) VALUES ?";
    var values = [
        [name, rol, ip, mac, fecha, 'I']
    ];

    con.query(sql, [values], function (err, result) {
        if (err) {} else {
            localStorage.clear();
            swal("", "Sesión finalizada.", "info", {
                button: false,
                timer: 3000
            }).then(function () {
                window.location.assign("index.html")
            });
        }
    });
}

function cerrarSesionPaginas() {
    var ip = os.networkInterfaces()['Loopback Pseudo-Interface 1'][1].address;
    var mac = os.networkInterfaces()['Loopback Pseudo-Interface 1'][1].mac;
    var name = localStorage.getItem('name');
    var rol = localStorage.getItem('rol');
    var fecha = new Date();

    var sql = "INSERT INTO sesion (usu_ses, niv_ses, ip_ses, mac_ses, date_ses, est_ses) VALUES ?";
    var values = [
        [name, rol, ip, mac, fecha, 'I']
    ];

    con.query(sql, [values], function (err, result) {
        if (err) {} else {
            localStorage.clear();
            swal("", "Sesión finalizada.", "info", {
                button: false,
                timer: 3000
            }).then(function () {
                window.location.assign("../index.html")
            });
        }
    });
}

function cerrarSesionFormularios() {
    var ip = os.networkInterfaces()['Loopback Pseudo-Interface 1'][1].address;
    var mac = os.networkInterfaces()['Loopback Pseudo-Interface 1'][1].mac;
    var name = localStorage.getItem('name');
    var rol = localStorage.getItem('rol');
    var fecha = new Date();

    var sql = "INSERT INTO sesion (usu_ses, niv_ses, ip_ses, mac_ses, date_ses, est_ses) VALUES ?";
    var values = [
        [name, rol, ip, mac, fecha, 'I']
    ];

    con.query(sql, [values], function (err, result) {
        if (err) {} else {
            localStorage.clear();
            swal("", "Sesión finalizada.", "info", {
                button: false,
                timer: 3000
            }).then(function () {
                window.location.assign("../../index.html")
            });
        }
    });

}