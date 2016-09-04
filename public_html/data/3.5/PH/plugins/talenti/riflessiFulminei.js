CreatureManager.addDecoratoreTiroSalvezza(
        /**
         * 
         * @param {Creature} creature
         * @param {Creature.tiroSalvezza} tiroSalvezza
         * @returns {undefined}
         */function(creature, tiroSalvezza) {

            if (tiroSalvezza.tipo === TiroSalvezza.RIFLESSI && creature.hasTalento("Riflessi fulminei") ) {
                console.log("applica talento 'Riflessi fulminei'");
                tiroSalvezza.addBonus("Riflessi fulminei", TipoBonus.POTENZIAMENTO, 2);
            }

            return tiroSalvezza;

        }
);