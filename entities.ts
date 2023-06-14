enum CategoriaEnum {
    Lanche = "lanche",
    Bebida = "bebida",
    Acompanhamento = "acompanhamento",
    Sobremesa = "sobremesa",
}

type Categoria = `${CategoriaEnum}`;

interface Produto {
    id: string;
    nome: string;
    preco: number; // float
    categoria: Categoria;
    descricao: string;
    imagem: string;
}

interface Cliente {
    id: string;
    nome: string;
    email: string;
    cpf?: string;
}

interface Item {
    produto: Produto;
    quantidade: number;
}

interface Pedido {
    id: string;
    status: "recebido" | "em_preparacao" | "pronto" | "finalizado";
    preco: number; // float
    cliente?: Cliente;
    itens: Item[];
}
