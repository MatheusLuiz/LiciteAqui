document.addEventListener('DOMContentLoaded', () => {
    // Recupera o token do sessionStorage
    const token = sessionStorage.getItem('authToken');
    console.log("Token carregado do sessionStorage:", token); // Verifique se o token está correto

    if (!token) {
        console.warn('Token não encontrado. Redirecionando para login.');
        window.location.href = '/'; // Redireciona para a página de login
        return;
    }

    // Fazer a requisição protegida com o cabeçalho Authorization
    fetch('/', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar dados do cliente. Verifique a autenticação.');
            }
            return response.json();
        })
        .then(data => {
            console.log('Dados do cliente recebidos:', data);
            // Renderize os dados na página conforme necessário
        })
        .catch(err => {
            console.error(err);
            window.location.href = ''; // Redireciona para login em caso de erro
        });
});
