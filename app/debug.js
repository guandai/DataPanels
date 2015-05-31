function welcome() {
	function e(e) {
		e.lettering();
		this.done = false;
		this.cycleCount = 10;
		this.cycleCurrent = 2;
		this.chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()-_=+{}|[]\\;':\"<>?,./`~".split("");
		this.charsCount = this.chars.length;
		this.original = e.html();
		this.letters = $(t(e.find("span")));
		this.letterCount = this.letters.length;
		this.letterCurrent = 0;
		this.letters.each(function() {
			var e = $(this);
			e.attr("data-orig", e.text());
			e.text("-")
		});
	}

	function t(e) {
		var t = e.length,
			n, r;
		while (t) {
			r = Math.floor(Math.random() * t--);
			n = e[t];
			e[t] = e[r];
			e[r] = n
		}
		return e
	}
	$intro.addClass("ready");
	setTimeout(function() {
		$intro.remove();
		var e = "The matrix has you...";
		$.each(e.split(""), function(e, t) {
			setTimeout(function() {
				$outro.html($outro.html() + t)
			}, 100 * e)
		})
	}, 3e3);
	e.prototype.getChar = function() {
		return this.chars[Math.floor(Math.random() * this.charsCount)]
	};
	e.prototype.reset = function() {
		this.done = false;
		this.cycleCurrent = 0;
		this.letterCurrent = 0;
		this.letters.each(function() {
			var e = $(this);
			e.text(e.attr("data-orig"));
			e.removeClass("done")
		});
		this.loop()
	};
	e.prototype.loop = function() {
		var e = this;
		this.letters.each(function(t, n) {
			var r = $(n);
			if (t >= e.letterCurrent) {
				if (r.text() !== " ") {
					r.text(e.getChar());
					r.css("opacity", Math.random())
				}
			}
		});
		if (this.cycleCurrent < this.cycleCount) {
			this.cycleCurrent++
		} else if (this.letterCurrent < this.letterCount && !this.letterCurrent.done) {
			var t = this.letters.eq(this.letterCurrent);
			this.cycleCurrent = 0;
			t.text(t.attr("data-orig")).removeAttr("style").addClass("done");
			this.letterCurrent++
		} else {
			this.done = true
		} if (!this.done) {
			requestAnimationFrame(function() {
				e.loop()
			})
		}
	};
	$words = $(".word");
	$words.each(function() {
		var t = $(this),
			n = (new e(t)).reset();
		t.data("ticker", n)
	})
}

function encryption() {
	$intro.remove();
	$outro.remove();
	$(".blink").remove();
	$init.addClass("ready");
	var e = "iVBORw0KGgoAAAANSUhEUgAAAlgAAAEsCAMAAAAo4z2kAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozNjcxQURBOTFENDcxMUU0Qjk1MTgwNjM1MTlEQTg0RSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozNjcxQURBQTFENDcxMUU0Qjk1MTgwNjM1MTlEQTg0RSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjM2NzFBREE3MUQ0NzExRTRCOTUxODA2MzUxOURBODRFIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjM2NzFBREE4MUQ0NzExRTRCOTUxODA2MzUxOURBODRFIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+jDl11QAAAD9QTFRFTU1N////6+vr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";
	$.each(e.split(""), function(e, t) {
		setTimeout(function() {
			$init.html($init.html() + t)
		}, .3 * e)
	});
	console.log("%cThere is no spoon...", "color: green; text-shadow: 0 0 10px rgba(50, 255, 50, 0.5), 0 0 5px rgba(100, 255, 100, 0.5); font-size: x-large")
}
var $intro = $(".intro"),
	$outro = $(".outro"),
	$init = $(".init");
(function() {
	function e() {
		function f(e, t) {
			return Math.floor(Math.random() * (t - e + 1) + e)
		}
		var e = "of";
		$init.remove();
		$(".rabbit-hole").remove();
		for (var t = 1; t <= 300; t++) {
			$("body").append('<div class="rabbit-hole"></div>')
		}
		$("body").append('<div class="deep rabbit-hole"></div>');
		setTimeout(function() {
			$(".rabbit-hole").addClass("uncovered")
		}, 5e3);
		$("body").append('<h1 class="notification">The rabbit is hiding, find it and I\'ll show you how <strong>deep</strong> the rabbit-hole goes.</h1>');
		$("h1.notification").fadeIn(2500);
		setTimeout(function() {
			$("h1.notification").fadeOut()
		}, 5e3);
		var n = $(".rabbit-hole"),
			r = "rabbit-hole",
			i = n.height(),
			s = n.width(),
			o = $(window).width() - s,
			u = $(window).height() - i,
			a = "bottom-" + e + "-" + r + ".html";
		n.each(function() {
			$(this).css({
				marginTop: f(0, u),
				marginLeft: f(0, o)
			});
			$(this).on("click", function() {
				if ($(this).hasClass("deep")) {
					$(".rabbit-hole").remove();
					$("body").append('<div class="deep-hole"><h3>You found a glitch in the matrix!</h3><p>Quickly use the <a href="' + a + '" target="_blank">glitch<a/> and see where it takes you.</div>');
					setTimeout(function() {
						$(".deep-hole").addClass("uncovered")
					}, 100)
				} else {
					alert("the rabbit hole is empty, try again...")
				}
			})
		})
	}
	window.whiteRabbit = e
})();
$(function() {
	if (navigator.appName.indexOf("Internet Explorer") != -1) {
		var e = "";
		$intro.remove();
		$outro.remove();
		$("body").append('<p style="padding: 10px;">Greetings Matrix user. Obviously you are not Neo... he would never use Internet explorer. <br /><br /> Aborting code challenge... Free your mind.</p>');
		setTimeout(function() {
			window.location.replace("https://www.google.com/intl/en/chrome/browser/")
		}, 6e3)
	} else {
		welcome();
		var t = setTimeout(function() {
			encryption()
		}, 7e3)
	}
})