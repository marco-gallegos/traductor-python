import { constant } from "lodash";
import { Token } from "../../models/token";
import { SymbolTable } from "../symbol-table";
import { Node } from "./nodo";

const CONSTANTE_INDEX = 0;

export class ExpresionConstante extends Node {
  constante: Token;
  constructor(ruleNumber: number, reducedData: any[]) {
    super(ruleNumber);
    this.constante = reducedData[CONSTANTE_INDEX];
  }

  validaSemantica(parentScope: SymbolTable): string | undefined {
    const tipo = this.constante.lexeme.includes('.') ? 'float' : 'int';
    return tipo;
  }
}
