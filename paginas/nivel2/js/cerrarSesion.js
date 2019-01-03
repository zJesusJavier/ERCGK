var swal = require('sweetalert');

function cerrarSesionNivel2()
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

