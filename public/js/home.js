document.addEventListener('DOMContentLoaded', () => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    if (!token) {
        console.warn('Token não encontrado. Redirecionando para login.');
        window.location.href = '/';
        return;
    }

    const tokenValue = token.split('=')[1];
    console.log('Token encontrado:', tokenValue); // Log para depuração

    fetch('/home', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${tokenValue}`
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar dados do cliente. Verifique a autenticação.');
            }
            return response.text();
        })
        .then(data => {
            console.log('Dados do cliente recebidos:', data);
            // Renderize os dados na página conforme necessário
        })
        .catch(err => {
            console.error(err);
            alert('Erro ao autenticar. Redirecionando para login.');
            window.location.href = '/';
        });
});
