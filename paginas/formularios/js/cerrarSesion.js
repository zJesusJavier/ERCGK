var swal = require('sweetalert');

function cerrarSesionHome()
{
    swal("", "Sesión finalizada.", "info",
    {
        button:false,
        timer: 3000
    }).then(function() 
    {
        window.location.assign("index.html")
    });
}

function cerrarSesionPaginas()
{
    swal("", "Sesión finalizada.", "info",
    {
        button:false,
        timer: 3000
    }).then(function() 
    {
        window.location.assign("../index.html")
    });
}

function cerrarSesionFormularios()
{
    swal("", "Sesión finalizada.", "info",
    {
        button:false,
        timer: 3000
    }).then(function() 
    {
        window.location.assign("../../index.html")
    });
}

