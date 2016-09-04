CreatureManager.addDecoratoreAttacco(
        /**
         * 
         * @param {Creature} creature
         * @param {String} attacco
         * @returns {undefined}
         */function(creature, attacco) {

            if (NaturaArma.NATURALE === attacco.naturaArma) {
                console.log("applica 'Arma naturale'");


                if (LivelloAttacco.PRIMARIO === attacco.livello && TipoAttacco.MISCHIA === attacco.tipo && creature.getCountAttacchi(TipoAttacco.MISCHIA, LivelloAttacco.PRIMARIO) === 1) {                 
                    console.debug("applica 'Arma naturale' - forza +1.5 per attacco primario singolo");
                    attacco.danno.bonus = attacco.danno.bonus - creature.getModificatoreForza() + Math.floor(creature.getModificatoreForza()*1.5);
                    
                }
                
                if (LivelloAttacco.SECONDARIO === attacco.livello) {
                    console.debug("applica 'Arma naturale' - tpc -5 per attacco secondario");
                    attacco.tiroPerColpire = attacco.tiroPerColpire - 5;
                    
                    if(TipoAttacco.MISCHIA === attacco.tipo){
                        console.debug("applica 'Arma naturale' - anno - forza*0.5 per attacco secondario");
                        attacco.danno.bonus = attacco.danno.bonus - creature.getModificatoreForza() + Math.floor(creature.getModificatoreForza()*0.5);                    
                    }
                }                

            }

            return attacco;

        }
);


