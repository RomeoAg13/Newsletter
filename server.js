const express = require('express');
const { Client } = require('pg');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'testaaron',
    user: "postgres",
    password: '1234',
});

client.connect(err => {
    if (err) {
        console.log('Échec de la connexion à la base de données:', err.stack);
    } else {
        console.log("Connecté à la base de données");
    }
});

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});

app.post('/', (req, res) => {
    const { email } = req.body;
    const query = 'INSERT INTO email(email) VALUES ($1)';
    client.query(query, [email], (error, result) => {
        if (error) {
            console.error('Erreur lors de l\'insertion de l\'email:', error);
            res.status(500).send("Erreur lors de l'enregistrement");
        } else {
            console.log("Email ajouté avec succès");
            res.send("Inscription réussie");
        }
    });
});

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
