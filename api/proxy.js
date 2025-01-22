// API proxy handler para fazer a requisição ao Unsplash com o client_id na URL.

import fetch from 'node-fetch';

export default async (req, res) => {
    const { url } = req.query; // Obtém a URL da requisição

    if (!url) {
        return res.status(400).send('URL não fornecida');
    }

    try {
        // Chamada ao Unsplash com o client_id na URL
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Erro ao buscar dados do Unsplash');
        }

        const data = await response.json();
        res.json(data); // Retorna os dados para o frontend
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
