import { Cliente } from "@domain/entities/cliente";
import { Pedido, StatusPedidoEnum } from "@domain/entities/pedido";
import { Produto, CategoriaEnum } from "@domain/entities/produto";
import { PedidoRepository } from "@domain/repositories/pedidoRepository.interface";
import { ProdutoRepository } from "@domain/repositories/produtoRepository.interface";
import { Cpf, Email } from "@domain/valueObjects";
import { PedidoUseCase } from "@useCases/pedido";

const mockClienteDTO = {
    id: "000",
    nome: "John Doe",
    email: "john_doe@user.com.br",
    cpf: "111.111.111-11",
};

const mockCliente = new Cliente({
    id: mockClienteDTO.id,
    nome: mockClienteDTO.nome,
    email: Email.create(mockClienteDTO.email),
    cpf: Cpf.create(mockClienteDTO.cpf),
});

const LANCHE = new Produto({
    id: "123",
    nome: "Hamburguer",
    preco: 10,
    categoria: CategoriaEnum.Lanche,
    descricao: "Delicious hamburger",
    imagem: "hamburguer.jpg",
});

const SOBREMESA = new Produto({
    id: "321",
    nome: "Petit Gateau",
    preco: 19.9,
    categoria: CategoriaEnum.Sobremesa,
    descricao: "Delicious petit gateau",
    imagem: "petit-gateau.jpg",
});

const mockPedidoDTO1 = {
    id: "any_id",
    valorTotal: 10,
    cliente: mockClienteDTO,
    status: StatusPedidoEnum.Recebido,
    itens: [
        {
            produtoId: LANCHE.id,
            quantidade: 1,
        },
    ],
};

const mockPedidoDTO2 = {
    id: "any_another_id",
    valorTotal: 29.9,
    status: StatusPedidoEnum.Em_preparacao,
    itens: [
        {
            produtoId: LANCHE.id,
            quantidade: 1,
        },
        {
            produtoId: SOBREMESA.id,
            quantidade: 1,
        },
    ],
};

describe("Given PedidoUseCases", () => {
    let repositoryStub: PedidoRepository;
    let produtoRepositoryStub: Partial<ProdutoRepository>;
    let sut: PedidoUseCase;

    const mockPedidos = [
        new Pedido({
            id: mockPedidoDTO1.id,
            valorTotal: mockPedidoDTO1.valorTotal,
            cliente: mockCliente,
            status: mockPedidoDTO1.status,
            itens: mockPedidoDTO1.itens,
        }),
        new Pedido({
            id: mockPedidoDTO2.id,
            valorTotal: mockPedidoDTO2.valorTotal,
            status: mockPedidoDTO2.status,
            itens: mockPedidoDTO2.itens,
        }),
    ];

    class PedidoRepositoryStub implements PedidoRepository {
        getById(id: string): Promise<Pedido> {
            return new Promise((resolve) => resolve(mockPedidos[0]));
        }
        getAll(): Promise<Pedido[]> {
            return new Promise((resolve) => resolve(mockPedidos));
        }
        create(pedido: Pedido): Promise<Pedido> {
            return new Promise((resolve) => resolve(mockPedidos[1]));
        }
        update(id: string, pedido: Partial<Pedido>): Promise<Pedido> {
            return new Promise((resolve) => resolve(mockPedidos[1]));
        }
    }

    class ProdutoRepositoryStub implements Partial<ProdutoRepository> {
        getByIds(ids: string[]): Promise<Produto[]> {
            return new Promise((resolve) => resolve([LANCHE, SOBREMESA]));
        }
    }

    beforeAll(() => {
        repositoryStub = new PedidoRepositoryStub();
        produtoRepositoryStub = new ProdutoRepositoryStub();
        sut = new PedidoUseCase(
            repositoryStub,
            produtoRepositoryStub as ProdutoRepository,
        );
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    describe("When getAll is called", () => {
        it("should call getAll on the repository and return the pedidos", async () => {
            const getAll = jest.spyOn(repositoryStub, "getAll");

            const pedidos = await sut.getAll();
            expect(getAll).toHaveBeenCalled();
            expect(pedidos).toEqual([mockPedidoDTO1, mockPedidoDTO2]);
        });
    });

    describe("When create is called", () => {
        it("should call create on the repository and return the created pedido", async () => {
            const create = jest.spyOn(repositoryStub, "create");

            const pedido = await sut.create({
                // valorTotal: 29.9,
                itens: [
                    {
                        produtoId: LANCHE.id,
                        quantidade: 1,
                    },
                    {
                        produtoId: SOBREMESA.id,
                        quantidade: 1,
                    },
                ],
            });
            expect(create).toHaveBeenCalled();
            expect(pedido).toEqual(mockPedidoDTO2);
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
            expect(pedido).toEqual(mockPedidoDTO2);
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
