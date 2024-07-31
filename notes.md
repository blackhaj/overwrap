# Notes

- Need to use vsce - https://code.visualstudio.com/api/working-with-extensions/publishing-extension#vsce
- Doesn't work with pnpm so I needed to:

  - delete all node_modules & pnpm lockfile
  - install with npm

- Had to create an personal access token (which will expire in 90 days) - https://code.visualstudio.com/api/working-with-extensions/publishing-extension#get-a-personal-access-token

## Deploying new versions

- `vsce package` packages up the package
- `vsce publish` publishes it to the store
