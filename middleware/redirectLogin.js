const redirectToLogin = (res, message) => {
    const safeMessage = message.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    res.status(401).send(`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Acesso Negado</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    text-align: center;
                    background-color: #f8f9fa;
                    color: #333;
                    padding: 20px;
                    margin: 0;
                }
                .container {
                    max-width: 600px;
                    margin: 100px auto;
                    padding: 20px;
                    background: #fff;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                }
                h1 {
                    font-size: 24px;
                    margin-bottom: 16px;
                    color: #d9534f;
                }
                p {
                    font-size: 16px;
                    line-height: 1.5;
                    margin-bottom: 20px;
                }
                .spinner {
                    width: 50px;
                    height: 50px;
                    border: 6px solid #ddd;
                    border-top-color: #d9534f;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 20px auto;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Acesso Negado</h1>
                <p>${safeMessage}</p>
                <p>Você será redirecionado para a página de login em instantes...</p>
                <div class="spinner"></div>
            </div>
            <script>
                setTimeout(() => {
                    window.location.href = '/';
                }, 3000);
            </script>
        </body>
        </html>
    `);
};

module.exports = { redirectToLogin };
