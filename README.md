## Volksschul APP

Eine App für
- Kleines 1x1 Training

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
