var ProfiliManager = {
  
    definizioni : {}
    
    , addProfilo : function(profilo){
        console.debug(" Loading - " + profilo.key);

        var struct = {
            key: null
            , desrizione: null
            , manuali:[]
        };

        var profilo = $.extend(true, struct, profilo);
                
        ProfiliManager.definizioni[profilo.key] = profilo;        
    }
    
    , loadContenuto : function(key){
        
        var profilo = ProfiliManager.definizioni[key];
        
        for(var i=0; i<profilo.manuali.length; i++){            
            ManualiManager.load(profilo.manuali[i].url, function(key){return function(){ManualiManager.loadContenuto(key);};}(profilo.manuali[i].key));
        }
                       
        
    }    
    
    , load : function(uri, callback){
        console.log("Loading - " + uri);

        $.getJSON(uri, function(data) {
            ProfiliManager.addProfilo(data);
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