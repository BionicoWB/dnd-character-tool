CreatureManager.addDecoratoreAttacco(
        /**
         * 
         * @param {Creature} creature
         * @param {String} attacco
         * @returns {undefined}
         */function(creature, attacco) {

            if (creature.hasTalento("Arma accurata") && (attacco.naturaArma === NaturaArma.NATURALE || attacco.pesoArma === PesoArma.LEGERA)) {
                console.log("applica talento 'Arma accurata'");
                attacco.tiroPerColpire = attacco.tiroPerColpire - creature.getModificatoreForza() + creature.getModificatoreDestrezza();
            }

            return attacco;

        }
);