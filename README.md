## Volksschul APP

## Module

- Kleines 1x1 Training Training

ist fertig
  
- Addition im 10er Raum / 20er Raum / 50er Raum / 100er Raum ohne Über/Unterschreitungen

var bereich_max
Zufallszahl im gewählten Zahlenbereich bis 0...bereich_max
Bestimmen der Einer-Stelle
Bestimmen maximaler Summand max_summand
Summand als Zufallszahl aus 0...max_summand
  
- Multiplikation kleines 1x1 gemischt

var zz1, zz2 mit zz1 und zz2 0...10
  
- Überschreitungen im 20er Raum / 50er Raum / 100er Raum ... 

var bereich_max
Zufallszahl zz1 im gewählten Zahlenbereich 0...bereich_max-10
Summand Zufallszahl zz2 so bestimmen, dass nächster Zehner überschritten, übernächster Zehner aber nicht überschritten wird

- Unterschreitungen im 20er Raum / 50er Raum / 100er Raum ... 

var bereich_max
Zufallszahl zz1 im gewählten Zahlenbereich 10...bereich_max
Minuend Zufallszahl zz2 so bestimmen, dass voriger Zehner unterschritten, vor-voriger Zehner aber nicht unterschritten wird

- 100er Feld: Ausgangszahl, 3+ Pfeile > Ergebnis

100er Feld ist

```
  1   2   3   4   5   6   7   8   9  10
 11  12  13  14  15  16  17  18  19  20
 21  22 ...
 ...
 91  92  93  94  95  96  97  98  99 100
```
Zufallszahl aus diesem Zahlenfeld
2 bis 6 Pfeile (variabel?) Pfeile ob, re, un, li so, dass man das Zahlenfeld nicht verlässt
Gesucht ist die Ergebniszahl, wenn man den Pfeilen folgt
  
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
