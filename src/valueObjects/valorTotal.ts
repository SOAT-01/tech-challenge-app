import { Item } from "entities/pedido";
import { ValueObject } from "interfaces/valueObject";
import { AssertionConcern } from "utils/assertionConcern";

interface ValorTotalProperties {
    value: number;
}

export class ValorTotal extends ValueObject<ValorTotalProperties> {
    private constructor(props: ValorTotalProperties) {
        super(props);
    }

    get value(): number {
        return this.props.value;
    }

    public static create(itens: Item[]): ValorTotal {
        AssertionConcern.assertArgumentNotEmpty(
            itens,
            "Lista de itens não pode estar vazia durante o cálculo do valor.",
        );
        AssertionConcern.assertArgumentHasQuantityAndPrice(
            itens,
            "Lista de itens não possui os valores necessários para o cálculo do valor.",
        );

        const total = itens.reduce((valorTotal, item) => {
            return (valorTotal += item.preco * item.quantidade);
        }, 0);

        return new ValorTotal({ value: total });
    }
}
