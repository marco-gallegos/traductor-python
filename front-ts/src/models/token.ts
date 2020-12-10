export interface Token {
  lexeme: string;
  tokenId: number;
  name: string;
}

const tokenCodeMap: {[key: string]: number} = {
  'tipo_de_dato': 0,
  'id': 1,
  'punto_y_coma': 2,
  'coma': 3,
  'parentesis_abierto': 4,
  'parentesis_cerrado': 5,
  'llave_abierta': 6,
  'llave_cerrada': 7,
  'asignacion': 8,
  'if': 9,
  'while': 10,
  'return': 11,
  'else': 12,
  'constante': 13,
  'opSuma': 14,
  'opLogico': 15,
  'opMultiplicacion': 16,
  'OpRelacional': 17,
  '$': 18
};

export function generateToken(name: string, lexeme: string): Token {
  return {
    lexeme,name, tokenId: tokenCodeMap[name]
  }
}
