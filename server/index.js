const port = process.env.PORT || 4000;
const app = require('./app');

app.listen(port, () => {
  console.log(`Server is running, listening on port ${port}`);
});