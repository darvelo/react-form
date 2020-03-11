# A React Form Implementation

[Demo](https://davidarvelo.com/react-form/)

## Full Wizard

I created a full wizard Form component that can take any number of child `Page` components, each having any number of `Field` elements. I created two `NextPageButton` and `PrevPageButton` components which can be placed anywhere inside the form, not just within pages. This gives the user the flexibility of either choosing to have two static buttons that can navigate between pages, or instead to place the buttons inside pages to have greater control over the navigation between pages.

There are 8 public components:

* `Form`
* `Pages`
* `Page`
* `Field`
* `PrevPageButton`
* `NextPageButton`
* `CompleteButton`
* `ConfirmationScreen`

## Validation

I created a form validation mechanism where a function can be passed as a prop into the `Form` and used to validate any of the form fields, with optional validation messages.

The signature of the function is `validationFn(inputName, inputValue, isInitializing)`, where `inputName` is the name attribute of the input element, `inputValue` is its current value, and `isInitializing` is a flag that signifies whether the value was set because the field was just attached to the DOM. The function should return an object with the shape: `{isValid: Boolean, validationMessage: string?}`. `validationMessage` is displayed under the field when `isValid` is `false`.

`NextPageButton`s will be disabled if `validationFn` returns `isValid: false` for a field on the page.

## User-defined Transitions

Users can pass a `transitionFn` into the `Form`. When the form is transitioning between pages, the `transitionFn` can return a promise that resolves when any animations are complete. There are CSS classes (following the BEM naming convention) for every form subcomponent, providing hooks for CSS-driven animated transitions.

The [demo](https://davidarvelo.com/react-form/) shows animated page transitions with this approach, swiping pages sideways similar to how page animations might appear on a mobile app.

## Docker Container

I've provided a simple `Dockerfile` and `docker-compose.yaml` to run the app. To run it:

```
$ docker-compose up --build
```

Then navigate to `https://localhost:3000` to see it in action.

## Considerations

### Full Name vs. First Name, Last Name

Splitting the full name field into two is a low effort, low cost endeavour, but brings a lot of benefits. Separating the list allows you to personalize messages by first name, and allows searching the database by last name if the need arises, such as to correlate familial ties or duplicate entries. If pursuing internationalization support, splitting the fields in two could also make it easier to present the "Last Name" field first for cultures where the surname is given first preference in reading.
