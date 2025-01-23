const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');  // Aqui, isso permite qualquer origem
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS, PATCH, DELETE, POST, PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Preflight request para OPTIONS
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  return await fn(req, res);  // Continuar com a requisição real
};

const handler = async (req, res) => {
  const url = decodeURIComponent(req.query.url);  // A URL original da API

  const accessKey = 'RAXU1PptzmyPgMjOUO0MIO4mELSR-bVCNM_QmAqcVsk';  // Substitua pela sua chave de API

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessKey}`,  // Autenticação do tipo Bearer
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      res.status(200).json(data);  // Retorna a resposta do servidor de destino para o cliente
    } else {
      res.status(response.status).json({ error: 'Erro na requisição' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar dados da URL' });
  }
};

module.exports = allowCors(handler);  // Envio da função que lida com o CORS
