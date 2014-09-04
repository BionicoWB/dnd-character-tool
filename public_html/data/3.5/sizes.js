var Taglia = {
        
        decode: function(val){
            switch(val){
            case "0":
                return "PICCOLISSIMA";
            case "1":
                return "MINUTA";
            case "2":
                return "MINUSCOLA";
            case "3":
                return "PICCOLA";
            case "4":
                return "MEDIA";
            case "5":
                return "GRANDE";
            case "6":
                return "ENORME";
            case "7":
                return "MASTODONTICA";
            case "8":
                return "COLOSSALE";
            }
        }
    
        , getDannoIngrandito:function(numero, tipo){
            
            switch(tipo){
                case 2:
                        return {numero:1,tipo:3};
                case 3:
                        return {numero:1,tipo:4};
                case 4:
                        return {numero:1,tipo:6};
                case 6:
                    switch(numero){
                        case 1:
                            return {numero:1,tipo:8};
                        case 2:
                            return {numero:3,tipo:6};
                        default:
                            throw "Nessuna conversione presista per l'ingrandimento di " + numero + 'd' + tipo; 
                    }
                case 8:
                    switch(numero){
                        case 1:
                            return {numero:2,tipo:6};
                        case 2:
                            return {numero:3,tipo:8};
                        default:
                            throw "Nessuna conversione presista per l'ingrandimento di " + numero + 'd' + tipo; 
                    }                    
                case 10:
                        return {numero:2,tipo:8};     
                default:
                        throw "Nessuna conversione presista per l'ingrandimento di " + numero + 'd' + tipo;
            }

        }
        , getDannoRidotto:function(numero, tipo){
            
            switch(tipo){
                case 3:
                        return {numero:1,tipo:2};
                case 4:
                        return {numero:1,tipo:3};
                case 6:
                    switch(numero){
                        case 1:
                            return {numero:1,tipo:4};
                        case 2:
                            return {numero:1,tipo:8};
                        default:
                            throw "Nessuna conversione presista per la riduzione di " + numero + 'd' + tipo; 
                    }
                case 8:
                    switch(numero){
                        case 1:
                            return {numero:1,tipo:6};
                        case 2:
                            return {numero:1,tipo:10};
                        default:
                            throw "Nessuna conversione presista per la riduzione di " + numero + 'd' + tipo; 
                    }
                default:
                        throw "Nessuna conversione presista per la riduzione di " + numero + 'd' + tipo; 
            }

        }        
	, PICCOLISSIMA:{                
		descrizione : "PICCOLISSIMA"
                , value : 0
		, modificatoreAttacco : 8
		, modificatoreClasseArmatura : 8
		, modificatoreLotta : -16
		, modificatoreSbilanciare : -16
		, getInfoIngrandimento:function(){
			return {
				taglia : Taglia.MINUTA
				, variazioneForza : 0
				, variazioneDestrezza : -2
				, variazioneCostituzione : 0
				, variazioneArmaturaNaturale : 0
			};
		}
		, getInfoRiduzione:function(){
			throw 'Impossibile ridurre una creatura oltre la taglia "Piccolissima"';			
		}		
	}
	, MINUTA:{
		descrizione : "MINUTA"
                , value : 1
		,modificatoreAttacco : 4
		, modificatoreClasseArmatura : 4
		, modificatoreLotta : -12
		, modificatoreSbilanciare : -12
		, getInfoIngrandimento:function(){
			return {
				taglia : Taglia.MINUSCOLA
				, variazioneForza : 2
				, variazioneDestrezza : -2
				, variazioneCostituzione : 0
				, variazioneArmaturaNaturale : 0
			};
		}
		, getInfoRiduzione:function(){
			return {
				taglia : Taglia.PICCOLISSIMA
				, variazioneForza : 0
				, variazioneDestrezza : 2
				, variazioneCostituzione : 0
				, variazioneArmaturaNaturale : 0
			};		
		}		
	}
	, MINUSCOLA:{
		descrizione : "MINUSCOLA"
                , value : 2
		,modificatoreAttacco : 2
		, modificatoreClasseArmatura : 2
		, modificatoreLotta : -8
		, modificatoreSbilanciare : -8
		, getInfoIngrandimento:function(){
			return {
				taglia : Taglia.PICCOLA
				, variazioneForza : 4
				, variazioneDestrezza : -2
				, variazioneCostituzione : 0
				, variazioneArmaturaNaturale : 0
			};
		}
		, getInfoRiduzione:function(){
			return {
				taglia : Taglia.MINUTA
				, variazioneForza : -2
				, variazioneDestrezza : 2
				, variazioneCostituzione : 0
				, variazioneArmaturaNaturale : 0
			};		
		}		
	}
	, PICCOLA:{
		descrizione : "PICCOLA"
                , value : 3
		,modificatoreAttacco : 1
		, modificatoreClasseArmatura : 1
		, modificatoreLotta : -4
		, modificatoreSbilanciare : -4
		, getInfoIngrandimento:function(){
			return {
				taglia : Taglia.MEDIA
				, variazioneForza : 4
				, variazioneDestrezza : -2
				, variazioneCostituzione : 2
				, variazioneArmaturaNaturale : 0
			};
		}
		, getInfoRiduzione:function(){
			return {
				taglia : Taglia.MINUSCOLA
				, variazioneForza : -4
				, variazioneDestrezza : 2
				, variazioneCostituzione : 0
				, variazioneArmaturaNaturale : 0
			};		
		}		
	}
	, MEDIA:{
		descrizione : "MEDIA"
                , value : 4
		,modificatoreAttacco : 0
		, modificatoreClasseArmatura : 0
		, modificatoreLotta : 0
		, modificatoreSbilanciare : 0
		, getInfoIngrandimento:function(){
			return {
				taglia : Taglia.GRANDE
				, variazioneForza : 8
				, variazioneDestrezza : -2
				, variazioneCostituzione : 4
				, variazioneArmaturaNaturale : 2
			};
		}
		, getInfoRiduzione:function(){
			return {
				taglia : Taglia.PICCOLA
				, variazioneForza : -4
				, variazioneDestrezza : 2
				, variazioneCostituzione : -2
				, variazioneArmaturaNaturale : 0
			};		
		}		
	}
	, GRANDE:{
		descrizione : "GRANDE"
                , value : 5
		,modificatoreAttacco : -1
		, modificatoreClasseArmatura : -1
		, modificatoreLotta : 4
		, modificatoreSbilanciare : 4
		, getInfoIngrandimento:function(){
			return {
				taglia : Taglia.ENORME
				, variazioneForza : 8
				, variazioneDestrezza : -2
				, variazioneCostituzione : 4
				, variazioneArmaturaNaturale : 3
			};
		}
		, getInfoRiduzione:function(){
			return {
				taglia : Taglia.MEDIA
				, variazioneForza : -8
				, variazioneDestrezza : 2
				, variazioneCostituzione : -4
				, variazioneArmaturaNaturale : -2
			};		
		}
	}
	, ENORME:{
		descrizione : "ENORME"
                , value : 6
		,modificatoreAttacco : -2
		, modificatoreClasseArmatura : -2
		, modificatoreLotta : 8
		, modificatoreSbilanciare : 8
		, getInfoIngrandimento:function(){
			return {
				taglia : Taglia.MASTODONTICA
				, variazioneForza : 8
				, variazioneDestrezza : 0
				, variazioneCostituzione : 4
				, variazioneArmaturaNaturale : 4
			};
		}
		, getInfoRiduzione:function(){
			return {
				taglia : Taglia.GRANDE
				, variazioneForza : -8
				, variazioneDestrezza : 2
				, variazioneCostituzione : -4
				, variazioneArmaturaNaturale : -3
			};		
		}	
	}
	, MASTODONTICA:{
		descrizione : "MASTODONTICA"
                , value : 7
		,modificatoreAttacco : -4
		, modificatoreClasseArmatura : -4
		, modificatoreLotta : 12
		, modificatoreSbilanciare : 12
		, getInfoIngrandimento:function(){
			return {
				taglia : Taglia.COLOSSALE
				, variazioneForza : 8
				, variazioneDestrezza : 0
				, variazioneCostituzione : 4
				, variazioneArmaturaNaturale : 5
			};
		}
		, getInfoRiduzione:function(){
			return {
				taglia : Taglia.ENORME
				, variazioneForza : -8
				, variazioneDestrezza : 0
				, variazioneCostituzione : -4
				, variazioneArmaturaNaturale : -4
			};		
		}	
	}
	, COLOSSALE:{
		descrizione : "COLOSSALE"
                , value : 8
		,modificatoreAttacco : -8
		, modificatoreClasseArmatura : -8
		, modificatoreLotta : 16
		, modificatoreSbilanciare : 16
		, getInfoIngrandimento:function(){
			throw 'Impossibile ingrandire una creatura oltre la taglia "Colossale"';
		}
		, getInfoRiduzione:function(){
			return {
				taglia : Taglia.MASTODONTICA
				, variazioneForza : -8
				, variazioneDestrezza : 0
				, variazioneCostituzione : -4
				, variazioneArmaturaNaturale : -5
			};		
		}	
	}        
};