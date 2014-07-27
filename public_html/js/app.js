var app = {
  
    init : function(){        
        //app.loadPlugin("data/3.5/plugins/ingrandimentoCreatura.js");
        
        ProfiliManager.load("data/profili/35base.json", function(){
            ProfiliManager.loadContenuto("35base");
        });
        
    }
  
    , loadPlugin : function(url){
        console.log("Loading plugin - " + url);
        $('head').append("<script type='text\/javascript' src='" + url + "' language='JavaScript'><\/script>");
    }
    
};
