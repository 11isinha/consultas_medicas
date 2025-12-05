const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Inicializar Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Rota teste
app.get('/', (req, res) => {
  res.json({ mensagem: 'API funcionando 🎉!' });
});



// GET - Buscar todas as consultas --lista
// =========================================
app.get('/consultas', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('consultas')
      .select('*');

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});


// GET - Buscar consulta por ID - lista por id
// =========================================
app.get('/consultas/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('consultas')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});



// POST - Criar nova consulta
// =========================================
app.post('/consultas', async (req, res) => {
  try {
    const { paciente, medico, data, hora, status } = req.body;

    const { data: result, error } = await supabase
      .from('consultas')
      .insert([{ paciente, medico, data, hora, status }])
      .select();

    if (error) throw error;

    res.json(result);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});


// PUT - Atualizar consulta
// =========================================
app.put('/consultas/:id', async (req, res) => {
  try {
    const { paciente, medico, data, hora, status } = req.body;

    const { data: result, error } = await supabase
      .from('consultas')
      .update({ paciente, medico, data, hora, status })
      .eq('id', req.params.id)
      .select();

    if (error) throw error;

    res.json(result);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});


// DELETE - Deletar consulta
// =========================================
app.delete('/consultas/:id', async (req, res) => {
  try {
    const { error } = await supabase
      .from('consultas')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;

    res.json({ mensagem: 'Consulta deletada com sucesso!' });
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});


// Iniciar servidor -- porta 3000!
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
