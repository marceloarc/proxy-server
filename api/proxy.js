export default async function handler(req, res) {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).json({ error: "No target URL provided" });
  }

  try {
    // Passando o cabeçalho 'Authorization' com o 'Client-ID'
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', // Usuário para simular um navegador
        'Authorization': 'Client-ID RAXU1PptzmyPgMjOUO0MIO4mELSR-bVCNM_QmAqcVsk' // Cabeçalho de autorização com a chave correta
      }
    });

    const data = await response.json();

    // Passando os cabeçalhos CORS para o cliente
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

    res.status(response.status).json(data); // Responde com os dados recebidos do Unsplash
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao acessar a URL do target' });
  }
}
