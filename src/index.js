import React from 'react';
import ReactDOM from 'react-dom';
import blog1 from './blog1';
// import './index.css';
import './App.css';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { PreviousMap } from '../node_modules/postcss';

const Header = () => (
  <div className="header">
    <h1>Welcome to My Blog</h1>
  </div>
);

const Column = props => {
  return (
    <div className="column">
      <p>{props.content}</p>
    </div>
  );
};

const SideNav = props => {
  function handleClick(e) {
    return props.getColumnText(e.target.id);
  }

  return (
    <div className="side-nav">
      <div id="info" onClick={handleClick}>
        <p>Info</p>
      </div>
      <div id="about" onClick={handleClick}>
        <p>About</p>
      </div>
      <div id="contact" onClick={handleClick}>
        <p>Contact</p>
      </div>
    </div>
  );
};

const TwoColumnLayout = props => {
  return (
    <div className="container">
      <Column content={props.content.column1} />
      <Column content={props.content.column2} />
    </div>
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: {
        column1: '',
        column2: blog1.text
      },
      activeText: ''
    };
  }

  getColumnText = textDescription => {
    this.setState({
      activeText: textDescription
    });
    let text;

    if (textDescription === 'info') {
      text = "Here's the info you need. All the info. I hope it is helpful";
    } else if (textDescription === 'about') {
      text =
        "Here's the about page. All the about you need. I hope it is aboutful";
    } else if (textDescription === 'contact') {
      text =
        "Here's the contact page. All the contacts you need. I hope it is social";
    }

    this.setState(prevState => {
      return {
        blogs: {
          column1: text,
          column2: prevState.blogs.column2
        }
      };
    });
  };

  render() {
    return (
      <div>
        {/* <SuperHeader /> */}
        <Header />
        <TwoColumnLayout content={this.state.blogs} />
        <SideNav getColumnText={this.getColumnText} />;
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
