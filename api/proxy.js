export default async function handler(req, res) {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).json({ error: "No target URL provided" });
  }

  // Para lidar com requisições OPTIONS (preflight request para CORS)
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');
    return res.status(200).end(); 
  }

  try {
    // Passando client_id diretamente via cabeçalhos de autenticação
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', // Para simular um navegador
        'Authorization': 'Client-ID RAXU1PptzmyPgMjOUO0MIO4mELSR-bVCNM_QmAqcVsk' // Adicionando a chave de API corretamente
      }
    });

    const data = await response.json();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

    res.status(response.status).json(data); // Envia a resposta de volta para o frontend
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao acessar a URL do target' });
  }
}
