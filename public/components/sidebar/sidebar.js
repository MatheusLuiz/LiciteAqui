document.addEventListener("DOMContentLoaded", function () {
    fetch("components/sidebar/sidebar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("sidebar-container").innerHTML = data;

            // Adiciona evento ao botão de sair após carregar a sidebar
            const sairButton = document.getElementById("sair-btn");
            if (sairButton) {
                sairButton.addEventListener("click", function () {
                    console.log("Botão sair clicado!");

                    // Limpa o cookie do token
                    document.cookie = "yoken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
                    console.log("Cookie do token removido.");

                    // Redireciona para a página de desautenticação
                    window.location.href = "logout"; // Certifique-se que o caminho está correto
                });
            }
        })
        .catch(error => {
            console.error("Erro ao carregar a sidebar:", error);
        });
});
