import { errors } from "../error-colector";
import { SymbolTable } from "../symbol-table";
import { Node } from "./nodo";
import { Sentencia } from "./sentencia";

const SENTENCIA_INDEX = 0;
const SENTENCIAS_INDEX = 2;

export class Sentencias extends Node {
  sentencia: Sentencia;
  siguiente: Sentencias;
  constructor(ruleNumber: number, reducedData: any[]) {
    super(ruleNumber);
    this.sentencia = reducedData[SENTENCIA_INDEX];
    this.siguiente = reducedData[SENTENCIAS_INDEX];
  }

  validaSemantica(parentScope: SymbolTable): boolean {
    let node: Sentencias | undefined = this;
    let isValid = true;
    while (typeof(node) !== "number" && node != undefined) {
      try {
        isValid = isValid && node.sentencia.validaSemantica(parentScope)
      } catch(ex) {
        errors.push(ex.message);
      }
      node = this.siguiente;
    }
    return isValid;
  }
}