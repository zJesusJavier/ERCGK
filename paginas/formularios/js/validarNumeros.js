function validarNumero(tecla) {
	if ((tecla.charCode >= 48 && tecla.charCode <= 57) || (tecla.charCode < 32)) {
		return true
	} else {
		return false
	}
}

function validarTelefono(tecla) {
	if ((tecla.charCode >= 48 && tecla.charCode <= 57) || (tecla.charCode < 32) || (tecla.charCode == 45)) {
		return true
	} else {
		return false
	}
}