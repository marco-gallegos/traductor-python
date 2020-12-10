import { Token } from '../../models/token';
import { errors } from '../error-colector';
import { SymbolTable } from '../symbol-table';
import { Expresion } from './expresion';
import { Node } from './nodo';
import { Sentencia } from './sentencia';

const ID_INDEX = 0;
const EXPRESION_INDEX = 4;

export class SentenciaAsignacion extends Sentencia {
  id: Token;
  expresion: Expresion;
  constructor(ruleNumber: number, reducedData: any[]) {
    super(ruleNumber);
    this.id = reducedData[ID_INDEX];
    this.expresion = reducedData[EXPRESION_INDEX];
  }

  validaSemantica(parentScope: SymbolTable): boolean {
    const idSymbol = parentScope.search(this.id.lexeme);
    if (!idSymbol) {
      errors.push('No se ha declarado ' + this.id.lexeme);
      return false;
    }
    const type = this.expresion.validaSemantica(parentScope);
    if (!type) {
      errors.push('Expresion no valida');
      return false;
    }
    if (idSymbol.tipo == type) {
      return true;
    } else {
      errors.push('Los tipos en la asignacion no coinciden');
      return false;
    }
  }
}
