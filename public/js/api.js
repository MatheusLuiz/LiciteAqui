export function fetchWithToken(url, options = {}) {
    const token = localStorage.getItem('authToken');
    if (!token) {
        console.warn('Token não encontrado. Redirecionando para login.');
        window.location.href = '/';
        return;
    }

    const headers = {
        ...options.headers,
        'Authorization': `Bearer ${token}`
    };

    return fetch(url, { ...options, headers })
        .then(response => {
            if (response.status === 401) {
                console.warn('Token inválido ou expirado. Redirecionando para login.');
                window.location.href = '/';
            }
            return response.json();
        });
}
