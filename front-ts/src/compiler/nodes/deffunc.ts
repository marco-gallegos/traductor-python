import { Token } from "../../models/token";
import { SymbolTable } from "../symbol-table";
import { BloqFunc } from "./bloqfunc";
import { Node } from "./nodo";
import { Parametros } from "./parametros";

const TIPO_INDEX = 0;
const ID_INDEX = 2;
const PARAMETROS_INDEX = 6;
const BLOQUE_FUNC_INDEX = 10;

export class DefFunc extends Node {
  tipo: Token;
  id: Token;
  parametros: Parametros;
  bloque: BloqFunc;
  scope: SymbolTable;
  constructor(ruleNumber: number, reducedData: any[]) {
    super(ruleNumber);
    this.tipo = reducedData[TIPO_INDEX];
    this.id = reducedData[ID_INDEX];
    this.parametros = reducedData[PARAMETROS_INDEX];
    this.bloque = reducedData[BLOQUE_FUNC_INDEX];
    this.scope = new SymbolTable(undefined, this.tipo.lexeme, this.id.lexeme);
  }
  validaSemantica(parentScope: SymbolTable): boolean {
    this.scope.parent = parentScope;
    let listaTipos: string[] = [];
    if (typeof(this.parametros) !== "number" && this.parametros != undefined) {
      listaTipos = this.parametros.validaSemantica(this.scope);
    }
    parentScope.add(this.id.lexeme, this.tipo.lexeme, listaTipos);
    return this.bloque.validaSemantica(this.scope);
  }
}
