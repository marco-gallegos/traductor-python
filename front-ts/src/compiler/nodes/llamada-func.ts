import { Token } from "../../models/token";
import { errors } from "../error-colector";
import { SymbolTable } from "../symbol-table";
import { Argumentos } from "./argumentos";
import { ListaArgumentos } from "./lista-argumentos";
import { Node } from "./nodo";

const ID_INDEX = 0;
const ARGUMENTOS_INDEX = 4;

export class LlamadaFunc extends Node {
  id: Token;
  argumentos: Argumentos;
  constructor(ruleNumber: number, reducedData: any[]) {
    super(ruleNumber);
    this.id = reducedData[ID_INDEX];
    this.argumentos = reducedData[ARGUMENTOS_INDEX];
  }

  getArgumentTypes(parentScope: SymbolTable) {
    let argumentTypeList: string[] = [];
    let isValid = true;
    let node: Argumentos | ListaArgumentos = this.argumentos;
    while (typeof(node) !== "number" && node != undefined) {
      const tipo = node.expresion.validaSemantica(parentScope);
      argumentTypeList.push(tipo!);
      node = node.siguiente;
    }
    return argumentTypeList;
  }
}
