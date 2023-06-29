import { Cliente } from "@domain/entities/cliente";
import { Pedido, StatusPedidoEnum } from "@domain/entities/pedido";
import { CategoriaEnum, Produto } from "@domain/entities/produto";
import { Cpf, Email } from "@domain/valueObjects";

const PRODUTO = new Produto({
    nome: "Hamburguer",
    preco: 10,
    categoria: CategoriaEnum.Lanche,
    descricao: "Delicious hamburger",
    imagem: "hamburguer.jpg",
    id: "123",
});

describe("Given PedidoEntity", () => {
    describe("when received all params correctly", () => {
        it("should create a new instance of Pedido", () => {
            const pedido = new Pedido({
                valorTotal: 10,
                status: StatusPedidoEnum.Recebido,
                cliente: new Cliente({
                    id: "000",
                    nome: "John Doe",
                    email: Email.create("john_doe@user.com.br"),
                    cpf: Cpf.create("111.111.111-11"),
                }),
                itens: [
                    {
                        produtoId: PRODUTO.id,
                        quantidade: 1,
                    },
                ],
            });

            expect(pedido).toBeInstanceOf(Pedido);
        });
    });

    describe("when receive just valorTotal and itens", () => {
        it("should create a new instance of Pedido with default values", () => {
            const pedido = new Pedido({
                valorTotal: 10,
                status: StatusPedidoEnum.Recebido,
                itens: [
                    {
                        produtoId: PRODUTO.id,
                        quantidade: 1,
                    },
                ],
            });

            expect(pedido).toBeInstanceOf(Pedido);
            expect(pedido.cliente).toBeNull();
            expect(pedido.status).toBe(StatusPedidoEnum.Recebido);
        });
    });

    describe("When missing a required param", () => {
        it("should throw an error if valorTotal is not provided or it is zero", () => {
            expect(() => {
                new Pedido({
                    valorTotal: undefined,
                    status: StatusPedidoEnum.Recebido,
                    itens: [
                        {
                            produtoId: PRODUTO.id,
                            quantidade: 1,
                        },
                    ],
                });
            }).toThrow("Valor total is required");

            expect(() => {
                new Pedido({
                    valorTotal: 0,
                    status: StatusPedidoEnum.Recebido,
                    itens: [
                        {
                            produtoId: PRODUTO.id,
                            quantidade: 1,
                        },
                    ],
                });
            }).toThrow("Valor total must be bigger than zero");
        });

        it("should throw an error if no item is provided", () => {
            expect(() => {
                new Pedido({
                    valorTotal: 10,
                    status: StatusPedidoEnum.Recebido,
                    itens: [],
                });
            }).toThrow("At least one Item is required");
        });
    });
});
