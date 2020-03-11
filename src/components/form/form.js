import React from 'react';
import { FormContext } from './context';


class Form extends React.Component {

  constructor(props) {
    super(props);

    this.registerPage = this.registerPage.bind(this);
    this.registerInput = this.registerInput.bind(this);
    this.handlePageInputChanged = this.handlePageInputChanged.bind(this);
    this.validateInput = this.validateInput.bind(this);
    this.goToPrevPage = this.goToPrevPage.bind(this);
    this.goToNextPage = this.goToNextPage.bind(this);
    this.submitForm = this.submitForm.bind(this);

    this.state = {
      transitionDirection: null,
      isSubmitting: false,

      formContext: {
        // The string used as the base prefix for all BEM classes in the form.
        classPrefix: props.classPrefix || 'form',

        // Input values and validation data.
        inputs: {},
        // Pages and their associated inputs and page validation data.
        pages: [],

        // General form state.
        currentPageIndex: 0,
        isCurrentPageValid: false,

        // Callbacks used by subcomponents.
        registerPage: this.registerPage,
        registerInput: this.registerInput,
        handlePageInputChanged: this.handlePageInputChanged,
        goToPrevPage: this.goToPrevPage,
        goToNextPage: this.goToNextPage,
        submitForm: this.submitForm,
      },
    };
  }

  // Initialize data for the page at the given index.
  registerPage(pageIndex) {
    this.setState((state) => {
      const pages = [...state.formContext.pages];
      pages[pageIndex] = {
        inputNames: new Set(),
        isValid: true,
      };

      return {
        formContext: {
          ...state.formContext,
          pages,
        }
      };
    });
  }

  // The method used to validate inputs if the user doesn't supply one.
  // Defaults to passing validation for inputs that are initializing.
  static defaultValidationFn = (inputName, inputValue, isInitializing) => ({
    isValid: !isInitializing,
    validationMessage: '',
  });

  // Validate an input's value using a user-defined function, or the default.
  // `isInitializing` is true when the initial value is set on the input.
  // `isValid` being false disables buttons for going to the next page of the form.
  validateInput(inputName, inputValue, isInitializing) {
    const fn = this.props.validationFn || Form.defaultValidationFn;
    return fn(inputName, inputValue, isInitializing);
  }

  // Initialize data for the input at the given page index.
  registerInput(pageIndex, inputName, inputValue) {
    this.setInput({pageIndex, inputName, inputValue, isInitializing: true});
  }

  // Handle when an input's value changes.
  handlePageInputChanged(pageIndex, inputName, inputValue) {
    this.setInput({pageIndex, inputName, inputValue, isInitializing: false});
  }

  // Store the new value for an input with a given name on a given page.
  setInput({pageIndex, inputName, inputValue, isInitializing}) {
    // It's important that we use the function version of setState here,
    // as too many calls to setState on initialization can cause values to stomp on each other.
    this.setState((state) => {
      const formContext = state.formContext;

      const { isValid, validationMessage } = this.validateInput(inputName, inputValue, isInitializing);

      // Write the data for the input.
      const inputs = {
        ...formContext.inputs,
        [inputName]: {
          value: inputValue,
          isValid,
          validationMessage,
        }
      };

      // Calculate the given page data now that one of its inputs has updated.
      const pageData = formContext.pages[pageIndex];
      const pageInputNames = new Set(pageData.inputNames);
      pageInputNames.add(inputName);
      const isPageValid = [...pageInputNames].every(name => inputs[name].isValid);

      // Write the page data into the `pages` array.
      const pages = [...formContext.pages];
      pages[pageIndex] = {
          inputNames: pageInputNames,
          isValid: isPageValid,
      };

      const isCurrentPageValid = (pageIndex === formContext.currentPageIndex) ? isPageValid : formContext.isCurrentPageValid;

      return {
        formContext: {
          ...formContext,
          inputs,
          pages,
          isCurrentPageValid,
        }
      };
    });
  }

  // Transition pages backward or forward.
  transitionPage(direction) {
    const offset = direction === 'forward' ? 1 : -1;

    this.setState({ transitionDirection: direction});

    const transitionFn = this.props.transitionFn || Promise.resolve;
    transitionFn().then(() => {
      this.setState((state) => {
        const formContext = state.formContext;
        // Prevent indexing out of bounds.
        const pageCount = Object.keys(formContext.pages).length - 1;
        const pageIndex = Math.max(0, Math.min(pageCount, formContext.currentPageIndex + offset));
        const page = formContext.pages[pageIndex];
        const isCurrentPageValid = page.isValid;

        return {
          transitionDirection: null,
          formContext: {
            ...formContext,
            currentPageIndex: pageIndex,
            isCurrentPageValid,
          }
        };
      });
    });
  }

  // Move to the previous page in the form,
  // allowing user-defined transitions to complete.
  goToPrevPage(event) {
    event.preventDefault();
    this.transitionPage('backward')
  }

  // Move to the previous page in the form,
  // allowing user-defined transitions to complete.
  goToNextPage(event) {
    event.preventDefault();
    this.transitionPage('forward')
  }

  // Submit form data, and show a user-defined view while it's in flight.
  submitForm(event) {
    event.preventDefault();

    console.log(`Sending data to ${this.props.action}:`, this.state.formContext.inputs);
    this.setState({ isSubmitting: true });

    setTimeout(() => {
      this.transitionPage('forward')
      this.setState({ isSubmitting: false });
    }, 2000);
  }

  render() {
    const classPrefix = this.state.formContext.classPrefix
    const classNames = [classPrefix];
    const {
      isSubmitting,
      transitionDirection,
    } = this.state;

    if (isSubmitting) {
      classNames.push(`${classPrefix}--submitting`)
    }
    if (transitionDirection) {
      classNames.push(`${classPrefix}--transitioning${transitionDirection}`)
    }

    return (
      <FormContext.Provider value={this.state.formContext}>
        <form className={classNames.join(' ')}>
          {this.props.children}
          {isSubmitting && React.cloneElement(this.props.loadingView, { className: `${classPrefix}__loading`})}
        </form>
      </FormContext.Provider>
    );
  }
}

export default Form;
