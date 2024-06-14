/* sono due piccoli test unitari verificherò giusto caricamento del file e struttura del json e invio del file html */
const request = require('supertest');
const app = require('../dist/app').default; // Importa l'applicazione Express

describe('Server Express', () =>
{
    it('Dovrebbe rispondere con il file HTML sulla rotta /', (done) =>
    {
        request(app)
            .get('/')
            .expect(200)
            .expect('Content-Type', 'text/html; charset=UTF-8')
            .end((err, res) =>
            {
                if (err) return done(err);
                done();
            });
    });

    it('Dovrebbe gestire correttamente il caricamento del file e restituire i risultati', (done) =>
    {
        const filePath = 'test/test.txt'; // Assicurati che il percorso al file di test sia corretto

        request(app)
            .post('/upload')
            .attach('file', filePath)
            .expect(200)
            .end((err, res) =>
            {
                if (err) return done(err);

                // Verifica che il corpo della risposta contenga le proprietà attese
                if (!res.body.wordCount || !res.body.letterCount || !res.body.spaceCount || !res.body.frequentWords)
                {
                    return done(new Error('Response body does not contain expected properties'));
                }

                done();
            });
    });
});
