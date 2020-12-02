import { Expression, flattenDiagnosticMessageText } from "typescript";
import { errors } from "../error-colector";
import { SymbolTable } from "../symbol-table";
import { LlamadaFunc } from "./llamada-func";
import { Node } from "./nodo";

const LLAMADA_FUNC = 0;

export class ExpresionLlamadaFunc extends Node {
  llamadaFunc: LlamadaFunc;
  constructor(ruleNumber: number, reducedData: any[]) {
    super(ruleNumber);
    this.llamadaFunc = reducedData[LLAMADA_FUNC];
  }

  validaSemantica(parentScope: SymbolTable): string | undefined {
    const id = this.llamadaFunc.id;
    const symbolRegistry = parentScope.search(id.lexeme);
    if (!symbolRegistry) {
      errors.push('No se ha definido la funcion ' + id.lexeme);
      return undefined;
    }
    const argumentTypeList = this.llamadaFunc.getArgumentTypes(parentScope);
    if (symbolRegistry.tipoDeArgumentos.join('') == argumentTypeList.join('')) {
      return symbolRegistry.tipo;
    }
    errors.push('No coinciden los parametros');
    return undefined;
  }
}
