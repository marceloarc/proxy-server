const allowCors = (fn) => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');  // Ou personalize, por exemplo, com `req.headers.origin`
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS, PATCH, DELETE, POST, PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();  // Pre-flight response
    return;
  }
  
  // Chama a função de tratamento da requisição
  return await fn(req, res);
};

const handler = async (req, res) => {
  const url = req.query.url;

  // Realiza a chamada para o URL solicitado via proxy
  try {
    const response = await fetch(url);
    const data = await response.json();

    res.status(200).json(data);  // Retorna a resposta da API solicitada
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from URL' });
  }
};

module.exports = allowCors(handler);
