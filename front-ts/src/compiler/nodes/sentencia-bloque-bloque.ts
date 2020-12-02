import { SymbolTable } from "../symbol-table";
import { Bloque } from "./bloque";
import { Node } from "./nodo";

const BLOQUE_INDEX = 0;

export class SentenciaBloqueBloque extends Node {
  bloque: Bloque;
  constructor(ruleNumber: number, reducedData: any[]) {
    super(ruleNumber);
    this.bloque = reducedData[BLOQUE_INDEX];
  }

  validaSemantica(parentScope: SymbolTable): boolean {
    return this.bloque.validaSemantica(parentScope);
  }
}
