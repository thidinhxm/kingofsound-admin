const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const exphbs = require('express-handlebars')
const paginateHelper = require('express-handlebars-paginate')
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const bodyparser = require('body-parser');
const multer  = require('multer');
const upload = multer({dest: 'uploads/'})

const dashboardRouter = require('./components/dashboard/dashboardRouter');
const productRouter = require('./components/products/productRouter');
const revenueRouter = require('./components/revenues/revenueRouter');
const accountRouter = require('./components/accounts/accountRouter');
const orderRouter = require('./components/orders/orderRouter');
const authRouter = require('./components/auth/authRouter');
const adminRouter = require('./components/admins/adminRouter');
const passport = require('./components/auth/passport');
const orderHelper = require('./components/orders/orderHelper');
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
		compareStatus: orderHelper.compareStatus,
		isBlockedAccount: function(is_blocked) { return is_blocked},
		formatPrice: orderHelper.formatPrice,
		formatDateTime: orderHelper.formatDateTime,

	}
}));
app.set('view engine', 'hbs');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));


app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: true,
	saveUninitialized: false,
	cookie: {
		maxAge: 1000 * 60 * 60 * 24 * 7
		}
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {
	res.locals.user = req.user;
	next();
});


app.use('/', authRouter);
app.use('/dashboard', dashboardRouter);
app.use('/products', productRouter);
app.use('/revenue', revenueRouter);
app.use('/accounts', accountRouter);
app.use('/orders', orderRouter);
app.use('/admin', adminRouter);

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

app.use(bodyparser.urlencoded({ extended: true }));
module.exports = app;

