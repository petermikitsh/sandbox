import React from "react";
import {
  Table as TableWrapper,
  Column as ColumnWrapper
} from "@platform-ui/anjuna-react";

import { Table as EditedTable } from "./EditedTable";
import { Column as EditedColumn } from "./EditedColumn";

interface Props {
  actions: object[];
  dataSource: object[];
}

class Table extends React.Component<Props> {
  table: React.RefObject<any> = React.createRef();
  actions: React.RefObject<any> = React.createRef();

  componentDidMount() {
    this.actions.current.actions = this.props.actions;
    this.table.current.dataSource = this.props.dataSource;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.dataSource !== this.props.dataSource) {
      this.table.current.dataSource = this.props.dataSource;
    }
  }
  render() {
    return (
      <anj-table ref={this.table}>
        <anj-column field="id"></anj-column>
        <anj-column field="title"></anj-column>
        <anj-actions ref={this.actions} />
      </anj-table>
    );
  }
}

interface AppState {
  data: object[];
}

export class App extends React.Component<{}, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      data: [{ id: 1, title: "foo" }]
    };

    this.changeData = this.changeData.bind(this);
  }

  changeData = () => {
    setTimeout(() => {
      this.setState({ data: [{ id: 2, title: "bar" }] });
    }, 3000);
  };

  componentDidMount = this.changeData;

  actions = [
    {
      caption: "Edit",
      icon: "edit",
      onSelect: () => {
        debugger;
      }
    }
  ];

  render() {
    return (
      <div>
        Hello World
        {/* Testing my own wrapper. */}
        <Table dataSource={this.state.data} actions={this.actions} />
        <br />
        <br />
        {/* This one causes runtime exceptions. */}
        <TableWrapper id="foo" dataSource={this.state.data}>
          <ColumnWrapper field="id" />
          <ColumnWrapper field="title" />
        </TableWrapper>
        <br />
        <br />
        {/* This one does not. */}
        {/* This one only reassigns props to DOM reference when they change. */}
        <EditedTable id="bar" dataSource={this.state.data}>
          <EditedColumn field="id" />
          <EditedColumn field="title" />
        </EditedTable>
      </div>
    );
  }
}
