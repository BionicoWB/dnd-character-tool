Creature.prototype.applicaVariazioniTaglia = function(info){
    
    console.debug("  applica 'applicaVariazioniTaglia' " + this.getTaglia().descrizione + ' -> ' + info.taglia.descrizione);
    
    this.setForza(this.getForza() + info.variazioneForza);
    this.setDestrezza(this.getDestrezza() + info.variazioneDestrezza);   
    this.setCostituzione(this.getCostituzione() + info.variazioneCostituzione);
    
    this.setArmaturaNaturale(this.getArmaturaNaturale() + info.variazioneArmaturaNaturale);

    this.setTaglia(info.taglia);

};

EvocationManager.addPlugin({key:"ingrandisci", text:"Ingrandisci", action :function(){
  
    console.debug(" applica 'ingrandisci'");
    try{
        this.applicaVariazioniTaglia(this.getTaglia().getInfoIngrandimento());
        
        //@todo variazione danni
    }catch(e){
        alert(e);
    }
    
}});

EvocationManager.addPlugin({key:"riduci", text:"Riduci", action :function(){
  
    console.debug(" applica 'riduci'");
    try{
        this.applicaVariazioniTaglia(this.getTaglia().getInfoRiduzione());
        
        //@todo variazione danni
    }catch(e){
        alert(e);
    }    
    
}});