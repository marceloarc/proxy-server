export default async function handler(req, res) {
    const targetUrl = req.query.url;
    try {
      const response = await fetch(targetUrl, {
        method: req.method,
        headers: req.headers,
      });
      const data = await response.text();
      res.status(response.status).send(data);
    } catch (error) {
      res.status(500).send("Erro ao acessar API: " + error.message);
    }
  }