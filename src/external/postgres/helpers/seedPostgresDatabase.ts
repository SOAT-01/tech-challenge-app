import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { serverConfig } from "config";
import { ClienteSchema, ProdutoSchema } from "../schemas";

const postgresClient = postgres({
    host: serverConfig.postgres.host,
    port: serverConfig.postgres.port,
    database: serverConfig.postgres.database,
    user: serverConfig.postgres.user,
    password: serverConfig.postgres.password,
    max: 1,
});

const db = drizzle(postgresClient);

async function seedClientes() {
    console.log("Seeding Clientes...");
    const data: (typeof ClienteSchema.$inferInsert)[] = [
        {
            nome: "John Doe",
            email: "john@soat.com.br",
            cpf: "392.145.980-02",
        },
        {
            nome: "Jane Doe",
            email: "jane@soat.com.br",
            cpf: "293.909.060-24",
        },
    ];

    await db.insert(ClienteSchema).values(data);
    return;
}

async function seedProdutos() {
    console.log("Seeding Produtos...");
    const data: (typeof ProdutoSchema.$inferInsert)[] = [
        {
            nome: "Bolo",
            preco: (20.25).toString(10),
            categoria: "sobremesa",
            descricao: "Sobremesa de chocolate com morango'",
            imagem: "www.any-image.com/fake1.jpg",
        },
        {
            nome: "Suco laranja",
            preco: (5).toString(10),
            categoria: "bebida",
            descricao: "Suco de laranja natural'",
            imagem: "www.any-image.com/fake2.jpg",
        },
        {
            nome: "Batatas fritas",
            preco: (10).toString(10),
            categoria: "acompanhamento",
            descricao: "Batatas fritas'",
            imagem: "www.any-image.com/fake3.jpg",
        },
        {
            nome: "Cachorro quente",
            preco: (15).toString(10),
            categoria: "lanche",
            descricao: "Cachorro quente simples'",
            imagem: "www.any-image.com/fake4.jpg",
        },
    ];

    await db.insert(ProdutoSchema).values(data);
    return;
}

async function runSeed() {
    console.log("Seeding Postgres...");
    await seedClientes();
    await seedProdutos();
    console.log("Seed complete.");
    process.exit(0);
}

runSeed()
    .then()
    .catch((e) => {
        console.log(e);
        process.exit(0);
    });
