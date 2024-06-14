import express from 'express';
import multer from 'multer';
import * as fs from 'fs';
import path from 'path';

// Configurazione di multer per gestire il caricamento dei file
const upload = multer({ dest: 'uploads/' });

const app = express();
const port = 3000;

// Servire il file HTML
app.use(express.static(path.join(__dirname, 'public')));

// Funzione per leggere un file
function readFile(filePath: string): string {
    return fs.readFileSync(filePath, 'utf-8');
}

// Funzione per contare le parole, lettere, spazi e parole ripetute
/* probabilmente si potrebbe avere un migliore risultato usando delle regexp */
/* ex:
    const words = text.split(/\s+/);
    const wordCount = words.length;
    const letterCount = text.replace(/\s+/g, '').length;
    const spaceCount = (text.match(/\s/g) || []).length;
*/
function analyzeText(text: string) {
    let wordCount = 0;
    let letterCount = 0;
    let spaceCount = 0;
    const wordFrequency: { [key: string]: number } = {};

    let currentWord = '';
    for (let char of text) {
        if (char === ' ' || char === '\n' || char === '\t') {
            if (currentWord.length > 0) {
                wordCount++;
                const cleanedWord = currentWord.toLowerCase();
                wordFrequency[cleanedWord] = (wordFrequency[cleanedWord] || 0) + 1;
                currentWord = '';
            }
            if (char === ' ') {
                spaceCount++;
            }
        } else {
            if (char.toLowerCase() >= 'a' && char.toLowerCase() <= 'z') {
                letterCount++;
                currentWord += char;
            }
        }
    }

    // Per gestire l'ultima parola se non seguita da uno spazio
    if (currentWord.length > 0) {
        wordCount++;
        const cleanedWord = currentWord.toLowerCase();
        wordFrequency[cleanedWord] = (wordFrequency[cleanedWord] || 0) + 1;
    }

    const frequentWords = Object.entries(wordFrequency)
        .filter(([_, count]) => count > 10)
        .map(([word, count]) => ({ word, count }));

    return { wordCount, letterCount, spaceCount, frequentWords };
}

// Servire il file HTML quando si accede alla root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'index.html'));
});


// Endpoint per il caricamento del file
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('Nessun file caricato.');
    }

    const filePath = path.resolve(req.file.path);
    const text = readFile(filePath);
    const analysisResult = analyzeText(text);

    // Rimuove il file caricato dopo l'elaborazione
    fs.unlinkSync(filePath);

    res.json(analysisResult);
});

app.listen(port, () => {
    console.log(`Server in ascolto su http://localhost:${port}`);
});

export default app;
