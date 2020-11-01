import React, { Component } from "react";
import Graph from "./graph";
import Chart2 from "./chart2";
class EnterpriseMap extends Component {
  render() {
    const { companyName, relations, createPdf, mainNo, index } = this.props;
    return (
      <div>
        {/* {relations && relations.atlas && Object.keys(relations.atlas).length} */}
        <Graph mainNo={mainNo} index={index} companyName={companyName} createPdf={createPdf} relations={relations} />
        <Chart2 mainNo={mainNo} index={index} companyName={companyName} createPdf={createPdf} relations={relations} />
      </div>
    );
  }
}

export default EnterpriseMap;
