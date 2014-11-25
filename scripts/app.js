//begin clock	
function GetClock() {
    var d = new Date();
    var nhour = d.getHours(),
        nmin = d.getMinutes(),
        ap;
    if (nhour === 0) {
        ap = " AM";
        nhour = 12;
    } else if (nhour < 12) {
        ap = " AM";
    } else if (nhour == 12) {
        ap = " PM";
    } else if (nhour > 12) {
        ap = " PM";
        nhour -= 12;
    }

    if (nmin <= 9) nmin = "0" + nmin;

    document.getElementById('clockbox').innerHTML = "" + nhour + ":" + nmin + ap + "";
}

//document start
$(document).ready(function () {

    var weather = $('.weather');
    var alarm = $('.alarm');
    var music = $('.music');
    var habits = $('.habits');
    var shake = $('.shake');
    var volume = $('.volume');
    var weatherdetail = $('.weather-detail');
    var mon = $('.monday');
    var tues = $('.tuesday');
    var wed = $('.wednesday');
    var thurs = $('.thursday');
    var fri = $('.friday');
    var clock = $('#clockbox');
    var front = $('.screen-container');
    var start = $('#start');
    var sheen = $('.sheen');

    var tl = new TimelineLite();

    var state = -1;


    //more clock
    GetClock();
    setInterval(GetClock, 1000);

    TweenLite.set([shake, habits], {
        y: 300
    });
    TweenLite.set(weatherdetail, {
        y: 300
    });
    TweenLite.set([mon, tues, wed, thurs, fri], {
        y: 300
    });
    TweenLite.set(volume, {
        y: 20
    });
    TweenLite.set(clock, {
        autoAlpha: 0
    });
    TweenLite.set([weather, alarm, music], {
        y: -315
    });

    //failed attempt at turn on/off function instead of state
    /*watchTapOn = function(e){
    	TweenLite.to(clock, .4, {
            	autoAlpha: 1, 
            	ease: "easeOutQuart"
        	});
    	TweenLite.to(clock, .8, {
           	autoAlpha: 0, 
           	ease: "easeOutQuart",
           	delay:.7
   		});	
    }
    front.on('tap', watchTapOn);

    watchTurnOn = function(e){
    	if (e.angle > 245 && e.angle < 305) {
        	TweenLite.set([weather,alarm,music], {y:-315});
            tl.staggerTo([weather,alarm,music], .3, {y: 0});
        }else if(e.angle > 70 && e.angle < 120) {
        	TweenLite.set([weather,alarm,music], {y:315});
            tl.staggerTo([weather,alarm,music], .3, {y: 0});
        }else{
        }

        front.on('swipestart', function(e){console.log("this is working");});
    }
    front.on('swipestart',watchTurnOn);
    watchTurnOff = function(e){
    	if (e.angle > 245 && e.angle < 305) {
    		tweenLite.set([weather,alarm,music], {y:0});
	        tl.staggerTo([weather,alarm,music], .3, {y: 315});
        }else if(e.angle > 70 && e.angle < 120) {
        	TweenLite.set([weather,alarm,music], {y:0});
            tl.staggerTo([weather,alarm,music], .3, {y: -315});
        }
    }*/


    //what is this??
    //$(document).on('pointermove', function(event) {
    //      event.preventDefault();
    //});

    //clock on
    front.on('tap', function (e) {
    	if (state<0) {
        	TweenLite.to(clock, .4, {
            	autoAlpha: 1, 
            	ease: "easeOutQuart"
        	});
        	TweenLite.to(clock, .8, {
           		autoAlpha: 0, 
           		ease: "easeOutQuart",
           		delay:.7
   			});
        } else {
        	TweenLite.set(clock, {autoAlpha:0});
        }        
    });


    //swipe up or down to reveal icons
    // pulls down
    front.on('swipestart', function (e) {
    	e.stopPropagation();
    	running = 1;
        if (e.angle > 245 && e.angle < 305) {
        	if (state < 0) {
        		TweenLite.set([weather,alarm,music], {y:-315});
            	tl.staggerTo(weather.add(alarm).add(music), .3, {y: 0});
            	state = 0;
        	} else if(state == 0){
        		TweenLite.set([weather,alarm,music], {y:0});
	            tl.staggerTo(weather.add(alarm).add(music), .3, {y: 315});
	            state = -1;
	        } 
	    } else if (e.angle > 70 && e.angle < 120) {
        	if (state < 0) {
            	TweenLite.set([weather,alarm,music], {y:315});
            	tl.staggerTo(weather.add(alarm).add(music), .3, {y: 0});
            	state = 0;
            	//swipe up for Taylor in music
        	} else if(state == 3){
        		TweenLite.to(shake, .4, {y:0,ease: "easeOutQuart", autoAlpha:1});	
        	}else if(state == 0){
        		TweenLite.set([weather,alarm,music], {y:0});
            	tl.staggerTo(weather.add(alarm).add(music), .3, {y: -315});
            	state = -1;
        	}
        }
    });


    //click weather icon
    weather.on('click', function (e) {

    	if (state == 0) {
    		//weather goes up
    		TweenLite.to(weather, .2, {y:-60,ease: "easeOutQuart"});
    		//other stuff goes down		
   			TweenLite.to([alarm,music], .2, {y:210,ease: "easeOutQuart"});		
   			//detail comes up
   			TweenLite.to(weatherdetail, .25, {y:0,ease: "easeOutQuart", autoAlpha:1});
   			state = 1;
   		} else if(state == 1) {
   			TweenLite.to(weather, .15, {y:0,ease:"easeOutQuart"});	
   			TweenLite.set(weatherdetail, {y:300, ease:"easeOutQuart"});	
   			TweenLite.to([alarm,music], .2, {y:0,ease: "easeOutQuart"});
   			TweenLite.set(weatherdetail, {autoAlpha: 0});
			state = 0;
   		}

   	});

	//click weather icon
    alarm.on('click', function (e) {

    	if (state == 0) {
    		//alarm goes up
    		TweenLite.to(alarm, .2, {y:-165,ease: "easeOutQuart"});
    		//music goes down		
   			TweenLite.to(music, .2, {y:100,ease: "easeOutQuart"});	
   			//weather goes up
   			TweenLite.to(weather, .2, {y:-100,ease: "easeOutQuart", autoAlpha:1});	
   			//detail up
   			TweenLite.to(mon, .2, {y:0,delay:0.09,ease: "easeOutQuart", autoAlpha:1});
   			TweenLite.to(tues, .2, {y:0, delay:0.1,ease: "easeOutQuart", autoAlpha:1});
   			TweenLite.to(wed, .2, {y:0,delay:0.11, ease: "easeOutQuart", autoAlpha:1});
   			TweenLite.to(thurs, .2, {y:0,delay:0.12, ease: "easeOutQuart", autoAlpha:1});
   			TweenLite.to(fri, .2, {y:0,delay:0.13, ease: "easeOutQuart", autoAlpha:1});
   			state = 2;
   		} else if(state == 2) {
   			TweenLite.to(alarm, .2, {y:0,ease:"easeOutQuart"});		
   			TweenLite.to(music, .2, {y:0,ease: "easeOutQuart"});
   			TweenLite.to(weather, .2, {y:0, ease: "easeOutQuart"});
   			TweenLite.set([mon,tues,wed,thurs,fri], {y:300, ease:"easeOutQuart"});
			TweenLite.to([mon,tues,wed,thurs,fri], .2, {autoAlpha:0});   
			state = 0;
   		}

   	});
        music.on('click', function (e) {

    	if (state == 0) {
    		//alarm goes up
    		TweenLite.to(alarm, .2, {y:-200,ease: "easeOutQuart"});
    		//music goes down		
   			TweenLite.to(music, .2, {y:-275,ease: "easeOutQuart"});	
   			//weather goes up
   			TweenLite.to(weather, .2, {y:-100,ease: "easeOutQuart", autoAlpha:1});	
   			//detail up
   			TweenLite.to(habits, .4, {y:0,ease: "easeOutQuart", autoAlpha:1});	
   			TweenLite.to(volume, .2, {y: 0, ease: "easeOutQuart", autoAlpha: 1});
   			state = 3;
   		} else if(state == 3) {
   			TweenLite.to(alarm, .2, {y:0,ease:"easeOutQuart"});		
   			TweenLite.to(music, .2, {y:0,ease: "easeOutQuart"});
   			TweenLite.to(weather, .2, {y:0, ease: "easeOutQuart"});
   			//TweenLite.fromTo(weather, .1, {top: -30}, {top:0})
   			//	.set(weather, {autoAlpha:1, ease: "easeOutQuart"});
			TweenLite.to([habits, shake, volume], .2, {autoAlpha:0});   
			state = 0;
   		}

   	});
});







