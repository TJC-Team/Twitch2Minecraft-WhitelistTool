var Rcon = require('rcon');
var mysql = require('mysql2');
var TwitchBot = require("tmi.js");

const {
    mysqldata,
    bottoken,
    botusername,
    twitchchannel,
    rconip,
    rconport,
    rconpw,
} = require('./config.json');

const SQL = mysql.createPool(mysqldata);




/*========== TWITCH CONNECTOR ==========*/


var Twitch;

const opts = {
    identity: {
        username: botusername,
        password: bottoken
    },
    channels: [
        twitchchannel
    ]
}

Twitch = new TwitchBot.client(opts);
Twitch.connect()

Twitch.on("connected", channel => {
    console.log('Twitch: Connected');
});

Twitch.on("join", channel => {
    console.log('Twitch: Channel gejoined');
});

Twitch.on("error", error => {
    console.log('Twitch Error: ' + JSON.stringify(error));
    Twitch.connect()
});

Twitch.on("close", () => {
    console.log('Twitch: Disconnected');
    Twitch.join(twitchchannel)
});




/*========== RCON CONNECTOR ==========*/


var options = {
    tcp: true, // false for UDP, true for TCP (default true)
    challenge: true // true to use the challenge protocol (default true)
};

var inter_reconnect;
var inter_abfrage;
var rcon = new Rcon(rconip, rconport, rconpw, options);

function reconnect() {
    console.log("Versuche, sich mit dem RCON-Server zu verbinden...")
    rcon.connect();
}

rcon.on('auth', function() {
    clearInterval(inter_reconnect)
    console.log("Verbunden!")
    inter_abfrage = setInterval(func_abfrage, 1000)
})

rcon.on('response', function(str) {
    if (!str) {
        return;
    }
    //console.log("<< " + str);
})

function func_abfrage() {
    try {
        //console.log("Abfrage... [" + Date.now() + "]")
    } catch (err) {
        rcon.disconnect();
        console.log(err)
        clearInterval(inter_abfrage)
        console.log("catch.err\nVerbindung unterbrochen!\nVersuche neu zu connecten...")
        inter_reconnect = setInterval(reconnect, 5000)
    }
}

inter_reconnect = setInterval(reconnect, 2500)



/*========== ON COMMAND ==========*/
Twitch.on("message", (channel, chatter, message, self) => {

    if (self || !message.startsWith('!')) return;

    const args = message.slice(1).split(' ');
    const command = args.shift().toLowerCase();

    if (command === "link") {
        
        if (chatter.subscriber == true) {

            if (args[0] == undefined || args[0].length === 0) {
                return
            }

            SQL.execute(
                "SELECT * FROM `queue` WHERE `msg1` = ?", [chatter.username],
                function(err, results, fields) {
                    if (err) {
                        console.log("\n> ERROR > SQL > SELECT_QUEUE@!link\n> " + err + "\n")
                    }

                    if (results.length === undefined || results.length === 0 || results == undefined) {
                        SQL.execute(
                            "INSERT INTO `queue` (`perknum`, `msg1`, `msg2`) VALUES ('1', ?, ?);", [chatter.username, args[0]],
                            function(err, results, fields) {
                                if (err) {
                                    console.log("\n> ERROR > SQL > INSERT_QUEUE@!link\n> " + err + "\n")
                                }
                                console.log("QUEUE ADD => " + chatter.username + " > " + args[0])
                            })
                    } else {
                        return;
                    }
                })

        }
    } else if (command === "unlink") {
 
        if (chatter.subscriber == true) {

            SQL.execute(
                "SELECT * FROM `queue` WHERE `msg1` = ?", [chatter.username],
                function(err, results, fields) {
                    if (err) {
                        console.log("\n> ERROR > SQL > SELECT_QUEUE@!unlink\n> " + err + "\n")
                    }

                    if (results.length === undefined || results.length === 0 || results == undefined) {
                        SQL.execute(
                            "INSERT INTO `queue` (`perknum`, `msg1`, `msg2`) VALUES ('2', ?, ?);", [chatter.username, "-"],
                            function(err, results, fields) {
                                if (err) {
                                    console.log("\n> ERROR > SQL > INSERT_QUEUE@!unlink\n> " + err + "\n")
                                }
                                console.log("QUEUE ADD => " + chatter.username + " > " + args[0])
                            })
                    } else {
                        return;
                    }
                })
        }
    }
});




/*========== QUEUE LOOP ==========*/

var isLoop = false;

function startLoop() {
    if (isLoop === false) {
        //console.log('====> Es wird momentan nichts aus der Queue abgearbeitet!');
        SQL.execute(
            "SELECT * FROM `queue`", [],
            function(err, results, fields) {
                if (err) {
                    console.log("\n> ERROR > SQL > SELECT_QUEUE\n> " + err + "\n")
                }
                if (results.length === undefined || results.length === 0 || results == undefined) {
                    //console.log('==========> Die Queue ist leer');
                    setTimeout(startLoop, 150)
                } else {
                    //console.log('==========> Es gibt was in der Queue!');
                    isLoop = true;
                    var PerkNum = results[0].perknum;
                    var msg1 = results[0].msg1;
                    var msg2 = results[0].msg2;
                    var id = results[0].id;

                    console.log('==========> Führe aus... [' + PerkNum + ' - "' + msg1 + '" - "' + msg2 + '"]');

                    setTimeout(startLoop, 150);

                    switch (PerkNum) {
                        case 1:
                            console.log('=============> Whitelist Add');
                            perk1(id, msg1, msg2.toLowerCase());
                            break;
                        case 2:
                            console.log('=============> Whitelist Remove');
                            perk2(id, msg1);
                            break;
                        default:
                            console.log('=============> default')
                    }
                }

            })
    } else {
        //console.log('====> Es wird gerade eine Anfrage abgearbeitet');
        setTimeout(startLoop, 150)
    }
};




/*========== PERKS ==========*/

function perk1(id, twitchname, mcname) {
    SQL.execute(
        "SELECT * FROM `whitelist_amonguff` WHERE twitchname = ?", [twitchname],
        function(err, results, fields) {
            if (err) {
                console.log("\n> ERROR > SQL > SELECT_TWITCHUSER\n> " + err + "\n")
            }

            if (results.length === undefined || results.length === 0 || results == undefined) {

                rcon.send("whitelist add " + mcname)

                SQL.execute(
                    "INSERT INTO `whitelist_amonguff` (`twitchname`, `minecraftname`, `timestamp`) VALUES (?, ?, ?);", [twitchname, mcname, Date.now()],
                    function(err, results, fields) {
                        if (err) {
                            console.log("\n> ERROR > SQL > INSERT_TWITCHUSER\n> " + err + "\n")
                        }
                        console.log("> " + twitchname + " > " + mcname)
                        Twitch.say(twitchchannel, "/me " + twitchname + " > Der Minecraft Account '" + mcname + "' wurde erfolgreich zur Whitelist hinzugefügt!")
                        DelQueue(id)
                    });
            } else {
                DelQueue(id)
            }
        });


}

function perk2(id, twitchname) {

    SQL.execute(
        "SELECT * FROM `whitelist_amonguff` WHERE twitchname = ?", [twitchname],
        function(err, results, fields) {
            if (err) {
                console.log("\n> ERROR > SQL > SELECT_TWITCHUSER\n> " + err + "\n")
            }

            if (results.length === undefined || results.length === 0 || results == undefined) {
                DelQueue(id)
                return;
            } else {

                mcname = results[0].minecraftname;

                rcon.send("whitelist remove " + mcname)
                rcon.send("kick " + mcname + " Dein Minecraft Account ist nicht mehr mit Twitch verknüpft!")

                SQL.execute(
                    "DELETE FROM `whitelist_amonguff` WHERE `whitelist_amonguff`.`twitchname` = ?", [twitchname],
                    function(err, results, fields) {
                        if (err) {
                            console.log("\n> ERROR > SQL > DELETE_TWITCHUSER\n> " + err + "\n")
                        }
                        console.log("< " + twitchname + " < " + mcname)
                        Twitch.say(twitchchannel, "/me " + twitchname + " > Dein Minecraft Account '" + mcname + "' wurde von der Whitelist entfernt.")
                        DelQueue(id)
                    })
            }
        })


}




/*========== DEL QUEUE ==========*/

function DelQueue(id) {

    SQL.execute(
        "DELETE FROM `queue` WHERE `queue`.`id` = ?", [id],
        function(err, results, fields) {
            if (err) {
                console.log("\n> ERROR > SQL > DELETE_QUEUE\n> " + err + "\n")
            }
            console.log("Queue Gelöscht [" + id + "]")
            isLoop = false
        })

};



/*========== STARTE ALLES ==========*/
setTimeout(startLoop, 5000);