var checkExists = setInterval(function() {
    try {
        if (typeof TD.services.TwitterClient.prototype.makeTwitterCall !== 'undefined' && typeof twttr.txt !== 'undefined') {
            // Next two lines by @Zemnmez https://twitter.com/Zemnmez/status/912876877391335424
            TD.services.TwitterClient.prototype.makeTwitterCall = function(b, e, f, g, c, d, h) { c = c || function() {}; d = d || function() {}; e = e || function() {}; b = this.request(b, { method: f, params: Object.assign(e, { weighted_character_count: !0 }), processor: g, feedType: h }); return b.addCallbacks(function(a) { c(a.data) }, function(a) { d(a.req, "", a.msg, a.req.errors) }), b };
            twttrTxt = Object.assign({}, twttr.txt, { isInvalidTweet: function() { return !1 }, getTweetLength: function() { return twttr.txt.getTweetLength.apply(this, arguments) - 140 } });
            clearInterval(checkExists);
        }
    } catch (e) {}
}, 500);