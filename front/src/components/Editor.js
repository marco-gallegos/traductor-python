import React, { Component } from 'react';
import { sendSourceCode } from '../logic/send-source';
import ErrorShower from './ErrorShower';
import TokenList from './TokenList';

export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      source: 'Escribe tu código fuente aquí',
      sourceSnapshot: [],
      errors: [],
      tokens: [],
    };
    this.clickHander = this.clickHander.bind(this);
    this.changeSourceHandler = this.changeSourceHandler.bind(this);
    this.clearHandler = this.clearHandler.bind(this);
  }
  changeSourceHandler(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  clickHander(event) {
    sendSourceCode(this.state.source)
      .then(response => {
        this.setState({
          tokens: response.tokens,
          errors: response.errores,
          sourceSnapshot: response.errores && response.errores.length ? this.state.source : ''
        });
      });
  }
  clearHandler() {
    this.setState({
      errors: [],
      sourceSnapshot: ''
    });
  }
  render() {
    return (
      <div>
        <textarea name="source" value={this.state.source} onChange={this.changeSourceHandler}>
        </textarea>
        <button type="button" onClick={this.clickHander}>Enviar</button>
        <button type="button" onClick={this.clearHandler}>Limpiar errores</button>
        <ErrorShower sourceCode={this.state.sourceSnapshot} errors={this.state.errors}/>
        <TokenList tokens={this.state.tokens}/>
      </div>
    )
  }
}
