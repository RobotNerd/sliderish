import React from 'react';
// import Carnival from './Carnival';
import Fullscreen from './Fullscreen';

const patterns = [
  // Carnival,
  Fullscreen,
];


export default class PatternManager extends React.Component {

  /**
   * @param props.config Path to config file.
   */
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      refCount: 0,
      pattern: null,
    };
  }

  /**
   * Choose a random pattern to display.
   * @return Pattern class.
   */
  choosePattern() {
    const index = Math.floor(Math.random() * patterns.length);
    this.setState({
      refCount: this.state.refCount + 1,
      pattern: patterns[index],
    });
  }

  componentDidMount() {
    this.choosePattern();
  }

  /**
   * Load and render the next animation when the current animation ends.
   */
  onAnimationEnd() {
    const self = this;
    return function () {
      self.choosePattern();
    }
  }

  render() {
    // This uses a technique to dynamically load a component.
    // The capitalization fo the const "Pattern" is required.
    if (this.state.pattern) {
      const Pattern = this.state.pattern;
      return (
        <Pattern
          onAnimationEnd={this.onAnimationEnd()}
          config={this.props.config}
          nameStyle={this.props.nameStyle}
        />
      );
    }
    return (<span />);
  }
}
