function Collection(){

    this.data = {};
    
    this.put = function(key, val){
        this.data[key] = val;
    };
    
    this.get = function(key){
        return this.data[key];
    };
    
    this.containsKey = function(key){
        return (this.data[key] ? true : false);
    };

    this.size = function(){
        return this.keys().length;
    };
    
    this.keys = function(){
       return this.data.keys();
    };

    this.values = function() {
        var values = [];
        for (key in this.data) {            
            values.push(this.data[key]);
        }
        return values;
    };

    this.filterKeys = function(fun) {
        
        if (typeof fun === 'undefined') {
            return this;
        }

        if (typeof fun !== 'function') {
            throw TypeError();
        }

        var result = new Collection();

        for (key in this.data) {
            if (fun(key, this.data[key])) {
                result.put(key, this.data[key]);
            }
        }

        return result;
    };
};

// inherit Object
Collection.prototype = new Object();

// correct the constructor pointer because it points to Person
Collection.prototype.constructor = Collection;