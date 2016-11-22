# ui-beakers
Collection of common UI components to be shared throughout SellerLabs.

## Building
Include any authored modules in imports and exports in `src/index.js`. Run `npm run build` to bundle and transpile `src/index.js` to `index.js` in project root.

TODO: Prepublish scripts (the conventional solution for transpiling npm packages written in ES6) are currently unavailable for npm-installed git repositories. Transpiling/bundling with postinstall scripts requires installing `devDependencies` prior to running the build script. A better solution than committing the build file should be investigated.

### Alert
A top level component used to show alerts throughout an application.

#### Usage
To use the alert component `import { AlertContainer } from ui-beakers;` and place in a top level component within your app (ideally something like `App.jsx`). Then pass the container either your custom alert or the standard alert that comes with `ui-beakers`.
```javascript
import { AlertContainer } from ui-beakers;
import MyCustomAlert from 'path/to/MyCustomAlert';

...

<AlertContainer alertComponent={ MyCustomAlert } />
```
or
```javascript
import { Alert, AlertContainer } from ui-beakers;

...

<AlertContainer alertComponent={ Alert } />
```

#### Actions
There are three actions that can be used to modify the alert store: `addAlert`, `addTimedAlert`, and `removeAlert.` 

`addAlert(alert: Object)`:
> adds alert object to the store (note: the object will not be removed until `removeAlert` is called).

___

`removeAlert(alert: Object)`:
> removes an alert object from the store if it exists within the store.

___

`addTimedAlert(alert: Object, displayTime?: Number)`
> calls `addAlert` with alert object then calls `removeAlert` after either the displayTime (in ms) expires or after a default time of 5 seconds.

#### Default Alert Component
The default alert component has the following propTypes:
```javascript
Alert.propTypes = {
    alert: PropTypes.shape({
        message: PropTypes.node.isRequired,
        type: PropTypes.oneOf(['danger', 'success', 'warning']),
    }),
};
```

Alert objects must have the same shape as defined above when using the default alert component:

```javascript
addAlert({
    message: 'Test alert!',
    type: 'success',
});

addTimedAlert({
    message: (
        <div>Test alert</div>
    ),
    type: 'success',
});
```

#### Custom Alert Components
To use your own custom alert component simply pass your alert component in to the AlertContainer.
Your component will then be passed the first alert object in the store as a prop named alert.

For example:
```javascript
// App.jsx
import { AlertContainer } from 'ui-beakers';
import MyCustomAlert from 'path/to/MyCustomAlert';

const App = () => {
    return (
        <div> 
            <AlertContainer alertComponent={ MyCustomerAlert } />
            <span>Nav goes here</span>
        </div>
    );
};

// Somewhere within your app
import { addAlert } from 'ui-beakers';

addAlert({
    foo: 'bar',
    hello: 'world',
});

// MyCustomAlert.js
const MyCustomAlert = ({ alert }) => {
    console.log(alert.foo); // bar
    console.log(alert.hello); // World
    
    return null;
};
```

### HomePage
Landing page for Seller Labs applications (originally from Scope).

#### Usage
Example from Promote-UI:
```es6
// @flow
import React from 'react';
import { HomePage } from ui-beakers;
import {
    landingPageBackground,
    primary1Color,
    primary2Color,
    primary3Color,
} from 'constants/colors';
import promoteLogo from 'images/promote-logo.png';

const Home = () => (
    <HomePage
        backgroundColor={ landingPageBackground }
        backgroundEndColor={ primary3Color }
        lineColor={ primary2Color }
        logoSrc={ promoteLogo }
        particleColor={ primary1Color }
        ringColor={ primary1Color } />
);

export default Home;
```

#### Props
If `backgroundEndColor` is passed, the background color will be a gradient from `backgroundColor` (top) to `backgroundEndColor`. Otherwise, the entire background will be `backgroundColor`.

```
backgroundColor: PropTypes.string,
backgroundEndColor: PropTypes.string,
children: PropTypes.node,
lineColor: PropTypes.string,
logoSrc: PropTypes.string,
logoStyle: PropTypes.object,
particleColor: PropTypes.string,
ringColor: PropTypes.string,
```
