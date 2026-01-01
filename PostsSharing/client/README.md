## Tools

Install this Chrome extension **Apollo Client Developer Tools** to be able to run queries and have access to the playground from the browser console.

## Possible issues

- MUI

When using 2 Material UI elements as parent and child, if the child is in external component file it doesn't inherit the styles.

**Fix:** in the child Material UI element spread them from the props like below:

```javascript
<GridListTile style={{ ...props.style }}></GridListTile>
```

- Node.js

For running on Node.js v18+ the start script was updated with open ssl legacy provider. Node.js introduced changes to the ssl in version 17.

```
"start": "react-scripts --openssl-legacy-provider start"
```
