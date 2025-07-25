const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/suggestions', async (req, res) => {
  const { formData } = req.body;

  const prompt = `Suggest 3 improvements for this resume summary:\n\n"${formData.summary}"`;

  try {
    const response = await axios.post(
      'https://api.cohere.ai/generate',
      {
        model: 'command',
        prompt: prompt,
        max_tokens: 150,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('✅ Cohere response:', response.data);

    const suggestion =
      response.data.text?.trim() || '⚠️ No suggestions returned from Cohere.';

    res.json({ suggestions: suggestion });
  } catch (err) {
    console.error('❌ Cohere API Error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Cohere AI error or invalid API key.' });
  }
});

app.listen(5000, () => {
  console.log('✅ Server running on http://localhost:5000');
});
