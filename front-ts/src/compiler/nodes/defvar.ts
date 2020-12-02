import { Token } from "../../models/token";
import { errors } from "../error-colector";
import { SymbolTable } from "../symbol-table";
import { ListaVar } from "./lista-var";
import { Node } from "./nodo";

const TYPE_INDEX = 0;
const ID_INDEX = 2;
const LISTAVAR_INDEX = 4; 

export class DefVar extends Node {
  type: Token;
  identifier: Token;
  siguiente: ListaVar;
  constructor(numberOfRule: number, reducedData: any[]) {
    super(numberOfRule);
    this.type = reducedData[TYPE_INDEX];
    this.identifier = reducedData[ID_INDEX];
    this.siguiente = reducedData[LISTAVAR_INDEX];
  }

  validaSemantica(parentScope: SymbolTable): boolean {
    const identifierList = this.getIdentifierList();
    for (let i = 0; i < identifierList.length; i++) {
      const identifier = identifierList[i];
      try {
        parentScope.add(identifier, this.type.lexeme);
      } catch (ex) {
        errors.push(ex.message);
      }
    }
    return true;
  }

  private getIdentifierList() {
    const list: string[] = [];
    let node: DefVar | ListaVar | undefined = this;
    while(typeof(node) !== "number" && node != undefined) {
      list.push(node.identifier.lexeme);
      node = node.siguiente;
    }
    return list;
  }
}