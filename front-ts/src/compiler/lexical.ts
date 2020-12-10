import { generateToken, Token } from "../models/token";

export interface WholeTokenInstructions {
  textToSearch: string;
  stateOnNoMatch: number;
  tokenOnMatch: Token
}

function states(textToSearch: string, stateOnNoMatch: number, tokenOnMatch: Token ): WholeTokenInstructions {
  return {
    textToSearch,stateOnNoMatch,tokenOnMatch
  }
}

const zeroStateMap: {[key: string]: () => WholeTokenInstructions} = {
  ';': () => states(';', 0, generateToken('punto_y_coma', ';')),
  ',': () => states(',', 0, generateToken('coma', ',')),
  '(': () => states('(', 0, generateToken('parentesis_abierto', '(')),
  ')': () => states(')', 0, generateToken('parentesis_cerrado', ')')),
  '{': () => states('{', 0, generateToken('llave_abierta', '{')),
  '}': () => states('}', 0, generateToken('llave_cerrada', '}')),
  '+': () => states('+', 0, generateToken('opSuma', '+')),
  '-': () => states('-', 0, generateToken('opSuma', '-')),
  '*': () => states('*', 0, generateToken('opMultiplicacion', '*')),
  '/': () => states('/', 0, generateToken('opMultiplicacion', '/')),
  '=': () => states('==', -2, generateToken('OpRelacional', '==')),
  '<': () => states('<=', -2, generateToken('OpRelacional', '<=')),
  '>': () => states('>=', -2, generateToken('OpRelacional', '>=')),
  '!': () => states('!=', -1, generateToken('OpRelacional', '!=')),
  '|': () => states('||', -1, generateToken('opLogico', '||')),
  '&': () => states('&&', -1, generateToken('opLogico', '&&')),
  'i': () => states('if', 2, generateToken('if', 'if')),
  'w': () => states('while', 1, generateToken('while', 'while')),
  'r': () => states('return', 1, generateToken('return', 'return')),
  'e': () => states('else', 1, generateToken('else', 'else')),
  'f': () => states('float', 1, generateToken('tipo_de_dato', 'float')),
  'c': () => states('char', 1, generateToken('tipo_de_dato', 'char')),
  'v': () => states('void', 1, generateToken('tipo_de_dato', 'void')),
  'n': () => states('t', 1, generateToken('tipo_de_dato', 'int')),
  '$': () => states('$', 0, generateToken('$', '$')),
}

const singleCharNames: {[key: string]: () => Token} = {
  '=': () => generateToken('asignacion', '='),
  '<': () => generateToken('OpRelacional', '<'),
  '>': () => generateToken('OpRelacional', '>'),
}
const ERROR_CODE = -1;
const SINGLE_CHAR_TOKEN = -2
const INITIAL_STATE = 0;
const IDENTIFIER_STATE = 1;
const IF_INT_STATE = 2;
const CONST_STATE = 3;

export interface LexicalResult {
  tokens: Token[];
  errors: string[];
  errors_lines: number[];
}

export function AnalyzeLexical(input: string): LexicalResult {
  input = input + '$';
  const tokens: Token[]  = [];
  const errors: string[] = [];
  const errors_lines: number[] = [];
  let linea = 1;
  const chars = [...input];
  let state = INITIAL_STATE;
  let length = chars.length;
  let tokenSoFar = '';
  for(let i = 0; i < length; ) {
    const char = chars[i];
    if (state == INITIAL_STATE) {
      const firstEval = zeroStateMap[char];
      if (!!firstEval) {
        const firstEvalResult = firstEval();
        const toCompare = chars.slice(i, i + firstEvalResult.textToSearch.length);
        if (
          toCompare.join('') == firstEvalResult.textToSearch && 
          (
            (isIdentifierChar(char) && notIdentifierCharacter(chars[i + firstEvalResult.textToSearch.length])) ||
            !isIdentifierChar(char)
          )
        ) {
          tokens.push(firstEvalResult.tokenOnMatch);
          i += firstEvalResult.textToSearch.length;
          continue;
        } else {
          if (firstEvalResult.stateOnNoMatch == -2) {
            tokens.push(singleCharNames[char]());
            i++;
            continue;
          }
          if (firstEvalResult.stateOnNoMatch == -1) {
            errors_lines.push(linea);
            errors.push('caracter inesperado en ' + i + " '" + char +"'");
            i++;
            continue;
          }
          if (firstEvalResult.stateOnNoMatch == IDENTIFIER_STATE) {
            state = firstEvalResult.stateOnNoMatch;
            tokenSoFar = char;
            i++;
            continue;
          }
          if (firstEvalResult.stateOnNoMatch == 2) {
            if (chars[i + 1] == 'n' && chars[i + 2] == 't' && notIdentifierCharacter(chars[i + 3])) {
              tokens.push(generateToken('tipo_de_dato', 'int'));
              i+=3;
              continue;
            } else {
              state = IDENTIFIER_STATE;
              tokenSoFar = char;
              i++;
              continue;
            }
          }
        }
      } else {
        if (isDigit(char) || (char == '.' && isDigit(chars[i+1]))) {
          state = CONST_STATE;
          i++;
          tokenSoFar = char;
          continue;
        } else if (isIdentifierChar(char)) {
          state = IDENTIFIER_STATE;
          i++;
          tokenSoFar = char;
          continue;
        } else if (isBlank(char)) {
          if (char == "\n") {
            linea ++;
          }
          i++;
          continue;
        } else {
          errors_lines.push(linea);
          errors.push('caracter inesperado en ' + i + " '" + char +"'");
          i++;
          continue;
        }
      }
    }
    if (state == IDENTIFIER_STATE) {
      if (notIdentifierCharacter(char)) {
        state = 0;
        tokens.push(generateToken('id', tokenSoFar));
        tokenSoFar = '';
        continue;
      } else {
        tokenSoFar += char;
        i++;
        continue;
      }
    } else if (state == CONST_STATE) {
      if (!isDigit(char)) {
        if (isIdentifierChar(char)) {
          errors_lines.push(linea);
          errors.push('Identificador no puede empezar con numero. Indice: ' + i + " '" + char +"' " + tokenSoFar);
          tokenSoFar = '';
          state = INITIAL_STATE;
          continue;
        } else if (char == '.' && isDigit(chars[i+1])) {
          tokenSoFar += char;
          i++;
          continue;
        }
        state = 0;
        tokens.push(generateToken('constante', tokenSoFar));
        tokenSoFar = '';
        continue;
      } else {
        tokenSoFar += char;
        i++;
        continue;
      }
    }
  }
  console.log(tokens);
  return {tokens, errors, errors_lines};
}

function isAlpha(char: string): boolean {
  const charCode = char.charCodeAt(0);
  return charCode >= 'A'.charCodeAt(0) && charCode <= 'Z'.charCodeAt(0) || charCode >= 'a'.charCodeAt(0) && charCode <= 'z'.charCodeAt(0);
}

function isDigit(char: string): boolean {
  const charCode = char.charCodeAt(0);
  return charCode >= '0'.charCodeAt(0) && charCode <= '9'.charCodeAt(0);
}

function isIdentifierChar(char: string) {
  return isAlpha(char) || char == '_';
}

function notIdentifierCharacter(char: string) {
  return !isIdentifierChar(char) && !isDigit(char);
}

function isBlank(char: string) {
  
  return char === ' ' || char == '\n' || char == '\t';
}



// include<stdio.h> 
  
// using namespace std; 
// int main() 
// { 
//     // a = 5(00000101), b = 9(00001001) 
//     unsigned char a = 5, b = 9;  
  
//     // The result is 00000010  
       
//     printf(a>>1 = %d\n, a>>1); 
    
//     // The result is 00000100 
//     printf(b>>1 = d\n, b>>1);   
//     return 0; 
// }

