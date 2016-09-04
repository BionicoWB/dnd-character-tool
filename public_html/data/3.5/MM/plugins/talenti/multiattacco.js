CreatureManager.addDecoratoreAttacco(
        /**
         * 
         * @param {Creature} creature
         * @param {String} attacco
         * @returns {undefined}
         */function(creature, attacco) {

            if (NaturaArma.NATURALE === attacco.naturaArma && LivelloAttacco.SECONDARIO === attacco.livello && creature.hasTalento("Multiattacco")) {
                console.log("applica 'Multiattacco'");
                
                //rimuovo penalità -5, aggiungo la nuova penaltà -2
                attacco.tiroPerColpire = attacco.tiroPerColpire +5 -2;
            }

            return attacco;

        }
);