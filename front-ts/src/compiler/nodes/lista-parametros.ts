import { Token } from '../../models/token';
import { PrimitiveTypes } from '../primitive-types';
import { NodeObjectMap } from './node-object-map';
import { Node } from './nodo';

const TYPE_INDEX = 2;
const ID_INDEX = 4;
const NEXT_PARAM_LIST = 6;

export class ListaParametros extends Node {
  tipo: Token;
  identifier: Token;
  siguiente: ListaParametros | null;
  constructor(numberOfRule: number, reducedData: any[]) {
    super(numberOfRule);
    this.tipo = reducedData[TYPE_INDEX];
    this.identifier = reducedData[ID_INDEX];
    this.siguiente = reducedData[NEXT_PARAM_LIST];
  }
}
