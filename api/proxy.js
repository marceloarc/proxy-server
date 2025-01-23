const allowedOrigins = [
  'https://localhost:8000',
  'https://localhost:80',
  'http://localhost:80'
  'http://localhost:8000',
  'localhost:8000',
  'https://marceloarc.github.io/editor-de-imagem/',
  'https://marceloarc.github.io'
];

const allowCors = fn => async (req, res) => {
  const origin = req.headers.origin;

  // Verifica se o origin da requisição é válido
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', 'https://fallbackdomain.com'); // ou '*' para aceitar todas as origens
  }

  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS, PATCH, DELETE, POST, PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  return await fn(req, res);
};

const handler = async (req, res) => {
  // Lógica do seu handler
};

module.exports = allowCors(handler);
