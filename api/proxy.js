export default async function handler(req, res) {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).json({ error: "No target URL provided" });
  }

  // Verifique se a requisição é do tipo OPTIONS (preflight request)
  if (req.method === 'OPTIONS') {
    // Responda aos cabeçalhos de CORS para a preflight request (OPTIONS)
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    return res.status(200).end(); // Retorne um OK para a preflight request
  }

  try {
    // Proxy a requisição para o destino
    const response = await fetch(targetUrl, {
      method: req.method, // Replicando o método de requisição
      headers: {
        ...req.headers, // Passando os cabeçalhos da requisição
        // Adicione cabeçalhos adicionais se necessário, por exemplo:
        'Authorization': 'Bearer your-api-key', // se necessário para a API
      },
    });

    const data = await response.text(); // Obtendo a resposta

    // Adicionando os cabeçalhos de CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    // Retornando a resposta da requisição para o frontend
    res.status(response.status).send(data);
  } catch (error) {
    // Caso haja erro ao buscar os dados
    res.status(500).json({ error: "Error fetching the target URL" });
  }
}
