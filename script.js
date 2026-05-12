// FORMULÁRIO DE LOGIN
const form = document.getElementById("formulario");

form?.addEventListener("submit", (e) => {
    let isValid = true;

    const validar = (input, condicao, msg) => {
        const feedback = input.parentElement.querySelector(".invalid-feedback");

        if (!condicao) {
            feedback.textContent = msg;
            input.classList.add("is-invalid");
            isValid = false;
        } else {
            input.classList.remove("is-invalid");
            feedback.textContent = "";
        }
    };

    const email = form.email;
    const senha = form.senha;

    validar(email,
        email.value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value),
        "E-mail inválido"
    );

    validar(senha,
        senha.value.trim() !== "",
        "Senha obrigatória"
    );

    if (!isValid) {
        e.preventDefault();
        form.querySelector(".is-invalid")?.focus();
    } else {
        e.preventDefault(); // impede reload da página

        // redireciona
        window.location.href = "menuadocao.html";
    }
});
    
document.addEventListener('DOMContentLoaded', () => {
    const mainCard = document.getElementById('mainCard');
    const buttons = document.querySelectorAll('.nav-link');

    const aplicarTema = (btn) => {
        const color = btn.dataset.color;
        const target = document.querySelector(btn.dataset.bsTarget);
        const title = target?.querySelector('h2');

        // animação
        mainCard.classList.add('card-hidden');

        setTimeout(() => {
            mainCard.style.borderTopColor = color;
            if (title) title.style.color = color;

            buttons.forEach(b => b.style.color = '');
            btn.style.color = color;

            mainCard.classList.remove('card-hidden');
        }, 200);
    };

    buttons.forEach(btn => {
        btn.addEventListener('shown.bs.tab', () => aplicarTema(btn));
    });
});


