import { Token } from '../../models/token';
import { errors } from '../error-colector';
import { SymbolTable } from '../symbol-table';
import { ListaParametros } from './lista-parametros';
import { NodeObjectMap } from './node-object-map';
import { Node } from './nodo';

const TYPE_INDEX = 0;
const ID_INDEX = 2;
const NEXT_PARAM_LIST = 4;

export class Parametros extends Node {
  tipo: Token;
  identifier: Token;
  siguiente: ListaParametros | null;
  constructor(numberOfRule: number, reducedData: any[]) {
    super(numberOfRule);
    this.tipo = reducedData[TYPE_INDEX];
    this.identifier = reducedData[ID_INDEX];
    this.siguiente = reducedData[NEXT_PARAM_LIST];
  }

  validaSemantica(parentScope: SymbolTable): string[] {
    let listaTipos = [];
    let nodo: ListaParametros | Parametros | null = this;
    while(typeof(nodo) !== "number" && nodo != undefined) {
      try {
        listaTipos.push(nodo.tipo.lexeme);
        parentScope.add(nodo.identifier.lexeme, nodo.tipo.lexeme);
      } catch (exception) {
        errors.push(exception.message);
      }
      nodo = nodo.siguiente;
    }
    return listaTipos;
  }
}
