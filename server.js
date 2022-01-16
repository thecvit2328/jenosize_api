const app = require("./app");
const { port } = require("./configs");
app.listen(port, () => console.log(`server run listening on port ${port}`));
