// FORMULÁRIO DE LOGIN
    const form = document.getElementById("formulario");
    const emailInput = document.getElementById("email");
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const senhaInput = document.getElementById("senha");

    form.addEventListener("submit", function (e) {
        let isValid = true;

        // textos diferentes por erro
        function aplicarValidacao(input, condicao, mensagem) {
            const feedback = input.parentElement.querySelector(".invalid-feedback");
            
            if (!condicao) {
                // Usa a mensagem passada na função ou o data-error do HTML
                feedback.textContent = mensagem || input.dataset.error || "Campo obrigatório";
                input.classList.add("is-invalid");
                isValid = false;
            } else {
                input.classList.remove("is-invalid");
                feedback.textContent = "";
            }
        }

        // --- 1. Validação do E-mail (Lógica de duas etapas) ---
        if (emailInput.value.trim() === "") {
            aplicarValidacao(emailInput, false, "O e-mail é obrigatório."); 
        } else if (!emailRegex.test(emailInput.value)) {
            aplicarValidacao(emailInput, false, "Por favor, insira um e-mail válido.");
        } else {
            aplicarValidacao(emailInput, true);
        }

        // --- 2. Validação da Senha ---
        if (senhaInput.value.trim() === "") {
            aplicarValidacao(senhaInput, false, "A senha é obrigatória.");
        } else {
            aplicarValidacao(senhaInput, true);
        }

        // --- 3. Controle de Envio ---
        if (!isValid) {
            e.preventDefault(); // Só para o envio se houver erro
            form.querySelector(".is-invalid").focus();
        } else {
            console.log("Enviando...");
            // Aqui entra o código de backend futuramente
        }
    });