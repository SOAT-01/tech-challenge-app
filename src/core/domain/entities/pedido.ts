import { Entity } from "@domain/base/entity.interface";
import { Produto } from "./produto";
import { AssertionConcern } from "@domain/base/assertionConcern";

export enum StatusPedidoEnum {
  Recebido = "recebido",
  Em_preparacao = "em_preparacao",
  Pronto = "pronto",
  Finalizado = "finalizado",
}

export type StatusPedido = `${StatusPedidoEnum}`;

// TODO: trocar para a entidade cliente depois
export type Cliente = {
  id: string;
  nome: string;
  email: string;
  cpf?: string;
}
export type ItemPedido = {
  produto: Produto;
  quantidade: number;
}

export class Pedido implements Entity {
  id: string;
  status: StatusPedido;
  valorTotal: number; // float
  // TODO: trocar para a entidade cliente depois
  cliente?: Cliente;
  itens: ItemPedido[];
  observacoes: string;

  constructor({
    id,
    status,
    valorTotal,
    cliente,
    itens,
    observacoes
  }: {
      id?: string;
      status: StatusPedido;
      valorTotal: number;
      cliente?: Cliente;
      itens: ItemPedido[];
      observacoes?: string;
  }) {
    this.id = id;
    this.status = status;
    this.valorTotal = valorTotal;
    this.cliente = cliente || null;
    this.itens = itens;
    this.observacoes = observacoes;

    this.validateEntity();
  }

  public validateEntity(): void {
    AssertionConcern.assertArgumentNotEmpty(
      this.valorTotal,
      "Valor total is required",
    );

    AssertionConcern.assertArgumentIsBiggerThanZero(
      this.valorTotal,
      "Valor total must be bigger than zero",
    );

    // TODO: não consegui incluir um teste para validar essa mensagem porque não deixa nem compilar
    AssertionConcern.assertArgumentIsValid(
      this.status, 
      Object.values(StatusPedidoEnum), 
      `Status must be one of ${Object.values(StatusPedidoEnum)}`
    );

    AssertionConcern.assertArgumentNotEmpty(
      this.itens,
      "At least one Item is required",
    );
  }
}