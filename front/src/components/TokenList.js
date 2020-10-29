import React from 'react';

export default function TokenList(props) {
  const tokenList = props.tokens || [];
  return (
    <table className="table table-sm table-striped" >
      <thead>
        <tr>
          <th>Token</th>
          <th>Lexema</th>
          <th>Linea</th>
        </tr>
      </thead>
      <tbody>
        {tokenList.map(element => {
          return <tr>
            <td>{element.token}</td>
            <td>{element.lexema}</td>
            <td>{element.linea}</td>
          </tr>
        })}
      </tbody>
    </table>
  )
}
