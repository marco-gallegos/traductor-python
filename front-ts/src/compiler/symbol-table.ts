import { isThisTypeNode } from "typescript";

export class SymbolTableRecord {
  constructor(public identifier: string, public tipo: string, public tipoDeArgumentos: string[] = []) {
  }
}

export class SymbolTable {
  scopeName: string;
  returnType: string;
  tableRecords: SymbolTableRecord[];
  parent: SymbolTable | undefined;
  constructor(parent: SymbolTable | undefined, returnType = '', scopeName = 'global') {
    this.tableRecords = [];
    this.parent = parent;
    this.returnType = returnType;
    this.scopeName = scopeName;
  }

  search(identifier: string): SymbolTableRecord | undefined {
    let result = this.tableRecords.find(e => e.identifier == identifier);
    if (result) {
      return result;
    } else {
      return this.parent?.search(identifier);
    }
  }

  add(identifier: string, type: string, tipos: string[] = []) {
    if (this.tableRecords.some(e => e.identifier == identifier)) {
      throw new Error('Simbolo ya existente');
    } else {
      this.tableRecords.push(new SymbolTableRecord(identifier, type, tipos));
    }
  }
}

export function createSymbolTable (): SymbolTableRecord[] {
  return [];
}