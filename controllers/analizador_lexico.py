"""Analizador lexico

@Author
@Date
@Description

"""
from flask_restful import Resource, reqparse
import re

from controllers.tokens import (
CONDICIONAL,
MIENTRAS,
PARA,
IMPORTACION,
CONSTANTE_NUMERICA,
TIPO_DATO,
IMPRESION_DATOS,
LLAVE_ABIERTA,
PARENTESIS_ABIERTO,
PARENTESIS_CERRADO,
CORCHETE_ABIERTO,
CORCHETE_CERRADO,
ASIGNACION,
SEPARADOR,
LLAVE_CERRADA,
IDENTIFICADOR,
CONSTANTE_BOOLEANA,
CONSTANTE_CADENA,
OP_SUMA,
HASTA,
OP_RESTA,
OP_MULTIPLICACION,
OP_DIVISION,
OP_LOGICO,
COMA,
CONSTANTE,
OP_COMPARACION,
RETORNA,
FINAL 
)

patterns = {
    "{": LLAVE_ABIERTA,
    "}": LLAVE_CERRADA,
    "\\(": PARENTESIS_ABIERTO,
    "\\)": PARENTESIS_CERRADO,
    "\\[": CORCHETE_ABIERTO,
    "\\]": CORCHETE_CERRADO,
    ":=": ASIGNACION,
    "\n": SEPARADOR,
    "[_a-zA-Z]+[_a-zA-Z0-9]*(?=[^_0-9a-zA-Z])": IDENTIFICADOR,
    "([0-9]+(\\.[0-9]+)?)(?=[^0-9_a-zA-Z])": CONSTANTE_NUMERICA,
    "(\\.[0-9]+)(?=[^0-9._a-zA-Z])": CONSTANTE_NUMERICA,
    '".*"': CONSTANTE_CADENA,
    "\\+": OP_SUMA,
    "-": OP_RESTA,
    "\\/": OP_DIVISION,
    "\\*": OP_MULTIPLICACION,
    "&&": OP_LOGICO,
    "\\|\\|": OP_LOGICO,
    ",": COMA,
    "<=?(?=.)": OP_COMPARACION,
    ">=?(?=.)": OP_COMPARACION,
    "!=(?=.)": OP_COMPARACION,
    "==(?=.)": OP_COMPARACION,
    "\\$$": FINAL,
}

defined_keywords = {
    "si": CONDICIONAL,
    "mientras": MIENTRAS,
    "para": PARA,
    "importa": IMPORTACION,
    "constante": CONSTANTE,
    "enterro": TIPO_DATO,
    "flotante": TIPO_DATO,
    "booleano": TIPO_DATO,
    "cadena": TIPO_DATO,
    "imprimir": IMPRESION_DATOS,
    "verdadero": CONSTANTE_BOOLEANA,
    "false": CONSTANTE_BOOLEANA,
    "retorna": RETORNA,
    "hasta": HASTA,
}

parser = reqparse.RequestParser()


def analizador_lexico(sourceCode:str)-> dict:
    """analizador_lexico

    Args:
        sourceCode (str): [description]

    Returns:
        dict: [description]
    """
    sourceCode = sourceCode + "$"
    tokens_resultantes = []
    errores = []
    longitud = len(sourceCode)
    ultimo_indice = 0
    linea_actual = 1
    numero_tokens_anteriores = 0
    while(ultimo_indice < longitud):
        numero_tokens_anteriores = len(tokens_resultantes)
        if (sourceCode[ultimo_indice] == ' '):
            ultimo_indice = ultimo_indice + 1
            continue
        for key in patterns.keys():
            match = re.match(key, sourceCode[ultimo_indice:])
            if match:
                (init, end) = match.span()
                ultimo_indice = ultimo_indice + end
                if (patterns[key] == SEPARADOR):
                    linea_actual = linea_actual + 1
                token = patterns[key]
                lexema = match.group(0)
                if lexema in defined_keywords:
                    token = defined_keywords[lexema]
                tokens_resultantes.append({
                    "token": token,
                    "lexema": lexema,
                    "linea": linea_actual
                })
                continue
        if numero_tokens_anteriores == len(tokens_resultantes):
            errores.append({
                "linea": linea_actual,
                "posicion": ultimo_indice,
                "mensaje": "Caracter " + sourceCode[ultimo_indice] + " no coincide con ningun patron, linea " + str(linea_actual)
            })
            ultimo_indice = ultimo_indice + 1
    return {
        "tokens": tokens_resultantes,
        "errores": errores
    }


class AnalizadorLexico(Resource):
    def post(self):
        parser.add_argument('sourceCode')
        args = parser.parse_args()
        return analizador_lexico(args['sourceCode'])

if __name__ == '__main__':
    file = open('tests/test4.txt')
    print(analizador_lexico(''.join(file.readlines())))
