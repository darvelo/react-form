import React from 'react';
import { FormContext } from './context';


// Base Button component used by PrevPageButton and NextPageButton.
class FormNavButton extends React.Component {
  static contextType = FormContext;

  render() {
    const { direction } = this.props;

    let isDisabled = false
    if (direction === "next") {
      const isPageInvalid = !this.context.isCurrentPageValid;
      const isLastPage = this.context.currentPageIndex === this.context.pages.length - 1;
      isDisabled = isPageInvalid || isLastPage;
    }

    if (direction === "prev") {
      const isFirstPage = this.context.currentPageIndex === 0;
      isDisabled = isFirstPage;
    }

    const clickAction = direction === "next" ? this.context.nextPage : this.context.prevPage;

    return (
      <button
        className={`${this.context.classPrefix}__button ${this.context.classPrefix}__${direction}Button`}
        disabled={isDisabled}
        onClick={clickAction}
      >
       {this.props.children}
      </button>
    );
  }
}

// A button that causes the form to move back one page.
class PrevPageButton extends React.Component {
  static contextType = FormContext;

  render() {
    return <FormNavButton direction="prev">{this.props.children}</FormNavButton>
  }
}

// A button that causes the form to move forward one page.
class NextPageButton extends React.Component {
  static contextType = FormContext;

  render() {
    return <FormNavButton direction="next">{this.props.children}</FormNavButton>
  }
}

// A button that causes the form to submit data to the server.
class CompleteButton extends React.Component {
  static contextType = FormContext;

  render() {
    const isFormInvalid = this.context.pages.some(page => !page.isValid);

    return (
      <button
        type="submit"
        disabled={isFormInvalid}
        onClick={this.context.submitForm}
        className={`${this.context.classPrefix}__button ${this.context.classPrefix}__completeButton`}
      >
        {this.props.children}
      </button>
    );
  }
}

export {
  PrevPageButton,
  NextPageButton,
  CompleteButton,
}
