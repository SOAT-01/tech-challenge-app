import { Cliente } from "@domain/entities/cliente";
import { Pedido, StatusPedidoEnum } from "@domain/entities/pedido";
import { Produto, CategoriaEnum } from "@domain/entities/produto";
import { IPedidoRepository } from "@domain/repositories/pedidoRepository.interface";
import { Cpf, Email } from "@domain/valueObjects";
import { PedidoUseCase } from "@useCases/pedido";

const LANCHE = new Produto({
    nome: "Hamburguer",
    preco: 10,
    categoria: CategoriaEnum.Lanche,
    descricao: "Delicious hamburger",
    imagem: "hamburguer.jpg",
});

const SOBREMESA = new Produto({
    nome: "Petit Gateau",
    preco: 19.9,
    categoria: CategoriaEnum.Sobremesa,
    descricao: "Delicious petit gateau",
    imagem: "petit-gateau.jpg",
});

describe("Given PedidoUseCases", () => {
    let repositoryStub: IPedidoRepository;
    let sut: PedidoUseCase;

    const mockPedidos = [
        new Pedido({
            id: "any_id",
            valorTotal: 10,
            cliente: new Cliente({
                id: "000",
                nome: "John Doe",
                email: Email.create("john_doe@user.com.br"),
                cpf: Cpf.create("111.111.111-11"),
            }),
            status: StatusPedidoEnum.Recebido,
            itens: [
                {
                    produto: LANCHE,
                    quantidade: 1,
                },
            ],
        }),
        new Pedido({
            id: "any_another_id",
            valorTotal: 29.9,
            status: StatusPedidoEnum.Em_preparacao,
            itens: [
                {
                    produto: LANCHE,
                    quantidade: 1,
                },
                {
                    produto: SOBREMESA,
                    quantidade: 1,
                },
            ],
        }),
    ];

    class PedidoRepositoryStub implements IPedidoRepository {
        getById(id: string): Promise<Pedido> {
            return new Promise((resolve) => resolve(mockPedidos[0]));
        }
        getAll(): Promise<Pedido[]> {
            return new Promise((resolve) => resolve(mockPedidos));
        }
        update(id: string, pedido: Partial<Pedido>): Promise<Pedido> {
            return new Promise((resolve) => resolve(mockPedidos[1]));
        }
    }

    beforeAll(() => {
        repositoryStub = new PedidoRepositoryStub();
        sut = new PedidoUseCase(repositoryStub);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    describe("When getAll is called", () => {
        it("should call getAll on the repository and return the pedidos", async () => {
            const getAll = jest.spyOn(repositoryStub, "getAll");

            const pedidos = await sut.getAll();
            expect(getAll).toHaveBeenCalled();
            expect(pedidos).toEqual(mockPedidos);
        });
    });

    describe("When update is called", () => {
        it("should call update on the repository and return the updated pedido", async () => {
            const updateSpy = jest.spyOn(repositoryStub, "update");
            const pedido = await sut.update("any-another-id", {
                status: StatusPedidoEnum.Em_preparacao,
            });
            expect(updateSpy).toHaveBeenCalledWith("any-another-id", {
                status: StatusPedidoEnum.Em_preparacao,
            });
            expect(pedido).toEqual(mockPedidos[1]);
        });

        it("should throw an error if the pedido does not exist", async () => {
            const getByIdSpy = jest
                .spyOn(repositoryStub, "getById")
                .mockResolvedValueOnce(null);

            const pedido = sut.update("nonexistent-id", {
                status: StatusPedidoEnum.Em_preparacao,
            });

            await expect(pedido).rejects.toThrowError(
                new Error("Pedido não encontrado"),
            );
            expect(getByIdSpy).toHaveBeenCalledWith("nonexistent-id");
        });
    });
});