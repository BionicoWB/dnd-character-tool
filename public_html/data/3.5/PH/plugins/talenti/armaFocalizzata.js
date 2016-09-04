CreatureManager.addDecoratoreAttacco(
        /**
         * 
         * @param {Creature} creature
         * @param {String} attacco
         * @returns {undefined}
         */function(creature, attacco) {

            if (creature.hasTalento("Arma focalizzata",[attacco.descrizione])) {
                console.log("applica talento 'Arma focalizzata[" + attacco.descrizione + "]'");
                attacco.tiroPerColpire = attacco.tiroPerColpire +1;
            }

            return attacco;

        }
);