// api/proxy.js
const Cors = require('cors');
const fetch = require('node-fetch'); // Para fazer chamadas à API externa

// Inicia o middleware CORS
const cors = Cors({
  methods: ['GET', 'POST', 'HEAD'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  origin: '*', // Permite todas as origens
});

// Função para rodar o middleware de CORS
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

module.exports = async (req, res) => {
  // Executa o middleware CORS
  await runMiddleware(req, res, cors);

  // Se o método for OPTIONS, não faz nada, só responde com sucesso
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // Lógica para obter dados e repassar a requisição
    const url = decodeURIComponent(req.query.url);  // Pega a URL codificada da query string
    var type = req.query.type;
    // Caso o método seja POST, faça o forward da requisição com dados
    if (req.method === 'POST') {
      const data = req.body; // Pega os dados enviados pelo cliente

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`, // Se for necessário enviar um header Authorization
        },
        body: JSON.stringify(data), // Envia o conteúdo da requisição no corpo
      });

      const result = await response.json();
      res.status(200).json(result);  // Retorna os dados da resposta

    } else {
        var response;
      if(req.headers.authorization){
        response = await fetch(url, {
            method: 'GET',
            headers: {
              'Authorization': req.headers.authorization // Se necessário enviar o header Authorization
            }
          });
          const result = await response.json(); // Captura a resposta
        res.status(200).json(result); // Retorna os dados obtidos da requisição
      }else{
        response = await fetch(url, {
            method: 'GET',
          });

          if(type="image"){
            res.status(200).json(url); // Retorna os dados obtidos da requisição
          }
          else
          {
            const result = await response.json(); // Captura a resposta
            res.status(200).json(result); // Retorna os dados obtidos da requisição
          }


      }

    }
    
  } catch (error) {
    // Caso algo dê errado, retorna um erro 500
    res.status(500).json({ error: 'Erro ao fazer a requisição à API externa', details: error.message });
  }
};