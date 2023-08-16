import { Cliente } from "entities/cliente";
import { StatusPedidoEnum, Pedido } from "entities/pedido";
import { Produto, CategoriaEnum } from "entities/produto";
import { PedidoGateway } from "interfaces/gateways/pedidoGateway.interface";
import { ProdutoGateway } from "interfaces/gateways/produtoGateway.interface";
import { PedidoUseCase } from "useCases";
import { Email, Cpf } from "valueObjects";

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
    status: StatusPedidoEnum.Pagamento_pendente,
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
const mockPedidoDTO3 = {
    id: "any_another_id",
    valorTotal: 29.9,
    status: StatusPedidoEnum.Recebido,
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
    let gatewayStub: PedidoGateway;
    let produtoGatewayStub: Partial<ProdutoGateway>;
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

    class PedidoGatewayStub implements PedidoGateway {
        getById(id: string): Promise<Pedido> {
            return new Promise((resolve) => resolve(mockPedidos[0]));
        }
        getAllOrderedByStatus(): Promise<Pedido[]> {
            return new Promise((resolve) => resolve(mockPedidos));
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

    class ProdutoGatewayStub implements Partial<ProdutoGateway> {
        getByIds(ids: string[]): Promise<Produto[]> {
            return new Promise((resolve) => resolve([LANCHE, SOBREMESA]));
        }
    }

    beforeAll(() => {
        gatewayStub = new PedidoGatewayStub();
        produtoGatewayStub = new ProdutoGatewayStub();
        sut = new PedidoUseCase(
            gatewayStub,
            produtoGatewayStub as ProdutoGateway,
        );
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    describe("When getAll is called", () => {
        it("should call getAll on the gateway and return the pedidos", async () => {
            const getAll = jest.spyOn(gatewayStub, "getAll");

            const pedidos = await sut.getAll();
            expect(getAll).toHaveBeenCalled();
            expect(pedidos).toEqual([mockPedidoDTO1, mockPedidoDTO2]);
        });
    });

    describe("When getAllOrderedByStatus is called", () => {
        it("should call getAllOrderedByStatus on the gateway and return the pedidos ordered by status", async () => {
            const getAllOrderedByStatus = jest.spyOn(
                gatewayStub,
                "getAllOrderedByStatus",
            );

            const pedidos = await sut.getAllOrderedByStatus();
            expect(getAllOrderedByStatus).toHaveBeenCalled();
            expect(pedidos).toEqual([mockPedidoDTO1, mockPedidoDTO2]);
        });
    });

    describe("When create is called", () => {
        it("should call create on the gateway and return the created pedido", async () => {
            const create = jest.spyOn(gatewayStub, "create");

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
        it("should call update on the gateway and return the updated pedido", async () => {
            const updateSpy = jest.spyOn(gatewayStub, "update");
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
                .spyOn(gatewayStub, "getById")
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
    describe("When updatePaymentStatus is called", () => {
        it("should call update on the gateway and return the pedido with the updated status to Recebido", async () => {
            const updateSpy = jest
                .spyOn(gatewayStub, "update")
                .mockResolvedValueOnce(new Pedido(mockPedidoDTO3));
            const pedido = await sut.updatePaymentStatus("any-another-id");
            expect(updateSpy).toHaveBeenCalledWith("any-another-id", {
                status: StatusPedidoEnum.Recebido,
            });
            expect(pedido).toEqual(mockPedidoDTO3);
        });

        it("should throw an error if the pedido does not exist", async () => {
            const getByIdSpy = jest
                .spyOn(gatewayStub, "getById")
                .mockResolvedValueOnce(null);

            const pedido = sut.updatePaymentStatus("nonexistent-id");

            await expect(pedido).rejects.toThrowError(
                new Error("Pedido não encontrado"),
            );
            expect(getByIdSpy).toHaveBeenCalledWith("nonexistent-id");
        });

        it("should throw an error if the pedido is already paid", async () => {
            const getByIdSpy = jest
                .spyOn(gatewayStub, "getById")
                .mockResolvedValueOnce(new Pedido(mockPedidoDTO2));

            const pedido = sut.updatePaymentStatus("already-paid-id");

            await expect(pedido).rejects.toThrowError(
                new Error("Pedido já foi pago"),
            );
            expect(getByIdSpy).toHaveBeenCalledWith("already-paid-id");
        });
    });
});
