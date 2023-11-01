import { Produto, Categoria, CategoriaEnum } from "entities/produto";
import { ProdutoGateway } from "interfaces/gateways";
import { ProdutoUseCase } from "useCases";

describe("Given ProdutoUseCases", () => {
    let gatewayStub: ProdutoGateway;
    let sut: ProdutoUseCase;

    const mockProduto = new Produto({
        nome: "Sobremesa",
        preco: 20.25,
        categoria: "sobremesa",
        descricao: "Sobremesa de chocolate com morango'",
        imagem: "www.any-image.com",
    });
    class ProdutoGatewayStub implements ProdutoGateway {
        create(produto: Produto): Promise<Produto> {
            return new Promise((resolve) => resolve(mockProduto));
        }
        getByCategoria(categoria: Categoria): Promise<Produto[]> {
            return new Promise((resolve) => resolve([mockProduto]));
        }
        getById(id: string): Promise<Produto> {
            return new Promise((resolve) => resolve(mockProduto));
        }
        getByIds(ids: string[]): Promise<Produto[]> {
            return new Promise((resolve) => resolve([mockProduto]));
        }
        update(id: string, produto: Partial<Produto>): Promise<Produto> {
            return new Promise((resolve) => resolve(mockProduto));
        }
        delete(id: string): Promise<void> {
            return new Promise((resolve) => resolve());
        }
    }

    beforeAll(() => {
        gatewayStub = new ProdutoGatewayStub();
        sut = new ProdutoUseCase(gatewayStub);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    describe("When createProduto is called", () => {
        it("should call createProduto on the gateway and return the created produto", async () => {
            const createSpy = jest.spyOn(gatewayStub, "create");

            const produto = await sut.create(mockProduto);
            expect(produto.nome).toEqual(mockProduto.nome);
            expect(createSpy).toHaveBeenCalledWith(mockProduto);
        });
    });
    describe("When getProdutoByCategoria is called", () => {
        it("should call getProdutoByCategoria on the gateway and return the produtos", async () => {
            const getByCategoriaSpy = jest.spyOn(gatewayStub, "getByCategoria");

            const produto = await sut.getByCategoria(CategoriaEnum.Sobremesa);
            expect(getByCategoriaSpy).toHaveBeenCalledWith(
                CategoriaEnum.Sobremesa,
            );
            expect(produto).toEqual([mockProduto]);
        });
    });

    describe("When updateProduto is called", () => {
        it("should call updateProduto on the gateway and return the updated produto", async () => {
            const updateSpy = jest.spyOn(gatewayStub, "update");
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
                .spyOn(gatewayStub, "getById")
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
            const deleteSpy = jest.spyOn(gatewayStub, "delete");

            await sut.delete("any-id");
            expect(deleteSpy).toHaveBeenCalledWith("any-id");
        });

        it("should throw an error if the produto does not exist", async () => {
            const gatewayStub = new ProdutoGatewayStub();
            const sut = new ProdutoUseCase(gatewayStub);
            const getByIdSpy = jest
                .spyOn(gatewayStub, "getById")
                .mockResolvedValueOnce(null);
            const produto = sut.delete("nonexistent-id");
            await expect(produto).rejects.toThrowError(
                new Error("Produto não encontrado"),
            );
            expect(getByIdSpy).toHaveBeenCalledWith("nonexistent-id");
        });
    });
});
