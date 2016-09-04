CreatureManager.addDecoratoreTiroSalvezza(
        /**
         * 
         * @param {Creature} creature
         * @param {Creature.tiroSalvezza} tiroSalvezza
         * @returns {undefined}
         */function(creature, tiroSalvezza) {

            if (tiroSalvezza.tipo === TiroSalvezza.VOLONTA && creature.hasTalento("Volontà di ferro") ) {
                console.log("applica talento 'Volontà di ferro'");
                tiroSalvezza.addBonus("Volontà di ferro", TipoBonus.POTENZIAMENTO, 2);
            }

            return tiroSalvezza;

        }
);