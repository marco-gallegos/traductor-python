import { errors } from '../error-colector';
import { SymbolTable } from '../symbol-table';
import { LlamadaFunc } from './llamada-func';
import { Node } from './nodo';
import { Sentencia } from './sentencia';

const INDEX_LLAMADA = 0

export class SentenciaLlamadaFuncion extends Sentencia {
  llamada: LlamadaFunc;
  constructor(ruleNumber: number, reducedData: any[]) {
    super(ruleNumber);
    this.llamada = reducedData[INDEX_LLAMADA];
  }

  validaSemantica(parentScope: SymbolTable): boolean {
    const id = this.llamada.id;
    const symbolRegistry = parentScope.search(id.lexeme);
    if (!symbolRegistry) {
      errors.push('No se ha definido la funcion ' + id.lexeme);
      return false;
    }
    const argumentTypeList = this.llamada.getArgumentTypes(parentScope);
    if (symbolRegistry.tipoDeArgumentos.join('') == argumentTypeList.join('')) {
      return true;
    }
    errors.push('No coinciden los parametros');
    return false;
  }
}
