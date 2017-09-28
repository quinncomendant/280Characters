var checkExists = setInterval(function() {
    try {
        if (typeof TD.services.TwitterClient.prototype.makeTwitterCall !== 'undefined' && typeof twttr.txt !== 'undefined') {
            // Next two blocks originally by @Zemnmez https://twitter.com/Zemnmez/status/912876877391335424
            TD.services.TwitterClient.prototype.makeTwitterCall = function(b, e, f, g, c, d, h) {
                c = c || function() {};
                d = d || function() {};
                e = e || function() {};
                b = this.request(b, {
                    method: f,
                    params: Object.assign(e, {
                        weighted_character_count: !0
                    }),
                    processor: g,
                    feedType: h
                });
                return b.addCallbacks(function(a) {
                    c(a.data)
                }, function(a) {
                    d(a.req, "", a.msg, a.req.errors)
                }), b
            };
            twttrTxt = Object.assign({}, twttr.txt, {
                isInvalidTweet: function() {
                    return !1
                },
                getTweetLength: function() {
                    var len = twttr.txt.getTweetLength.apply(this, arguments);
                    return len == 0 ? 0 : Math.max(len - 140, 1);
                }
            });
            clearInterval(checkExists);
        }
    } catch (e) {}
}, 500);