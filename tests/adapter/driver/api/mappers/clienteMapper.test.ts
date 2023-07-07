import { Cliente } from "@domain/entities/cliente";
import { Cpf, Email } from "@domain/valueObjects";
import { ClienteMapper } from "@mappers/clienteMapper";

describe("Given ClienteMapper", () => {
    const mockNome = "John Doe";
    const mockEmail = "jdoe1@email.com";
    const mockCpf = "111.111.111-11";
    const mockCliente = new Cliente({
        nome: mockNome,
        email: Email.create(mockEmail),
        cpf: Cpf.create(mockCpf),
    });

    describe("When toDTO is called", () => {
        it("should parse a domain cliente to dto format", async () => {
            const parsed = ClienteMapper.toDTO(mockCliente);

            expect(parsed.nome).toEqual(mockCliente.nome);
            expect(parsed.email).toEqual(mockCliente.email.value);
            expect(parsed.cpf).toEqual(mockCliente.cpf.value);
        });
    });

    describe("When toDomain is called", () => {
        it("should parse a domain cliente to dto format", async () => {
            const parsed = ClienteMapper.toDomain({
                nome: mockNome,
                email: mockEmail,
                cpf: mockCpf,
            });

            expect(parsed.nome).toEqual(mockNome);
            expect(parsed.email.value).toEqual(mockEmail);
            expect(parsed.cpf.value).toEqual(mockCpf);
        });
    });
});
