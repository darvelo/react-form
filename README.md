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

I created a form validation mechanism where a function can be passed as a prop into the `Form` and used to validate any of the form fields, with optional validation messages. `NextPageButton`s will be disabled if, when a form field value is passed into the function, it returns `isValid: false`. If it also returns a `valdationMessage` string, that'll be the message displayed when `isValid` is `false`.

## User-defined Transitions

Users can pass a `transitionFn` into the `Form`. When the form is transitioning between pages, the `transitionFn` can return a promise that resolves when any animations are complete. There are CSS classes (following the BEM naming convention) for every form subcomponent, providing hooks for CSS-driven animated transitions.

The [demo](https://davidarvelo.com/react-form/) shows animated page transitions with this approach, swiping pages sideways similar to how page animations might appear on a mobile app.

## Docker Container

I've provided a simple `Dockerfile` and `docker-compose.yaml` to run the app. To run it:

```
$ docker-compose up --build
```

Then navigate to `https://localhost:3000` to see it in action.
