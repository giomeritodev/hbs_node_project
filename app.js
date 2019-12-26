const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expressHbs = require('express-handlebars');
const session = require('express-session');
const flash = require('connect-flash');

const indexRouter = require('./routes/index');
const categoriasRouter = require('./routes/categorias');
const produtosRouter = require('./routes/produtos');
const clientesRouter = require('./routes/clientes');

const app = express();

//Sessão
	app.use(session({
		secret: "g10m3ri70",
		resave: true,
		saveInitialized: true
	}));

	app.use(flash());

//Middleware
	app.use((req, res, next) => {
		//o "locals" cria uma variavel global para o sistema
		res.locals.success_msg = req.flash('success_msg');
		res.locals.error_msg = req.flash('error_msg');
		next();
	});	

// view engine setup
app.engine('.hbs', expressHbs({
	defaultLayout: 'layout',
	extname: '.hbs' 
}));

app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Usa as rotas
app.use('/', indexRouter);
app.use('/categorias', categoriasRouter);
app.use('/produtos', produtosRouter);
app.use('/clientes', clientesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;