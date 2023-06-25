import { Cliente } from "@domain/entities/cliente";
import { Cpf, Email } from "@domain/valueObjects";
import { ClienteMapper } from "@mappers/clienteMapper";

describe("Given ClienteMapper", () => {
    const mockEmail = "jdoe1@email.com";
    const mockCpf = "111.111.111-11";
    const mockCliente = new Cliente({
        nome: "John Doe",
        email: Email.create(mockEmail),
        cpf: Cpf.create(mockCpf),
    });

    describe("When toResponse is called", () => {
        it("should parse a domain cliente to response format", async () => {
            const parsed = ClienteMapper.toResponse(mockCliente);

            expect(parsed.nome).toEqual(mockCliente.nome);
            expect(parsed.email).toEqual(mockCliente.email.value);
            expect(parsed.cpf).toEqual(mockCliente.cpf.value);
        });
    });
});
