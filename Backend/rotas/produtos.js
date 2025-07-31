// Importando o pacote/dependência do Express
const express = require('express');

// Criando um objeto Router (gerenciar rotas)
const router = express.Router();

//vetor de produtos
let produtos = [
    { id: 1, nome: "Banana", unidade: "kg", preco: 1.50, categoria: "Frutas", estoque: 100, imagem: "http://localhost:3000/img/banana.png" },
    { id: 2, nome: "Maça", unidade: "kg", preco: 2.00, categoria: "Frutas", estoque: 80, imagem: "http://localhost:3000/img/maca.png" },
    { id: 3, nome: "Laranja", unidade: "kg", preco: 1.80, categoria: "Frutas", estoque: 120, imagem: "http://localhost:3000/img/laranja.png" },
    { id: 4, nome: "Tomate", unidade: "kg", preco: 3.00, categoria: "Legumes", estoque: 50, imagem: "http://localhost:3000/img/tomate.png" },
    { id: 5, nome: "Cenoura", unidade: "kg", preco: 2.50, categoria: "Legumes", estoque: 70, imagem: "http://localhost:3000/img/cenoura.png" },
    { id: 6, nome: "Batata Inglesa", unidade: "kg", preco: 2.20, categoria: "Legumes", estoque: 90, imagem: "http://localhost:3000/img/batata-inglesa.png" },
    { id: 7, nome: "Alface", unidade: "Und", preco: 1.30, categoria: "Verduras", estoque: 60, imagem: "http://localhost:3000/img/alface.png" },
    { id: 8, nome: "Couve", unidade: "Und", preco: 1.70, categoria: "Verduras", estoque: 40, imagem: "http://localhost:3000/img/couve.png" },
    { id: 9, nome: "Repolho Roxo", unidade: "Und", preco: 2.10, categoria: "Verduras", estoque: 50, imagem: "http://localhost:3000/img/repolho-roxo.png" },
    { id: 10, nome: "Morango", unidade: "400gr", preco: 4.00, categoria: "Frutas", estoque: 30, imagem: "http://localhost:3000/img/morango.png" },
    { id: 11, nome: "Uva", unidade: "kg", preco: 3.80, categoria: "Frutas", estoque: 45, imagem: "http://localhost:3000/img/uva.png" },
    { id: 12, nome: "Pera", unidade: "kg", preco: 2.90, categoria: "Frutas", estoque: 65, imagem: "http://localhost:3000/img/pera.png" },
    { id: 13, nome: "Abacaxi", unidade: "kg", preco: 5.00, categoria: "Frutas", estoque: 35, imagem: "http://localhost:3000/img/abacaxi.png" },
    { id: 14, nome: "Melancia", unidade: "kg", preco: 6.50, categoria: "Frutas", estoque: 25, imagem: "http://localhost:3000/img/melancia.png" },
    { id: 15, nome: "Melao", unidade: "kg", preco: 5.80, categoria: "Frutas", estoque: 28, imagem: "http://localhost:3000/img/melao.png" },
    { id: 16, nome: "Beterraba", unidade: "kg", preco: 2.00, categoria: "Legumes", estoque: 80, imagem: "http://localhost:3000/img/beterraba.png" },
    { id: 17, nome: "Chuchu", unidade: "kg", preco: 1.50, categoria: "Legumes", estoque: 60, imagem: "http://localhost:3000/img/chuchu.png" },
    { id: 18, nome: "Pepino", unidade: "kg", preco: 1.60, categoria: "Legumes", estoque: 55, imagem: "http://localhost:3000/img/pepino.png" },
    { id: 19, nome: "Abobrinha", unidade: "kg", preco: 2.20, categoria: "Legumes", estoque: 50, imagem: "http://localhost:3000/img/abobrinha.png" },
    { id: 20, nome: "Pimentao Verde", unidade: "kg", preco: 3.10, categoria: "Legumes", estoque: 40, imagem: "http://localhost:3000/img/pimentão.png" },
    { id: 21, nome: "Rucula", unidade: "Maço", preco: 1.40, categoria: "Verduras", estoque: 35, imagem: "http://localhost:3000/img/rucula.png" },
    { id: 22, nome: "Espinafre", unidade: "Maço", preco: 1.60, categoria: "Verduras", estoque: 30, imagem: "http://localhost:3000/img/espinafre.png" },
    { id: 23, nome: "Quiabo", unidade: "kg", preco: 2.30, categoria: "Legumes", estoque: 45, imagem: "http://localhost:3000/img/quiabo.png" },
    { id: 24, nome: "Inhame", unidade: "kg", preco: 3.50, categoria: "Raizes", estoque: 25, imagem: "http://localhost:3000/img/inhame.png" },
    { id: 25, nome: "Mandioca", unidade: "kg", preco: 2.80, categoria: "Raizes", estoque: 60, imagem: "http://localhost:3000/img/mandioca.png" },
    { id: 26, nome: "Coco", unidade: "kg", preco: 4.20, categoria: "Frutas", estoque: 30, imagem: "http://localhost:3000/img/coco.png" },
    { id: 27, nome: "Limao", unidade: "kg", preco: 1.20, categoria: "Frutas", estoque: 90, imagem: "http://localhost:3000/img/limao.png" },
    { id: 28, nome: "Mamao", unidade: "kg", preco: 3.60, categoria: "Frutas", estoque: 40, imagem: "http://localhost:3000/img/mamão.png" },
    { id: 29, nome: "Brocolis", unidade: "Und", preco: 6.99, categoria: "Verduras", estoque: 45, imagem: "http://localhost:3000/img/brocolis.png" },
    { id: 30, nome: "Cebola", unidade: "kg", preco: 2.10, categoria: "Legumes", estoque: 70, imagem: "http://localhost:3000/img/cebola.png" },
    { id: 31, nome: "Alho", unidade: "kg", preco: 55.50, categoria: "Temperos", estoque: 20, imagem: "http://localhost:3000/img/alho.png" },
    { id: 32, nome: "Salsa", unidade: "Maço", preco: 1.30, categoria: "Temperos", estoque: 60, imagem: "http://localhost:3000/img/salsa.png" },
    { id: 33, nome: "Cebolinha", unidade: "Maço", preco: 1.40, categoria: "Temperos", estoque: 55, imagem: "http://localhost:3000/img/cebolinha.png" },
    { id: 34, nome: "Manjericao", unidade: "Maço", preco: 1.70, categoria: "Temperos", estoque: 30, imagem: "http://localhost:3000/img/manjericao.png" },
    { id: 35, nome: "Oregano", unidade: "Maço", preco: 2.00, categoria: "Temperos", estoque: 25, imagem: "http://localhost:3000/img/oregano.png" },
    { id: 36, nome: "Vagem", unidade: "kg", preco: 8.60, categoria: "Legumes", estoque: 20, imagem: "http://localhost:3000/img/vagem.png" },
    { id: 37, nome: "Batata Doce", unidade: "kg", preco: 2.40, categoria: "Legumes", estoque: 22, imagem: "http://localhost:3000/img/batata-doce.png" },
    { id: 38, nome: "Kiwi", unidade: "kg", preco: 22.20, categoria: "Frutas", estoque: 30, imagem: "http://localhost:3000/img/kiwi.png" },
    { id: 39, nome: "Rabanete", unidade: "kg", preco: 1.80, categoria: "Legumes", estoque: 28, imagem: "http://localhost:3000/img/rabanete.png" },
    { id: 40, nome: "Pimenta", unidade: "kg", preco: 32.90, categoria: "Temperos", estoque: 25, imagem: "http://localhost:3000/img/pimenta.png" },
    { id: 41, nome: "Berinjela", unidade: "kg", preco: 3.20, categoria: "Legumes", estoque: 33, imagem: "http://localhost:3000/img/berinjela.png" },
    { id: 42, nome: "Ameixa", unidade: "kg", preco: 2.60, categoria: "Frutas", estoque: 22, imagem: "http://localhost:3000/img/ameixa.png" },
    { id: 43, nome: "Manga", unidade: "kg", preco: 6.00, categoria: "Frutas", estoque: 18, imagem: "http://localhost:3000/img/manga.png" },
    { id: 44, nome: "Mandioquinha", unidade: "kg", preco: 4.00, categoria: "Raizes", estoque: 20, imagem: "http://localhost:3000/img/mandioquinha.png" },
    { id: 45, nome: "Laranja Bahia", unidade: "kg", preco: 8.80, categoria: "Frutas", estoque: 15, imagem: "http://localhost:3000/img/laranja-bahia.png" },
    { id: 46, nome: "Graviola", unidade: "kg", preco: 6.20, categoria: "Frutas", estoque: 0, imagem: "http://localhost:3000/img/graviola.png" },
    { id: 47, nome: "Jabuticaba", unidade: "kg", preco: 5.40, categoria: "Frutas", estoque: 10, imagem: "http://localhost:3000/img/jabuticaba.png" },
    { id: 48, nome: "Morgote", unidade: "kg", preco: 9.90, categoria: "Frutas", estoque: 18, imagem: "http://localhost:3000/img/morgote.png" },
    { id: 49, nome: "Goiaba", unidade: "kg", preco: 2.70, categoria: "Frutas", estoque: 22, imagem: "http://localhost:3000/img/goiaba.png" },
    { id: 50, nome: "Tangerina", unidade: "kg", preco: 2.80, categoria: "Frutas", estoque: 26, imagem: "http://localhost:3000/img/tangerina.png" }
];

// Rota para efetuar uma requisição GET
router.get('/', (req, res) => {
    res.status(200).json(produtos);
});
// Rota para efeturar uma requisição GET por nome
router.get('/nome/:nome', (req, res) => {
    const nome = req.params.nome.toLowerCase();
    const produtosEncontrados = produtos.filter(p => p.nome.toLowerCase().includes(nome));

    if (produtosEncontrados.length > 0) {
        res.status(200).json(produtosEncontrados);
    } else {
        res.status(404).json({ message: 'Produto não encontrado' });
    }
});

//rota para efetuar uma requisição GET por categoria
router.get('/categoria/:categoria', (req, res) => {
    const categoria = req.params.categoria;
    const produtosCategoria = produtos.filter(p => p.categoria.toLowerCase() === categoria.toLowerCase());
    
    if (produtosCategoria.length > 0) {
        res.status(200).json(produtosCategoria);
    } else {
        res.status(404).json({ message: 'Nenhum produto encontrado nessa categoria' });
    }
}
);

// Rota para efetuar uma requisição POST
router.post('/', (req, res) => {
    const produto = req.body;
    produto.id = produtos.length + 1;
    produtos.push(produto);
    res.status(201).json(produto);
});

// Rota para efetuar uma requisição PUT
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const produtoIndex = produtos.findIndex(p => p.id === id);
    
    if (produtoIndex !== -1) {
        produtos[produtoIndex] = { ...produtos[produtoIndex], ...req.body };
        res.status(200).json(produtos[produtoIndex]);
    } else {
        res.status(404).json({ message: 'Produto não encontrado' });
    }
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const produtoIndex = produtos.findIndex(p => p.id === id);
    
    if (produtoIndex !== -1) {
        produtos.splice(produtoIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Produto não encontrado' });
    }
});
// Exportando o objeto Router
module.exports = router;