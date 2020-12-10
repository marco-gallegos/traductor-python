import { Token } from "../../models/token";
import { SymbolTable } from "../symbol-table";
import { Node } from "./nodo";
import { Sentencia } from "./sentencia";

const SENTENCIA_INDEX = 0;

export class SentenciaBloqueSentencia extends Node {
  sentencia: Sentencia;
  constructor(ruleNumber: number, reducedData: any[]) {
    super(ruleNumber);
    this.sentencia = reducedData[SENTENCIA_INDEX];
  }

  validaSemantica(parentScope: SymbolTable): boolean {
    return this.sentencia.validaSemantica(parentScope);
  }
}
