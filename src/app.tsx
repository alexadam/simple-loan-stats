import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './app.scss'
import LoansView from './loans.view';

ReactDOM.render(
    <LoansView />,
    document.getElementById('app') as HTMLElement
  );