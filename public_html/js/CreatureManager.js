var CreatureManager = {
           
    definizioni : new Collection()
    
    , decoratori:{
        attacco : []
        , tiroSalvezza : []
    }   

    , addDefinizione : function(key, definizione){
        console.debug(" Loading - " + key);
        
        var struct = {
            nome: key
            , talenti:[]
        };
        
        definizione = $.extend(true, struct, definizione);
        
        //sostituisco la chiave della taglia con l'oggetto completo
        definizione.taglia = Taglia[definizione.taglia]; 
        
        CreatureManager.definizioni.put(key, definizione);
        
    }
    
    , hasDefinizione : function(key){
        return CreatureManager.definizioni.containsKey(key);
    }
    
    , getDefinizione : function(key){
        return CreatureManager.definizioni.get(key);
    }
    
    , addDecoratoreAttacco : function(decoratore){
        CreatureManager.decoratori.attacco.push(decoratore);
    }
    
    , getDecoratoriAttacco : function(){
        return CreatureManager.decoratori.attacco;
    }
    
    , addDecoratoreTiroSalvezza : function(decoratore){
        CreatureManager.decoratori.tiroSalvezza.push(decoratore);
    }
    
    , getDecoratoriTiroSalvezza : function(){
        return CreatureManager.decoratori.tiroSalvezza;
    }    
    
    , caricaSchedaCreatura: function(key) {
        console.log("Carico scheda creatura - " + key);
        
        $.templates("#templateSchedaCreatura").link("#pageSchedaCreatura", new Creature(key));
        $("#pageSchedaCreatura").trigger("create");
        
    }    

    , load: function(uri, callback) {
        console.log("Loading - " + uri);

        $.getJSON(uri, function(data) {
            
            for (var key in data) {                
                CreatureManager.addDefinizione(key, data[key]);
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
    
    , find : {
        
        rangeByFunction : function(definizioni ,fun){
            
     
            if (typeof fun !== 'function') {
                throw TypeError("rangeByFunction -> 'fun' deve essere di tipo 'function'");
            }

            if (typeof definizioni !== 'Collection') {
                definizioni = CreatureManager.definizioni;
            }

            var min = null, max = null;

            var values = definizioni.values();

            for (var i = 0; i < values.length; i++) {
                try {
                    var valueToCompare = fun(values[i]);

                    if (min === null || valueToCompare < min) {
                        min = valueToCompare;
                    }
                    if (max === null || valueToCompare > max) {
                        max = valueToCompare;
                    }
                } catch (e) {
                    console.error(values[i].nome);
                    throw e
                }
            }
            console.debug("rangeByFunction [" + min + "," + max + "]");
            return [(min === null ? 0 : min), (max === null ? 1 : max)];

        }
        
        ,rangeDadiVita :  function(definizioni){  
            console.debug('rangeDadiVita');
            return CreatureManager.find.rangeByFunction(definizioni, function(elm){return elm.dadiVita.numero;});
        }
        
        , rangeTaglia : function(definizioni){
            console.debug('rangeTaglia');
            return CreatureManager.find.rangeByFunction(definizioni, function(elm){return elm.taglia.value;});            
        }
        
    }
    
    , filter : {
        
        byDadiVita : function(range){
            
            return function(key, val){
                return val.dadiVita.numero >= range[0] && val.dadiVita.numero <= range[1];
            };
            
        }
        
        , byTaglia : function(range){
            
            return function(key, val){
                return val.taglia.value >= range[0] && val.taglia.value <= range[1];
            };
            
        }
        
        , byWords : function(words){
            
            return function(key, val){
                                
                for(var i=0;i< words.length;i++){
                    if(!matchWord(val, words[i])){
                        return false;
                    }
                }
                
                return true;
                
                function matchWord(creature, word){
                    
                    var pattern = new RegExp(word,"i");
                    
                    if(pattern.test(creature.nome)){
                        return true;
                    }
                    
                    for(var i=0; i<creature.talenti.length; i++){
                        if(pattern.test(creature.talenti[i].key)){
                            return true;
                        }
                    }
                    
                    for(var tipo in creature.attacchi){
                        for(var livello in creature.attacchi[tipo]){
                            
                            var attacchi = creature.attacchi[tipo][livello];
                            
                            for(var i=0; i<attacchi.length; i++){
                                if(pattern.test(attacchi[i].descrizione)){
                                    return true;
                                }
                            }
                        }
                    }
                    
                    //capacita
                    
                    return false;
                }
            };
            
        }
        
    }
    
    , sort : {
        
        byName : function(desc){
                                    
            return function(a, b){
                
                if(desc){
                    return -a.nome.localeCompare(b.nome);
                }else{
                    return a.nome.localeCompare(b.nome);
                }
            };
                
        }
    }

};