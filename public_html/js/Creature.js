function Creatura(basicObject){

	var proprieta = $.extend(true, {}, basicObject);
	
	var danni = 0;
        
        this.getPlugins = function(){
                return EvocazioniManager.getPlugins();
        };
        
	this.getNome = function(){
		return proprieta.nome;
	};
	
	this.getTaglia = function(){
		return proprieta.taglia;
	};
	
	var getVelocita = function(key){
		return proprieta.velocita[key];
	};
	
	this.getVelocitaTerra = function(){
		return getVelocita(Velocita.TERRA);
	};
	
	this.getVelocitaVolo = function(){
		return getVelocita(Velocita.VOLO);
	};	
	
	this.getVelocitaScavare = function(){
		return getVelocita(Velocita.SCAVARE);
	};

	this.getVelocitaScalare = function(){
		return getVelocita(Velocita.SCALARE);
	};

	this.getVelocitaNuotare = function(){
		return getVelocita(Velocita.NUOTARE);
	};	
	
	var getCaratteristica = function(key){		
		return proprieta.caratteristiche[key];
	};
        
        var setCaratteristica = function(key, value){
                proprieta.caratteristiche[key] = value;
        };
	
	var getModificatoreCaratteristica = function(key){
		return Math.floor((getCaratteristica(key)-10)/2);
	};
	
	this.getForza = function(){
		return getCaratteristica(Caratteristica.FORZA);
	};

	this.setForza = function(value){
		return setCaratteristica(Caratteristica.FORZA, value);
	};    
    
	this.getModificatoreForza = function(){
		return getModificatoreCaratteristica(Caratteristica.FORZA);
	};

	this.getCostituzione = function(){
		return getCaratteristica(Caratteristica.COSTITUZIONE);
	};
        
	this.setCostituzione = function(value){
		return setCaratteristica(Caratteristica.COSTITUZIONE, value);
	};         

	this.getModificatoreCostituzione = function(){
		return getModificatoreCaratteristica(Caratteristica.COSTITUZIONE);
	};	
	
	this.getDestrezza = function(){
		return getCaratteristica(Caratteristica.DESTREZZA);
	};
        
	this.setDestrezza = function(value){
		return setCaratteristica(Caratteristica.DESTREZZA, value);
	};         
	
	this.getModificatoreDestrezza = function(){
		return getModificatoreCaratteristica(Caratteristica.DESTREZZA);
	};	

	this.getIntelligenza = function(){
		return getCaratteristica(Caratteristica.INTELLIGENZA);
	};
        
	this.setIntelligenza = function(value){
		return setCaratteristica(Caratteristica.INTELLIGENZA, value);
	};         
	
	this.getModificatoreIntelligenza = function(){
		return getModificatoreCaratteristica(Caratteristica.INTELLIGENZA);
	};	

	this.getSaggezza = function(){
		return getCaratteristica(Caratteristica.SAGGEZZA);
	};
        
	this.setSaggezza = function(value){
		return setCaratteristica(Caratteristica.SAGGEZZA, value);
	};         
	
	this.getModificatoreSaggezza = function(){
		return getModificatoreCaratteristica(Caratteristica.SAGGEZZA);
	};	

	this.getCarisma = function(){
		return getCaratteristica(Caratteristica.CARISMA);
	};
        
	this.setCarisma = function(value){
		return setCaratteristica(Caratteristica.CARISMA, value);
	};         
	
	this.getModificatoreCarisma = function(){
		return getModificatoreCaratteristica(Caratteristica.CARISMA);
	};

	this.getDadiVita = function(){
		return proprieta.dadiVita.numero + 'd' + proprieta.dadiVita.tipo + ' + ' + (this.getModificatoreCostituzione()*proprieta.dadiVita.numero);
	};
	
	this.getPuntiFerita = function(){
		return Math.floor((proprieta.dadiVita.tipo + 1)/2 * proprieta.dadiVita.numero) + (this.getModificatoreCostituzione()*proprieta.dadiVita.numero);
	};
	
	this.setDanni = function(value){
		danni = value;
	};	
	
	this.getDanni = function(){
		return danni;
	};
	
	this.getClasseArmatura = function(){
		return 10 + proprieta.taglia.modificatoreClasseArmatura + this.getModificatoreDestrezza() + proprieta.armaturaNaturale;
	};
	
	this.getClasseArmaturaContatto = function(){
		return 10 + proprieta.taglia.modificatoreClasseArmatura + this.getModificatoreDestrezza();
	};

	this.getClasseArmaturaSprovvista = function(){
		return 10 + proprieta.taglia.modificatoreClasseArmatura + proprieta.armaturaNaturale;
	};
	
	var getTiroSalvezzaBase = function(key){
		return proprieta.tiriSalvezza[key];
	};
	
	this.getTiroSalvezzaTempraBase = function(){
		return getTiroSalvezzaBase(TiriSalvezza.TEMPRA);
	};
	
	this.getTiroSalvezzaTempra = function(){
		return this.getTiroSalvezzaTempraBase() + this.getModificatoreCostituzione();
	};	
	
	this.getTiroSalvezzaRiflessiBase = function(){
		return getTiroSalvezzaBase(TiriSalvezza.RIFLESSI);
	};	
	
	this.getTiroSalvezzaRiflessi = function(){
		return this.getTiroSalvezzaRiflessiBase() + this.getModificatoreDestrezza();
	};		
	
	this.getTiroSalvezzaVolontaBase = function(){
		return getTiroSalvezzaBase(TiriSalvezza.VOLONTA);
	};

	this.getTiroSalvezzaVolonta = function(){
		return this.getTiroSalvezzaVolontaBase() + this.getModificatoreSaggezza();
	};
	
	this.getAttaccoBase = function(){
		return proprieta.attaccoBase;
	};
	
	this.getBonusLotta = function(){
		return proprieta.attaccoBase + proprieta.taglia.modificatoreLotta + this.getModificatoreForza();
	};
	
	this.getBonusSbilanciare = function(){
		return proprieta.taglia.modificatoreSbilanciare + this.getModificatoreForza();
	};	
	
};