import { Cliente } from "entities/cliente";
import { StatusPedidoEnum, Pedido, StatusPagamentoEnum } from "entities/pedido";
import { Produto, CategoriaEnum } from "entities/produto";
import {
    ClienteGateway,
    PedidoGateway,
    ProdutoGateway,
} from "interfaces/gateways";
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
    status: StatusPedidoEnum.Recebido,
    pagamento: StatusPagamentoEnum.Pagamento_pendente,
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
    pagamento: StatusPagamentoEnum.Pagamento_aprovado,
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
    id: "any_onemore_id",
    valorTotal: 29.9,
    status: StatusPedidoEnum.Finalizado,
    pagamento: StatusPagamentoEnum.Pagamento_aprovado,
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
    let clienteGatewayStub: Partial<ClienteGateway>;
    let sut: PedidoUseCase;

    const mockPedidos = [
        new Pedido({
            id: mockPedidoDTO1.id,
            valorTotal: mockPedidoDTO1.valorTotal,
            cliente: mockCliente,
            status: mockPedidoDTO1.status,
            pagamento: mockPedidoDTO1.pagamento,
            itens: mockPedidoDTO1.itens,
        }),
        new Pedido({
            id: mockPedidoDTO2.id,
            valorTotal: mockPedidoDTO2.valorTotal,
            status: mockPedidoDTO2.status,
            pagamento: mockPedidoDTO2.pagamento,
            itens: mockPedidoDTO2.itens,
        }),
        new Pedido({
            id: mockPedidoDTO3.id,
            valorTotal: mockPedidoDTO3.valorTotal,
            status: mockPedidoDTO3.status,
            pagamento: mockPedidoDTO3.pagamento,
            itens: mockPedidoDTO3.itens,
        }),
    ];

    class PedidoGatewayStub implements PedidoGateway {
        updateStatusPagamento(
            id: string,
            status:
                | "pagamento_pendente"
                | "pagamento_aprovado"
                | "pagamento_nao_autorizado",
        ): Promise<Pedido> {
            throw new Error("Method not implemented.");
        }
        getById(id: string): Promise<Pedido> {
            return new Promise((resolve) =>
                resolve(mockPedidos.find((p) => p.id === id)),
            );
        }
        getAllOrderedByStatus(): Promise<Pedido[]> {
            return new Promise((resolve) => resolve(mockPedidos));
        }
        getAll(): Promise<Pedido[]> {
            return new Promise((resolve) => resolve(mockPedidos));
        }
        checkout(pedido: Pedido): Promise<Pedido> {
            return new Promise((resolve) => resolve(mockPedidos[1]));
        }
        update(id: string, pedido: Partial<Pedido>): Promise<Pedido> {
            return new Promise((resolve) => resolve(mockPedidos[1]));
        }
        updateStatus(id: string, status: StatusPedidoEnum): Promise<Pedido> {
            return new Promise((resolve) => resolve(mockPedidos[1]));
        }
    }

    class ProdutoGatewayStub implements Partial<ProdutoGateway> {
        getByIds(ids: string[]): Promise<Produto[]> {
            return new Promise((resolve) => resolve([LANCHE, SOBREMESA]));
        }
    }

    class ClienteGatewayStub implements Partial<ClienteGateway> {
        getById(id: string): Promise<Cliente> {
            return new Promise((resolve) => resolve(mockCliente));
        }
    }

    beforeAll(() => {
        gatewayStub = new PedidoGatewayStub();
        produtoGatewayStub = new ProdutoGatewayStub();
        clienteGatewayStub = new ClienteGatewayStub();
        sut = new PedidoUseCase(
            gatewayStub,
            produtoGatewayStub as ProdutoGateway,
            clienteGatewayStub as ClienteGateway,
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
            expect(pedidos).toEqual([
                mockPedidoDTO1,
                mockPedidoDTO2,
                mockPedidoDTO3,
            ]);
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
            expect(pedidos).toEqual([
                mockPedidoDTO1,
                mockPedidoDTO2,
                mockPedidoDTO3,
            ]);
        });
    });

    describe("When checkout is called", () => {
        it("should call checkout on the gateway and return the created pedido id", async () => {
            const create = jest.spyOn(gatewayStub, "checkout");

            const pedido = await sut.checkout({
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
            const pedido = await sut.update("any_another_id", {
                valorTotal: 10,
            });
            expect(updateSpy).toHaveBeenCalledWith("any_another_id", {
                valorTotal: 10,
            });
            expect(pedido).toEqual(mockPedidoDTO2);
        });

        it("should throw an error if the pedido does not exist", async () => {
            const getByIdSpy = jest
                .spyOn(gatewayStub, "getById")
                .mockResolvedValueOnce(null);

            const pedido = sut.update("nonexistent-id", {
                valorTotal: 10,
            });

            await expect(pedido).rejects.toThrowError(
                new Error("Pedido não encontrado"),
            );
            expect(getByIdSpy).toHaveBeenCalledWith("nonexistent-id");
        });

        it("should throw an error if has attempt to update status", async () => {
            const pedido = sut.update("any_another_id", {
                status: StatusPedidoEnum.Em_preparacao,
            });

            await expect(pedido).rejects.toThrowError(
                new Error("Não é possível alterar o status por essa rota"),
            );
        });

        it("should throw an error if has attempt to update payment status", async () => {
            const pedido = sut.update("any_another_id", {
                pagamento: StatusPagamentoEnum.Pagamento_aprovado,
            });

            await expect(pedido).rejects.toThrowError(
                new Error(
                    "Não é possível alterar o status de pagamento por essa rota",
                ),
            );
        });
    });

    describe("When updateStatus is called", () => {
        it("should call updateStatus on the gateway and return the updated pedido", async () => {
            const updateStatusSpy = jest.spyOn(gatewayStub, "updateStatus");
            const pedido = await sut.updateStatus(
                "any_another_id",
                StatusPedidoEnum.Pronto,
            );
            expect(updateStatusSpy).toHaveBeenCalledWith(
                "any_another_id",
                StatusPedidoEnum.Pronto,
            );
            expect(pedido).toEqual(mockPedidoDTO2);
        });

        it("should throw an error if the pedido does not exist", async () => {
            const getByIdSpy = jest
                .spyOn(gatewayStub, "getById")
                .mockResolvedValueOnce(null);

            const pedido = sut.updateStatus(
                "nonexistent-id",
                StatusPedidoEnum.Em_preparacao,
            );

            await expect(pedido).rejects.toThrowError(
                new Error("Pedido não encontrado"),
            );
            expect(getByIdSpy).toHaveBeenCalledWith("nonexistent-id");
        });

        it("should throw an error if the request body does not contain status", async () => {
            const pedido = sut.updateStatus("any_another_id", undefined);

            await expect(pedido).rejects.toThrowError(
                new Error("É necessário informar o status"),
            );
        });

        it("should throw an error if the order is already 'finalizado'", async () => {
            const pedido = sut.updateStatus(
                "any_onemore_id",
                StatusPedidoEnum.Finalizado,
            );

            await expect(pedido).rejects.toThrowError(
                new Error(
                    "Não é possível alterar o status pois o pedido já está finalizado!",
                ),
            );
        });

        it("should throw an error if the request body does not contain a valid status", async () => {
            const pedido = sut.updateStatus(
                "any_another_id",
                "invalid_status" as any,
            );

            await expect(pedido).rejects.toThrowError(
                new Error("É necessário informar um status válido"),
            );
        });

        it("should throw an error if the order's payment is not authorized yet", async () => {
            const pedido = sut.updateStatus(
                "any_id",
                StatusPedidoEnum.Em_preparacao,
            );

            await expect(pedido).rejects.toThrowError(
                new Error(
                    "Não é possível alterar o status pois o pagamento ainda não foi aprovado!",
                ),
            );
        });

        it("should throw an error if the status is before current status", async () => {
            const pedido = sut.updateStatus(
                "any_another_id",
                StatusPedidoEnum.Recebido,
            );

            await expect(pedido).rejects.toThrowError(
                new Error(
                    "Status inválido, o próximo status válido para esse pedido é: pronto",
                ),
            );
        });

        it("should throw an error if the status is after expected status", async () => {
            const pedido = sut.updateStatus(
                "any_another_id",
                StatusPedidoEnum.Finalizado,
            );

            await expect(pedido).rejects.toThrowError(
                new Error(
                    "Status inválido, o próximo status válido para esse pedido é: pronto",
                ),
            );
        });
    });
    // describe("When updatePaymentStatus is called", () => {
    //     it("should call update on the gateway and return the pedido with the updated status to Recebido", async () => {
    //         const updateSpy = jest
    //             .spyOn(gatewayStub, "update")
    //             .mockResolvedValueOnce(new Pedido(mockPedidoDTO3));
    //         const pedido = await sut.updatePaymentStatus("any_another_created_id");
    //         expect(updateSpy).toHaveBeenCalledWith("any_another_created_id", {
    //             pagamento: StatusPagamentoEnum.Pagamento_aprovado,
    //             status: StatusPedidoEnum.Recebido,
    //         });
    //         expect(pedido).toEqual(mockPedidoDTO3);
    //     });

    //     it("should throw an error if the pedido does not exist", async () => {
    //         const getByIdSpy = jest
    //             .spyOn(gatewayStub, "getById")
    //             .mockResolvedValueOnce(null);

    //         const pedido = sut.updatePaymentStatus("nonexistent-id");

    //         await expect(pedido).rejects.toThrowError(
    //             new Error("Pedido não encontrado"),
    //         );
    //         expect(getByIdSpy).toHaveBeenCalledWith("nonexistent-id");
    //     });

    //     it("should throw an error if the pedido is already paid", async () => {
    //         const getByIdSpy = jest
    //             .spyOn(gatewayStub, "getById")
    //             .mockResolvedValueOnce(new Pedido(mockPedidoDTO2));

    //         const pedido = sut.updatePaymentStatus("already-paid-id");

    //         await expect(pedido).rejects.toThrowError(
    //             new Error("Pedido já foi pago"),
    //         );
    //         expect(getByIdSpy).toHaveBeenCalledWith("already-paid-id");
    //     });
    // });
});
