import { extend } from "lodash";
import { SymbolTable } from "../symbol-table";
import { DefLocales } from "./def-locales";
import { Node } from "./nodo";

const DEF_LOCALES = 2;

export class BloqFunc extends Node {
  defLocales: DefLocales;
  constructor(ruleNumber: number, reducedata: any[]) {
    super(ruleNumber);
    this.defLocales = reducedata[DEF_LOCALES];
  }
  validaSemantica(parentScope: SymbolTable) {
    return this.defLocales.validaSemantica(parentScope);
  }
}