var app = {
    init: function() {

        ProfileManager.load("data/profili/35base.json", function(){
         ProfileManager.loadContenuto("35base");
         });

        app.render.init();
        app.prototipi.init();
        app.dialog.init();

        app.bind();
        //alert("funzioner?",function(){alert(0);},function(){alert(1);});
    }

    , bind: function() {
    }
    
    , loadPlugin: function(url) {
        console.log("Loading plugin - " + url);
        $('head').append("<script type='text\/javascript' src='" + url + "' language='JavaScript'><\/script>");
    }

    , render: {
        vars: {}

        , init: function() {

            $.views.tags({
                setvar: function(key, value) {
                    app.render.vars[key] = value;
                }
            });

            $.views.helpers({
                getvar: function(key) {
                    return app.render.vars[key];
                }
                , CreatureManager: CreatureManager
            });
        }
    }

    , prototipi: {
        init: function() {
        }

    }

    , dialog: {
        init: function() {
            window.alert = function(msg) {
                $('<div>').simpledialog2({
                    mode: 'button',
                    themeDialog: "a",
                    headerText: 'Alert',
                    headerClose: false,
                    buttonPrompt: msg,
                    buttons: {
                        'OK': {
                            click: function() {
                            },
                            theme: "a"
                        }
                    }
                });
            };

            window.confirm = function(msg, ok, cancel) {
                $('<div>').simpledialog2({
                    mode: 'button',
                    themeDialog: "a",
                    headerText: 'Confirm',
                    headerClose: false,
                    buttonPrompt: msg,
                    buttons: {
                        'OK': {
                            click: (typeof ok === 'function' ? ok : function() {
                            }),
                            theme: "a"
                        },
                        'Cancel': {
                            click: (typeof cancel === 'function' ? cancel : function() {
                            }),
                            icon: "delete",
                            theme: "a"
                        }
                    }
                });
            };
        }
    }

    , dice: {
        roll: function(faces) {
            return Math.floor(Math.random() * faces) + 1;
        }

        , attack: function(bonusAttacco, numeroDanni, tipoDanni, bonusDanni) {

            var total = 0;
            var str = "";
            for (var i = 0; i < numeroDanni; i++) {
                var dado = app.dice.roll(tipoDanni);
                str += dado + " + ";
                total = total + dado;
            }

            total = total + bonusDanni;

            return "tpc: " + (app.dice.roll(20) + bonusAttacco) + "; dmg: " + str + bonusDanni + " = " + total;
        }
    }




};
