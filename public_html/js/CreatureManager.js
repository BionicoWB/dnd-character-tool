var BestiarioManager = {
    
    definizioni: {}

    , addDefinizione : function(key, definizione){
        console.debug(" Loading - " + key);
        BestiarioManager.definizioni[key] = definizione;

        BestiarioManager.definizioni[key].nome = key;
        //sostituisco la chiave della taglia con l'oggetto completo
        BestiarioManager.definizioni[key].taglia = Taglia[BestiarioManager.definizioni[key].taglia];        
    }
    
    , getDefinizione : function(key){
        return BestiarioManager.definizioni[key];
    }
    
    , caricaSchedaCreatura: function(key) {
        console.log("Carico scheda creatura - " + key);
        
        $.templates("#templateSchedaCreatura").link("#pageSchedaCreatura", new Creatura(BestiarioManager.getDefinizione(key)));
        $("#pageSchedaCreatura").trigger("create");
        
    }    

    , load: function(uri, callback) {
        console.log("Loading - " + uri);

        $.getJSON(uri, function(data) {
            
            for (var key in data) {                
                BestiarioManager.addDefinizione(key, data[key]);
            }
            
            if(typeof callback === 'function'){
                callback();
            }

        })
        .fail(function( jqxhr, textStatus, error ) {
            console.error( "Request Failed: " + textStatus + ", " + error );
            if(typeof callback === 'function'){
                callback(jqxhr, textStatus, error);
            }
         });

    }

};