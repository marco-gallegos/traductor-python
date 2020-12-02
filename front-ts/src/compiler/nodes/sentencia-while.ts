import { SymbolTable } from '../symbol-table';
import { Bloque } from './bloque';
import { Expresion } from './expresion';
import { Node } from './nodo';
import { Sentencia } from './sentencia';

const CONDITION_INDEX = 4;
const BLOQUE_INDEX = 8;

export class SentenciaWhile extends Sentencia {
  condition: Expresion;
  bloque: Bloque;
  constructor(ruleNumber: number, reducedData: any[]) {
    super(ruleNumber);
    this.condition = reducedData[CONDITION_INDEX];
    this.bloque = reducedData[BLOQUE_INDEX];
  }

  validaSemantica(parentScope: SymbolTable): boolean {
    return this.condition.validaSemantica(parentScope) != undefined;
  }
}
