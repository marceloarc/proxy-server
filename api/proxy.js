export default async function handler(req, res) {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).json({ error: "No target URL provided" });
  }

  // Primeiro, tratamos as requisições OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Pode permitir mais especificidade se necessário
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');
    return res.status(200).end(); // Retorna a confirmação para o preflight
  }

  try {
    // Proxy da requisição para o target URL
    const response = await fetch(targetUrl, {
      method: req.method, // Mantém o mesmo método da requisição original
      headers: {
        ...req.headers, // Passa os headers de quem fez a requisição
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', // Pode usar o seu User-Agent se necessário
        // Autenticação para a IconFinder, se necessária
        'Authorization': 'Bearer your-api-key',
      }
    });

    // Caso a resposta tenha sucesso
    const data = await response.text(); // Resposta em texto para simples API

    // Headers para permitir CORS (crucial para o navegador aceitar os dados)
    res.setHeader('Access-Control-Allow-Origin', '*'); // Ajuste de acordo com a política CORS
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    
    // Envia a resposta final para o front-end
    res.status(response.status).send(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao acessar o target URL.' });
  }
}
