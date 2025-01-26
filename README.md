# Proxy Server

Um servidor simples para funcionar como proxy e resolver problemas relacionados a erros CORS ao realizar requisições em APIs.

---

## 🚀 Como usar

1. **Instale o Vercel**  
   Certifique-se de ter o [Vercel CLI](https://vercel.com/docs/cli) instalado globalmente:  
   ```bash
   npm install -g vercel
   
2. **Clone o respositório**  
Clone este repositório em sua máquina:

     ```bash
    git clone <URL_DO_REPOSITORIO>
    ```

3. **Instale as dependências**  
Navegue até a pasta do projeto e execute:

     ```bash
    npm install
    ```
4. **Inicie o servidor local:**  
Utilize o Vercel para iniciar o servidor de desenvolvimento:

     ```bash
    vercel dev
    
5. **Use o proxy**  
Após iniciar o servidor, copie o link gerado (normalmente será http://localhost:3000) e faça suas requisições ao proxy da seguinte forma:

    ```bash
    LINK_GERADO/api/proxy?url=URL_DA_API
    ```

6. **Exemplo**  
    ```bash
    http://localhost:3000/api/proxy?url=https://jsonplaceholder.typicode.com/posts
    ```

## Teste Online
Se você não quiser configurar localmente, pode testar diretamente no servidor online:
https://proxy-server-beta-brown.vercel.app/api/proxy?url=

Exemplo de uso online:    
```bash
https://proxy-server-beta-brown.vercel.app/api/proxy?url=https://jsonplaceholder.typicode.com/posts
```

