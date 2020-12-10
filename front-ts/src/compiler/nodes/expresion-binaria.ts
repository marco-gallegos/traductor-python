import { errors } from "../error-colector";
import { SymbolTable } from "../symbol-table";
import { Expresion } from "./expresion";
import { Node } from "./nodo";

const EXPRESION_LEFT_INDEX = 0;
const OPERADOR_INDEX = 2;
const EXPRESION_RIGTH_INDEX = 4;


export class ExpresionBinaria extends Node {
  expresionLeft: Expresion;
  operador: string;
  expresionRigth: Expresion;
  constructor(ruleNumber: number, reducedData: any[]) {
    super(ruleNumber);
    this.expresionLeft = reducedData[EXPRESION_LEFT_INDEX];
    this.operador = reducedData[OPERADOR_INDEX];
    this.expresionRigth = reducedData[EXPRESION_RIGTH_INDEX];
  }

  validaSemantica(parentScope: SymbolTable): string | undefined {
    const leftType = this.expresionLeft.validaSemantica(parentScope);
    const rigthType = this.expresionRigth.validaSemantica(parentScope);
    if (leftType == rigthType) {
      return leftType;
    }
    errors.push('No coinciden los tipos en la expresion.');
    return undefined;
  }
}
