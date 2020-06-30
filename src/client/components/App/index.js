import React from 'react';
import styles from './styles.sass';

const { ipcRenderer } = window.require('electron');
const { shell } = window.require('electron');

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      counter: 0
    };
  }

  sendCounterUpdate = (data) => {
    ipcRenderer.send('COUNTER_UPDATED', data);
  }

  increase = () => {
    this.setState(prevState => ({ counter: prevState.counter + 1 }), () => {
      this.sendCounterUpdate(this.state.counter);
    });
  }

  myClickFunction = () => {
    shell.openExternal('https://www.google.com');
  }

  decrease = () => {
    const { counter } = this.state;
    if (counter) {
      this.setState(prevState => ({ counter: prevState.counter - 1 }), () => {
        this.sendCounterUpdate(this.state.counter);
      });
    }
  }

  render() {
    const { counter } = this.state;
    return (
      <div className={styles.app}>
        <button
          type="button"
          className={styles.button}
          onClick={this.decrease}
        >
          -
        </button>
        <div className={styles.counter}>{counter}</div>
        <button
          type="button"
          className={styles.button}
          onClick={this.increase}
        >
          +
        </button>
        <a>
          <button
            type="button"
            onClick={this.myClickFunction}
          >
            Click
          </button>
        </a>
      </div>
    );
  }
}
export default App;
