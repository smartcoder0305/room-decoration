
const history = require("history").createBrowserHistory();
history.pushLater = (...args) => setImmediate(() => history.push(...args))
export default history