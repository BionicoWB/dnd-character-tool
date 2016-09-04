CreatureManager.addDecoratoreTiroSalvezza(
        /**
         * 
         * @param {Creature} creature
         * @param {Creature.tiroSalvezza} tiroSalvezza
         * @returns {undefined}
         */function(creature, tiroSalvezza) {

            if (tiroSalvezza.tipo === TiroSalvezza.TEMPRA && creature.hasTalento("Tempra possente") ) {
                console.log("applica talento 'Tempra possente'");
                tiroSalvezza.addBonus("Tempra possente", TipoBonus.POTENZIAMENTO, 2);
            }

            return tiroSalvezza;

        }
);