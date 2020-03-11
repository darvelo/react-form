import React from 'react';
import { FormContext } from './context';


class Page extends React.Component {
  static contextType = FormContext;

  constructor(props) {
    super(props);
    this.registerInput = this.registerInput.bind(this);
    this.handleInputChanged = this.handleInputChanged.bind(this);
    this.props.registerPage(this.props.pageIndex);
  }

  registerInput(inputName, inputValue) {
    // Associate a field with this form page.
    this.context.registerInput(this.props.pageIndex, inputName, inputValue);
  }

  handleInputChanged(inputName, inputValue) {
    this.context.handlePageInputChanged(this.props.pageIndex, inputName, inputValue);
  }

  render() {
    const {
      isCurrentPage,
      isNextPage,
      isPreviousPage,
      className,
    } = this.props;

    let classNames = [`${this.context.classPrefix}__page`];

    if (isCurrentPage) {
      classNames.push(`${this.context.classPrefix}__page--current`);
    } else if (isPreviousPage) {
      classNames.push(`${this.context.classPrefix}__page--previous`);
    } else if (isNextPage) {
      classNames.push(`${this.context.classPrefix}__page--next`);
    }

    if (className) {
      classNames.push(className);
    }

    return (
      <div
        className={classNames.join(' ')}
      >
        {React.Children.map(this.props.children, (child) => child === null ? <></> : React.cloneElement(child, {
          handleInputChanged: this.handleInputChanged,
          registerInput: this.registerInput,
        }))}
      </div>
    );
  }
}
Page.contextType = FormContext;

export default Page;
