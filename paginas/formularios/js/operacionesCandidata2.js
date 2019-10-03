// Conexion con la Base de Datos y declaracion de variables Globales
require('module-alias/register');
var con = require('@models/db');
var swal = require('sweetalert');
var sql;

// Modal con el Formulario para editar datos de la Candidata

function formularioEditarCandidata(capb) {
	var captionid = capb;

	con.query("SELECT candidata.*, civil.nom_civ, categoria.nom_cat, municipio.nom_mun, certamen.des_cer FROM candidata INNER JOIN civil ON candidata.fky_civ=civil.cod_civ INNER JOIN categoria ON candidata.fky_cat=categoria.cod_cat INNER JOIN municipio ON candidata.fky_mun=municipio.cod_mun INNER JOIN certamen ON candidata.fky_cer=certamen.cod_cer WHERE cod_can='" + captionid + "'", function (err, result, fields) {
		con.query("SELECT * FROM categoria WHERE est_cat='A'", function (err, result1, fields) {
			con.query("SELECT * FROM municipio WHERE est_mun='A'", function (err, result2, fields) {
				con.query("SELECT * FROM civil WHERE est_civ='A'", function (err, result3, fields) {
					con.query("SELECT * FROM certamen WHERE est_cer='A'", function (err, result4, fields) {
						if (err) console.log(err);

						var tam = result.length;
						var text;

						for (i = 0; i < tam; i++) {
							text = '<form autocomplete="off">'
							text += '<div class="row">'
							text += '<div class="col-md-1">'
							text += '<div class="form-group label-floating">'
							text += '<label class="control-label">ID</label>'
							text += '<input type="text" class="form-control" id="cod_can" value="' + result[i].cod_can + '" readonly>'
							text += '</div>'
							text += '</div>'

							text += '<div class="col-md-2">'
							text += '<div class="form-group label-floating" id="inputCedula">'
							text += '<label class="control-label">Cédula</label>'
							text += '<input type="text" class="form-control" id="ci_can" maxlength="8" onkeypress="return validarNumero(event)" value="' + result[i].ci_can + '">'
							text += '</div>'
							text += '</div>'

							text += '<div class="col-md-3">'
							text += '<div class="form-group label-floating" id="inputNombre">'
							text += '<label class="control-label">Nombres</label>'
							text += '<input type="text" class="form-control" id="nom_can" maxlength="30" value="' + result[i].nom_can + '">'
							text += '</div>'
							text += '</div>'

							text += '<div class="col-md-3">'
							text += '<div class="form-group label-floating" id="inputApellido">'
							text += '<label class="control-label">Apellidos</label>'
							text += '<input type="text" class="form-control" id="ape_can" maxlength="30" value="' + result[i].ape_can + '">'
							text += '</div>'
							text += '</div>'

							text += '<div class="col-md-1">'
							text += '<div class="form-group label-floating" id="inputEdad">'
							text += '<label class="control-label">Edad</label>'
							text += '<input type="text" class="form-control" id="edad_can" maxlength="2" onkeypress="return validarNumero(event)" value="' + result[i].edad_can + '">'
							text += '</div>'
							text += '</div>'

							text += '<div class="col-md-2">'
							text += '<div class="form-group label-floating" id="inputEstado">'
							text += '<label class="control-label">Estado</label>'
							text += '<select class="form-control" id="est_can">'
							text += '<optgroup label="Seleccionado">'
							if (result[i].est_can == "A") {
								text += '<option value="' + result[i].est_can + '" selected>‌Activa</option>'
							} else {
								text += '<option value="' + result[i].est_can + '" selected>‌Inactiva</option>'
							}
							text += '<optgroup label="">'
							text += '<optgroup label="Cambiar a">'
							text += '<option value="A">Activa</option>'
							text += '<option value="I">Inactiva</option>'
							text += '</select>'
							text += '</div>'
							text += '</div>'
							text += '</div>'

							text += '<div class="row">'
							text += '<div class="col-md-2">'
							text += '<div class="form-group label-floating" id="inputPeso">'
							text += '<label class="control-label">Peso (kg)</label>'
							text += '<input type="text" class="form-control" id="peso_can" maxlength="3" onkeypress="return validarNumero(event)" value="' + result[i].peso_can + '">'
							text += '</div>'
							text += '</div>'

							text += '<div class="col-md-2">'
							text += '<div class="form-group label-floating" id="inputEstatura">'
							text += '<label class="control-label">Estatura (cm)</label>'
							text += '<input type="text" class="form-control" id="esta_can" maxlength="3" onkeypress="return validarNumero(event)" value="' + result[i].esta_can + '">'
							text += '</div>'
							text += '</div>'

							text += '<div class="col-md-3">'
							text += '<div class="form-group label-floating" id="inputOcupacion">'
							text += '<label class="control-label">Ocupación</label>'
							text += '<input type="text" class="form-control" id="ocu_can" maxlength="30" value="' + result[i].ocu_can + '">'
							text += '</div>'
							text += '</div>'

							text += '<div class="col-md-3">'
							text += '<div class="form-group label-floating" id="inputEstadoCivil">'
							text += '<label class="control-label">Estado Civil</label>'
							text += '<select class="form-control" id="fky_civ">'
							text += '<optgroup label="Seleccionado">'
							text += '<option value="' + result[i].fky_civ + '" selected readonly>‌' + result[i].nom_civ + '</option>'
							text += '<optgroup label="">'
							text += '<optgroup label="Cambiar a">'
							for (var c = 0; c < result3.length; c++) {
								text += '<option value="' + result3[c].nom_civ + '">‌' + result3[c].nom_civ + '</option>'
							}
							text += '</select>'
							text += '</div>'
							text += '</div>'

							text += '<div class="col-md-2">'
							text += '<div class="form-group label-floating" id="inputCategoria">'
							text += '<label class="control-label">Categoria</label>'
							text += '<select class="form-control" id="fky_cat">'
							text += '<optgroup label="Seleccionado">'
							text += '<option value="' + result[i].fky_cat + '" selected>‌' + result[i].nom_cat + '</option>'
							text += '<optgroup label="">'
							text += '<optgroup label="Cambiar a">'
							for (var j = 0; j < result1.length; j++) {
								text += '<option value="' + result1[j].cod_cat + '">‌' + result1[j].nom_cat + '</option>'
							}
							text += '</select>'
							text += '</div>'
							text += '</div>'
							text += '</div>'

							text += '<div class="row">'
							text += '<div class="col-md-4">'
							text += '<div class="form-group label-floating" id="inputDireccion">'
							text += '<label class="control-label">Dirección</label>'
							text += '<input type="text" class="form-control" id="dir_can" maxlength="50" value="' + result[i].dir_can + '">'
							text += '</div>'
							text += '</div>'

							text += '<div class="col-md-4">'
							text += '<div class="form-group label-floating" id="inputCertamen">'
							text += '<label class="control-label">Certamen</label>'
							text += '<select class="form-control" id="fky_cer">'
							text += '<optgroup label="Seleccionado">'
							text += '<option value="' + result[i].fky_cer + '" selected>‌' + result[i].des_cer + '</option>'
							text += '<optgroup label="">'
							text += '<optgroup label="Cambiar a">'
							for (var m = 0; m < result4.length; m++) {
								text += '<option value="' + result4[m].cod_cer + '">‌' + result4[m].des_cer + '</option>'
							}
							text += '</select>'
							text += '</div>'
							text += '</div>'

							text += '<div class="col-md-4">'
							text += '<div class="form-group label-floating" id="inputMunicipio">'
							text += '<label class="control-label">Municipio</label>'
							text += '<select class="form-control" id="fky_mun">'
							text += '<optgroup label="Seleccionado">'
							text += '<option value="' + result[i].fky_mun + '" selected>‌' + result[i].nom_mun + '</option>'
							text += '<optgroup label="">'
							text += '<optgroup label="Cambiar a">'
							for (var m = 0; m < result2.length; m++) {
								text += '<option value="' + result2[m].cod_mun + '">‌' + result2[m].nom_mun + '</option>'
							}
							text += '</select>'
							text += '</div>'
							text += '</div>'
							text += '</div>'

							text += '<div class="row">'
							text += '<div class="col-md-3">'
							text += '<div class="form-group label-floating" id="inputTelefono">'
							text += '<label class="control-label">Teléfono</label>'
							text += '<input type="text" class="form-control input-masked" id="tel_can" name="tel_can" maxlength="12" onkeypress="return validarTelefono(event)" value="' + result[i].tel_can + '">'
							text += '</div>'
							text += '</div>'

							text += '<div class="col-md-5">'
							text += '<div class="form-group label-floating" id="inputEmail">'
							text += '<label class="control-label">Correo Electrónico</label>'
							text += '<input type="text" class="form-control" id="email_can" maxlength="50" value="' + result[i].email_can + '">'
							text += '</div>'
							text += '</div>'

							text += '<div class="col-md-3">'
							text += '<div class="form-group label-floating">'
							text += '<label class="control-label">Fecha de Inscripción</label>'
							text += '<input type="text" class="form-control" id="fec_can" value="' + result[i].fec_can.toLocaleDateString("en-GB") + '" readonly>'
							text += '</div>'
							text += '</div>'
							text += '</div>'

							text += '<input type="button" class="btn btn-success pull-right" value="Actualizar registro" onclick="editarCandidata();">'
							text += '<button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>'
							text += '</form>'
						}
						document.getElementById("editCandidata").innerHTML = text;
						$("#editarCandidata").modal("show")
					});
				});
			});
		});
	});
}

// Función Editar Candidata

function editarCandidata() {
	var id = document.getElementById("cod_can").value;
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

	var certamenfk = document.getElementById("fky_cer").value;
	var email = document.getElementById("email_can").value;

	sql = "SELECT * FROM candidata";
	con.query(sql, function (err, result) {
		if (err) console.log(err);
	});

	sql = "UPDATE candidata SET ci_can='" + cedula + "'," + "nom_can='" + nombre + "'," + "ape_can='" + apellido +
		"'," + "peso_can='" + peso + "'," + " esta_can ='" + estatura + "'," + "fky_civ ='" + civil + "'," + " ocu_can ='" + ocupacion + "'," +
		" fky_cat= '" + categoriafk + "'," + " edad_can='" + edad + "'," + " fky_mun ='" + municipio + "'," + "fky_cer='" + certamenfk + "'," +
		" dir_can ='" + direccion + "'," + " tel_can ='" + telefono + "'," + " email_can ='" + email + "'," + " est_can ='" + estado + "' WHERE cod_can = " + id;

	con.query(sql, function (err, result) {
		if (err) {
			console.log(err);
			swal("Error", "Por favor, verifique los datos o contacte con el Administrador.", "error", {
				button: false,
				timer: 3000
			});
		} else {
			swal("", "Los datos fueron actualizados correctamente.", "success", {
				button: false,
				timer: 3000
			}).then(function () {
				nameUser = localStorage.getItem('name');
				date_log = new Date();

				con.query("SELECT MAX(cod_log) as id FROM log", function (err, result1, fields) {
					if (err) console.log(err);
					else idMax = result1[0].id;

					updateUser = "UPDATE log SET usu_log='" + nameUser + "' WHERE cod_log='" + idMax + "'";
					con.query(updateUser, function (err, result) {
						if (err) {
							console.log(err);
							swal("Error", "Por favor, verifique los datos o contacte con el Administrador.", "error", {
								button: false,
								timer: 3000
							});
						} else {
							sql2 = "INSERT INTO log (usu_log, tab_log, acc_log, reg_log, date_log, est_log) VALUES ?";
							var values = [
								[nameUser, 'candidata', 'Modificar - Data Nueva', sql, date_log, 'A']
							];

							con.query(sql2, [values], function (err, result) {
								if (err) {
									console.log(err);
								} else {
									window.location.reload();
								}
							});
						}
					});
				});
			});
		}
	});
}