import { getAllByRole } from "@testing-library/react";
import { SLRRulesId } from "../models/slr-rules-id";

export const quantityOfElementsByRulesRaw = `19	1
20	0
20	2
21	1
21	1
22	4
23	0
23	3
24	6
25	0
25	3
26	0
26	4
27	3
28	0
28	2
29	1
29	1
30	0
30	2
31	4
31	6
31	5
31	3
31	2
32	0
32	2
33	3
34	0
34	2
35	0
35	3
36	1
36	1
36	1
37	4
38	1
38	1
36	3
36	3
36	3
36	3
36	3`;

let quantityOfElementsByRules: number[][];
function readResources()  {
  var rulesIds = quantityOfElementsByRulesRaw.split('\n')
    .map(row => row.split('\t').map(cell => parseInt(cell)));
    quantityOfElementsByRules = rulesIds;
}

readResources();

export function getQuantityOfElementsByRules(nOfRule: number): SLRRulesId {
  const elem = quantityOfElementsByRules[nOfRule];
  return {
    colNumber: elem[0],
    numberOfItems: elem[1]
  }
}

