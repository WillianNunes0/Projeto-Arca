// ==========================================================================
// 1. VALIDAÇÃO DO FORMULÁRIO DE LOGIN
// ==========================================================================
const form = document.getElementById("formulario");

// O 'if' garante que o script não quebre caso você esteja em uma página sem o form de login
if (form) {
    form.addEventListener("submit", (e) => {
        let isValid = true;

        const validar = (input, condicao, msg) => {
            if (!input) return; // Proteção caso o input não seja encontrado
            const feedback = input.parentElement.querySelector(".invalid-feedback");

            if (!condicao) {
                if (feedback) feedback.textContent = msg;
                input.classList.add("is-invalid");
                isValid = false;
            } else {
                input.classList.remove("is-invalid");
                if (feedback) feedback.textContent = "";
            }
        };

        const email = form.email;
        const senha = form.senha;

        // Valida formato do E-mail (Requer atributo name="email" no HTML)
        validar(email,
            email?.value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value),
            "E-mail inválido"
        );

        // Valida preenchimento da Senha (Requer atributo name="senha" no HTML)
        validar(senha,
            senha?.value.trim() !== "",
            "Senha obrigatória"
        );

        if (!isValid) {
            e.preventDefault();
            form.querySelector(".is-invalid")?.focus();
        } else {
            e.preventDefault(); // Impede o reload padrão do formulário
            window.location.href = "menuadocao.html"; // Redireciona o usuário
        }
    });
}
    
// ==========================================================================
// 2. ANIMAÇÃO E ALTERAÇÃO DE COR DAS TABS (CONTEÚDO)
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    const mainCard = document.getElementById('mainCard');
    const buttons = document.querySelectorAll('.nav-link');

    // Só executa a lógica visual se o container principal estiver na tela
    if (mainCard) {
        const aplicarTema = (btn) => {
            // Pega a cor do atributo 'data-color' ou usa a azul padrão do tema
            const color = btn.dataset.color || '#0474C4'; 
            const target = document.querySelector(btn.dataset.bsTarget);
            const title = target?.querySelector('h1, h2, h3');

            // Dispara o efeito de transição escondendo o elemento brevemente
            mainCard.classList.add('card-hidden');

            setTimeout(() => {
                // Aplica a cor na borda superior e no título da aba ativa
                mainCard.style.borderTopColor = color;
                if (title) title.style.color = color;

                // Reseta a cor de todos os botões e destaca o atual
                buttons.forEach(b => b.style.color = '');
                btn.style.color = color;

                // Remove a classe para revelar o conteúdo com a cor nova
                mainCard.classList.remove('card-hidden');
            }, 200);
        };

        // Escuta o evento nativo de mudança de aba do Bootstrap
        buttons.forEach(btn => {
            btn.addEventListener('shown.bs.tab', () => aplicarTema(btn));
        });
    }
});