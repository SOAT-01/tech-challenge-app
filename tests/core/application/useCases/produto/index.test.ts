import { Produto, Categoria, CategoriaEnum } from "@domain/entities/produto";
import { IProdutoRepository } from "@domain/repositories/produtoRepository.interface";

import { ProdutoUseCase } from "@useCases/produto";

describe("Given ProdutoUseCases", () => {
    let repositoryStub: IProdutoRepository;
    let sut: ProdutoUseCase;

    const mockProduto = new Produto({
        nome: "Sobremesa",
        preco: 20.25,
        categoria: "sobremesa",
        descricao: "Sobremesa de chocolate com morango'",
        imagem: "www.any-image.com",
    });
    class ProdutoRepositoryStub implements IProdutoRepository {
        createProduto(produto: Produto): Promise<Produto> {
            return new Promise((resolve) => resolve(mockProduto));
        }
        getProdutoByCategoria(categoria: Categoria): Promise<Produto[]> {
            return new Promise((resolve) => resolve([mockProduto]));
        }
        getProdutoById(id: string): Promise<Produto> {
            return new Promise((resolve) => resolve(mockProduto));
        }
        updateProduto(id: string, produto: Partial<Produto>): Promise<Produto> {
            return new Promise((resolve) => resolve(mockProduto));
        }
        deleteProduto(id: string): Promise<void> {
            return new Promise((resolve) => resolve());
        }
    }

    beforeAll(() => {
        repositoryStub = new ProdutoRepositoryStub();
        sut = new ProdutoUseCase(repositoryStub);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    describe("When createProduto is called", () => {
        it("should call createProduto on the repository and return the created produto", async () => {
            const createProdutoSpy = jest.spyOn(
                repositoryStub,
                "createProduto",
            );

            const produto = await sut.createProduto(mockProduto);
            expect(produto.nome).toEqual(mockProduto.nome);
            expect(createProdutoSpy).toHaveBeenCalledWith(mockProduto);
        });
    });
    describe("When getProdutoByCategoria is called", () => {
        it("should call getProdutoByCategoria on the repository and return the produtos", async () => {
            const getProdutoByCategoriaSpy = jest.spyOn(
                repositoryStub,
                "getProdutoByCategoria",
            );

            const produto = await sut.getProdutoByCategoria(
                CategoriaEnum.Sobremesa,
            );
            expect(getProdutoByCategoriaSpy).toHaveBeenCalledWith(
                CategoriaEnum.Sobremesa,
            );
            expect(produto).toEqual([mockProduto]);
        });
    });

    describe("When updateProduto is called", () => {
        it("should call updateProduto on the repository and return the updated produto", async () => {
            const updateProdutoSpy = jest.spyOn(
                repositoryStub,
                "updateProduto",
            );
            const produto = await sut.updateProduto("any-id", {
                nome: "Sobremesa surpresa",
            });
            expect(updateProdutoSpy).toHaveBeenCalledWith("any-id", {
                nome: "Sobremesa surpresa",
            });
            expect(produto).toEqual(mockProduto);
        });

        it("should throw an error if the produto does not exist", async () => {
            const getProdutoByIdSpy = jest
                .spyOn(repositoryStub, "getProdutoById")
                .mockResolvedValueOnce(null);
            const produto = sut.updateProduto("nonexistent-id", {
                nome: "Sobremesa surpresa",
            });
            await expect(produto).rejects.toThrowError(
                new Error("Produto não encontrado"),
            );
            expect(getProdutoByIdSpy).toHaveBeenCalledWith("nonexistent-id");
        });
    });

    describe("When deleteProduto is called", () => {
        it("should call deleteProduto to delete the produto", async () => {
            const deleteProdutoSpy = jest.spyOn(
                repositoryStub,
                "deleteProduto",
            );

            await sut.deleteProduto("any-id");
            expect(deleteProdutoSpy).toHaveBeenCalledWith("any-id");
        });

        it("should throw an error if the produto does not exist", async () => {
            const repositoryStub = new ProdutoRepositoryStub();
            const sut = new ProdutoUseCase(repositoryStub);
            const getProdutoByIdSpy = jest
                .spyOn(repositoryStub, "getProdutoById")
                .mockResolvedValueOnce(null);
            const produto = sut.deleteProduto("nonexistent-id");
            await expect(produto).rejects.toThrowError(
                new Error("Produto não encontrado"),
            );
            expect(getProdutoByIdSpy).toHaveBeenCalledWith("nonexistent-id");
        });
    });
});
