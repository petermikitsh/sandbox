import React from 'react';

interface State {
  records: any[];
  lowerBound: number;
  upperBound: number;
}

export class App extends React.Component {
  state: State;

  constructor(props) {
    super(props);
    this.state = {
      records: [],
      lowerBound: 0,
      upperBound: 10,
    };
    this.decrement = this.decrement.bind(this);
    this.increment = this.increment.bind(this);
  }

  componentDidMount() {
    const setState = this.setState.bind(this);
    window.fetch('/large.json').then((res) => {
      res.json().then((json) => {
        setState((prevState) => {
          return {
            ...prevState,
            ...json,
          };
        });
      });
    });
  }

  decrement() {
    if (this.state.lowerBound !== 0) {
      this.setState((prevState: State) => ({
        ...prevState,
        lowerBound: prevState.lowerBound - 10,
        upperBound: prevState.upperBound - 10,
      }));
    }
  }

  increment() {
    if (this.state.lowerBound !== 90) {
      this.setState((prevState: State) => ({
        ...prevState,
        lowerBound: prevState.lowerBound + 10,
        upperBound: prevState.upperBound + 10,
      }));
    }
  }
  render() {
    if (!this.state.records) {
      return null;
    }
    const { lowerBound, upperBound } = this.state;
    return (
      <div>
        <button onClick={this.decrement}>{'<'}</button>
        <button onClick={this.increment}>{'>'}</button>
        <p>
          {`Viewing ${lowerBound} - ${upperBound - 1}`}
        </p>
        <Records {...this.state} />
      </div>
    );
  }
}

// For degraded performance, repleace line 78 with
// <div key={record.id}>{record.query}</div>
const Records = ({ records, lowerBound, upperBound }) => (
  records.length ? records.slice(lowerBound, upperBound).map(record => (
    <div key={record.id}>{record.query.substr(0, 1000)}</div>
  )) : null
);
