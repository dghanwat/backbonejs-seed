window.addEventListener('load', function () {
    new FastClick(document.body);
}, false);

localStorage.setItem('SERVER_BASE_URL', 'https://sarathee-fluidmobileapp.rhcloud.com/rest/api/');

var fb = new MobileApp();


fb.spinner = $("#spinner");
fb.spinner.hide();

fb.slider = new PageSlider($('#container'));


fb.MobileRouter = Backbone.Router.extend({

    routes: {
        "":                         "welcome",
      
    },

    
    welcome: function () {
        var self = this;
		var view = new fb.views.Welcome({template: fb.templateLoader.get('welcome')});
	    var slide = fb.slider.slidePageFrom(view.$el, "right");
	    fb.slider.resetHistory();
	    view.render();
        
    },
  
	
});

$(document).on('ready', function () {
	
    fb.templateLoader.load(['welcome'], function () {
        fb.router = new fb.MobileRouter();
        Backbone.history.start();
    });
	 $.ajaxSetup({
	    beforeSend: function (xhr)
	    {
	       fb.spinner.show();
	    }
	});

	if(typeof(Storage)=="undefined") {
		alert("Sorry. It looks like your client does not support HTML5. Please upgrade to an HTML5 Compliant client.");
	}

});

$(document).ajaxComplete(function() {
  fb.spinner.hide();
});




Handlebars.registerHelper('if_eq', function(a, b, opts) {
    if(a == b) // Or === depending on your needs
        return opts.fn(this);
    else
        return opts.inverse(this);
});

Handlebars.registerHelper('if_gr_eq', function(a, b, opts) {
    if(a >= b) 
        return opts.fn(this);
    else
        return opts.inverse(this);
});

Handlebars.registerHelper('if_gr', function(a, b, opts) {
    if(a > b) 
        return opts.fn(this);
    else
        return opts.inverse(this);
});


function isBlank(value) {
	return !value.trim();
}

jQuery.fn.sort = function() {  
    return this.pushStack( [].sort.apply( this, arguments ), []);  
};  

function sortEventStartDate(a,b){  
     if (a.eventStartDate == b.eventStartDate){
       return 0;
     }
     return a.eventStartDate > b.eventStartDate ? 1 : -1;  
 };  
  function sortEventStartDateDesc(a,b){  
     return sortLastName(a,b) * -1;  
 };

var DateFormats = {
       short: "DD MMMM - YYYY",
       long: "dddd DD.MM.YYYY HH:mm",
       day: "DD",
       month: "MMM"
};
 

Handlebars.registerHelper("formatDate", function(datetime, format) {

	var date = new Date(datetime);
	//console.log(date);
	if(format == "day") {
		return date.getDate();
	} else if(format == "month") {
		return monthNames[date.getMonth()];
	} else if(format == "hours") {
		if(date.getMinutes() == 0 ) {
			return date.getHours() +":00";
		} else {
			return date.getHours() +":"+date.getMinutes();
		}
		
	} else if(format == "year") {
		return date.getFullYear();
	} else if(format == "localeDateTime") {
		return date.toLocaleDateString() + " " + date.toLocaleTimeString();
	}
	else {
		return datetime;
	}
});

Handlebars.registerHelper("formatPrice", function(price) {

	var formattedPrice = "";
	if(price == 0 ) {
		formattedPrice = "00.00"
	} else {
		formattedPrice = price + ".00";
	}

	return formattedPrice;
});

var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

