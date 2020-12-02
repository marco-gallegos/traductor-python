import { ExpresionBinaria } from "./expresion-binaria";
import { ExpresionConstante } from "./expresion-constante";
import { ExpresionId } from "./expresion-id";
import { ExpresionLlamadaFunc } from "./expresion-llamada-func";

export type Expresion = ExpresionBinaria | ExpresionLlamadaFunc | ExpresionId | ExpresionConstante;