var EvocationManager = {
    
    listeEvocazione: {}

    , creatureEvocate: []
    
    , indiceSelezionato : null
    
    , plugins : {}
    
    , addPlugin : function(plugin){
        Creature.prototype[plugin.key] = plugin.action;
        EvocationManager.plugins[plugin.key] = plugin;
        EvocationManager.plugins[plugin.key].text = (!plugin.text ? plugin.key : plugin.text);
    }
    
    , getPlugins : function(){
        return EvocationManager.plugins;
    }
    
    , invokePlugin : function(index, key){
        console.log(' EvocationManager.applyPlugin - ' + key);

        EvocationManager.creatureEvocate[index][key]();
        EvocationManager.caricaCreatureEvocate();
    }

    , addListaEvocazione: function(data) {
        
        console.debug(" Loading - " + data.key);


        if (!EvocationManager.listeEvocazione[data.key]) {

            console.log(" Creazione EvocationManager.listeEvocazione." + data.key);
            
            EvocationManager.listeEvocazione[data.key] = data;

            
        } else {
            console.log(" Aggiornamento EvocationManager.listeEvocazione." + data.key);
        
            for(var livello in data.livelli){
                //ciclo ogni creatura in ogni livello
                for(var i =0; i< data.livelli[livello].length; i++){
                    
                    var nome = data.livelli[livello][i];
                    //se non presente viene aggiunta
                    if(EvocationManager.listeEvocazione[data.key].livelli.indexOf(nome)>=0){
                        console.log("  Aggiunta EvocationManager.listeEvocazione." + data.key + "." + livello + "." + nome);
                        EvocationManager.listeEvocazione[data.key].livelli.push(nome);
                    }
                }
            }
        }


        EvocationManager.listeEvocazione[data.key] = data;
    }

    , caricaTipologieEvocazione: function() {
        console.log("Carico tipologie evocazione");
        
        $.templates("#templateTipologieEvocazione").link("#pageEvocazioni div[data-role='main']", EvocationManager.listeEvocazione);
        $("#pageEvocazioni  div[data-role='main']").trigger("create");
    }

    , caricaListaLivelli: function(key) {
        console.log("Carico lista livelli - " + key);
        
        $.templates("#templateLivelliEvocazione").link("#pageLivelliEvocazione", EvocationManager.listeEvocazione[key]);
        $("#pageLivelliEvocazione").trigger("create");
    }

    , evocaCreatura: function(key) {
        console.log("Evoco creatura - " + key);
        
        EvocationManager.creatureEvocate.push(new Creature(key));
        EvocationManager.caricaCreatureEvocate();
    }

    , rimuoviCreaturaEvocata: function(index) {
        EvocationManager.creatureEvocate.splice(index, 1);
        EvocationManager.caricaCreatureEvocate();
    }

    , caricaCreatureEvocate: function() {
        
        $.templates("#templateEvocazioniAttive").link("#pageBattlefield #evocazioniAttive", EvocationManager);
        $("#pageBattlefield").trigger("create");
    }

    , load: function(uri, callback) {
        console.log("Loading - " + uri);

        $.getJSON(uri, function(data) {
            EvocationManager.addListaEvocazione(data);
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