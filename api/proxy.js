const allowCors = (fn) => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');  // Altere se necessário (teste `*` para "qualquer origem" ou seu domínio específico).
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS, PATCH, DELETE, POST, PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();  // Isso responde à requisição do tipo "preflight"
    return;
  }
  
  return await fn(req, res);  // Chama a função de processamento
};

const handler = async (req, res) => {
  const url = req.query.url; // A URL que você está pedindo para acessar via proxy

  try {
    // Fez o proxy da chamada de API para o destino
    const response = await fetch(url);
    const data = await response.json();
    
    res.status(200).json(data);  // Retorna os dados da resposta da API
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from URL' });
  }
};

module.exports = allowCors(handler);  // Exporta o proxy com o CORS
