document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Animação dos Números da seção Resultados
    const numeros = document.querySelectorAll('.numero');
    
    const animarContadores = () => {
        numeros.forEach(numero => {
            const atualizarContador = () => {
                const alvo = +numero.getAttribute('data-alvo');
                const valorAtual = +numero.innerText;
                
                // Velocidade do incremento
                const incremento = alvo / 50; 

                if (valorAtual < alvo) {
                    numero.innerText = Math.ceil(valorAtual + incremento);
                    setTimeout(atualizarContador, 30);
                } else {
                    numero.innerText = alvo + (alvo === 98 ? "%" : "+");
                }
            };
            atualizarContador();
        });
    };

    // Executa a animação quando o usuário rolar até a seção
    const secaoResultados = document.getElementById('resultados');
    const observador = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting) {
            animarContadores();
            observador.disconnect(); // Roda a animação apenas uma vez
        }
    }, { threshold: 0.5 });

    observador.observe(secaoResultados);

    // 2. Evento do Botão do Ebook
    const btnDownload = document.getElementById('btn-download');
    btnDownload.addEventListener('click', () => {
        alert('Obrigado por baixar o e-book! O seu download iniciará em instantes. 🎁');
    });
});