require('module-alias/register');
var con = require('@models/db');
var swal = require('sweetalert');
var sql;

function carga() {

	// Aqui se cargan las variables con los datos del Formulario

	var estado = document.getElementById("est_cal").value;
	var candidatafk = document.getElementById("fky_can").value;
	var claseafk = document.getElementById("fky_cla").value;
	var docentefk = document.getElementById("fky_pro").value;
	var semana = document.getElementById("fky_sem").value;
	var fecha = document.getElementById("fec_cal").value;
	var calificacion = document.getElementById("cal_cal").value;
	var observacion = document.getElementById("obs_cal").value;
	var f = new Date(document.getElementById("fec_cal").value);
	var fech = f.getFullYear();

	// Aqui se cargan los IDs de los DIVs que contienen los Inputs

	var inputCandidata = document.getElementById("inputCandidata");
	var inputClase = document.getElementById("inputClase");
	var inputDocente = document.getElementById("inputDocente");
	var inputSemana = document.getElementById("inputSemana");
	var inputCalificacion = document.getElementById("inputCalificacion");
	var inputFecha = document.getElementById("inputFecha");

	// Validación de que los Inputs no estan vacios
	// Si esta vacio se cambiara el valor de Class="" agregando un color Rojo al Input

	if (!candidatafk) {
		swal("", "Debe seleccionar una opción en Candidata.", "error", {
			button: false,
			timer: 1500
		});
		document.getElementById("fky_can").focus();
		inputCandidata.className = "form-group label-floating has-error";
		return
	} else {
		inputCandidata.className = "form-group label-floating";
	}

	if (!claseafk) {
		swal("", "Debe seleccionar una opción en Clase.", "error", {
			button: false,
			timer: 1500
		});
		document.getElementById("fky_cla").focus();
		inputClase.className = "form-group label-floating has-error";
		return
	} else {
		inputClase.className = "form-group label-floating";
	}

	if (!docentefk) {
		swal("", "Debe seleccionar una opción en Docente.", "error", {
			button: false,
			timer: 1500
		});
		document.getElementById("fky_pro").focus();
		inputDocente.className = "form-group label-floating has-error";
		return
	} else {
		inputDocente.className = "form-group label-floating";
	}

	if (!semana) {
		swal("", "Debe seleccionar una opción en Semana.", "error", {
			button: false,
			timer: 1500
		});
		document.getElementById("sem_cal").focus();
		inputSemana.className = "form-group label-floating has-error";
		return
	} else {
		inputSemana.className = "form-group label-floating";
	}

	if (!calificacion) {
		swal("", "Debe llenar el campo de Calificación.", "error", {
			button: false,
			timer: 1500
		});
		document.getElementById("cal_cal").focus();
		inputCalificacion.className = "form-group label-floating has-error";
		return
	} else {
		inputCalificacion.className = "form-group label-floating";
	}

	if (calificacion < 0 || calificacion > 20) {
		swal("", "La Calificación debe estar entre 0 y 20.", "error", {
			button: false,
			timer: 1500
		});
		document.getElementById("cal_cal").focus();
		inputCalificacion.className = "form-group label-floating has-error";
		return
	} else {
		inputCalificacion.className = "form-group label-floating";
	}

	// Guardado en la Base de Datos

	con.connect(function (err) {

		if (err) console.log(err);


		val = "SELECT * FROM candidata WHERE cod_can='" + candidatafk + "'";
		con.query(val, function (err, result1) {
			if (err) console.log(err);
			for (var i = 0; i < result1.length; i++) {

				if (result1[i].fec_can.getFullYear() == fech) {

					sql = "SELECT * FROM calificacion";
					con.query(sql, function (err, result) {
						if (err) console.log(err);
					});

					sql = "INSERT INTO calificacion (fky_can, fky_cla, fky_pro, sem_cal, fec_cal, cal_cal, obs_cal, est_cal) VALUES ?";
					var values = [
						[candidatafk, claseafk, docentefk, semana, fecha, calificacion, observacion, estado]
					];

					con.query(sql, [values], function (err, result) {
						if (err) {
							console.log(err);
							swal("Error", "Por favor, verifique los datos o contacte con el Administrador.", "error", {
								button: false,
								timer: 3000
							});
						} else {
							swal("", "Calificación registrada correctamente.", "success", {
								button: false,
								timer: 3000
							}).then(function () {
								nameUser = localStorage.getItem('name');
								date_log = new Date();

								sql2 = "INSERT INTO log (usu_log, tab_log, acc_log, reg_log, date_log, est_log) VALUES ?";
								var values2 = [
									[nameUser, 'calificacion', 'Registro', sql + "(" + values + ")", date_log, 'A']
								];

								con.query(sql2, [values2], function (err, result) {
									if (err) {
										console.log(err);
									} else {
										window.location.reload();
									}
								});
							});
						};
					});

				} else {
					swal("", "Debe seleccionar una fecha correcta.", "error", {
						button: false,
						timer: 1500
					});
					document.getElementById("fec_cal").focus();
					inputCandidata.className = "form-group label-floating has-error";
					return
				}
			}
		});
	});
}