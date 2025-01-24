const Cors = require('cors');
const fetch = require('node-fetch');

// Configurações do middleware CORS
const cors = Cors({
  methods: ['GET', 'POST', 'HEAD'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  origin: '*', // Permitir todas as origens (ajuste conforme necessário para maior segurança)
});

// Função para executar o middleware de CORS
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

  // Trata requisições OPTIONS para CORS
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { url } = req.query; // Extrai o URL passado na query string
    if (!url) {
      return res.status(400).json({ error: 'É necessário passar a URL como query string ?url=<URL>' });
    }

    // Decodifica a URL para evitar problemas com caracteres especiais
    const decodedUrl = decodeURIComponent(url);

    // Configurações padrão para a requisição externa
    const fetchOptions = {
      method: req.method, // Usar o mesmo método da requisição original (GET ou POST)
      headers: {
        ...req.headers, // Passa os headers da requisição original
        'Authorization': req.headers.authorization || undefined, // Inclui header Authorization, se existir
      },
    };

    // Apenas inclua o corpo se for uma requisição POST
    if (req.method === 'POST' && req.body) {
      fetchOptions.body = JSON.stringify(req.body);
      fetchOptions.headers['Content-Type'] = 'application/json'; // Garantir que o Content-Type seja configurado
    }

    // Faz a requisição para a URL externa
    const response = await fetch(decodedUrl, fetchOptions);

    // Manipula a resposta (JSON ou outros tipos de conteúdo)
    if (response.headers.get('content-type')?.includes('application/json')) {
      const json = await response.json();
      res.status(response.status).json(json);
    } else {
      // Propaga outros tipos de conteúdo (ex.: arquivos ou texto simples)
      res.setHeader('Content-Type', response.headers.get('content-type'));
      const stream = response.body; // Fluxo de dados
      stream.pipe(res);
    }
  } catch (error) {
    // Erro ao processar a requisição
    res.status(500).json({ error: 'Erro ao fazer a requisição para a URL', details: error.message });
  }
};
