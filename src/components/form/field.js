import React from 'react';
import { FormContext } from './context';


class Field extends React.Component {
  static contextType = FormContext;

  constructor(props) {
    super(props);
    this.handleInputChanged = this.handleInputChanged.bind(this);
    this.state = { value: '' };
  }

  componentDidMount() {
    // Associate this field with one of the form's pages.
    this.props.registerInput(this.props.name, this.state.value);
  }

  handleInputChanged(event) {
    const value = event.target.value;

    this.setState({
      value,
    });

    this.props.handleInputChanged(this.props.name, value);
  }

  render() {
    const {
      name,
      label,
      type
    } = this.props;

    const input = this.context.inputs[name];
    const isValid = input ? input.isValid : true;
    const validationMessage = input ? input.validationMessage : '';

    return (
      <>
        {label && <label className={`${this.context.classPrefix}__label`}>{label}</label>}
        <input
          className={`${this.context.classPrefix}__input`}
          type={type}
          name={name}
          value={this.state.value}
          onChange={this.handleInputChanged}
        />
        {!isValid && !!validationMessage &&
          <div className={`${this.context.classPrefix}__validationError`}>{validationMessage}</div>}
      </>
    );
  }
}

export default Field;
