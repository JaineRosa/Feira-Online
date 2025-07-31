// URL da API (ajuste se necessário)
const API_URL = 'http://localhost:3000';

// Elementos do DOM
const mostrarProdutosDiv = document.getElementById('produtos-mostrar');
const mostrarCarrinhoDiv = document.getElementById('mostrarCarrinho');
const botaoCarrinho = document.getElementById('carrinho');
const cadastrarProdutoDiv = document.getElementById('cadastrarProduto');
const contador = document.getElementById('carrinho-contador');

// Carrinho armazenado em memória
let carrinho = [];

// Buscar todos os produtos e mostrar
async function buscarProdutos() {
    try {
        const res = await fetch(API_URL);
        const produtos = await res.json();
        mostrarProdutos(produtos);
    } catch (err) {
        console.error('Erro ao buscar produtos:', err);
    }
}

// Mostrar todos os produtos
function mostrarProdutosTodos() {
    mostrarCarrinhoDiv.style.display = 'none';
    mostrarProdutosDiv.style.display = 'flex';
    buscarProdutos();
}

// Buscar produtos por categoria
async function buscarPorCategoria(categoria) {
    cadastrarProdutoDiv.style.display = 'none'
    mostrarCarrinhoDiv.style.display = 'none';
    mostrarProdutosDiv.style.display = 'flex';
    try {
        const res = await fetch(`${API_URL}/categoria/${categoria}`);
        const produtos = await res.json();
        mostrarProdutos(produtos);
    } catch (err) {
        console.error('Erro ao buscar por categoria:', err);
    }
}
// Função para buscar pelo nome
function buscar(event) {
    cadastrarProdutoDiv.style.display = 'none'
    mostrarCarrinhoDiv.style.display = 'none';
    mostrarProdutosDiv.style.display = 'flex';
    event.preventDefault();
    const termo = document.getElementById('campoPesquisa').value.trim().toLowerCase();
    if (!termo) {
        buscarProdutos();
        return;
    }

    fetch(API_URL)
        .then((res) => res.json())
        .then((produtos) => {
            const resultados = produtos.filter((produto) =>
                produto.nome.toLowerCase().includes(termo)
            );
            mostrarProdutos(resultados);
        })
        .catch((err) => console.error('Erro ao buscar produtos:', err));
}

// Mostrar produtos na tela
function mostrarProdutos(produtos) {
    if (!produtos.length) {
        mostrarProdutosDiv.innerHTML = '<p>Nenhum produto encontrado.</p>';
        return;
    }

    mostrarProdutosDiv.innerHTML = produtos
        .map((produto) => {
            if (produto.estoque === 0) {
                return `
                <div class="card">
                    <img src="${produto.imagem}" alt="${produto.nome}" />
                    <h3>${produto.nome}</h3>
                    <p>Preço: R$ ${produto.preco.toFixed(2)} ${produto.unidade}</p>
                    <p style="font-size:14px;">Categoria: ${produto.categoria} Estoque: ${produto.estoque}</p>
                    <p style="color:red;font-weight:bold;padding:0;:">Produto indisponível</p>
                    <button disabled style="background-color: #ccc; cursor: not-allowed;">Adicionar ao Carrinho</button>
                </div>
                `;
            } else {
                return `
                <div class="card">
                    <img src="${produto.imagem}" alt="${produto.nome}" />
                    <h3>${produto.nome}</h3>
                    <p>Preço: R$ ${produto.preco.toFixed(2)} ${produto.unidade}</p>
                    <p style="font-size:14px;">Categoria: ${produto.categoria} Estoque: ${produto.estoque}</p>
                    Quantidade:
                    <input type="number" id="qtd-${produto.id}" value="1" min="1" max="${produto.estoque}" />
                    <button onclick="adicionarAoCarrinho(${produto.id})">Adicionar ao Carrinho</button>
                </div>
                `;
            }
        })
        .join('');
}

// Adicionar produto ao carrinho pelo id
async function adicionarAoCarrinho(id) {
    try {
        const inputQtd = document.getElementById(`qtd-${id}`);
        const quantidade = parseInt(inputQtd.value);

        if (quantidade <= 0) {
            alert('Informe uma quantidade válida.');
            return;
        }

        const res = await fetch(API_URL);
        const produtos = await res.json();
        const produto = produtos.find(p => p.id === id);

        const itemNoCarrinho = carrinho.find(item => item.id === id);

        const quantidadeAtual = itemNoCarrinho ? itemNoCarrinho.quantidade : 0;

        const quantidadeTotal = quantidadeAtual + quantidade;

        if (quantidadeTotal > produto.estoque) {
            alert(`Só temos ${produto.estoque} unidades disponíveis.`);
            return;
        }

        if (itemNoCarrinho) {
            itemNoCarrinho.quantidade = quantidadeTotal;
        } else {
            carrinho.push({ ...produto, quantidade });
        }

        alert(`Produto "${produto.nome}" adicionado ao carrinho!`);
        atualizarContadorCarrinho();
    } catch (err) {
        console.error('Erro ao adicionar ao carrinho:', err);
    }
}

// Mostrar o carrinho na tela
function mostrarCarrinho() {
    cadastrarProdutoDiv.style.display = 'none'
    mostrarProdutosDiv.style.display = 'none';
    mostrarCarrinhoDiv.style.display = 'flex';

    if (carrinho.length === 0) {
        mostrarCarrinhoDiv.innerHTML = '<p>Carrinho vazio.</p>';
        return;
    }

    const total = carrinho.reduce((sum, item) => sum + item.preco * item.quantidade, 0);

    mostrarCarrinhoDiv.innerHTML = carrinho
        .map(
            (item, index) => `
        <div class="card">
          <img src="${item.imagem}" alt="${item.nome}" />
          <h3>${item.nome}</h3>
          <p>Preço unitário: R$ ${item.preco.toFixed(2)} ${item.unidade}</p>
           <p>
            Quantidade: 
            <input type="number" 
                   min="1" 
                   max="${item.estoque}" 
                   value="${item.quantidade}" 
                   onchange="atualizarQuantidadeCarrinho(${index}, this.value)" />
          </p>
          <p>Subtotal: R$ ${(item.preco * item.quantidade).toFixed(2)}</p>
          <button onclick="removerDoCarrinho(${index})" style="background-color:#a83232;">Remover</button>
        </div>
      `
        )
        .join('') +
        `<div class="total">
        <h3> Valor Total:<br> R$ ${total.toFixed(2)}</h3>
        <button onclick="finalizarCompra()" style="margin-top:12px;padding:10px 24px;background:#508830;color:#fff;border:none;border-radius:6px;cursor:pointer;">Finalizar Compra</button>
    </div>`;
    
}
// Atualizar quantidade do item no carrinho
function atualizarQuantidadeCarrinho(index, novaQtd) {
     cadastrarProdutoDiv.style.display = 'none'
    const quantidade = parseInt(novaQtd);

    const item = carrinho[index];
    if (quantidade > item.estoque) {
        alert(`Só temos ${item.estoque} unidades disponíveis.`);
        return;
    }
    carrinho[index].quantidade = quantidade;
    mostrarCarrinho();
    atualizarContadorCarrinho();
}

// Remover item do carrinho pelo índice
function removerDoCarrinho(index) {
     cadastrarProdutoDiv.style.display = 'none'
    carrinho.splice(index, 1);
    atualizarContadorCarrinho();
    if (carrinho.length === 0) {
        mostrarCarrinhoDiv.innerHTML = '<p>Carrinho vazio.</p>';
        setTimeout(() => {
            mostrarProdutosTodos();;
        }, 2000);
        return;
    } else {
        mostrarCarrinho();
    }
}

//finalizar compra
function finalizarCompra() {
     cadastrarProdutoDiv.style.display = 'none'
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }

    alert('Compra finalizada com sucesso!');
    //diminuitr estoque dos produtos
    carrinho.forEach(item => {
        fetch(`${API_URL}/${item.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ estoque: item.estoque - item.quantidade })
        })
        .then(() => buscarProdutos())
        .catch(err => console.error('Erro ao atualizar estoque:', err));
    });

    carrinho = [];
    mostrarCarrinho();
    atualizarContadorCarrinho();


    // redirecionar para a página de produtos apos 3s
    setTimeout(() => {
        mostrarProdutosTodos();;
    }, 3000);
}

function cadastrarProduto() {
    console.log('Função cadastrarProduto chamada');
    mostrarProdutosDiv.style.display = 'none';
    cadastrarProdutoDiv.style.display = 'flex';

    cadastrarProdutoDiv.innerHTML = `
        <div>
            <h2>Cadastrar Produto</h2>
            <form id="form-produto">
                <label>Nome:</label>
                <input type="text" id="nome" required>

                <label>Preço:</label>
                <input type="number" id="preco" step="0.01" required>

                <label>Unidade:</label>
                <input type="text" id="unidade" required>

                <label>Categoria:</label>
                <select id="categoria">
                    <option value="frutas">Frutas</option>
                    <option value="verduras">Verduras</option>
                    <option value="legumes">Legumes</option>
                    <option value="temperos">Temperos</option>
                </select>

                <label>Estoque:</label>
                <input type="number" id="estoque" required>

                <button type="submit">Cadastrar</button>
            </form>
        </div>
    `;
    document.getElementById('form-produto').addEventListener('submit', salvarProduto);
}

// Função para salvar o produto
function salvarProduto(evento) {
    evento.preventDefault();

    const nome = document.getElementById('nome').value;
    const preco = document.getElementById('preco').value.replace(',', '.');
    const unidade = document.getElementById('unidade').value;
    const categoria = document.getElementById('categoria').value;
    const estoque = document.getElementById('estoque').value;
    const novoProduto = {
        nome,
        preco: parseFloat(preco),
        unidade,
        categoria,
        estoque: parseInt(estoque),
        imagem: 'http://localhost:3000/img/Feira-online.png'
    };

    fetch(`${API_URL}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoProduto)
    })
        .then(resposta => {
            if (resposta.ok) {
                alert('Produto cadastrado com sucesso!');
                mostrarProdutosTodos();
                cadastrarProdutoDiv.style.display = 'none';
            } else {
                alert('Erro ao cadastrar produto.');
            }
        })
        .catch(erro => {
            console.error('Erro:', erro);
            alert('Erro ao cadastrar produto.');
        });
}

function atualizarContadorCarrinho() {
    const contador = document.getElementById('carrinho-contador');
    const totalItens = carrinho.reduce((soma, item) => soma + item.quantidade, 0);
    console.log('Total de itens no carrinho:', totalItens);
    contador.textContent = totalItens;
    contador.style.display = totalItens > 0 ? 'inline-block' : 'none';
}
// Evento botão carrinho
botaoCarrinho.addEventListener('click', mostrarCarrinho);

// Carregar produtos ao iniciar página
window.onload = () => {
  atualizarContadorCarrinho();
  buscarProdutos();
};