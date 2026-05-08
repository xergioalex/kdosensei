// Función 'callback' con el resultado de la consulta
function llenarHtmlListaKihones(db, results) {
    var len = results.rows.length;    
    for (var i=0; i<len; i++){
        switch (results.rows.item(i).id_cinturon) {
            case "1":
                $('#kihones-blanco').append('<li><a onClick="llenarElementoKihon('+results.rows.item(i).id_kihon+')" href="#karate-kihon-item">'+results.rows.item(i).nombre_kihon+'</a></li>');
                break;
            case "2":
                $('#kihones-amarillo').append('<li><a onClick="llenarElementoKihon('+results.rows.item(i).id_kihon+')" href="#karate-kihon-item">'+results.rows.item(i).nombre_kihon+'</a></li>');
                break;  
        }      
    }
}

// Función 'callback' con el resultado de la consulta
function llenarElementoKihon(id) {
    var db = window.openDatabase("Karate", "1.0", "DB Karate", 200000);
    db.transaction(function(tx) {        
        tx.executeSql('SELECT * FROM Kihones WHERE id_kihon = "'+id+'"', [], llenarHtmlElementoKihon);
    }, errorTransaccion);
}

function llenarHtmlElementoKihon(db, results) {       
    $('#titulo_kihon h1').text("Kihon "+results.rows.item(0).nombre_kihon);
    $('#contenido_kihon img').attr("src",results.rows.item(0).imagen_kihon);
    $('#contenido_kihon p').text(results.rows.item(0).descripcion_kihon);
}
