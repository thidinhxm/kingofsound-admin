const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const exphbs = require('express-handlebars')
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');

const dashboardRouter = require('./components/dashboard/dashboardRouter');
const productRouter = require('./components/products/productRouter');
const revenueRouter = require('./components/revenues/revenueRouter');
const accountRouter = require('./components/accounts/accountRouter');
const orderRouter = require('./components/orders/orderRouter');
const authRouter = require('./components/auth/authRouter');
const adminRouter = require('./components/admins/adminRouter');
const voucherRouter = require('./components/vouchers/voucherRouter');
const categoryRouter = require('./components/categories/categoryRouter');
const brandRouter = require('./components/brands/brandRouter');
const passport = require('./components/auth/passport');
const orderHelper = require('./components/orders/orderHelper');
const productHelper = require('./components/products/productHelper');


const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs({
	extname: 'hbs',
	defaultLayout: 'layout',
	helpers: {
		'pages': function(pages,page,search_name,block) {
			var accum = '';
			console.log(page);
			for(var i = 1; i < pages+1; ++i)
			if(i!=page+1)
				accum += block.fn({index:i,search_name:search_name,active:""});
			else
				accum += block.fn({index:i,search_name:search_name,active:"active"});
			return accum;
		},

		isNotSuperAdmin: function(id) { return id != 1 },
		isNotYourAccount: function(id1,id2) { return id1 != id2 },
		isAdmin: function(id) { return id == 'admins' },
		isLockedEnable: function(id,userID) {	return  (id != 1 && id != userID) },
		compareStatus: orderHelper.compareStatus,
		isBlockedAccount: function(is_blocked) { return is_blocked},
		formatPrice: orderHelper.formatPrice,
		formatDateTime: orderHelper.formatDateTime,
		paginateProductList: productHelper.paginateProductList,
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
app.use('/', adminRouter);
app.use('/dashboard', dashboardRouter);
app.use('/products', productRouter);
app.use('/categories', categoryRouter);
app.use('/revenue', revenueRouter);
app.use('/accounts', accountRouter);
app.use('/orders', orderRouter);
app.use('/vouchers', voucherRouter);
app.use('/brands', brandRouter);



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

