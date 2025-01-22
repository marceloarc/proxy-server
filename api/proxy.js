import fetch from 'node-fetch';

export default async (req, res) => {
    const { url } = req.query;  // Obtém a URL que foi enviada para o proxy

    // Verifique se a URL foi recebida corretamente
    if (!url) {
        return res.status(400).send('URL não fornecida');
    }

    try {
        // Fazendo a requisição para a API Unsplash com a URL fornecida
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Erro ao buscar dados do Unsplash');
        }
        
        // Enviar os cabeçalhos CORS apropriados para permitir o acesso do seu frontend
        res.setHeader('Access-Control-Allow-Origin', '*'); // Permite qualquer origem
        res.setHeader('Access-Control-Allow-Methods', 'GET'); // Permite o método GET
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Permite o Content-Type header

        // Retorna os dados ao frontend após processar a requisição
        const data = await response.json();
        res.json(data); // Retorna os dados ao cliente
    } catch (error) {
        // Em caso de erro, envia uma resposta apropriada
        res.status(500).json({ error: error.message });
    }
};
