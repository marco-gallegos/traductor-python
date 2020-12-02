import { extend } from "lodash";
import { SymbolTable } from "../symbol-table";
import { DefFunc } from "./deffunc";
import { DefVar } from "./defvar";
import { Node } from "./nodo";

const DEF_INDEX = 0;

export class Definicion extends Node {
  defVar: DefVar | undefined;
  defFunc: DefFunc | undefined;
  constructor(numberOfRule: number, reducedData: any[]) {
    super(numberOfRule);
    const def = reducedData[DEF_INDEX];
    if (def instanceof DefVar) {
      this.defVar = def;
    } else {
      this.defFunc = def;
    }
  }
  validaSemantica(parentScope: SymbolTable): boolean {
    if (this.defVar) {
      return this.defVar.validaSemantica(parentScope);
    } else {
      return !!this.defFunc?.validaSemantica(parentScope);
    }
  }
}
