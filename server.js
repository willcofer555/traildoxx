const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const monk = require('monk');


require('dotenv').config();

const middlewares = require('./backend/src/middlewares');
const api = require('./backend/src/api');

const app = express();
const PORT = process.env.PORT || 5000;

monk(process.env.MONGODB_URI || 'mongodb://willcofer:floating22@ds359118.mlab.com:59118/heroku_xjlhpst3', {
    useNewUrlParser: true
});



app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(cors());

require('./backend/src/db');


app.use('/api/v1', api);

app.use(require('./backend/src/api/messages'));

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, './client/build', 'index.html')); // relative path
    });
}


app.listen(PORT, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${PORT}`);
  /* eslint-enable no-console */
});

module.exports = app;
