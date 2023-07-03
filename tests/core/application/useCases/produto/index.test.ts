import { Produto, Categoria, CategoriaEnum } from "@domain/entities/produto";
import { ProdutoRepository } from "@domain/repositories/produtoRepository.interface";

import { ProdutoUseCase } from "@useCases/produto";

describe("Given ProdutoUseCases", () => {
    let repositoryStub: ProdutoRepository;
    let sut: ProdutoUseCase;

    const mockProduto = new Produto({
        nome: "Sobremesa",
        preco: 20.25,
        categoria: "sobremesa",
        descricao: "Sobremesa de chocolate com morango'",
        imagem: "www.any-image.com",
    });
    class ProdutoRepositoryStub implements ProdutoRepository {
        create(produto: Produto): Promise<Produto> {
            return new Promise((resolve) => resolve(mockProduto));
        }
        getByCategoria(categoria: Categoria): Promise<Produto[]> {
            return new Promise((resolve) => resolve([mockProduto]));
        }
        getById(id: string): Promise<Produto> {
            return new Promise((resolve) => resolve(mockProduto));
        }
        update(id: string, produto: Partial<Produto>): Promise<Produto> {
            return new Promise((resolve) => resolve(mockProduto));
        }
        delete(id: string): Promise<void> {
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
            const createSpy = jest.spyOn(repositoryStub, "create");

            const produto = await sut.create(mockProduto);
            expect(produto.nome).toEqual(mockProduto.nome);
            expect(createSpy).toHaveBeenCalledWith(mockProduto);
        });
    });
    describe("When getProdutoByCategoria is called", () => {
        it("should call getProdutoByCategoria on the repository and return the produtos", async () => {
            const getByCategoriaSpy = jest.spyOn(
                repositoryStub,
                "getByCategoria",
            );

            const produto = await sut.getByCategoria(CategoriaEnum.Sobremesa);
            expect(getByCategoriaSpy).toHaveBeenCalledWith(
                CategoriaEnum.Sobremesa,
            );
            expect(produto).toEqual([mockProduto]);
        });
    });

    describe("When updateProduto is called", () => {
        it("should call updateProduto on the repository and return the updated produto", async () => {
            const updateSpy = jest.spyOn(repositoryStub, "update");
            const produto = await sut.update("any-id", {
                nome: "Sobremesa surpresa",
            });
            expect(updateSpy).toHaveBeenCalledWith("any-id", {
                nome: "Sobremesa surpresa",
            });
            expect(produto).toEqual(mockProduto);
        });

        it("should throw an error if the produto does not exist", async () => {
            const getByIdSpy = jest
                .spyOn(repositoryStub, "getById")
                .mockResolvedValueOnce(null);
            const produto = sut.update("nonexistent-id", {
                nome: "Sobremesa surpresa",
            });
            await expect(produto).rejects.toThrowError(
                new Error("Produto não encontrado"),
            );
            expect(getByIdSpy).toHaveBeenCalledWith("nonexistent-id");
        });
    });

    describe("When deleteProduto is called", () => {
        it("should call deleteProduto to delete the produto", async () => {
            const deleteSpy = jest.spyOn(repositoryStub, "delete");

            await sut.delete("any-id");
            expect(deleteSpy).toHaveBeenCalledWith("any-id");
        });

        it("should throw an error if the produto does not exist", async () => {
            const repositoryStub = new ProdutoRepositoryStub();
            const sut = new ProdutoUseCase(repositoryStub);
            const getByIdSpy = jest
                .spyOn(repositoryStub, "getById")
                .mockResolvedValueOnce(null);
            const produto = sut.delete("nonexistent-id");
            await expect(produto).rejects.toThrowError(
                new Error("Produto não encontrado"),
            );
            expect(getByIdSpy).toHaveBeenCalledWith("nonexistent-id");
        });
    });
});
