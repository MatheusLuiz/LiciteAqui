document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const login_usu = document.getElementById('login_usu').value.trim();
    const senha_usu = document.getElementById('senha_usu').value.trim();
    const errorMessageDiv = document.getElementById('errorMessage');
    const loadingIndicator = document.getElementById('loadingIndicator');

    // Validação básica no frontend
    if (!login_usu || !senha_usu) {
        errorMessageDiv.textContent = 'Usuário e senha são obrigatórios';
        errorMessageDiv.style.display = 'block';
        return;
    }

    loadingIndicator.style.display = 'block'; // Exibe o carregamento enquanto faz a requisição
    errorMessageDiv.style.display = 'none'; // Oculta mensagens de erro ao iniciar nova tentativa

    try {
        const response = await fetch('/login/autentic', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: login_usu, senha: senha_usu })
        });

        loadingIndicator.style.display = 'none'; // Oculta o carregamento

        if (response.ok) {
            const data = await response.json();
            console.log('Resposta do servidor:', data);

            if (data.token) {
                document.cookie = `authToken=${data.token}; path=/; samesite=strict`;
                window.location.href = '/home';
            } else {
                console.error("Token não retornado pelo servidor.");
                errorMessageDiv.textContent = 'Erro ao efetuar o login. Token não recebido.';
                errorMessageDiv.style.display = 'block';
            }
        } else {
            errorMessageDiv.textContent = 'Erro ao efetuar o login. Verifique suas credenciais.';
            errorMessageDiv.style.display = 'block';
        }
    } catch (error) {
        loadingIndicator.style.display = 'none';
        errorMessageDiv.textContent = 'Erro ao se conectar com o servidor. Tente novamente.';
        errorMessageDiv.style.display = 'block';

        // Ocultar a mensagem de erro após 3 segundos
        setTimeout(() => {
            errorMessageDiv.style.display = 'none';
        }, 3000);
    }
});
