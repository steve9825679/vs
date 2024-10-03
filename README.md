## Volksschul APP

## Module

- Kleines 1x1 Training Training
- Addition im 10er Raum / 20er Raum / 50er Raum / 100er Raum ohne Über/Unterschreitungen

var bereich_max
Zufallszahl im gewählten Zahlenbereich bis [0, bereich_max]
Bestimmen der Einer-Stelle
Bestimmen maximaler Summand max_summand
Summand als Zufallszahl aus 0...max_summand
  
- Multiplikation kleines 1x1 gemischt
- Über-/Unterschreitungen im 20er Raum / 50er Raum / 100er Raum
- 100er Feld: Ausgangszahl, 3+ Pfeile > Ergebnis
- Division "in": Wieviel ist 3 in 12, etc im 20er RAum / 50er Raum / 100er Raum mit Zahlen von 2 bis 10

## Einrichten App am Webserver

### Datenbankserver

(- Unix Benutzer anlegen: sudo adduser vs, Passwort das DB-Passwort  --- ist nicht notwendig, wenn pg_hba via md5 geht)
- Wechseln auf postgres-Benutzer: sudo -i -u postgres
- Anlegen Postgres-Benutzer vs: createuser --interactive, vs, SuperUser Ja
- Passwort für vs vergeben: alter user cs with password 'abcde';
- psql
- create database vs owner vs encoding "utf-8";
- exit
- exit

- /etc/postgresql/15/main/pg_hba.conf  > Benutzer eintragen

### Webserver

- nginx config laut laravel-doku
- für vite-asstes braucht sowohl proxy als auch webserver ein SSL-Zertifikat (!!)
