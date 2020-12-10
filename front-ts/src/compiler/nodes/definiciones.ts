import { setupMaster } from "cluster";
import { exception } from "console";
import { errors } from "../error-colector";
import { SymbolTable, SymbolTableRecord } from "../symbol-table";
import { Definicion } from "./definicion";
import { Node } from "./nodo";

const DEFINICION_INDEX = 0;
const DEFINICIONES_INDEX = 2;

export class Definiciones extends Node {
  scope: SymbolTable;
  definicion: Definicion;
  siguiente: Definiciones | undefined;
  constructor(numberOfRule: number, reducedData: any[]) {
    super(numberOfRule);
    this.definicion = reducedData[DEFINICION_INDEX];
    if (typeof (reducedData[DEFINICIONES_INDEX]) !== "number") {
      this.siguiente = reducedData[DEFINICIONES_INDEX];
    }
    this.scope = new SymbolTable(undefined);
  }
  validaSemantica(): boolean {
    let isValid = true;
    let node: Definiciones | undefined = this;
    while (typeof(node) !== "number" && node != undefined) {
      try {
        node.definicion.validaSemantica(this.scope);
      } catch (exception) {
        isValid = false;
        errors.push(exception.message);
      }
      node = node.siguiente;
    }
    return isValid;
  }
}
