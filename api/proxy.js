export default async function handler(req, res) {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).json({ error: "No target URL provided" });
  }

  // Verificar se a requisição é do tipo OPTIONS (preflight request)
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(204).end(); // Status 204 significa que não há conteúdo a ser retornado
  }

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: req.headers,
    });

    const data = await response.text();

    // Adicionando os cabeçalhos de CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // Enviar os dados da resposta do servidor de destino
    res.status(response.status).send(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching the target URL" });
  }
}
