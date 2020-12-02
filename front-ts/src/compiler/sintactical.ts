import { Token } from '../models/token';
import { getQuantityOfElementsByRules } from '../resources/GR2slrRulesId';
import { getFromTableAt } from "../resources/GR2slrTablebien";
import { Definicion } from './nodes/definicion';
import { Definiciones } from './nodes/definiciones';
import { NodeObjectMap } from './nodes/node-object-map';

export function sintacticAnalysis(tokens: Token[]) {
  let stack: (number | Token)[] = [0];
  let tokenPointer = 0;
  let definicion: Definiciones | null = null;
  while (true) {
    const token = tokens[tokenPointer];
    let instruction = 0;
    if (instruction = getFromTableAt(getLast(stack), token.tokenId)) {
      if (instruction == -1) {
        return definicion;
      }
      if (instruction < 0) {
        let numberOfRule = -(instruction + 1);
        let ruleData = getQuantityOfElementsByRules(numberOfRule);
        let numberOfElementsToDeleteFromStack = ruleData.numberOfItems;
        const extractedElements = stack.slice(stack.length - numberOfElementsToDeleteFromStack * 2);
        const ruleObject = NodeObjectMap[numberOfRule];
        let obj = null;
        if (ruleObject) {
          obj = new ruleObject(numberOfRule, extractedElements);
          if (obj instanceof Definiciones) {
            definicion = obj;
          }
        }
        stack = stack.slice(0, stack.length - numberOfElementsToDeleteFromStack * 2);
        const result = getFromTableAt(getLast(stack), ruleData.colNumber);
        if (result == -1) {
          return definicion;
        }
        if (result) {
          stack.push(obj || numberOfRule, result);
        } else {
          console.log('Hay error');
          return null;
        }
      } else if(instruction > 0) {
        stack.push(token);
        stack.push(instruction);
        tokenPointer ++;
      } else {
        console.log('Hay un error');
        return null;
      }
    } else {
      console.log('Hay un error');
      return null;
    }
  }
}

function getLast(arr: any[]) {
  const elem = arr[arr.length - 1];
  return elem;
}
