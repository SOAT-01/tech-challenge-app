import { Cliente } from "entities/cliente";
import { Email, Cpf } from "valueObjects";

describe("Given ClienteEntity", () => {
    describe("when received all params correctly", () => {
        it("should create a new instance of Cliente", () => {
            const cliente = new Cliente({
                nome: "John Doe",
                email: Email.create("jdoe1@email.com"),
                cpf: Cpf.create("111.111.111-11"),
            });

            expect(cliente).toBeInstanceOf(Cliente);
        });
    });

    describe("When missing a required param", () => {
        it("should throw an error if nome is not provided", () => {
            expect(() => {
                new Cliente({
                    nome: undefined,
                    email: Email.create("jdoe1@email.com"),
                    cpf: Cpf.create("111.111.111-11"),
                });
            }).toThrow("Nome is required");
        });

        it("should throw an error if email is not provided", () => {
            expect(() => {
                new Cliente({
                    nome: "John Doe",
                    email: undefined,
                    cpf: Cpf.create("111.111.111-11"),
                });
            }).toThrow("Email is required");
        });
        it("should throw an error if email is in wrong format", () => {
            expect(() => {
                new Cliente({
                    nome: "John Doe",
                    email: Email.create("email.com"),
                    cpf: Cpf.create("111.111.111-11"),
                });
            }).toThrow("Incorrect email format");
        });

        it("should throw an error if cpf is not provided", () => {
            expect(() => {
                new Cliente({
                    nome: "John Doe",
                    email: Email.create("jdoe1@email.com"),
                    cpf: undefined,
                });
            }).toThrow("Cpf is required");
        });
        it("should throw an error if cpf is in wrong format", () => {
            expect(() => {
                new Cliente({
                    nome: "John Doe",
                    email: Email.create("jdoe1@email.com"),
                    cpf: Cpf.create("1111111111"),
                });
            }).toThrow("Incorrect cpf format");
        });
    });
});
