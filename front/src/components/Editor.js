import React, { Component } from 'react';
import { sendSourceCode } from '../logic/send-source';
import ErrorShower from './ErrorShower';
import TokenList from './TokenList';
import {Button, Row, Col, FormText, Input, Label} from 'reactstrap'


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

  /**
   * Limpia el state de errores
   */
  clearHandler() {
    this.setState({
      errors: [],
      sourceSnapshot: ''
    });
  }


  /**
   * Funcion que arroja jsx para ser renderizado
   */
  render() {
    return (
      <Row>
        <Col xs={12} className="py-2" >
          <Label>Codigo Fuente</Label>
          <textarea name="source" value={this.state.source} onChange={this.changeSourceHandler} className="form-control" />
        </Col>

        <Col xs={12} >
          <Button outline color="primary" >Sintactico</Button>
          <Button outline color="primary" onClick={this.clickHander}>Enviar</Button>
          <Button outline color="warning" onClick={this.clearHandler}>Limpiar errores</Button>
        </Col>
        <Col xs={12} >
          <ErrorShower sourceCode={this.state.sourceSnapshot} errors={this.state.errors}/>
        </Col>
        <Col xs={12} >
          <TokenList tokens={this.state.tokens}/>
        </Col>
      </Row>
    )
  }
}
