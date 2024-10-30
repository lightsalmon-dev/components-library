# @lightsalmon/components-library

# Contribute

When contributing to this repository you might have errors on imports of `.module.scss` files on stories files, in that
case, set your IDE to use the `tsconfig.ladle.json` file instead of the default `tsconfig.json` file.
In fact, the default `tsconfig.json` file is used to build the library. Therefore, it excludes the `.stories.tsx` files
from the build process. The `tsconfig.ladle.json` file is not really used, it is just a workaround to make the IDE
recognize the `.module.scss` files as it overrides the default `tsconfig.json` file just by adding the `.stories.tsx` 
files to the `include` property.
