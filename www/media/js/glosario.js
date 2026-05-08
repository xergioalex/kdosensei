// Consulta a la base de datos
function llenarGlosario(db) {
    db.executeSql('SELECT * FROM Glosario', [], llenarHtmlGlosario, errorTransaccion);
}

// Función 'callback' con el resultado de la consulta
function llenarHtmlGlosario(db, results) {
    var len = results.rows.length;    
    for (var i=0; i<len; i++){        
        $('#glosario').append('<li><a onClick="llenarElementoGlosario('+results.rows.item(i).id_glosario+')" href="#karate-glosario-item">'+results.rows.item(i).nombre+'</a></li>');
    }
}



// Función 'callback' con el resultado de la consulta
function llenarElementoGlosario(id) {
    var db = window.openDatabase("Karate", "1.0", "DB Karate", 200000);
    db.transaction(function(tx) {        
        tx.executeSql('SELECT * FROM Glosario WHERE id_glosario = "'+id+'"', [], llenarHtmlElementoGlosario);
    }, errorTransaccion);
}

function llenarHtmlElementoGlosario(db, results) {        
    $('#titulo_glosario h1').text(results.rows.item(0).nombre);
    $('#contenido_glosario img').attr("src",results.rows.item(0).imagen);
    $('#contenido_glosario p').text(results.rows.item(0).definicion);
}
