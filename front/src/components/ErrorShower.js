import React, { Component } from 'react';
import {groupBy} from 'lodash'

function preprocessSourceCode(sourceCodeStr) {
  return sourceCodeStr.split()
}

export default function ErrorShower(props) {
  const sourceCode = props.sourceCode || '';
  console.log(props);
  const errors = props.errors || [];
  errors.sort((a, b) => a.linea - b.linea);
  const errorsGrouped = groupBy(errors, 'linea');
  if (!props.errors || !props.errors.length) {
    return (
      <div>
      </div>
    );
  } else {
    return (
      <div>
        <div>
          {sourceCode.split('\n').map((e, index) => <pre className={(errorsGrouped[index + 1] ? 'line-error' : 'line-no-error')}>{index + 1 + '\t\t' + e}</pre>)}
        </div>
        <div>
          {errors.map(e => <div>mensaje: {e.mensaje}</div>)}
        </div>
      </div>
      
    )
  }
} 
