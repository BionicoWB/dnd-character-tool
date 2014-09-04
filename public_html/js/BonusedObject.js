function BonusedObject(creature, base){      
    
    this.base = (base ? base : 0);
    
    this.caratteristicheBonus = [/*{key: , moltiplicatore}*/];   
    
    this.caratteristicheBonus.indexOf = function(key){        
        for(var i=0; i<this.length; i++){
            if(key === this[i].key){
                return i;
            }
        }
        return -1;    
    };   
    
    this.bonus = {};
    
    this.getCreature = function(){
        return creature;
    };
    
    this.getBase = function(){
        return this.base;
    };
    
    this.setBase = function(value){
        this.base = value;
    };
    
    this.getCaratteristiche = function(){
        return this.caratteristicheBonus;
    };
        
    this.hasCaratteristica = function(key){        
        return (this.caratteristicheBonus.indexOf(key) >= 0 ? true : false);
    };
    
    this.addCaratteristica = function(caratteristica, moltiplicatore){
        if(caratteristica){
            if(typeof caratteristica === 'string'){
                caratteristica = {key:caratteristica};
            }
            
            if(!caratteristica.moltiplicatore){
                caratteristica.moltiplicatore = (!moltiplicatore ? 1 : moltiplicatore);
            }
            this.caratteristicheBonus.push(caratteristica);
        }        
    };
    
    this.removeCaratteristica = function(value){
        this.caratteristicheBonus.slice(this.CARATTERISTICHE.indexOf(value), 1);
    };
    
    this.addBonus = function(key, bonus){
        console.log("add bonus " + key);
        if(!this.bonus[key]){
            console.log("add key bonus " + key);
            this.bonus[key] = [];
        }
        this.bonus[key].push(bonus);
    };
    
    this.removeBonus = function(key, bonus){
        console.log("remove key bonus " + key);                       
        delete this.bonus[key];            
    };
    
    this.addNamelessBonus = function(bonus){    
        bonus.cumulabile = true;
        this.addBonus("NAMELESS", bonus);
    };
    
    this.getBonusType = function(key){
        if(!this.bonus[key]){
            this.bonus[key] = [];
        }
        return this.bonus[key];		
    };
    
    this.getBonusSum = function(key){            
        return this.getBonusBestValue(key) + this.getBonusSumCumulabili(key);
    };
    
    this.getBonusBestValue = function(key){
        var bestValue = 0;
        var values = this.getBonusType(key);
        for(var i=0; i<values.length; i++){
            bestValue = (!values[i].cumulabile && bestValue < values[i].value ?  values[i].value : bestValue);
        }
        return bestValue;
    };
    
    this.getBonusSumCumulabili = function(key){
        var tot = 0;
        
        var values = this.bonus[key];
        for(var i=0; i<values.length; i++){
            tot = tot + (values[i].cumulabile ? values[i].value : 0);
        }
        return tot;            
    };
    
    this.getBonusCaratteristica = function(key){
        return this.getCreature().getModificatoreCaratteristica(key);
    };
    
    this.getBonusCaratteristiche = function(){
        var total = 0;
        var caratteristiche = this.getCaratteristiche();
        for(var i=0; i<caratteristiche.length; i++){
            total = total + (creature.getModificatoreCaratteristica(caratteristiche[i].key) * caratteristiche[i].moltiplicatore);
        }            
        return total;
    };
    
    this.getValue = function(){
        var total = this.base + this.getBonusCaratteristiche();
        
        for(var key in this.bonus){
            total = total + this.getBonusSum(key);
        }
        
        return total;
    };
    
};