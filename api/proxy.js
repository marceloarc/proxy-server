// api/proxy.js
const Cors = require('cors');

// Inicia o middleware CORS
const cors = Cors({
  methods: ['GET', 'HEAD'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  origin: '*', // Permite todas as origens (use um valor mais restritivo, se necessário)
});

// A função de ajudar a rodar o middleware CORS de forma assíncrona
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

  // Agora o seu handler pode processar a requisição
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // A partir de agora, você pode usar sua lógica aqui
  res.json({ message: "Acesso permitido" });
};