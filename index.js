const express = require('express');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const app = express();
const PORT = 8082;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

app.use(express.json());

app.get('/', (req, res) => {
    console.log('Bienvenidos al API');
    res.send('HOLA');
});

app.get('/recetas', async (req, res) => {
    const { data, error } = await supabase.from('recetas').select('*');

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.json(data);
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
