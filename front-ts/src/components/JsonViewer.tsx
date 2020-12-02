import React, { Component, useRef } from 'react';

declare const VTree: any;

export interface JsonViewerProps {
  jsonString: string,
}

export function JsonViewer(props: JsonViewerProps) {

  let ref: any;
  ref = useRef(null);

  function updateTree() {
    var vt: any;
    vt = new VTree(ref.current);
    var reader = new VTree.reader.Object();
    var jsonData = JSON.parse(props.jsonString);
    var data = reader.read(jsonData);
    vt.data(data)
    .update();
  }

   
  return (
    <div>
      <div ref={ref}></div>
      <button onClick={() => updateTree()}>UpdateTree</button>
    </div>
  );
}


