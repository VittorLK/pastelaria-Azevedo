document.addEventListener('DOMContentLoaded', () => {
    // =========================
    // MENU MOBILE
    // =========================
    const menuBtn = document.getElementById('menu-btn');
    const nav = document.getElementById('navpastel');

    if (menuBtn && nav) {
        menuBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }
    const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
            });
        });
    
    // =========================
    // CARRINHO
    // =========================
    let carrinho = [];

    const botoesAdicionar = document.querySelectorAll('.add-carrinho');
    const contadorCarrinho = document.getElementById('contador-carrinho');
    const modalCarrinho = document.getElementById('modal-carrinho');
    const listaCarrinho = document.getElementById('lista-carrinho');
    const totalCarrinho = document.getElementById('total-carrinho');
    const observacoes = document.getElementById('observacoes');
    const toast = document.getElementById('toast-carrinho');

    const abrirCarrinho = document.getElementById('abrir-carrinho');
    const fecharCarrinho = document.getElementById('fechar-carrinho');
    const enviarWhatsapp = document.getElementById('enviar-whatsapp');

    // =========================
    // TOAST
    // =========================
    function mostrarToast() {
        if (!toast) return;
        toast.classList.add('mostrar');
        setTimeout(() => {
            toast.classList.remove('mostrar');
        }, 1500);
    }

    // =========================
    // ATUALIZAR CARRINHO
    // =========================
    function atualizarCarrinho() {
        listaCarrinho.innerHTML = '';
        let total = 0;
        let quantidadeTotal = 0;

        carrinho.forEach((item, index) => {
            const li = document.createElement('li');

            li.innerHTML = `
                <span>${item.nome}</span>

                <span class="controle-qtd">
                    <button class="diminuir" data-index="${index}">➖</button>
                    <strong>${item.quantidade}</strong>
                    <button class="aumentar" data-index="${index}">➕</button>
                </span>

                <span>
                    R$ ${(item.preco * item.quantidade).toFixed(2)}
                    <button class="remover-item" data-index="${index}">❌</button>
                </span>
            `;

            listaCarrinho.appendChild(li);

            total += item.preco * item.quantidade;
            quantidadeTotal += item.quantidade;
        });

        totalCarrinho.innerText = total.toFixed(2);
        contadorCarrinho.innerText = quantidadeTotal;

        // ===== MUDANÇA DE COR DO CONTADOR =====
        if (quantidadeTotal > 0) {
            contadorCarrinho.classList.add('ativo');
        } else {
            contadorCarrinho.classList.remove('ativo');
        }
    }

    // =========================
    // ADICIONAR AO CARRINHO
    // =========================
    botoesAdicionar.forEach(botao => {
        botao.addEventListener('click', (e) => {
            e.preventDefault();

            const nome = botao.dataset.nome;
            const preco = parseFloat(botao.dataset.preco);

            const itemExistente = carrinho.find(item => item.nome === nome);

            if (itemExistente) {
                itemExistente.quantidade++;
            } else {
                carrinho.push({
                    nome,
                    preco,
                    quantidade: 1
                });
            }

            atualizarCarrinho();
            mostrarToast();

            // ===== ANIMAÇÃO DO CONTADOR =====
            contadorCarrinho.classList.add('animar');
            setTimeout(() => {
                contadorCarrinho.classList.remove('animar');
            }, 300);
        });
    });

    // =========================
    // CONTROLES ➕ ➖ ❌
    // =========================
    listaCarrinho.addEventListener('click', (e) => {
        const index = e.target.dataset.index;

        if (e.target.classList.contains('aumentar')) {
            carrinho[index].quantidade++;
        }

        if (e.target.classList.contains('diminuir')) {
            carrinho[index].quantidade--;
            if (carrinho[index].quantidade <= 0) {
                carrinho.splice(index, 1);
            }
        }

        if (e.target.classList.contains('remover-item')) {
            carrinho.splice(index, 1);
        }

        atualizarCarrinho();
    });

    // =========================
    // ABRIR / FECHAR MODAL
    // =========================
    abrirCarrinho.addEventListener('click', (e) => {
        e.preventDefault();
        modalCarrinho.style.display = 'flex';
    });

    fecharCarrinho.addEventListener('click', () => {
        modalCarrinho.style.display = 'none';
    });

    // =========================
    // ENVIAR WHATSAPP
    // =========================
    enviarWhatsapp.addEventListener('click', () => {
        if (carrinho.length === 0) {
            alert('Seu carrinho está vazio!');
            return;
        }

        let mensagem = '🛒 *Pedido Pastelaria Azevedo*%0A%0A';

        carrinho.forEach(item => {
            mensagem += `• ${item.nome} - ${item.quantidade}x%0A`;
        });

        mensagem += `%0A*Total: R$ ${totalCarrinho.innerText}*`;

        if (observacoes.value.trim() !== '') {
            mensagem += `%0A%0A🧾 *Observações:*%0A${encodeURIComponent(observacoes.value)}`;
        }


        
        const telefone = '557192926042';
        const url = `https://wa.me/${telefone}?text=${mensagem}`;

        window.open(url, '_blank');
    });

});

//função temporaria de alerte//
function fecharAlerta() {
    document.getElementById("alertDelivery").style.display = "none";
}