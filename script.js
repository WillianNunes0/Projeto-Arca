// ==========================================================================
// 1. VALIDAÇÃO DO FORMULÁRIO DE LOGIN
// ==========================================================================
const form = document.getElementById("formulario");

if (form) {
    form.addEventListener("submit", (e) => {
        let isValid = true;

        const validar = (input, condicao, msg) => {
            if (!input) return;
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

        validar(email,
            email?.value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value),
            "E-mail inválido"
        );

        validar(senha,
            senha?.value.trim() !== "",
            "Senha obrigatória"
        );

        if (!isValid) {
            e.preventDefault();
            form.querySelector(".is-invalid")?.focus();
        } else {
            e.preventDefault(); 
            window.location.href = "menuadocao.html"; 
        }
    });
}
    
// ==========================================================================
// 2. ANIMAÇÃO E ALTERAÇÃO DE COR DAS TABS (CONTEÚDO)
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    const mainCard = document.getElementById('mainCard');
    const buttons = document.querySelectorAll('.nav-link');

    if (mainCard) {
        const aplicarTema = (btn) => {
            const color = btn.dataset.color || '#0474C4'; 
            const target = document.querySelector(btn.dataset.bsTarget);
            const title = target?.querySelector('h1, h2, h3');

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
    }
});

// ==========================================================================
// 3. LÓGICA DO MODAL (ANIMAIS)
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    const petCards = document.querySelectorAll('.pet-card-horizontal');
    const modalName = document.getElementById('modalPetName');
    const modalAge = document.getElementById('modalPetAge');
    const modalBreed = document.getElementById('modalPetBreed');
    const modalSpecies = document.getElementById('modalPetSpecies');
    const modalHabits = document.getElementById('modalPetHabits');
    const modalStory = document.getElementById('modalPetStory');
    const carouselContainer = document.getElementById('carouselImagesContainer');

    const petModalElement = document.getElementById('petModal');
    if (petModalElement) {
        const petModal = new bootstrap.Modal(petModalElement);

        petCards.forEach(card => {
            card.addEventListener('click', (event) => {
                if (event.target.closest('.favorite-btn')) return;

                const name = card.querySelector('h3').innerText;
                const pTags = card.querySelectorAll('p');
                const age = pTags[0].innerText.replace('Idade:', '').trim();
                const breed = pTags[1].innerText.replace('Raça:', '').trim();
                const species = card.getAttribute('data-species') || 'Não informado';
                const habits = card.getAttribute('data-habits') || 'Sem informações de hábitos.';
                const story = card.getAttribute('data-story') || 'História de resgate não informada.';
                let images = [];
                try {
                    images = JSON.parse(card.getAttribute('data-images'));
                } catch(e) {
                    images = [card.querySelector('img').src];
                }

                modalName.innerText = name;
                modalAge.innerText = age;
                modalBreed.innerText = breed;
                modalSpecies.innerText = species;
                if (species.toLowerCase() === 'gato') {
                    modalSpecies.className = 'badge bg-warning text-dark rounded-pill px-3 py-2 fs-6 shadow-sm';
                } else {
                    modalSpecies.className = 'badge bg-primary rounded-pill px-3 py-2 fs-6 shadow-sm';
                }

                modalHabits.innerText = habits;
                modalStory.innerText = story;
                carouselContainer.innerHTML = ''; 
                images.forEach((imgSrc, index) => {
                    const activeClass = index === 0 ? 'active' : ''; 
                    const carouselItem = `
                        <div class="carousel-item ${activeClass}">
                            <img src="${imgSrc}" class="d-block w-100 modal-carousel-img" alt="Foto de ${name}">
                        </div>
                    `;
                    carouselContainer.innerHTML += carouselItem;
                });

                petModal.show();
            });
        });
    }
});