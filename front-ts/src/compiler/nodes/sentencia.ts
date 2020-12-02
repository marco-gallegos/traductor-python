import { SymbolTable } from "../symbol-table";
import { Node } from "./nodo";

export class Sentencia extends Node {
  constructor(ruleNumber: number) {
    super(ruleNumber);
  }

  validaSemantica(parentScope: SymbolTable): boolean {
    throw new Error("No implementado");
  }
}
