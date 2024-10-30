[![npm version](https://badge.fury.io/js/@lightsalmon%2Fcomponents-library.svg)](https://badge.fury.io/js/@lightsalmon%2Fcomponents-library)

# @lightsalmon/components-library

- [About](#about)
- [Storybook](#storybook)
- [Installation](#installation)
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

## Contribute

When contributing to this repository you might have errors on imports of `.module.scss` files on stories files, in that
case, set your IDE to use the `tsconfig.ladle.json` file instead of the default `tsconfig.json` file.
In fact, the default `tsconfig.json` file is used to build the library. Therefore, it excludes the `.stories.tsx` files
from the build process. The `tsconfig.ladle.json` file is not really used, it is just a workaround to make the IDE
recognize the `.module.scss` files as it overrides the default `tsconfig.json` file just by adding the `.stories.tsx`
files to the `include` property.
