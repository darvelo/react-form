import React from 'react';
import { FormContext } from './context';


// A view that shows all the input values entered.
class ConfirmationScreen extends React.Component {
  static contextType = FormContext;

  renderConfirmationFields() {
    return this.context.pages.map((page, index) => {
      const inputNames = [...page.inputNames].map((inputName) => {
        return (
          <div
            key={inputName}
            className={`${this.context.classPrefix}__confirmationScreenInputName`}
          >
            {this.context.inputs[inputName].value}
          </div>
        )
      });

      return (
        <div
          key={index}
          className={`${this.context.classPrefix}__confirmationScreenPage`}
        >
          {inputNames}
        </div>
      );
    });
  }

  render() {
    return (
      <div className={`${this.context.classPrefix}__confirmationScreen`}>
        {this.renderConfirmationFields()}
        {this.props.children}
      </div>
    );
  }
}

export default ConfirmationScreen;
