import { Expresion } from "./expresion";
import { ListaArgumentos } from "./lista-argumentos";
import { Node } from "./nodo";

const EXPRESION_INDEX = 0;
const LISTA_INDEX = 2;

export class Argumentos extends Node {
  expresion: Expresion;
  siguiente: ListaArgumentos;
  constructor(ruleNumber: number, reducedData: any[]) {
    super(ruleNumber);
    this.expresion = reducedData[EXPRESION_INDEX];
    this.siguiente = reducedData[LISTA_INDEX];
  }
}