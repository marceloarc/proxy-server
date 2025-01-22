export default async function handler(req, res) {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).json({ error: "No target URL provided" });
  }

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: req.headers,
    });

    const data = await response.text();

    // Adiciona os cabeçalhos CORS corretos para permitir acesso de outros domínios
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Envia a resposta
    res.status(response.status).send(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching the target URL" });
  }
}
