var ProfileManager = {
  
    definizioni : {}
    
    , addProfilo : function(profilo){
        console.debug(" Loading - " + profilo.key);

        var struct = {
            key: null
            , desrizione: null
            , manuali:[]
        };

        profilo = $.extend(true, struct, profilo);
                
        ProfileManager.definizioni[profilo.key] = profilo;        
    }
    
    , loadContenuto : function(key){
        
        var profilo = ProfileManager.definizioni[key];
        
        for(var i=0; i<profilo.manuali.length; i++){            
            HandbookManager.load(profilo.manuali[i].url, function(key){return function(){HandbookManager.loadContenuto(key);};}(profilo.manuali[i].key));
        }
                       
        
    }    
    
    , load : function(uri, callback){
        console.log("Loading - " + uri);

        $.getJSON(uri, function(data) {
            ProfileManager.addProfilo(data);
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