import { errors } from '../error-colector';
import { SymbolTable } from '../symbol-table';
import { Expresion } from './expresion';
import { Node } from './nodo';
import { Sentencia } from './sentencia';

const EXPRESION_INDEX = 2;

export class SentenciaReturn extends Sentencia {
  expresion: Expresion;
  constructor(ruleNumber: number, reducedData: any[]) {
    super(ruleNumber);
    this.expresion = reducedData[EXPRESION_INDEX];
  }

  validaSemantica(parentScope: SymbolTable): boolean {
    let tipoExpresionRetorno = this.expresion.validaSemantica(parentScope);
    if (tipoExpresionRetorno != parentScope.returnType) {
      errors.push('El tipo de la expresión de retorno no coincide con el tipo de la función');
      return false;
    }
    return true;
  }
}
