import { SymbolTable } from "../symbol-table";
import { DefVar } from "./defvar";
import { Node } from "./nodo";
import { Sentencia } from "./sentencia";

const DEF_INDEX = 0;

export class DefLocal extends Node {
  defVar: DefVar | undefined;
  sentencia: Sentencia | undefined;
  constructor(ruleNumber: number, reduceData: any[]) {
    super(ruleNumber);
    const definition = reduceData[DEF_INDEX];
    if (definition instanceof DefVar) {
      this.defVar = definition;
    } else if (definition instanceof Sentencia) {
      this.sentencia = definition;
    }
  }

  validaSemantica(parentScope: SymbolTable): boolean {
    if (this.defVar) {
      return this.defVar.validaSemantica(parentScope);
    } else {
      return this.sentencia?.validaSemantica(parentScope) || false;
    }
  }
}