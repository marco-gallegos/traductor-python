import { Argumentos } from "./argumentos";
import { BloqFunc } from "./bloqfunc";
import { Bloque } from "./bloque";
import { DefLocal } from "./def-local";
import { DefLocales } from "./def-locales";
import { DefFunc } from "./deffunc";
import { Definicion } from "./definicion";
import { Definiciones } from "./definiciones";
import { DefVar } from "./defvar";
import { Else } from "./else";
import { ExpresionBinaria } from "./expresion-binaria";
import { ExpresionConstante } from "./expresion-constante";
import { ExpresionId } from "./expresion-id";
import { ExpresionLlamadaFunc } from "./expresion-llamada-func";
import { ExpresionParentesis } from "./expresion-parentesis";
import { ListaArgumentos } from "./lista-argumentos";
import { ListaParametros } from "./lista-parametros";
import { ListaVar } from "./lista-var";
import { LlamadaFunc } from "./llamada-func";
import { Parametros } from "./parametros";
import { Programa } from "./programa";
import { SentenciaAsignacion } from "./sentencia-asignacion";
import { SentenciaBloqueBloque } from "./sentencia-bloque-bloque";
import { SentenciaBloqueSentencia } from "./sentencia-bloque-sentencia";
import { SentenciaIf } from "./sentencia-if";
import { SentenciaLlamadaFuncion } from "./sentencia-llamada-func";
import { SentenciaReturn } from "./sentencia-return";
import { SentenciaWhile } from "./sentencia-while";
import { Sentencias } from "./sentencias";

export const NodeObjectMap: {[key: number]: any} = {
  0: Programa,
  1: null,
  2: Definiciones,
  3: Definicion,
  4: Definicion,
  5: DefVar,
  6: null,
  7: ListaVar,
  8: DefFunc,
  9: null,
  10: Parametros,
  11: null,
  12: ListaParametros,
  13: BloqFunc,
  14: null,
  15: DefLocales,
  16: DefLocal,
  17: DefLocal,
  18: null,
  19: Sentencias,
  20: SentenciaAsignacion,
  21: SentenciaIf,
  22: SentenciaWhile,
  23: SentenciaReturn,
  24: SentenciaLlamadaFuncion,
  25: null,
  26: Else,
  27: Bloque,
  28: null,
  29: Argumentos,
  30: null,
  31: ListaArgumentos,
  32: ExpresionLlamadaFunc,
  33: ExpresionId,
  34: ExpresionConstante,
  35: LlamadaFunc,
  36: SentenciaBloqueSentencia,
  37: SentenciaBloqueBloque,
  38: ExpresionParentesis,
  39: ExpresionBinaria,
  40: ExpresionBinaria,
  41: ExpresionBinaria,
  42: ExpresionBinaria,
};