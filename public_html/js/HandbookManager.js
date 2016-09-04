var HandbookManager = {
        
    definizioni : {}

    , addManuale : function(manuale){

        console.debug(" Loading - " + manuale.key);

        var struct = {
            key: null
            , desrizione: null
            , listeEvocazione:[]
            , creature : []
            , plugins : []
        };

        manuale = $.extend(true, struct, manuale);
                
        HandbookManager.definizioni[manuale.key] = manuale;                
    }

    , loadContenuto : function(key){
        
        var manuale = HandbookManager.definizioni[key];
        
        for(var i=0; i<manuale.creature.length; i++){
            CreatureManager.load(manuale.creature[i].url);
        }
        
        for(var i=0; i<manuale.listeEvocazione.length; i++){
            EvocationManager.load(manuale.listeEvocazione[i].url);
        }  
        
        for(var i=0; i<manuale.plugins.length; i++){
            app.loadPlugin(manuale.plugins[i].url);
        }          
        
    }

    , load : function(uri, callback){
        console.log("Loading - " + uri);

        $.getJSON(uri, function(data) {
            HandbookManager.addManuale(data);
            if(typeof callback === 'function'){
                callback();
            }            
        })
        .fail(function(jqxhr, textStatus, error) {
            console.error("Request Failed: " + textStatus + ", " + error);
            if(typeof callback === 'function'){
                callback(jqxhr, textStatus, error);
            }
        });            
    }
    
};