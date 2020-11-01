import React, { Component } from "react";
import "./mergeTable.scss";

/**
   * 信用报告表格组件说明：
   * @props {Array}} columns 如果有children，则会渲染大标题；如果没有children，则不会渲染大标题
   * 
   * 调用示例：
      const data = [
				{ a: 11, b: 22 },
				{ a: 33, b: 44 }
			];
			const columns = [{
				title: 'Name',
				children: [
					{
						title: 'First Name',
						dataIndex: 'firstName',
						width: '300px',
					},
					{
						title: 'Last Name',
						dataIndex: 'lastName',
						render: (value, row, index) => {
							if (index === 4) {
								const obj = {
									content: value,
									span: {
										colSpan: 0
									}
								};
								return obj;
							}
							return <a>{value}</a>;
						}
					}
				]
			}];
			<MergeTable 
				dataSource={data} 
				columns={columns} 
			/>
   */

class MergeTable extends Component {
  static defaultProps = {
    createPdf: false,
    calc: null
  }
  constructor(props) {
    super(props);
    this.state = {
      theadRows: [],
      columns: [],
      calcRes: []
    };
  }

  componentDidMount() {
    this.formatPropsColumns(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.formatPropsColumns(nextProps);
  }

  formatPropsColumns(props) {
    const columns = [...props.columns];
    let maxLevel = 1;
    const traverse = (column, parentLevel) => {
      const currentLevel = parentLevel + 1;
      column.level = currentLevel;
      if (maxLevel < currentLevel) {
        maxLevel = currentLevel;
      }
      if (column.children) {
        let colSpan = 0;
        column.children.map((child) => {
          traverse(child, currentLevel);
          colSpan += child.colSpan;
        });
        column.colSpan = colSpan;
      } else {
        column.colSpan = 1;
      }
    };
    columns.map((column) => {
      traverse(column, 0);
    });

    const rows = [];
    const toSameLevel = (arr) =>
      arr.reduce(
        (prev, cur) =>
          prev.concat(cur.children ? [cur, ...toSameLevel(cur.children)] : cur),
        []
      );
    const allColumns = toSameLevel(columns);
    allColumns.map((column) => {
      if (!column.children) {
        column.rowSpan = maxLevel - column.level + 1;
      } else {
        column.rowSpan = 1;
      }
      if (!rows[column.level - 1]) {
        rows[column.level - 1] = [];
      }
      rows[column.level - 1].push(column);
    });

    const tbodyColumns = allColumns.filter((column) => !column.children);

    this.setState({
      theadRows: rows,
      columns: tbodyColumns,
    });
  }

  renderCell(rowData, column, rowIndex, cellIndex) {
    const { calc } = this.props;
    const value = rowData[column.dataIndex];
    const renderData = column.render && column.render(value, rowData, rowIndex);
    if (calc) {
      this.setState((state) => {
        let calcRes = state.calcRes
        if (calcRes[cellIndex]) {
          calcRes[cellIndex] = isNaN(Number(value)) ? calcRes[cellIndex] : Number(calcRes[cellIndex]) + Number(value)
        } else {
          calcRes[cellIndex] = isNaN(Number(value)) ? 0 : Number(value)
        }
        return {
          calcRes
        }
      })
    }
    if (!renderData) {
      return <td key={rowIndex + cellIndex}>{value}</td>;
    }
    const { content, span } = renderData;
    if (span) {
      if (span.colSpan === 0 || span.rowSpan === 0) {
        return null;
      }
      return (
        <td
          key={rowIndex + cellIndex}
          colSpan={span.colSpan}
          rowSpan={span.rowSpan}
        >
          {content}
        </td>
      );
    }
    if (renderData.hasOwnProperty("content")) {
      return <td key={rowIndex + cellIndex}>{content}</td>;
    }
    return <td key={rowIndex + cellIndex}>{renderData}</td>;
  }

  render() {
    const { theadRows, columns, calcRes } = this.state;
    const { dataSource, createPdf, calc } = this.props;
    return (
      <table styleName={createPdf ? 'merge-table-wrap merge-table-wrap-pdf' : 'merge-table-wrap'}>
        <thead>
          {theadRows.map((row, rowIndex) => {
            return (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => {
                  return (
                    <th
                      key={cellIndex}
                      colSpan={cell.colSpan}
                      rowSpan={cell.rowSpan}
                      width={cell.width}
                    >
                      {cell.title}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody>
          {dataSource.map((rowData, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, cellIndex) =>
                this.renderCell(rowData, column, rowIndex, cellIndex)
              )}
            </tr>
          ))}
          {calc && <tr>
            <td colSpan={calc.colSpan}>合计</td>
            {calcRes.map((v, i) => {
              return i > calc.colSpan ? <td>{v}</td> : <></>
            })}
          </tr>}
        </tbody>
      </table>
    );
  }
}

export default MergeTable;
