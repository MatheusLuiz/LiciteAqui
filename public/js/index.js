document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const loginUsu = document.getElementById('login_usu').value.trim();
    const senhaUsu = document.getElementById('senha_usu').value.trim();
    const errorMessageDiv = document.getElementById('errorMessage');
    const loadingIndicator = document.getElementById('loadingIndicator');

    errorMessageDiv.style.display = 'none';
    errorMessageDiv.textContent = '';

    if (!loginUsu || !senhaUsu) {
        errorMessageDiv.textContent = 'Usuário e senha são obrigatórios';
        errorMessageDiv.style.display = 'block';
        return;
    }

    loadingIndicator.style.display = 'block';

    try {
        const response = await fetch('/login/autentic', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: loginUsu, senha: senhaUsu })
        });

        loadingIndicator.style.display = 'none';

        if (response.ok) {
            const data = await response.json();
            console.log("Resposta da API no login:", data); // Log para verificar a resposta
            window.location.href = '/home'; // Redireciona para a página protegida
        } else {
            const errorData = await response.json();
            errorMessageDiv.textContent = errorData.error || 'Credenciais inválidas. Tente novamente.';
            errorMessageDiv.style.display = 'block';
        }
    } catch (error) {
        loadingIndicator.style.display = 'none';
        errorMessageDiv.textContent = 'Erro ao se conectar com o servidor. Tente novamente.';
        errorMessageDiv.style.display = 'block';
    }
});
