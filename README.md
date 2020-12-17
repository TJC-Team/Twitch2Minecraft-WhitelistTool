# Twitch2Minecraft Whitelist Tool
Mit diesem Tool könnt ihr Subscriber auf euren Server whitelisten lassen. Die User müssen nur `!link <mcname>` eingeben und sie können auf den Server. Mit `!unlink` werden sie von Server gekickt und von der Whitelist entfernt. 

# Installation
Es gibt einige Schritte, die zu tun sind:


1) Erstellt eine MySQL Datenbank. In dieser werden 2 Tabellen benötigt.
- queue
- whitelist_amonguff


In `queue` benötigen wir 4 Spalten:
- id (A_I auswählen)
- perknum (varchar)
- msg1 (varchar)
- msg2 (varchar)


In `whitelist_amonguff` benötigen wir ebenfalls 4 Spalten:
- id (A_I auswählen)
- twitchname (varchar)
- minecraftname (varchar)
- timestamp (varchar)

2) Aktiviert Rcon auf eurem Minecraft Server. Tutorials dazu findet ihr auf YouTube.

3) Wir benötigen 3 npm Packages.
Installiert sie euch mit `npm i tmi.js mysql2 rcon`

4) Geht in die config.json und füllt alle Daten aus. 
`mysqldata` benötigt den Zugang zu euer MySQL Datenbank. 
`bottoken` verlangt euch euch einen oauth eures Botnutzers. Um den Token dafür zu erhalten, geht auf https://twitchapps.com/tmi/ und meldet euch mit dem Botuser an.
`botuser` ist dementsprechend der Username des Bots.
`twitchchannel` gibt an, auf welchen Channel der Bot schauen soll. Wenn ihr selber streamt, gebt ihr hier euren Twitch-Namen an.
`rconip` ist die IP eures Minecraft-Servers.
`rconport` und `rconpw` sind in der Config eures Minecraft-Servers angegeben.

5) Wenn alles richtig eingestellt wurde, könnt ihr das Tool mit der `start.sh`-Datei starten. Das Tool verbindet sich mit allen 3 Diensten.
Gibt ein User einen der beiden Befehle ein, schickt der Bot die Anfrage in die Queue und arbeitet diese nach und nach ab. Das dient dazu, dass der Minecraft-Server mit allen Rcon Befehlen hinterher kommt und keinen User überspringt. Wurde ein User in die Whitelist eingetragen, seht ihr die Verknüpfung in der Datenbank. 

# Nutzung
Die Veröffentlichung des Codes ist hauptsächlich für Lernzwecke gedacht. Wenn ihr den Code für eigene Projekte nutzt, gebt einen Hinweis darauf, dass das Tool speziell für die Projekte von TheJoCraft entwickelt wurde. 
