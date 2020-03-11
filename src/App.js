import React from 'react';
import {
  Form,
  Pages,
  Page,
  Field,
  PrevPageButton,
  NextPageButton,
  SubmitButton,
  ConfirmationScreen,
} from './components/form';


class App extends React.Component {

  // Validate the inputs by name.
  validationFn(inputName, inputValue, isInitializing) {
    // Initializing is when the initial value is set on the input.
    // `isValid` being false here prevents moving to the next page on start.
    if (isInitializing) {
      return {
        isValid: false,
        validationMessage: '',
      };
    }

    let isValid = true;
    let validationMessage = '';

    switch (inputName) {
      case 'firstname':
        if (inputValue === 'Bob') {
          isValid = false;
          validationMessage = 'No Bobs allowed.';
        }
        break;

      case 'age':
        const age = Number(inputValue);
        if (isNaN(age) || age <= 13) {
          isValid = false;
          validationMessage = 'Must be older than 13.';
        }
        break;

      default:
        break;
    }

    return {isValid, validationMessage};
  }

  // Do some timed visual work to transition between pages.
  // Return a promise that resolves after some period of time.
  // @return Promise
  transitionFn() {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, 350);
    });
  }

  // A React component that will be placed in the center
  // of the screen while sending data ta to the server.
  // @return React.Component
  loadingView() {
    return <div>Sending...</div>;
  }

  render = () => (
    <Form
      transitionFn={this.transitionFn}
      validationFn={this.validationFn}
      loadingView={this.loadingView()}
      action="/send"
      classPrefix="form"
    >
      <Pages>
        <Page>
          <Field type="email" name="email" label="Email" />
          <Field type="password" name="password" label="Password" />
          <NextPageButton>Next Page</NextPageButton>
        </Page>
        <Page>
          <Field type="text" name="firstname" label="First Name" />
          <Field type="text" name="lastname" label="Last Name" />
          <Field type="text" name="age" label="Age" />
          <PrevPageButton>Previous Page</PrevPageButton>
          <SubmitButton>Submit</SubmitButton>
        </Page>
        <Page>
          <ConfirmationScreen>
            Thanks for signing up!
          </ConfirmationScreen>
        </Page>
      </Pages>
    </Form>
  );
}

export default App;
