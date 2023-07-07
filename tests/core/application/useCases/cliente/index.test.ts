import { Cliente } from "@domain/entities/cliente";
import { ClienteRepository } from "@domain/repositories/clienteRepository.interface";
import { Cpf, Email } from "@domain/valueObjects";

import { ClienteUseCase } from "@useCases/cliente";

describe("Given ClienteUseCases", () => {
    let repositoryStub: ClienteRepository;
    let sut: ClienteUseCase;

    const mockEmail = "jdoe1@email.com";
    const mockCpf = "111.111.111-11";

    const mockEmail2 = "jdoe2@email.com";
    const mockCpf2 = "222.222.222-22";

    const mockDTO = {
        nome: "John Doe",
        email: mockEmail,
        cpf: mockCpf,
    };

    const mockCliente = new Cliente({
        nome: mockDTO.nome,
        email: Email.create(mockDTO.email),
        cpf: Cpf.create(mockDTO.cpf),
    });

    class ClienteRepositoryStub implements ClienteRepository {
        create(cliente: Cliente): Promise<Cliente> {
            return new Promise((resolve) => resolve(mockCliente));
        }
        getByCpf(cpf: string): Promise<Cliente> {
            return new Promise((resolve) => resolve(mockCliente));
        }
        getByEmail(email: string): Promise<Cliente> {
            return new Promise((resolve) => resolve(mockCliente));
        }
        checkDuplicate(args: {
            email: string;
            cpf?: string;
        }): Promise<boolean> {
            if (args.email === mockEmail2 || args.cpf === mockCpf2) {
                return new Promise((resolve) => resolve(true));
            }
            return new Promise((resolve) => resolve(false));
        }
    }

    beforeAll(() => {
        repositoryStub = new ClienteRepositoryStub();
        sut = new ClienteUseCase(repositoryStub);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    describe("When create is called", () => {
        it("should call create on the repository and return the created cliente", async () => {
            const create = jest.spyOn(repositoryStub, "create");

            const cliente = await sut.create(mockDTO);

            expect(cliente.nome).toEqual(mockDTO.nome);
            expect(cliente.cpf).toEqual(mockDTO.cpf);
            expect(create).toHaveBeenCalledWith(mockCliente);
        });

        it("should create on the repository and throw an error for duplicate cliente", async () => {
            await expect(
                sut.create({
                    nome: "John Doe",
                    email: mockEmail2,
                    cpf: mockCpf2,
                }),
            ).rejects.toThrow("Cliente already exists.");
        });
    });

    describe("When getByCpf is called", () => {
        it("should call getByCpf on the repository and return cliente for a correct cpf", async () => {
            const getByCpf = jest.spyOn(repositoryStub, "getByCpf");

            const cliente = await sut.getByCpf(mockCpf);
            expect(getByCpf).toHaveBeenCalledWith(mockCpf);
            expect(cliente).toEqual(mockDTO);
        });
    });

    describe("When getByEmail is called", () => {
        it("should call getByEmail on the repository and return cliente for a correct email", async () => {
            const getByEmail = jest.spyOn(repositoryStub, "getByEmail");

            const cliente = await sut.getByEmail(mockEmail);
            expect(getByEmail).toHaveBeenCalledWith(mockEmail);
            expect(cliente).toEqual(mockDTO);
        });
    });
});
