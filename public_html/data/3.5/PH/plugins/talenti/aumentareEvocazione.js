EvocationManager.addPlugin({key: "aumentareEvocazione", text: "Aumentare evocazione", action: function() {

        console.log("applica talento 'Aumentare Evocazione'");

        if (!this.evocazioneAumentata) {

            this.setForza(this.getForza() + 4);
            this.setCostituzione(this.getCostituzione() + 4);
            
            this.evocazioneAumentata = true;
        } else {

            this.setForza(this.getForza() - 4);
            this.setCostituzione(this.getCostituzione() - 4);
            
            this.evocazioneAumentata = false;
        }

    }});