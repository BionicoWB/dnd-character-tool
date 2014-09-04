var SearchManager = {
  
    caricaPaginaRicerca : function(template){
        console.log("Carico pagina ricerca");
        
        $.templates(template).link("#searchForm div[data-role='main']", {});
        $("#searchForm  div[data-role='main']").trigger("create");   
        
        SearchManager.bindPaginaRicerca();
    }
    
    , bindPaginaRicerca : function(){
        $("#searchForm [name='range-taglia']")
                .on("slidestop",function(event, ui){                                                                          
                    $("#searchForm [name='lblTagliaMin']").val(Taglia.decode($(this).find("input:eq(0)").val()));
                    $("#searchForm [name='lblTagliaMax']").val(Taglia.decode($(this).find("input:eq(1)").val()));
                })
                ;  
                
        $("#searchForm [name='lblTagliaMin']").val(Taglia.decode($("#searchForm [name='range-taglia']").find("input:eq(0)").val()));
        $("#searchForm [name='lblTagliaMax']").val(Taglia.decode($("#searchForm [name='range-taglia']").find("input:eq(1)").val()));
    }
  
    , caricaPaginaRisultati : function(template, results){
        console.log("Carico risutlati ricerca");
        
        $.templates(template).link("#searchResults div[data-role='main']", {items:results});
        $("#searchResults  div[data-role='main']").trigger("create");
        
        $.mobile.navigate("#searchResults");
    }
    
    , search : {
        
        creature : function(form){

            console.log("search creature by: dv:[" + form.dadiVitaMin.value + "," + form.dadiVitaMax.value + "], tg:[" + form.tagliaMin.value + "," + form.tagliaMax.value + "], txt:'" + form.text.value + "'");
            
            var results =  CreatureManager.definizioni
                    .filterKeys(
                        CreatureManager.filter.byDadiVita([form.dadiVitaMin.value,form.dadiVitaMax.value])
                    )
                    .filterKeys(
                        CreatureManager.filter.byTaglia([form.tagliaMin.value,form.tagliaMax.value])
                    )
                    .filterKeys(
                        CreatureManager.filter.byWords([form.text.value])
                    )
                    .values()
                    .sort(
                        CreatureManager.sort.byName()
                    );
                      
            SearchManager.caricaPaginaRisultati("#templateRisultatiRicercaCreature", results);
            
        }
        
    }
    
};

