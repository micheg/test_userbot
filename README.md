# Test Tecnico userbot

## Premessa 1

Darò per scontato che la macchina su cui si esegue questo pacchetto sia una macchina di tipo Linux o *nix equivalente come OSX.
Non ho testato niente su windows.

## Premesssa 2

Non fareo una roba del genere con node, perché uno script bash farebbe già quello che serve.
Giusto per dovere di cronaca nella folder extra si trova lo script shell.

## Installazione

il file package.json dovrebbe contenere tutte le dipendenze quindi dovrebbe essere sufficiente scompattare il pacchetto, entrare nalla directory e procedore ad un install classico.

```bash
tar xvzf test.userbot.tar.gz
cd test_userbot/
npm install
```

Se invece si procede recuperandolo da repository è necessario eseguire:

```bash
git clone git@github.com:micheg/test_userbot.git
cd test_userbot/
npm install
```

## Build e Deploy

Ci sono due fasi, il build da ts a js e la copia dei file statici (anche se al momento ce ne è uno solo)

```bash
npm run build
npm run copy-files
```

## Test

Ci sono due test unitari, molto semplici, per eseguirli, con node spento basta procedere così:

```bash
npm test
```

(i test avviano un'istnaza di express, quindi una volta eseguiti è necessario uscire con CTRL+C)

## Avvio del server

Dopo avere fatto i passi per la build descritti precedentemente è sufficiente avviare il server con:

```bash
npm start
```

Aprire un browser, visitare l'indirizzo http://localhost:3000 e caricare un file.
Non ho utilizzato nessun framework particolare, nel file index ho messo il caricamento da CDN di alcuni framework classless.
Scommentare quello che si preferisce, di base io uso simplecss.


## Design Pattern

Non mi capita spesso con node di usare D.P, ma quelli più comuni: MVC, Middleware, Singleton e Factory Pattern mal si sposano con la semplciità del progetto, forse si poteva fare qualcosa con MVC ma era davvero una forzatura crare un model quando la sorgente di input è un file che non viene in alcun modo salvato e i dati sono solo estratti e non manipolati, quindi per la salute mentale di chi scrive e di chi legge il codice mi sono astenuto da questo passaggio.
