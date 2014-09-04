function Creature(basicObject) {

    if(typeof basicObject === 'string'){
        basicObject = CreatureManager.getDefinizione(basicObject);
    }

    var proprieta = $.extend(true, {}, basicObject);

    var danni = 0;

    this.hasTalento = function(key, parameter) {

        console.debug(" Verifica talento '" + key + "'");        

        for (var i = 0; i < proprieta.talenti.length; i++) {
            if (proprieta.talenti[i].key === key) {
                if (!parameter || verificaParametri(i, parameter)) {
                    return true;
                }
            }
        }

        return false;

        function verificaParametri(index, parameter) {

            console.debug(" Verifica parametri talento '" + parameter + "'");

            for (var j = 0; j < proprieta.talenti[index].parameter.length; j++) {
                if (proprieta.talenti[index].parameter[j] !== parameter[j]) {
                    return false;
                }
            }

            return true;
        }
    };

    this.getNome = function() {
        return proprieta.nome;
    };

    this.getTaglia = function() {
        return proprieta.taglia;
    };

    this.setTaglia = function(value) {
        proprieta.taglia = value;
    };

    this.getVelocita = function() {
        return proprieta.velocita;
    };

    this.getCaratteristica = function(key) {
        return proprieta.caratteristiche[key];
    };

    this.setCaratteristica = function(key, value) {
        proprieta.caratteristiche[key] = value;
    };

    this.getModificatoreCaratteristica = function(key) {
        return Math.floor((this.getCaratteristica(key) - 10) / 2);
    };

    this.getForza = function() {
        return this.getCaratteristica(Caratteristica.FORZA);
    };

    this.setForza = function(value) {
        return this.setCaratteristica(Caratteristica.FORZA, value);
    };

    this.getModificatoreForza = function() {
        return this.getModificatoreCaratteristica(Caratteristica.FORZA);
    };

    this.getCostituzione = function() {
        return this.getCaratteristica(Caratteristica.COSTITUZIONE);
    };

    this.setCostituzione = function(value) {
        return this.setCaratteristica(Caratteristica.COSTITUZIONE, value);
    };

    this.getModificatoreCostituzione = function() {
        return this.getModificatoreCaratteristica(Caratteristica.COSTITUZIONE);
    };

    this.getDestrezza = function() {
        return this.getCaratteristica(Caratteristica.DESTREZZA);
    };

    this.setDestrezza = function(value) {
        return this.setCaratteristica(Caratteristica.DESTREZZA, value);
    };

    this.getModificatoreDestrezza = function() {
        return this.getModificatoreCaratteristica(Caratteristica.DESTREZZA);
    };

    this.getIntelligenza = function() {
        return this.getCaratteristica(Caratteristica.INTELLIGENZA);
    };

    this.setIntelligenza = function(value) {
        return this.setCaratteristica(Caratteristica.INTELLIGENZA, value);
    };

    this.getModificatoreIntelligenza = function() {
        return this.getModificatoreCaratteristica(Caratteristica.INTELLIGENZA);
    };

    this.getSaggezza = function() {
        return this.getCaratteristica(Caratteristica.SAGGEZZA);
    };

    this.setSaggezza = function(value) {
        return this.setCaratteristica(Caratteristica.SAGGEZZA, value);
    };

    this.getModificatoreSaggezza = function() {
        return this.getModificatoreCaratteristica(Caratteristica.SAGGEZZA);
    };

    this.getCarisma = function() {
        return this.getCaratteristica(Caratteristica.CARISMA);
    };

    this.setCarisma = function(value) {
        return this.setCaratteristica(Caratteristica.CARISMA, value);
    };

    this.getModificatoreCarisma = function() {
        return this.getModificatoreCaratteristica(Caratteristica.CARISMA);
    };

    this.getDadiVita = function() {
        return proprieta.dadiVita.numero + 'd' + proprieta.dadiVita.tipo + ' + ' + (this.getModificatoreCostituzione() * proprieta.dadiVita.numero);
    };

    this.getPuntiFerita = function() {
        return Math.floor((proprieta.dadiVita.tipo + 1) / 2 * proprieta.dadiVita.numero) + (this.getModificatoreCostituzione() * proprieta.dadiVita.numero);
    };

    this.setDanni = function(value) {
        danni = value;
    };

    this.getDanni = function() {
        return danni;
    };

    this.getArmaturaNaturale = function() {
        return proprieta.armaturaNaturale;
    };

    this.setArmaturaNaturale = function(value) {
        proprieta.armaturaNaturale = value;
    };

    this.getClasseArmatura = function() {
        return 10 + proprieta.taglia.modificatoreClasseArmatura + this.getModificatoreDestrezza() + proprieta.armaturaNaturale;
    };

    this.getClasseArmaturaContatto = function() {
        return 10 + proprieta.taglia.modificatoreClasseArmatura + this.getModificatoreDestrezza();
    };

    this.getClasseArmaturaSprovvista = function() {
        return 10 + proprieta.taglia.modificatoreClasseArmatura + proprieta.armaturaNaturale;
    };   
    
    /**
     * 
     * @param {TiroSalvezza} tiroSalvezza
     * @returns {undefined}
     */
    this.getTiroSalvezza = function(tiroSalvezza){
        
        var caratteristicaRiferimento = getCaratteristicaRiferimento();
        
        var tiroSalvezza = {
            tipo : tiroSalvezza
            , base : proprieta.tiriSalvezza[tiroSalvezza]
            , caratteristica : {
                key : caratteristicaRiferimento
                , value : this.getModificatoreCaratteristica(caratteristicaRiferimento)
            }
            , bonus : {}
            /**
                    * 
                    * @param {String} source - l'elemento che fornisce il bonus (talento, oggetto, incantesimo etc..)
                    * @param {TipoBonus} tipoBonus
                    * @param {Integer} valore
                    * @returns {undefined}
                    */
            , addBonus : function(tipoBonus, source, value){
                if(!this.bonus[tipoBonus]){
                    this.bonus[tipoBonus] = [{source: source, value: value}];
                }else{
                    this.bonus[tipoBonus].push({source: source, value: value});
                }
            } 
            , getValoreBase : function(){
                return this.base;
            }
            /**
                    * per ogni tipo di bonus recupero il valore maggiore e lo sommo al dato base ed al modificatorei di caratteristica
                    * @returns {undefined}
                    */
            , getValore : function(){
                var totale = this.base + this.caratteristica.value;
                
                for(var key in this.bonus){
                    var maxValue = 0;
                    for(var i=0; i< this.bonus[key].length; i++){
                        maxValue = maxValue < this.bonus[key][i].value ? this.bonus[key][i].value : maxValue;
                    }
                    totale = totale + maxValue;
                }
                
                return totale;
            }
        };
        
        applicaDecoratoriTiroSalvezza(this, tiroSalvezza);
                
        return tiroSalvezza;
        
        function getCaratteristicaRiferimento(){
            switch(tiroSalvezza){
                case TiroSalvezza.TEMPRA:return Caratteristica.COSTITUZIONE;
                case TiroSalvezza.RIFLESSI:return Caratteristica.DESTREZZA;
                case TiroSalvezza.VOLONTA:return Caratteristica.SAGGEZZA;
            }            
        }
        
        function applicaDecoratoriTiroSalvezza(creature, tiroSalvezza){
            var decoratori = CreatureManager.getDecoratoriTiroSalvezza();
            for (var i = 0; i < decoratori.length; i++) {
                tiroSalvezza = decoratori[i](creature, tiroSalvezza);
            }
            return tiroSalvezza;            
        }
    };   

    this.getAttaccoBase = function() {
        return proprieta.attaccoBase;
    };

    this.getBonusAttacco = function() {
        return proprieta.attaccoBase + proprieta.taglia.modificatoreAttacco;
    };

    this.getBonusLotta = function() {
        return proprieta.attaccoBase + proprieta.taglia.modificatoreLotta + this.getModificatoreForza();
    };

    this.getBonusSbilanciare = function() {
        return proprieta.taglia.modificatoreSbilanciare + this.getModificatoreForza();
    };

    this.getCountAttacchi = function(tipoAttacco, livelloAttacco) {
        return proprieta.attacchi[tipoAttacco][livelloAttacco].length;
    };

    this.getListAttacchi = function(tipoAttacco, livelloAttacco) {
        if (!proprieta.attacchi[tipoAttacco] || !proprieta.attacchi[tipoAttacco][livelloAttacco]) {
            return [];
        }

        var attacchi = proprieta.attacchi[tipoAttacco][livelloAttacco];


        for (var i = 0; i < attacchi.length; i++) {
            attacchi[i].tipo = tipoAttacco;
            attacchi[i].livello = livelloAttacco;
            attacchi[i].danno.bonus = 0;

            switch (tipoAttacco) {
                case TipoAttacco.MISCHIA:
                    attacchi[i].tiroPerColpire = this.getBonusAttacco() + this.getModificatoreForza();
                    attacchi[i].danno.bonus = this.getModificatoreForza();
                    break;
                case TipoAttacco.DISTANZA:
                    attacchi[i].tiroPerColpire = this.getBonusAttacco() + this.getModificatoreDestrezza();
                    break;
                default:
                    attacchi[i].tiroPerColpire = this.getBonusAttacco();
            }

            attacchi[i] = applicaDecoratoriAttacco(this, attacchi[i]);
        }

        return attacchi;
        
        function applicaDecoratoriAttacco(creature, attacco) {
            var decoratori = CreatureManager.getDecoratoriAttacco();
            for (var i = 0; i < decoratori.length; i++) {
                attacco = decoratori[i](creature, attacco);
            }
            return attacco;
        };        
    };

    this.hasAttacchi = function(tipoAttacco) {
        return (proprieta.attacchi[tipoAttacco] ? true : false);
    };

    this.getAttacchi = function(tipoAttacco) {
        return {
            PRIMARIO: this.getListAttacchi(tipoAttacco, LivelloAttacco.PRIMARIO)
            , SECONDARIO: this.getListAttacchi(tipoAttacco, LivelloAttacco.SECONDARIO)
        };
    };
    
};