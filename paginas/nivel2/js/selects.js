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

function selectCandidata()
{
    con.query("SELECT * FROM candidata WHERE est_can='A'", function (err, result, fields) 
    {
        if (err) console.log(err);

        var tam = result.length;
        var text;

        text = "<option value='' selected disabled></option>";
        
        for (i = 0; i < tam; i++) 
        {
            text += '<option value="'+ result[i].cod_can +'">'+ result[i].ci_can +' - '+ result[i].nom_can +' '+ result[i].ape_can +'</option>';
        }
        text += '</select>';
        document.getElementById("fky_can").innerHTML= text;
    });
}

function selectJurado()
{
    con.query("SELECT * FROM jurado WHERE est_jur='A'", function (err, result, fields) 
    {
        if (err) console.log(err);

        var tam = result.length;
        var text;

        text = "<option value='' selected disabled></option>";
        
        for (i = 0; i < tam; i++) 
        {
            text += '<option value="'+ result[i].cod_jur +'">'+ result[i].ci_jur +' - '+ result[i].nom_jur +' '+ result[i].ape_jur +'</option>';
        }
        text += '</select>';
        document.getElementById("fky_jur").innerHTML= text;
    });
}

function selectDocente()
{
    con.query("SELECT * FROM profesor WHERE est_pro='A'", function (err, result, fields) 
    {
        if (err) console.log(err);

        var tam = result.length;
        var text;

        text = "<option value='' selected disabled></option>";
        
        for (i = 0; i < tam; i++) 
        {
            text += '<option value="'+ result[i].cod_pro +'">'+ result[i].ci_pro +' - '+ result[i].nom_pro +' '+ result[i].ape_pro +'</option>';
        }
        text += '</select>';
        document.getElementById("fky_pro").innerHTML= text;
    });
}

function selectCategoria()
{
    con.query("SELECT * FROM categoria WHERE est_cat='A'", function (err, result, fields) 
    {
        if (err) console.log(err);

        var tam = result.length;
        var text;

        text = "<option value='' selected disabled></option>";
        
        for (i = 0; i < tam; i++) 
        {
            text += '<option value="'+ result[i].cod_cat +'">'+ result[i].nom_cat +'</option>';
        }
        text += '</select>';
        document.getElementById("fky_cat").innerHTML= text;
    });
}

function selectClase()
{
    con.query("SELECT * FROM clase WHERE est_cla='A'", function (err, result, fields) 
    {
        if (err) console.log(err);

        var tam = result.length;
        var text;

        text = "<option value='' selected disabled></option>";
        
        for (i = 0; i < tam; i++) 
        {
            text += '<option value="'+ result[i].cod_cla +'">'+ result[i].nom_cla +'</option>';
        }
        text += '</select>';
        document.getElementById("fky_cla").innerHTML= text;
    });
}

function selectMunicipio()
{
    con.query("SELECT * FROM municipio WHERE est_mun='A'", function (err, result, fields) 
    {
        if (err) console.log(err);

        var tam = result.length;
        var text;

        text = "<option value='' selected disabled></option>";
        
        for (i = 0; i < tam; i++) 
        {
            text += '<option value="'+ result[i].cod_mun +'">'+ result[i].nom_mun +'</option>';
        }
        text += '</select>';
        document.getElementById("fky_mun").innerHTML= text;
    });
}

function selectEstadoCivil()
{
    con.query("SELECT * FROM civil WHERE est_civ='A'", function (err, result, fields) 
    {
        if (err) console.log(err);

        var tam = result.length;
        var text;

        text = "<option value='' selected disabled></option>";
        
        for (i = 0; i < tam; i++) 
        {
            text += '<option value="'+ result[i].cod_civ +'">'+ result[i].nom_civ +'</option>';
        }
        text += '</select>';
        document.getElementById("fky_civ").innerHTML= text;
    });
}

function selectSemana()
{
    con.query("SELECT * FROM semana WHERE est_sem='A'", function (err, result, fields) 
    {
        if (err) console.log(err);

        var tam = result.length;
        var text;

        text = "<option value='' selected disabled></option>";
        
        for (i = 0; i < tam; i++) 
        {
            text += '<option value="'+ result[i].cod_sem +'">'+ result[i].num_sem +'</option>';
        }
        text += '</select>';
        document.getElementById("fky_sem").innerHTML= text;
    });
}

function selectPregunta1()
{
    con.query("SELECT * FROM pregunta WHERE est_pre='A'", function (err, result, fields) 
    {
        if (err) console.log(err);

        var tam = result.length;
        var text;

        text = "<option value='' selected disabled></option>";
        
        for (i = 0; i < tam; i++) 
        {
            text += '<option value="'+ result[i].cod_pre +'">'+ result[i].pre_pre +'</option>';
        }
        text += '</select>';
        document.getElementById("fky_pre1").innerHTML= text;
    });
}

function selectPregunta2()
{
    con.query("SELECT * FROM pregunta WHERE est_pre='A'", function (err, result, fields) 
    {
        if (err) console.log(err);

        var tam = result.length;
        var text;

        text = "<option value='' selected disabled></option>";
        
        for (i = 0; i < tam; i++) 
        {
            text += '<option value="'+ result[i].cod_pre +'">'+ result[i].pre_pre +'</option>';
        }
        text += '</select>';
        document.getElementById("fky_pre2").innerHTML= text;
    });
}