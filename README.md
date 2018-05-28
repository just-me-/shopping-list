# WG Planner

Dieses App, welches in Meteor geschrieben wurde, erlaubt es WG interne Organisationen zentral zu verwalten. 
Die umfässt derzeitig eine Einkaufsliste sowie die Möglichkeit, dass Mitglieder sich für das Kochen anbestimmten Tagen eintragen können und andere sich dafür an- bzw. abmelden können. 
Weitere FUnktionen wie beispielsweise Statistiken werden noch folgen. 

## 1. Installation auf dem Host Uberspace (einmalig) 

### Variablen

```
VAR_SERVER_DIR = Pfad zum dir, wo die Meteor-App liegt. (nicht im Web-Bereich!) z.B. "meteor-apps/myapp", welches man unter ~/ ablegt. 
VAR_SERVICENAME = Name des Services, welches das App ausfürht. z.B "meteor-myapp"

VAR_PORT := in Punkt 1
VAR_PORTNR_MONGODB := in Punkt 6
```

### 1. Port öffnen

Öffnen eines Ports für websocket: 
```
$ uberspace-add-port -p tcp --firewall
All good! Opened port 64995, tcp protocol(s).
```
Den geöffneten Port notieren => VAR_PORT := 64995

### 2. Services aktivieren 

```
$ test -d ~/service || uberspace-setup-svscan 
```

### 3. Weiterleitung einrichten für eingehende Verbindungen 

Im htacces des Web-dirs ~/html/.htaccess :

```
RewriteEngine On
RewriteRule ^(.*)$ http://localhost:VAR_PORT/$1 [P]
```

### 4. Setup npm

```
$ cat > ~/.npmrc <<__EOF__
prefix = $HOME
umask = 077
__EOF__
```

### 5. Setup meteor service

```
$ uberspace-setup-service VAR_SERVICENAME node ~/VAR_SERVER_DIR/bundle/main.js 
```

### 6. Setup mongo - falls nicht bereits vorhanden 

```
$ uberspace-setup-mongodb 

Hostname: localhost
Portnum#: 21045
Username: username_mongoadmin
Password: XXXXXXXXXX
```
VAR_PORTNR_MONGODB := 21045

Mit der DB verbinden: 

```
$ mongo admin --port 21045 -u username_mongoadmin -p
```

### 7. Datenbankbenutzer hinzufügen

```
use myapp_prod
db.createUser(
    {
      user: "myapp_prod",
      pwd: "mein_geheimes_PW",
      roles: [
         { role: "readWrite", db: "myapp_prod" },
         { role: "dbAdmin", db: "myapp_prod" }
      ]
    }
)
```

### 8. Setup meteor service Variablen in ~/service/VAR_SERVICENAME/run

```
export DISABLE_WEBSOCKETS=1
#OR
export DDP_DEFAULT_CONNECTION_URL=http://username.subdomain.uberspace.de:VAR_PORT/

export ROOT_URL='http://username.subdomain.uberspace.de/'
export PORT=VAR_PORT
export MONGO_URL='mongodb://myapp_prod:mein_geheimes_PW@localhost:VAR_PORTNR_MONGODB/myapp_prod'
```

### Weitere Informationen 
Mehr Infos zu dem Prozess findest Du [hier](https://github.com/retani/uberspace-meteor). 
Für HTTPS klicke bitte [hier](https://delta.civilian.eu/civilianeu/migma-proxy).

## Aktualisierungen auf dem Host Uberspace 

### Auf der lokalen Entwicklungsumgebung
Als erstes müssen wir das Meteor-Projekt aufbereiten: 

```
meteor build --architecture os.linux.x86_64 ../build
```
Dieses erstellte ZIP lädst Du nun auf Deinen Uberspace hoch. Und zwar unter ~/VAR_SERVER_DIR

### Auf dem Server
Paket entpacken: 
```
tar -xzf app.tar.gz
cd ~/VAR_SERVER_DIR/build/bundle/programs/server/
npm install
svc -du ~/service/VAR_SERVICENAME
```
Wenn nun alles läuft, kannst Du das ZIP und ggf das Backup der vorherigen Version löschen. 

