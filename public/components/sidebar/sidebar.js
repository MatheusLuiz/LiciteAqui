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

                    // Redireciona para a página de desautenticação
                    window.location.href = "/logout"; // Certifique-se que o caminho está correto
                });
            }
        })
        .catch(error => {
            console.error("Erro ao carregar a sidebar:", error);
        });
});
