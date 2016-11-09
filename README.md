# ui-beakers
Collection of common UI components to be shared throughout SellerLabs.

### Alert
The alert is a top level component used to show alerts throughout an application.

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

___
`addAlert(alert: Object)`:
> adds alert object to the store (note: the object will not be removed until `removeAlert` is called).

___

`removeAlert(alert: Object)`:
> removes an alert object from the store if it exists within the store.

___

`addTimedAlert(alert: Object, displayTime?: Number)`
> calls `addAlert` with alert object then calls `removeAlert` after either the displayTime expires or after a default time of 5 seconds.

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

#### Custom Alert Components
To use your own custom alert component simply pass your alert component in to the AlertContainer.
Your component will then be passed first alert object in the store as a prop named alert.

For example:
```javascript
// App.jsx
import { AlertContainer } from 'ui-beakers';
import MyCustomAlert from 'path/to/MyCustomAlert';

const App = () => {
    return (
        <AlertContainer alertComponent={ MyCustomerAlert } />
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
};
```
