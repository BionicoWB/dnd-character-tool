var Taglia = {
	PICCOLISSIMA:{
		descrizione : "PICCOLISSIMA"
		, modificatoreAttacco : 8
		, modificatoreClasseArmatura : 8
		, modificatoreLotta : -16
		, modificatoreSbilanciare : -16
		, getTagliaIngrandimento:function(){
			return Taglia.MINUTA;
		}
		, getTagliaRiduzione:function(){
			throw 'Impossibile ridurre una creatura oltre la taglia "Piccolissima"';
		}
	}
	, MINUTA:{
		descrizione : "MINUTA"
		,modificatoreAttacco : 4
		, modificatoreClasseArmatura : 4
		, modificatoreLotta : -12
		, modificatoreSbilanciare : -12
		, getTagliaIngrandimento:function(){
			return Taglia.MINUSCOLA;
		}
		, getTagliaRiduzione:function(){
			return Taglia.PICCOLISSIMA;
		}
	}
	, MINUSCOLA:{
		descrizione : "MINUSCOLA"
		,modificatoreAttacco : 2
		, modificatoreClasseArmatura : 2
		, modificatoreLotta : -8
		, modificatoreSbilanciare : -8
		, getTagliaIngrandimento:function(){
			return Taglia.PICCOLA;
		}
		, getTagliaRiduzione:function(){
			return Taglia.MINUTA;
		}
	}
	, PICCOLA:{
		descrizione : "PICCOLA"
		,modificatoreAttacco : 1
		, modificatoreClasseArmatura : 1
		, modificatoreLotta : -4
		, modificatoreSbilanciare : -4
		, getTagliaIngrandimento:function(){
			return Taglia.MEDIA;
		}
		, getTagliaRiduzione:function(){
			return Taglia.MINUSCOLA;
		}		
	}
	, MEDIA:{
		descrizione : "MEDIA"
		,modificatoreAttacco : 0
		, modificatoreClasseArmatura : 0
		, modificatoreLotta : 0
		, modificatoreSbilanciare : 0
		, getTagliaIngrandimento:function(){
			return Taglia.GRANDE;
		}
		, getTagliaRiduzione:function(){
			return Taglia.PICCOLA;
		}		
	}
	, GRANDE:{
		descrizione : "GRANDE"
		,modificatoreAttacco : -1
		, modificatoreClasseArmatura : -1
		, modificatoreLotta : 4
		, modificatoreSbilanciare : 4
		, getTagliaIngrandimento:function(){
			return Taglia.ENORME;
		}
		, getTagliaRiduzione:function(){
			return Taglia.MEDIA;
		}		
	}
	, ENORME:{
		descrizione : "ENORME"
		,modificatoreAttacco : -2
		, modificatoreClasseArmatura : -2
		, modificatoreLotta : 8
		, modificatoreSbilanciare : 8
		, getTagliaIngrandimento:function(){
			return Taglia.MASTODONTICA;
		}
		, getTagliaRiduzione:function(){
			return Taglia.GRANDE;
		}		
	}
	, MASTODONTICA:{
		descrizione : "MASTODONTICA"
		,modificatoreAttacco : -4
		, modificatoreClasseArmatura : -4
		, modificatoreLotta : 12
		, modificatoreSbilanciare : 12
		, getTagliaIngrandimento:function(){
			return Taglia.COLOSSALE;
		}
		, getTagliaRiduzione:function(){
			return Taglia.ENORME;
		}		
	}
	, COLOSSALE:{
		descrizione : "COLOSSALE"
		,modificatoreAttacco : -8
		, modificatoreClasseArmatura : -8
		, modificatoreLotta : 16
		, modificatoreSbilanciare : 16
		, getTagliaIngrandimento:function(){
			throw 'Impossibile ingrandire una creatura oltre la taglia "Colossale"';
		}
		, getTagliaRiduzione:function(){
			return Taglia.MASTODONTICA;
		}		
	}        
};