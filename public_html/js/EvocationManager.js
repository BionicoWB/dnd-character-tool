var EvocazioniManager = {
    
    listeEvocazione: {}

    , creatureEvocate: []
    
    , plugins : {}
    
    , addPlugin : function(plugin){
        Creatura.prototype[plugin.key] = plugin.action;
        EvocazioniManager.plugins[plugin.key] = plugin;
        EvocazioniManager.plugins[plugin.key].text = (!plugin.text ? plugin.key : plugin.text);
    }
    
    , getPlugins : function(){
        return EvocazioniManager.plugins;
    }
    
    , applyPlugin : function(index, key){
        console.log(' EvocazioniManager.applyPlugin - ' + key);

        EvocazioniManager.creatureEvocate[index][key]();
        EvocazioniManager.caricaCreatureEvocate();
    }

    , addListaEvocazione: function(data) {
        
        console.debug(" Loading - " + data.key);


        if (!EvocazioniManager.listeEvocazione[data.key]) {

            console.log(" Creazione EvocazioniManager.listeEvocazione." + data.key);

            EvocazioniManager.listeEvocazione[data.key] = data;

            
        } else {
            console.log(" Aggiornamento EvocazioniManager.listeEvocazione." + data.key);
        
            for(var livello in data.livelli){
                //ciclo ogni creatura in ogni livello
                for(var i =0; i< data.livelli[livello].length; i++){
                    
                    var nome = data.livelli[livello][i];
                    //se non presente viene aggiunta
                    if(EvocazioniManager.listeEvocazione[data.key].livelli.indexOf(nome)>=0){
                        console.log("  Aggiunta EvocazioniManager.listeEvocazione." + data.key + "." + livello + "." + nome);
                        EvocazioniManager.listeEvocazione[data.key].livelli.push(nome);
                    }
                }
            }
        }


        EvocazioniManager.listeEvocazione[data.key] = data;
    }

    , caricaTipologieEvocazione: function() {
        console.log("Carico tipologie evocazione");
        
        $.templates("#templateTipologieEvocazione").link("#pageEvocazioni div[data-role='main']", EvocazioniManager.listeEvocazione);
        $("#pageEvocazioni  div[data-role='main']").trigger("create");
    }

    , caricaListaLivelli: function(key) {
        console.log("Carico lista livelli - " + key);
        
        $.templates("#templateLivelliEvocazione").link("#pageLivelliEvocazione", EvocazioniManager.listeEvocazione[key]);
        $("#pageLivelliEvocazione").trigger("create");
    }

    , evocaCreatura: function(key) {
        console.log("Evoco creatura - " + key);
        
        EvocazioniManager.creatureEvocate.push(new Creatura(BestiarioManager.getDefinizione(key)));
        EvocazioniManager.caricaCreatureEvocate();
    }

    , rimuoviCreaturaEvocata: function(index) {
        EvocazioniManager.creatureEvocate.splice(index, 1);
        EvocazioniManager.caricaCreatureEvocate();
    }

    , caricaCreatureEvocate: function() {
        $.templates("#templateCreaturaEvocata").link("#pageBattlefield #evocazioniAttive", EvocazioniManager.creatureEvocate);
        $("#pageBattlefield").trigger("create");
    }

    , load: function(uri, callback) {
        console.log("Loading - " + uri);

        $.getJSON(uri, function(data) {
            EvocazioniManager.addListaEvocazione(data);
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