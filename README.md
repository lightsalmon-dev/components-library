[![NPM Version](https://img.shields.io/npm/v/%40lightsalmon%2Fcomponents-library)](https://www.npmjs.com/package/@lightsalmon/components-library)

# @lightsalmon/components-library

- [About](#about)
- [Storybook](#storybook)
- [Installation](#installation)
- [Getting started](#getting-started)
- [Form fields lifecycle](#form-fields-lifecycle)
- [Contribute](#contribute)

## About

This library is a work in progress, and it is being developed by the Lightsalmon team. It is a collection of React
typescript components highly customizable via SCSS vars. Stay tuned for more updates.

## Storybook

Visit the live version of the storybook [here](https://lightsalmon-dev.github.io/components-library).

## Installation

To install the library, run the following command:

```bash
npm install @lightsalmon/components-library
```

## Getting started

In order to use components from this library, you need to import them from the library itself.
In addition, you need to import the library's styles in your project.

## Form fields lifecycle

The form fields of the library are designed to behave and interact with the outside in a common way.

The following is the internal lifecycle of a form field:

1. **First render**: The form field is rendered as is, no validation is performed, no error message is shown and no
   default value is set.
2. **On mount**: The form field is rendered with a default value, first validation is performed, and the error
   message is shown if the value is invalid.
3. **On focus**: The user focuses on the form field, the error message is hidden.
4. **On change**: The user fills the input, the value is updated.
5. **On blur**: The user leaves the form field, the validation is performed, and the error message is shown if the value
   is invalid.

## Contribute

When contributing to this repository you might have errors on imports of `.module.scss` files on stories files, in that
case, set your IDE to use the `tsconfig.ladle.json` file instead of the default `tsconfig.json` file.
In fact, the default `tsconfig.json` file is used to build the library. Therefore, it excludes the `.stories.tsx` files
from the build process. The `tsconfig.ladle.json` file is not really used, it is just a workaround to make the IDE
recognize the `.module.scss` files as it overrides the default `tsconfig.json` file just by adding the `.stories.tsx`
files to the `include` property.
