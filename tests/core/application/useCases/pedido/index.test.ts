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
  preco: 19.90,
  categoria: CategoriaEnum.Sobremesa,
  descricao: "Delicious petit gateau",
  imagem: "petit-gateau.jpg",
});

describe("Given PedidoUseCases", () => {
    let repositoryStub: IPedidoRepository;
    let sut: PedidoUseCase;

    const mockPedidos = [
      new Pedido({
        id: 'any_id',
        valorTotal: 10,
        cliente: new Cliente({
          id: '000',
          nome: 'John Doe',
          email: Email.create('john_doe@user.com.br'),
          cpf: Cpf.create('111.111.111-11')
        }),
        status: StatusPedidoEnum.Recebido,
        itens: [
          {
            produto: LANCHE,
            quantidade: 1
          }
        ],
      }),
      new Pedido({
        id: 'any_another_id',
        valorTotal: 29.90,
        status: StatusPedidoEnum.Em_preparacao,
        itens: [
          {
            produto: LANCHE,
            quantidade: 1
          },
          {
            produto: SOBREMESA,
            quantidade: 1
          },
        ],
      }),
    ];

    class PedidoRepositoryStub implements IPedidoRepository {
        getPedidoById(id: string): Promise<Pedido> {
          return new Promise((resolve) => resolve(mockPedidos[0]));
        }
        getPedidos(): Promise<Pedido[]> {
            return new Promise((resolve) => resolve(mockPedidos));
        }
        updatePedido(id: string, pedido: Partial<Pedido>): Promise<Pedido> {
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

    describe("When getPedidos is called", () => {
        it("should call getPedidos on the repository and return the pedidos", async () => {
            const getPedidos = jest.spyOn(
                repositoryStub,
                "getPedidos",
            );

            const pedidos = await sut.getPedidos();
            expect(getPedidos).toHaveBeenCalled();
            expect(pedidos).toEqual(mockPedidos);
        });
    });

    describe("When updatePedido is called", () => {
        it("should call updatePedido on the repository and return the updated pedido", async () => {
            const updatePedidoSpy = jest.spyOn(
                repositoryStub,
                "updatePedido",
            );
            const pedido = await sut.updatePedido("any-another-id", {
                status: StatusPedidoEnum.Em_preparacao,
            });
            expect(updatePedidoSpy).toHaveBeenCalledWith("any-another-id", {
              status: StatusPedidoEnum.Em_preparacao,
            });
            expect(pedido).toEqual(mockPedidos[1]);
        });

        it("should throw an error if the pedido does not exist", async () => {
            const getProdutoByIdSpy = jest
                .spyOn(repositoryStub, "getPedidoById")
                .mockResolvedValueOnce(null);

            const pedido = sut.updatePedido("nonexistent-id", {
                status: StatusPedidoEnum.Em_preparacao
            });

            await expect(pedido).rejects.toThrowError(
                new Error("Pedido não encontrado"),
            );
            expect(getProdutoByIdSpy).toHaveBeenCalledWith("nonexistent-id");
        });
    });
});
