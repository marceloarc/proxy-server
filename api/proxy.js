export default async function handler(req, res) {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).json({ error: "No target URL provided" });
  }

  // Para lidar com requisições preflight (OPTIONS)
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Ou substitua por um domínio específico
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');
    return res.status(200).end();  // Termina o método OPTIONS com sucesso
  }

  try {
    const response = await fetch(targetUrl, {
      method: req.method, // Use o mesmo método da requisição original
      headers: {
        ...req.headers,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', // Pode ser necessário customizar o User-Agent
      }
    });

    const data = await response.text(); // Pega o conteúdo da resposta (pode mudar para .json() conforme o tipo de resposta)

    // CORS: garantindo que a resposta pode ser lida pelo front-end
    res.setHeader('Access-Control-Allow-Origin', '*'); // Permite qualquer origem (alterar conforme necessário)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

    res.status(response.status).send(data);  // Responde com os dados da API

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao acessar o target URL' });
  }
}
