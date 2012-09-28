(function($){

    $.pixelDiff = function(comps, blacklist) {

        //No soup for you! ...ignore production urls
        if (blacklist && blacklist.length) {
            var exit = false;
            $.each(blacklist, function() {
                if (document.URL.toLowerCase().indexOf(this.toString().toLowerCase()) >= 0) {
                    exit = true;
                }
            });

            if (exit) return;
        }

        //Load Composition Overlays
        var overlays = [];
        var selected = 0;

        $.each(comps, function(i, v) {
            var obj = null;
            var css = {};
            var defaults = {
                display: 'block',
                visibility: 'hidden',
                position: 'absolute',
                zIndex: '10000',
                left: '50%',
                top: '0px',
                width: 'auto',
                opacity: 0.6,
                filter: "alpha(opacity=60);",
                marginLeft: ""
            };

            if (typeof v == "string") {
                //array of image urls
                obj = $('<img id="pixel_diff_img_' + (i+1) + '" src="' + v.toString() + '" />');
                css = defaults;
            }
            else if (v instanceof $) {
                obj = v;
            }
            else if (typeof v == "object") {
                obj = $('<img id="pixel_diff_img_' + (i+1) + '"  src="' + (v.src || v.href || v.backgroundImage) + '" />');
                for (var x in defaults) {
                    if (defaults.hasOwnProperty(x)) {
                        css[x] = v[x] || defaults[x];
                    }
                }
            }

            if (!css.marginLeft) {
                css.marginLeft = -1 * (parseInt(obj.width(), 10) / 2);
            }

            obj.css(css);
            overlays.push(obj);
        });


        if (overlays.length > 0) {
            //Bind Key Handlers if we have some overlays to... overlay
            $(document).keydown(function(e) {

                //only recognize shift + ctrl + key combinations
                if (e.shiftKey && e.ctrlKey) {
                    var r = overlays[selected];
                    var esc = false;
                    if (r.css("visibility") == "visible") {
                        //only process keyboard commands if an overlay is being displayed
                        switch(e.keyCode) {
                            case 37: r.css("marginLeft", parseInt(r.css("marginLeft"), 10) - 1); break; //left arrow
                            case 38: r.css("marginTop", parseInt(r.css("marginTop"), 10) - 1); break; //up arrow
                            case 39: r.css("marginLeft", parseInt(r.css("marginLeft"), 10) + 1); break; //right arrow
                            case 40: r.css("marginTop", parseInt(r.css("marginTop"), 10) + 1); break; //down arrow
                            case 66: r.css("zIndex", -10000); break; //(b)ack of z index
                            case 70: r.css("zIndex", 10000); break; //(f)ront of z index
                            case 72: r.css("visibility", "hidden"); esc=true; break; //(h)ide
                            case 83: r.css("visibility", "visible"); esc=true; break; //(s)how
                            case 187: r.css("opacity", Math.min(parseFloat(r.css("opacity")) + 0.05, 100)); esc=true; break; //plus symbol
                            case 189: r.css("opacity", Math.max(parseFloat(r.css("opacity")) - 0.05, 0)); esc=true; break; //minus symbol
                            default: break;
                        }
                    }

                    if (e.keyCode >= 49 && e.keyCode <= 57) {
                        //Also allow overlay switching via numbers 1 - 9
                        if (overlays[e.keyCode - 49]) {
                            selected = e.keyCode - 49;
                            for (var i=0; i<overlays.length; i++) {
                                overlays[i].css("visibility", "hidden");
                            }
                            overlays[selected].css("visibility", "visible");

                            //add the image to the dom if it doesn't already exist
                            if ($('#' + overlays[selected].attr('id')).length == 0) {
                                overlays[selected].appendTo('body');
                                //BUGFIX: this incorrectly overrides any default marginLeft setting applied during onload
                                //        but it solves the more pressing issue of alignment in FF & lazy loading resources
                                overlays[selected].css("marginLeft", -1 * parseInt(overlays[selected].width(), 10) / 2 + "px");
                            }
                        }
                        esc=true;
                    }
                    else {
                        //TODO: shouldn't be necessary, verify
                        overlays[selected] = r;
                    }

                    if (esc) {
                        e.preventDefault();
                    }
                }
            });
        }
    };

})(jQuery);
