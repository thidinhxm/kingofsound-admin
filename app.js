const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const exphbs = require('express-handlebars')
const paginateHelper = require('express-handlebars-paginate')
const methodOverride = require('method-override');

const indexRouter = require('./components/home/homeRouter');
const productRouter = require('./components/products/productRouter')
const revenueRouter = require('./components/revenues/revenueRouter')
const accountRouter = require('./components/accounts/accountRouter')
const orderRouter = require('./components/orders/orderRouter')
const authRouter = require('./components/auth/authRouter')

const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs({
	extname: 'hbs',
	defaultLayout: 'layout',
	helpers: {
		'pages': function(n,search_name,block) {
			var accum = '';
			for(var i = 1; i < n+1; ++i)
				accum += block.fn({index:i,search_name:search_name});
			return accum;
		},
		
		isNotSuperAdmin: function(id) { return id != 1 },
	}
}));
app.set('view engine', 'hbs');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));


app.use('/', indexRouter)
app.use('/products', productRouter)
app.use('/revenue', revenueRouter)
app.use('/accounts', accountRouter)
app.use('/order', orderRouter)
app.use('/', authRouter)

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
