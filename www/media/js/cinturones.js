// Consulta a la base de datos
function llenarCinturones(db) {
    db.executeSql('SELECT * FROM Cinturones', [], llenarHtmlCinturones, errorTransaccion);
    db.executeSql('SELECT * FROM Kihones', [], llenarHtmlListaKihones);
    db.executeSql('SELECT * FROM Katas', [], llenarHtmlListaKatas);
}

// Función 'callback' con el resultado de la consulta
function llenarHtmlCinturones(db, results) {
    var len = results.rows.length;    
    for (var i=0; i<len; i++){        
        if(i>1){
            $('#guias_del_karate').append('<li><a href="#" data-transition="slide"><h3>'+results.rows.item(i).nombre_cinturon+'</h3><p>'+results.rows.item(i).descripcion_cinturon+'</p><img src="'+results.rows.item(i).thumbnail_cinturon+'"></a></li>');        
        }
        else{
            $('#guias_del_karate').append('<li><a onClick="llenarGuiaCinturon('+results.rows.item(i).id_cinturon+')" href="#karate-cinturon" data-transition="slide"><h3>'+results.rows.item(i).nombre_cinturon+'</h3><p>'+results.rows.item(i).descripcion_cinturon+'</p><img src="'+results.rows.item(i).thumbnail_cinturon+'"></a></li>');        
        }
    }
}


function llenarGuiaCinturon(id){
    var db = window.openDatabase("Karate", "1.0", "DB Karate", 200000);
    db.transaction(function(tx) {        
        tx.executeSql('SELECT * FROM Cinturones WHERE id_cinturon = "'+id+'"', [], cambiarTituloGuiaCinturon);
    }, errorTransaccion);
}

// Función 'callback' con el resultado de la consulta
function cambiarTituloGuiaCinturon(db, results) {            
    $('#titulo_cinturon_karate h1').text('Guias '+results.rows.item(0).nombre_cinturon);    
    switch (results.rows.item(0).id_cinturon) {
        case "1":
            $('#karate-kihones').attr("href","#karate-kihones-blanco");
            $('#karate-katas').attr("href","#karate-katas-blanco");
            break;
        case "2":
            $('#karate-kihones').attr("href","#karate-kihones-amarillo");
            $('#karate-katas').attr("href","#karate-katas-amarillo");
            break;        
    } 
}