import re
from tokens import (CONDICIONAL,
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
FINAL)

patterns = {
    "{": LLAVE_ABIERTA,
    "}": LLAVE_CERRADA,
    "\(": PARENTESIS_ABIERTO,
    "\)": PARENTESIS_CERRADO,
    "\[": CORCHETE_ABIERTO,
    "\]": CORCHETE_CERRADO,
    ":=": ASIGNACION,
    "\n": SEPARADOR,
    "[_a-zA-Z]+[_a-zA-Z0-9]*(?=[^_0-9a-zA-Z])": IDENTIFICADOR,
    "([0-9]+(\.[0-9]+)?)(?=[^0-9.])": CONSTANTE_NUMERICA,
    "(\.[0-9]+)(?=[^0-9.])": CONSTANTE_NUMERICA,
    '".*"': CONSTANTE_CADENA,
    "\+": OP_SUMA,
    "-": OP_RESTA,
    "/": OP_DIVISION,
    "\*": OP_MULTIPLICACION,
    "&&": OP_LOGICO,
    "\|\|": OP_LOGICO,
    ",": COMA,
    "<=?(?=.)": OP_COMPARACION,
    ">=?(?=.)": OP_COMPARACION,
    "!=(?=.)": OP_COMPARACION,
    "==(?=.)": OP_COMPARACION,
    "\$$": FINAL
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

def analizador_lexico(sourceCode):
    tokens_resultantes = []
    errores = []
    longitud = len(sourceCode)
    ultimo_indice = 0
    linea_actual = 0
    numero_tokens_anteriores = 0
    while(ultimo_indice < longitud):
        numero_tokens_anteriores = len(tokens_resultantes)
        for key in patterns.keys():
            match = re.match(key, sourceCode[ultimo_indice:])
            if match:
                (init, end) = match.span()
                ultimo_indice = end
                tokens_resultantes.append({
                    "token": patterns[key],
                    "lexema": match.group(0),
                    "linea": linea_actual
                })
                continue
        if numero_tokens_anteriores == tokens_resultantes:
            errores.append({
                "linea": linea_actual,
                "error": "Caracter " + sourceCode[ultimo_indice] + " no coincide con ningun patron"
            })
    return (tokens_resultantes, errores)


    print(CONDICIONAL)

print(analizador_lexico('hola mundo'))
