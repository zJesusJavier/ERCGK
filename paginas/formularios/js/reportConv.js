require('module-alias/register');
var con = require('@models/db');
var swal = require('sweetalert');
var pdfkit = require('pdfkit');
var PdfTable = require('voilab-pdf-table'),
    PdfDocument = require('pdfkit');

var text, i;
var fechai, fechaf;

function SelectReportC() {
    text = '<a type="button" class="btn btn-primary btn-sm" onclick="AdicReportC();">Reporte de Registro</a>'
    text += '<a type="button" class="btn btn-primary btn-sm" onclick="selectCat();">Reporte del Desempeño Conductual</a>'
    document.getElementById("SelectC").innerHTML = text;
}

function SelectReportAudit() {
    text = '<a type="button" class="btn btn-primary btn-sm" onclick="reporteRegistro();">Registros</a>'
    text += '<a type="button" class="btn btn-primary btn-sm" onclick="reporteModificar();">Ediciones</a>'
    text += '<a type="button" class="btn btn-primary btn-sm" onclick="reporteEliminar();">Borrados</a>'
    document.getElementById("SelectC").innerHTML = text;
}

function selectCat() {
    var text;
    text = '<div class="col-md-12" align="center">'
    text += '<h5>Seleccione la categoria:</h5>'
    text += '</div>'

    con.query("SELECT * FROM categoria WHERE est_cat='A'", function (err, result, fields) {
        if (err) console.log(err);
        text += '<form autocomplete="off" >'
        var tam = result.length;

        text += '<select id="categoria">';

        text += "<option value='' selected disabled></option>";

        for (i = 0; i < tam; i++) {
            text += '<option value="' + result[i].cod_cat + '">' + result[i].nom_cat + '</option>';
        }
        text += '<div class="col-md-12" align="center">'
        text += '<input type="button" class="btn btn-success btn-sm" value="SIGUIENTE" onclick="selectCand();">'
        text += '</div>'
        text += '</select>';
        text += '</form>'
        document.getElementById("filtroD").innerHTML = text;
    });
}

function selectCand() {
    var text;
    var cat = document.getElementById("categoria").value;

    text = '<div class="col-md-12" align="center">'
    text += '<h5>Seleccione la candidata:</h5>'
    text += '</div>'

    con.query("SELECT * FROM candidata WHERE fky_cat='" + cat + "'", function (err, result, fields) {
        if (err) console.log(err);

        text += '<form autocomplete="off" >'

        var tam = result.length;
        text += '<select id="candidata">';

        text += "<option value='' selected disabled></option>";

        for (i = 0; i < tam; i++) {
            ano = result[i].fec_can.getFullYear();
            text += '<option value="' + result[i].cod_can + '">' + result[i].ci_can + ' - ' + result[i].nom_can + ' ' + result[i].ape_can + '(' + ano + ')' + '</option>';
        }
        text += '</select>';

        text += '<div class="col-md-12" align="center">'
        text += '<input type="button" class="btn btn-success" value="GENERAR" onclick="reportE();">'
        text += '</div>'
        text += '</form>';
        document.getElementById("filtroD").innerHTML = text;
    });
}

function AdicReportC() {
    con.query("SELECT * FROM candidata WHERE est_can='A' ORDER BY fec_can DESC", function (err, result, fields) {
        var aux = [],
            aux1 = [];
        var fin = [],
            fin1 = [];
        var text, i, j = 0,
            k, z = 0,
            num, num1, ano, ano1, c = 0;

        text = '<form autocomplete="off" role="search" class="form-inline">'
        text += '<div class="col-md-6" align="right">'
        text += '<h5>Fecha Inicio:</h5>'
        text += '<select class="form-control" placeholder="Fecha" id="fechi">'

        for (i = 0; i < result.length; i++) {
            c = 0;
            num = result[i].fec_can.getFullYear();
            aux[j] = num;
            j++;
            for (k = 0; k < result.length; k++) {
                if (aux[k] == num) {
                    c = c + 1;
                }
            }
            if (c == 1) {
                fin[z] = num;
                z = z + 1;
            }
        }

        for (j = 0; j < z; j++) {
            ano = fin[j];
            text += '<option value="' + ano + '" selected>‌' + ano + '</option>'
        }

        text += '</select>'
        text += '</div>'
        text += '<div class="col-md-6" align="left">'
        text += '<h5>Fecha Final:</h5>'
        text += '<select class="form-control" placeholder="Fecha" id="fechf">'

        j = 0, z = 0;

        for (i = 0; i < result.length; i++) {
            c = 0;
            num1 = result[i].fec_can.getFullYear();
            aux1[j] = num1;
            j++;
            for (k = 0; k < result.length; k++) {
                if (aux1[k] == num1) {
                    c = c + 1;
                }
            }

            if (c == 1) {
                fin1[z] = num1;
                z = z + 1;
            }
        }

        for (j = 0; j < z; j++) {
            ano1 = fin1[j];
            text += '<option value="' + ano1 + '" selected>‌' + ano1 + '</option>'
        }

        text += '</select>'
        text += '</div>'
        text += '<div class="col-md-12" align="center">'
        text += '<input type="button" class="btn btn-success" value="GENERAR" onclick="reportC();">'
        text += '</div>'
        text += '</form>'
        document.getElementById("filtroC").innerHTML = text;
    });
}

function reportC() {
    fechai = document.getElementById("fechi").value;
    fechaf = document.getElementById("fechf").value;

    con.query("SELECT * FROM candidata WHERE est_can='A' ORDER BY fec_can DESC", function (err, result, fields) {
        var pdf = require('pdfkit');
        var fs = require('fs');
        var myDoc = new pdf();

        myDoc.image('./img/head.png');

        myDoc.fontSize(18)
            .text('Reporte de Candidatas Activas', 100, 230)

        myDoc.fontSize(20)
            .text(' ')

        myDoc.fontSize(20)
            .text(' ')

        myDoc.fontSize(12)
            .text('         Cedula       |     Nombre     |       Apellido        |       Peso        |       Estatura')

        myDoc.fontSize(20)
            .text(' ')

        var blanco = '               ';
        var blanco2 = '         ';
        var blanco3 = '             ';
        var blanco4 = '                       ';
        var blanco5 = '                   ';
        var blanco6 = '                       ';

        for (i = 0; i < result.length; i++) {
            if (fechai > fechaf) {
                swal("", "Seleccione una fecha inicial correcta", "error", {
                    button: false,
                    timer: 3000
                })
            } else {
                if (result[i].fec_can.getFullYear() >= fechai && result[i].fec_can.getFullYear() <= fechaf) {
                    text = blanco2;
                    text += result[i].ci_can;
                    text += blanco3;
                    text += result[i].nom_can;
                    text += blanco5;
                    text += result[i].ape_can;
                    text += blanco6;
                    text += result[i].peso_can;
                    text += blanco4;
                    text += result[i].esta_can;

                    myDoc.pipe(fs.createWriteStream('reportes/ReporteCandidatas.pdf'));
                    myDoc.moveDown()
                    myDoc.font('Times-Roman').fontSize(12).text('' + text);
                    var band = 1;
                }
            }
        }
        if (band == 1) {
            myDoc.end();
            swal("", "Reporte Generado", "success", {
                button: false,
                timer: 3000
            })
        }
    });
}

function reportJ() {
    con.query("SELECT * FROM jurado WHERE est_jur='A' ORDER BY ci_jur DESC", function (err, result, fields) {
        var pdf = require('pdfkit');
        var fs = require('fs');
        var myDoc = new pdf();

        myDoc.image('./img/head.png');

        myDoc.fontSize(18)
            .text('Reporte de Jurados Activos', 100, 230)

        myDoc.fontSize(20)
            .text(' ')

        myDoc.fontSize(20)
            .text(' ')

        myDoc.fontSize(12)
            .text('           Cedula         |       Nombre       |        Apellido          |         Categoria          ')

        myDoc.fontSize(20)
            .text(' ')

        var blanco = '                 ';
        var blanco2 = '           ';
        var blanco3 = '                  ';
        var blanco4 = '                         ';
        var blanco5 = '                      ';
        var blanco6 = '                             ';

        for (i = 0; i < result.length; i++) {
            text = blanco2;
            text += result[i].ci_jur;
            text += blanco3;
            text += result[i].nom_jur;
            text += blanco5;
            text += result[i].ape_jur;
            text += blanco6;
            text += result[i].fky_cat;
            text += blanco4;

            myDoc.pipe(fs.createWriteStream('reportes/ReporteJurados.pdf'));
            myDoc.moveDown()
            myDoc.font('Times-Roman').fontSize(12).text('' + text);
        }

        myDoc.end();
        swal("", "Reporte Generado", "success", {
            button: false,
            timer: 3000
        })
    });
}

function reportSesiones() {
    con.query("SELECT * FROM sesion WHERE est_ses='A' ORDER BY cod_ses DESC", function (err, result, fields) {
        var pdf = require('pdfkit');
        var fs = require('fs');
        var myDoc = new pdf();

        myDoc.image('./img/head.png');

        myDoc.fontSize(18)
            .text('Reporte de Sesiones', 100, 230)

        myDoc.fontSize(20)
            .text(' ')

        myDoc.fontSize(20)
            .text(' ')

        myDoc.fontSize(12)
            .text('   Usuario        |      Nivel      |            IP            |           MAC            |      Fecha     ')

        myDoc.fontSize(20)
            .text(' ')

        var blanco = '                 ';
        var blanco2 = '      ';
        var blanco3 = '          ';
        var blanco4 = '      ';
        var blanco5 = '     ';
        var blanco6 = '       ';

        for (i = 0; i < result.length; i++) {
            text = blanco2;
            text += result[i].usu_ses;
            text += blanco3;
            text += result[i].niv_ses;
            text += blanco5;
            text += result[i].ip_ses;
            text += blanco6;
            text += result[i].mac_ses;
            text += blanco4;
            text += result[i].date_ses.toLocaleDateString("en-GB");
            text += blanco4;

            myDoc.pipe(fs.createWriteStream('reportes/ReporteSesiones.pdf'));
            myDoc.moveDown()
            myDoc.font('Times-Roman').fontSize(12).text('' + text);
        }

        myDoc.end();
        swal("", "Reporte Generado", "success", {
            button: false,
            timer: 3000
        })
    });
}

function reporteRegistro() {
    con.query("SELECT * FROM log WHERE acc_log LIKE '%Registro%'", function (err, result, fields) {
        var pdf = require('pdfkit');
        var fs = require('fs');
        var myDoc = new pdf();

        myDoc.image('./img/head.png');

        myDoc.fontSize(18)
            .text('Reporte de Registros', 100, 230)

        myDoc.fontSize(20)
            .text(' ')

        myDoc.fontSize(20)
            .text(' ')

        myDoc.fontSize(12)
            .text('   Codigo        |      Usuario      |          Tabla          |       Accion        |       Fecha     ')

        myDoc.fontSize(20)
            .text(' ')

        var blanco = '                 ';
        var blanco2 = '        ';
        var blanco3 = '                      ';
        var blanco4 = '              ';
        var blanco5 = '                    ';
        var blanco6 = '                ';

        for (i = 0; i < result.length; i++) {
            text = blanco2;
            text += result[i].cod_log;
            text += blanco3;
            text += result[i].usu_log;
            text += blanco5;
            text += result[i].tab_log;
            text += blanco6;
            text += result[i].acc_log;
            text += blanco4;
            text += result[i].date_log.toLocaleDateString("en-GB");

            myDoc.pipe(fs.createWriteStream('reportes/ReporteRegistros.pdf'));
            myDoc.moveDown()
            myDoc.font('Times-Roman').fontSize(12).text('' + text);
        }

        myDoc.end();
        swal("", "Reporte Generado", "success", {
            button: false,
            timer: 3000
        })
    });
}

function reporteModificar() {
    con.query("SELECT * FROM log WHERE acc_log LIKE '%Modificar%'", function (err, result, fields) {
        var pdf = require('pdfkit');
        var fs = require('fs');
        var myDoc = new pdf();

        myDoc.image('./img/head.png');

        myDoc.fontSize(18)
            .text('Reporte de Ediciones', 100, 230)

        myDoc.fontSize(20)
            .text(' ')

        myDoc.fontSize(20)
            .text(' ')

        myDoc.fontSize(12)
            .text('Codigo   |       Fecha        |     Usuario     |      Tabla      |            Accion')

        myDoc.fontSize(20)
            .text(' ')

        var blanco = '                 ';
        var blanco2 = '    ';
        var blanco3 = '              ';
        var blanco4 = '             ';
        var blanco5 = '             ';
        var blanco6 = '       ';

        for (i = 0; i < result.length; i++) {
            text = blanco2;
            text += result[i].cod_log;
            text += blanco4;
            text += result[i].date_log.toLocaleDateString("en-GB");
            text += blanco3;
            text += result[i].usu_log;
            text += blanco5;
            text += result[i].tab_log;
            text += blanco6;
            text += result[i].acc_log;


            myDoc.pipe(fs.createWriteStream('reportes/ReporteEdiciones.pdf'));
            myDoc.moveDown()
            myDoc.font('Times-Roman').fontSize(12).text('' + text);
        }

        myDoc.end();
        swal("", "Reporte Generado", "success", {
            button: false,
            timer: 3000
        })
    });
}

function reporteEliminar() {
    con.query("SELECT * FROM log WHERE acc_log LIKE '%Borrado%'", function (err, result, fields) {
        var pdf = require('pdfkit');
        var fs = require('fs');
        var myDoc = new pdf();

        myDoc.image('./img/head.png');

        myDoc.fontSize(18)
            .text('Reporte de Borrado', 100, 230)

        myDoc.fontSize(20)
            .text(' ')

        myDoc.fontSize(20)
            .text(' ')

        myDoc.fontSize(12)
            .text('Codigo   |       Fecha        |     Usuario     |      Tabla      |          Accion')

        myDoc.fontSize(20)
            .text(' ')

        var blanco = '                 ';
        var blanco2 = '    ';
        var blanco3 = '              ';
        var blanco4 = '             ';
        var blanco5 = '             ';
        var blanco6 = '           ';

        for (i = 0; i < result.length; i++) {
            text = blanco2;
            text += result[i].cod_log;
            text += blanco4;
            text += result[i].date_log.toLocaleDateString("en-GB");
            text += blanco3;
            text += result[i].usu_log;
            text += blanco5;
            text += result[i].tab_log;
            text += blanco6;
            text += result[i].acc_log;


            myDoc.pipe(fs.createWriteStream('reportes/ReporteBorrados.pdf'));
            myDoc.moveDown()
            myDoc.font('Times-Roman').fontSize(12).text('' + text);
        }

        myDoc.end();
        swal("", "Reporte Generado", "success", {
            button: false,
            timer: 3000
        })
    });
}

function reportD() {
    con.query("SELECT * FROM profesor WHERE est_pro='A' ORDER BY ci_pro DESC", function (err, result, fields) {
        var pdf = require('pdfkit');
        var fs = require('fs');
        var myDoc = new pdf();

        myDoc.image('./img/head.png');

        myDoc.fontSize(18)
            .text('Reporte de Docentes Activos', 100, 230)

        myDoc.fontSize(20)
            .text(' ')

        myDoc.fontSize(20)
            .text(' ')

        myDoc.fontSize(12)
            .text('           Cedula         |       Nombre       |        Apellido          |          Clase          ')

        myDoc.fontSize(20)
            .text(' ')

        var blanco = '                 ';
        var blanco2 = '           ';
        var blanco3 = '                  ';
        var blanco4 = '                         ';
        var blanco5 = '                      ';
        var blanco6 = '                             ';

        for (i = 0; i < result.length; i++) {
            text = blanco2;
            text += result[i].ci_pro;
            text += blanco3;
            text += result[i].nom_pro;
            text += blanco5;
            text += result[i].ape_pro;
            text += blanco6;
            text += result[i].fky_cla;
            text += blanco4;

            myDoc.pipe(fs.createWriteStream('reportes/ReporteDocentes.pdf'));
            myDoc.moveDown()
            myDoc.font('Times-Roman').fontSize(12).text('' + text);
        }

        myDoc.end();
        swal("", "Reporte Generado", "success", {
            button: false,
            timer: 3000
        })
    });
}

function reportJ() {
    con.query("SELECT * FROM jurado WHERE est_jur='A' ORDER BY ci_jur DESC", function (err, result, fields) {
        var pdf = require('pdfkit');
        var fs = require('fs');
        var myDoc = new pdf();

        myDoc.image('./img/head.png');

        myDoc.fontSize(18)
            .text('Reporte de Jurados Activos', 100, 230)

        myDoc.fontSize(20)
            .text(' ')

        myDoc.fontSize(20)
            .text(' ')

        myDoc.fontSize(12)
            .text('           Cedula         |       Nombre       |        Apellido          |         Categoria          ')

        myDoc.fontSize(20)
            .text(' ')

        var blanco = '                 ';
        var blanco2 = '           ';
        var blanco3 = '                  ';
        var blanco4 = '                         ';
        var blanco5 = '                      ';
        var blanco6 = '                             ';

        for (i = 0; i < result.length; i++) {
            text = blanco2;
            text += result[i].ci_jur;
            text += blanco3;
            text += result[i].nom_jur;
            text += blanco5;
            text += result[i].ape_jur;
            text += blanco6;
            text += result[i].fky_cat;
            text += blanco4;

            myDoc.pipe(fs.createWriteStream('reportes/ReporteJurados.pdf'));
            myDoc.moveDown()
            myDoc.font('Times-Roman').fontSize(12).text('' + text);
        }

        myDoc.end();
        swal("", "Reporte Generado", "success", {
            button: false,
            timer: 3000
        })
    });
}

function reportE() {

    var cand = document.getElementById("candidata").value;
    if (cand > 0) {
        con.query("SELECT calificacion.*, profesor.nom_pro, profesor.ape_pro, clase.nom_cla, candidata.nom_can, candidata.ape_can FROM calificacion INNER JOIN profesor ON calificacion.fky_pro=profesor.cod_pro INNER JOIN clase ON calificacion.fky_cla=clase.cod_cla INNER JOIN candidata ON calificacion.fky_can=candidata.cod_can WHERE fky_can='" + cand + "' ORDER BY sem_cal ASC", function (err, result, fields) {
            for (i = 0; i < result.length; i++) {
                var c = result[i].nom_can + " " + result[i].ape_can;
            }
            var pdf = require('pdfkit');
            var fs = require('fs');
            var myDoc = new pdf();

            myDoc.image('./img/head.png');

            myDoc.fontSize(15)
                .text('Reporte Detallado del Desempeño de ' + c, 100, 230)

            myDoc.fontSize(20)
                .text(' ')

            myDoc.fontSize(20)
                .text(' ')

            myDoc.fontSize(12)
                .text('   Docente   |    Clase    |   Semana Evaluada   |   Calificacion   |   Observacion   ')

            myDoc.fontSize(20)
                .text(' ')

            var blanco = '';
            var blanco2 = ' ';
            var blanco3 = '     ';
            var blanco4 = '                 ';
            var blanco5 = '                    ';
            var blanco6 = '                             ';

            for (i = 0; i < result.length; i++) {
                text = blanco2;
                text += result[i].nom_pro + " " + result[i].ape_pro;
                text += blanco3;
                text += result[i].nom_cla;
                text += blanco5;
                text += result[i].sem_cal;
                text += blanco6;
                text += result[i].cal_cal;
                text += blanco4;
                text += result[i].obs_cal;


                myDoc.pipe(fs.createWriteStream('reportes/ReporteDesempeño.pdf'));
                myDoc.moveDown()
                myDoc.font('Times-Roman').fontSize(12).text('' + text);
            }

            myDoc.end();
            swal("", "Reporte Generado", "success", {
                button: false,
                timer: 3000
            })
        });
    } else {
        swal("", "Problemas para generar el reporte", "error", {
            button: false,
            timer: 3000
        })

    }
}