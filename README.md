# Base project

This is a base project for CS4530, Software Engineering at Northeastern.

## ESLint configuration

This base project has an opinionated eslint configuration that heavily relies
on typescript-eslint.

- Frontend code is code that lives in `./frontend` or `./client`. This code
  supports a few different naming conventions, as suitable for React.
- Test code lives in a `**/tests` directory OR has a `*.spec.ts(x)` or a
  `*.test.ts(x)` filename. Tests can use devDependencies, unlike other code.
- Config files all have `*.config.mjs` filenames (vite, vitest, playwright,
  and eslint all follow this convention) and can import devDependencies,
  unlike other code. (Note that this means we're not using TypeScript to check
  our config files.)
- Everything except for `no-console` and `prettier` is registered as `error`.

## Prettier

Includes a `.prettierrc` file with some reasonable settings and a
`.vscode/settings.json` file that sets javascript, typescript, and json files
to use the prettier editor as the default.

## LF file endings

The `.prettierrc`, `.gitattributes`, and `.vscode/settings.json` files
conspire to generally force projects to use `\n` file endings instead of
Windows-style `\r\n` line endings (LF instead of CRLF).
