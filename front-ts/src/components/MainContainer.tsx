import React from 'react';
import { errors } from '../compiler/error-colector';
import { AnalyzeLexical } from '../compiler/lexical';
import { semanticAnalysis } from '../compiler/semantic';
import { sintacticAnalysis } from '../compiler/sintactical';
import { Token } from '../models/token';
import { getFromTableAt } from '../resources/GR2slrTablebien';
import Grid from './Grid';
import { JsonViewer } from './JsonViewer';

interface MainComponentState {
  copy: string;
  input: string;
  jsonTree: string;
  parsed: string[];
  tokens: Token[]
} 

export default class MainComponent extends React.Component<any, MainComponentState> {
  constructor(props: any) {
    super(props);
    this.process = this.process.bind(this);
    this.state = {
      copy: '',
      input: '',
      jsonTree: '',
      parsed: [],
      tokens: []
    };
  }

  private process() {
    errors.clear();
    const result = AnalyzeLexical(this.state.input);
    const sintacticResult = sintacticAnalysis(result.tokens);
    console.log(sintacticResult);
    let copy = '';
    if (result.errors && result.errors.length) {
      copy = result.errors.join('\n');
    } else {
      copy = !sintacticResult ? 'Sintaxis incorrecta' : 'Sintaxis correcta';
    }
    if (sintacticResult) {
      semanticAnalysis(sintacticResult);

      console.log(errors);
      if (errors.errors.length > 0) {
        copy = copy + '\nSemantica incorrecta:\n\n-' + errors.errors.join('\n-');
      } else {
        copy += '\nSemantica correcta';
      }
    }
    this.setState({
      parsed: this.state.input.trim().split(' ').flatMap(e => e.split('\n').flatMap(se => se.split('\t'))).filter(e => !!e),
      copy: copy,
      tokens: result.tokens,
      jsonTree: JSON.stringify(sintacticResult)
    });
  }

  private setValue(element: React.ChangeEvent<HTMLTextAreaElement>) {
    const newState: any = { [element.target.name]: element.target.value };
    console.log(newState);
    this.setState(
      newState
    );
  }

  render() {
    return (
      <div>
        <div>
          <div style={{float: 'left'}}>
            <textarea style={{margin: 0, width: 500, height: 428}} name="input" value={this.state.input} onChange={(event) => this.setValue(event)}></textarea>
          </div>
          <div style={{float: 'left'}}>
            <button type="button" onClick={this.process}>Procesar</button>
          </div>
          <div style={{float: 'left'}}>
            <textarea style={{margin: 0, width: 500, height: 428}} name="copy" value={this.state.copy} readOnly></textarea>
          </div>
        </div>
        <div style={{clear: 'both'}}>
          <Grid tokens={this.state.tokens}/>
        </div>
        {this.state.jsonTree ? <JsonViewer jsonString={this.state.jsonTree} /> : null}
      </div>
    )
  }
}
