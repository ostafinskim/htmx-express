require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./model/dbconfig');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3535;
const URI = process.env.MONGO_URI;

app.use(morgan('tiny'));
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('./public'));

app.engine(
    '.hbs',
    exphbs.engine({
        extname: '.hbs',
        defaultLayout: 'main',
        partialsDir: path.join(__dirname, 'views/partials'),
        layoutsDir: path.join(__dirname, 'views/layouts'),
    })
);
app.set('view engine', '.hbs');

app.set('views', path.join(__dirname, 'views'));

// ROUTES
const booksRouter = require('./routes/books');
app.use('/', booksRouter);

const start = async () => {
    try {
        await connectDB(URI);
        app.listen(PORT, () =>
            console.log(`Server is running at: http://localhost:${PORT}`)
        );
    } catch (error) {
        process.exit(1);
    }
};

start();
