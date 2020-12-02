import { Token } from "../../models/token";
import { errors } from "../error-colector";
import { SymbolTable } from "../symbol-table";
import { Node } from "./nodo";

const ID_INDEX = 0;

export class ExpresionId extends Node {
  id: Token;
  constructor(ruleNumber: number, reducedData: any[]) {
    super(ruleNumber);
    this.id = reducedData[ID_INDEX];
  }

  validaSemantica(parentScope: SymbolTable): string | undefined {
    const symbol = parentScope.search(this.id.lexeme);
    if (!symbol) {
      errors.push('Variable "' + this.id.lexeme + '" no declarada en "'  + parentScope.scopeName + '"');
      return undefined;
    }
    return symbol?.tipo || undefined;
  }
}
