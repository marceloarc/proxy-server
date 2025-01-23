const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS, PATCH, DELETE, POST, PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  return await fn(req, res);
};

const handler = async (req, res) => {
  const url = decodeURIComponent(req.query.url);

  const apiKey = 'qv3vrphna3SsguYXsQRAcgSX9ghfVCHZsoQst6sem0aUkwAK6cFez2pMBL8Irveg';  // Sua chave da API
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,  // Encaminhando o Authorization da API para o destino
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      res.status(200).json(data);  // Retorna os dados para o frontend
    } else {
      res.status(response.status).json({ error: 'Erro na requisição' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar dados da URL' });
  }
};

module.exports = allowCors(handler);
