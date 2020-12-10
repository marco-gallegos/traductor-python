import { SymbolTable } from "../symbol-table";
import { Expresion } from "./expresion";
import { Node } from "./nodo";

const EXPRESION_INDEX = 2;

export class ExpresionParentesis extends Node {
  expresion: Expresion;
  constructor(ruleNumber: number, reducedData: any[]) {
    super(ruleNumber);
    this.expresion = reducedData[EXPRESION_INDEX];
  }

  validaSemantica(parentScope: SymbolTable): boolean {
    return this.expresion.validaSemantica(parentScope) != undefined;
  }
}
