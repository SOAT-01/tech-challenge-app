import { CategoriaEnum, Produto } from "entities/produto";

describe("Given ProdutoEntity", () => {
    describe("when received all params correctly", () => {
        it("should create a new instance of Produto", () => {
            const produto = new Produto({
                nome: "Hamburguer",
                preco: 10,
                categoria: CategoriaEnum.Lanche,
                descricao: "Delicious hamburger",
                imagem: "hamburguer.jpg",
            });

            expect(produto).toBeInstanceOf(Produto);
        });
    });

    describe("When missing a required param", () => {
        it("should throw an error if nome is not provided", () => {
            expect(() => {
                new Produto({
                    nome: undefined,
                    preco: 10,
                    categoria: CategoriaEnum.Lanche,
                    descricao: "Delicious hamburger",
                    imagem: "hamburguer.jpg",
                });
            }).toThrow("Nome is required");
        });

        it("should throw an error if preco is not provided", () => {
            expect(() => {
                new Produto({
                    nome: "Hamburguer",
                    preco: undefined,
                    categoria: CategoriaEnum.Lanche,
                    descricao: "Delicious hamburger",
                    imagem: "hamburguer.jpg",
                });
            }).toThrow("Preço is required");
        });

        it("should throw an error if categoria is not provided", () => {
            expect(() => {
                new Produto({
                    nome: "Hamburguer",
                    preco: 10,
                    categoria: undefined,
                    descricao: "Delicious hamburger",
                    imagem: "hamburguer.jpg",
                });
            }).toThrow("Categoria is required");
        });

        it("should throw an error if descricao is not provided", () => {
            expect(() => {
                new Produto({
                    nome: "Hamburguer",
                    preco: 10,
                    categoria: CategoriaEnum.Lanche,
                    descricao: undefined,
                    imagem: "hamburguer.jpg",
                });
            }).toThrow("Descrição is required");
        });

        it("should throw an error if imagem is not provided", () => {
            expect(() => {
                new Produto({
                    nome: "Hamburguer",
                    preco: 10,
                    categoria: CategoriaEnum.Lanche,
                    descricao: "Delicious hamburger",
                    imagem: undefined,
                });
            }).toThrow("Imagem is required");
        });
    });

    describe("When preço has a value less than zero", () => {
        it("should throw an error", () => {
            expect(() => {
                new Produto({
                    nome: "Lanche",
                    preco: 0,
                    categoria: CategoriaEnum.Lanche,
                    descricao: "Delicious hamburger",
                    imagem: "hamburguer.jpg",
                });
            }).toThrow("Preço should have a value bigger than zero");
        });
    });
});
