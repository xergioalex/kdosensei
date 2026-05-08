// Función 'callback' con el resultado de la consulta
function llenarHtmlListaKatas(db, results) {
    var len = results.rows.length;    
    $('#katas').empty();
    for (var i=0; i<len; i++){        
        switch (results.rows.item(i).id_cinturon) {
            case "1":
                $('#katas-blanco').append('<li><a onClick="llenarElementoKata('+results.rows.item(i).id_kata+')" href="#karate-kata-item">'+results.rows.item(i).nombre_kata+'</a></li>');                
                break;
            case "2":
                $('#katas-amarillo').append('<li><a onClick="llenarElementoKata('+results.rows.item(i).id_kata+')" href="#karate-kata-item">'+results.rows.item(i).nombre_kata+'</a></li>');                
                break;  
        }      
    }    
}

// Función 'callback' con el resultado de la consulta
function llenarElementoKata(id) {
    var db = window.openDatabase("Karate", "1.0", "DB Karate", 200000);
    db.transaction(function(tx) {        
        tx.executeSql('SELECT * FROM Katas WHERE id_kata = "'+id+'"', [], tituloElementoKata);
        tx.executeSql('SELECT * FROM ImagenesKata WHERE id_kata = "'+id+'"', [], llenarHtmlElementoKata);
    }, errorTransaccion);
}

function tituloElementoKata(db, results) {       
    $('#titulo_kata h1').text("Kata "+results.rows.item(0).nombre_kata);

}

function llenarHtmlElementoKata(db, results) {       
    var len = results.rows.length;    
    $('#contenido_kata ul').empty();
    for (var i=0; i<len; i++){        
        $('#contenido_kata ul').append('<li><a href="'+results.rows.item(i).imagen+'" rel="external"><img src="'+results.rows.item(i).thumbnail+'" alt="'+results.rows.item(i).descripcion_imagen+'" /></a></li>');
    }
}
