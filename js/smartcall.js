var SCCore = function(a, b, c, d) {
    var e = 0,
        f = setInterval(function() {
            "complete" === b.readyState && h.init("undefined" != typeof smartcall_code ? smartcall_code : null)
        }, 10),
        g = {
            static_domain: "smartcall.kz/",
            versions: {
                v1: {
                    stylesheets: ["/widgets/v1/widget_12_17.min.css"],
                    scripts: ["/widgets_socketio/v1/w.min.js", "/widgets_socketio/v1/socketio.js"]
                },
                v2: {
                    stylesheets: ["/widgets/v2/widget.css"],
                    scripts: ["/widgets_socketio/v2/widget.js", "/widgets_socketio/v1/socketio.js"]
                },
                v3: {
                    stylesheets: ["/widgets/v3/widget.css"],
                    scripts: ["/widgets/v3/widget.js"]
                }
            },
            chat: {
                stylesheets: ["/widgets/chat/widget.css"],
                scripts: ["/widgets/chat/widget.js"]
            },
            use_storage: 1,
            storage_cache_lifetime: 60
        },
        h = {
            smartcall_code: null,
            head: "undefined" != typeof b.head ? b.head : b.getElementsByTagName("head")[0],
            currentScript: d,
            version: null,
            option: g,
            db_params: null,
            db_chat_params: null,
            texts: null,
            cache: {
                css: [],
                js: []
            },
            setParams: function(a) {
                this.db_params = a
            },
            setChatParams: function(a) {
                this.db_chat_params = a
            },
            setTexts: function(a) {
                this.texts = a
            },
            init: function(a) {
                clearInterval(f);
                var b = this.helpers.parseUri(this.currentScript.src).query;
                "undefined" != typeof b.smartcall_code && (this.smartcall_code = b.smartcall_code, this.getParams())
            },
            getParams: function() {
                if (this.option.use_storage && h.storage.test()) {
                    h.user.setReferer();
                    var a = h.storage.get("db_params_update_time", "session");
                    a && (new Date).getTime() - a <= 1e3 * this.option.storage_cache_lifetime && (this.db_params = h.storage.get("db_params", "session") || null)
                }
                null === this.db_params, this.server.get(function() {
                    h.preConfig(h.db_params)
                })
            },
            preConfig: function(a) {
                "undefined" != typeof db_params && (1 === e || null === h.db_params) && (h.db_params = db_params), "undefined" != typeof h.db_params && (1 != e || null === h.version) && (h.version = h.db_params.version), 0 != h.version && h.texts.init(h.initWidget), "undefined" != typeof h.db_params && 0 != h.db_params.chat && h.loadChat()
            },
            loadChat: function() {
                this.server.getChat(function() {
                    var a = "//" + h.option.static_domain + g.chat.stylesheets;
                    h.loadFile("css", a, !1, h.loadChatJs())
                })
            },
            loadChatJs: function() {
                var a = "//" + h.option.static_domain + g.chat.scripts;
                h.loadFile("js", a, !1, h.startChat)
            },
            startChat: function() {
                SCChat.init()
            },
            initWidget: function() {
                h.helpers.log("Widget inited");
                for (var a = h, b = a.option.versions["v" + a.version], c = 0; c < b.stylesheets.length; c++) {
                    var d = "//" + a.option.static_domain + b.stylesheets[c];
                    a.loadFile("css", d, !1, a.loadJs())
                }
            },
            loadJs: function() {
                var a = h,
                    b = a.option.versions["v" + a.version],
                    d = ("https:" === c.protocol ? "https:" : "http:") + "//" + a.option.static_domain + b.scripts[0],
                    e = ("https:" === c.protocol ? "https:" : "http:") + "//" + a.option.static_domain + b.scripts[1]
                a.loadFile("js", d, !1, a.startWidget), a.option.use_storage && a.storage.test() && !a.helpers.isEmpty(a.db_params) ? (a.storage.save("db_params_update_time", (new Date).getTime(), "session"), a.storage.save("db_params", a.db_params, "session")) : console.warn("db_params не сохранены")
                a.loadFile("js", e, !1, a.startSocketIO);
            },
            startWidget: function() {
                SCObject.init()
            },
            startSocketIO: function() {
				return false;
				var socket = io('http://localhost:3000');
				socket.emit('callStatus', JSON.stringify({
                            type: "subscribe",
                            event: "callStatus",
                            id: "-c2hOtGBPKJk4OyplinT7w1539846229" 
                        }));
				
		        socket.on('callStatus', function(msg){
		        	console.log(msg);
		        });
		        return false;	
			},
            // loadFile: function(js/css, href, undefined shit, callback) {
            loadFile: function(a, c, d, e) {
                var f;
                "js" === a ? (f = b.createElement("script"), f.type = "text/javascript", f.src = c, f.async = !0, f.charset = "UTF-8", f.readyState ? f.onreadystatechange = function() {
                    ("loaded" === f.readyState || "complete" === f.readyState) && (f.onreadystatechange = null, e())
                } : f.onload = function() {
                    e()
                }) : (f = b.createElement("link"), f.type = "text/css", f.href = c, f.rel = "stylesheet"), this.head.appendChild(f)
            }
        };
    return h.storage = function(a) {
        return {
            db_prefix: "db_smc",
            storage: {
                local: a.localStorage,
                session: a.sessionStorage
            },
            test: function() {
                return "undefined" != typeof this.storage.local ? 1 : 0
            },
            get: function(a, b) {
                if (!this.test()) return !1;
                var b = "session" === b ? "session" : "local";
                try {
                    return JSON.parse(this.storage[b][this.db_prefix + "." + a])
                } catch (a) {
                    return !1
                }
            },
            save: function(b, c, d) {
                if (!this.test()) return !1;
                var d = "session" === d ? "session" : "local";
                try {
                    this.storage[d][this.db_prefix + "." + b] = a.JSON.stringify(c)
                } catch (a) {
                    return !1
                }
            }
        }
    }(a), h.cookies = function() {
        var a = function(a) {
                var b = new Date;
                return b.setDate(b.getDate() + a), b.toUTCString()
            },
            c = {
                expires: a(365),
                path: "/"
            };
        return {
            get: function(a) {
                var c, d, e, f = b.cookie.split(";");
                for (c = 0; c < f.length; c++)
                    if (d = f[c].substr(0, f[c].indexOf("=")), e = f[c].substr(f[c].indexOf("=") + 1), d = d.replace(/^\s+|\s+$/g, ""), d == a) return unescape(e)
            },
            set: function(a, d, e) {
                if ("number" != typeof e) b.cookie = a + "=" + d + "; expires=" + c.expires;
                else {
                    var f = new Date;
                    f.setTime(f.getTime() + 1e3 * e), b.cookie = a + "=" + d + "; expires=" + f.toGMTString()
                }
            },
            delete: function(a) {
                this.set(a, "", {
                    expires: -1
                })
            }
        }
    }(), h.helpers = {
        parseUri: function(a) {
            var c = b.createElement("a");
            return c.href = a, {
                protocol: c.protocol,
                hostname: c.hostname,
                port: c.port,
                path: c.hostname + c.pathname,
                pathname: c.pathname,
                search: c.search,
                query: this.parseQueryString(c.search.replace(/^\?/, "")),
                hash: c.hash,
                host: c.host
            }
        },
        parseQueryString: function(a) {
            var b = {};
            return a.split("&").forEach(function(a) {
                var c = a.split("=");
                0 !== c[0].length && c[1] && (b[c[0]] = c[1])
            }), b
        },
        rand: function(a) {
            for (var b = "", c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", d = 0; a > d; d++) b += c.charAt(Math.floor(Math.random() * c.length));
            return b
        },
        makeQueryString: function(a) {
            var b = [];
            for (var c in a) b.push(encodeURIComponent(c) + "=" + encodeURIComponent(a[c]));
            return b.join("&")
        },
        isNull: function(a) {
            return void 0 === a || null === a
        },
        isEmpty: function(a) {
            return this.isNull(a) || "undefined" != typeof a.length && 0 == a.length
        },
        log: function(a) {
            return 1 === e && console.log(a)
        },
        checkDebag: function() {
            return 1 === e
        }
    }, h.user = function(a) {
        return {
            name: a.cookies.get("smc_client_name") || null,
            client_phone: a.cookies.get("smc_client_phone") || null,
            client_email: a.cookies.get("smc_client_email") || null,
            domain: c.hostname.replace("www.", ""),
            url: c.href,
            referrer: a.storage.get("ref", "local") || b.referrer || "",
            entrance_page: a.storage.get("entrance_page", "local") || c.href || "",
            is_outer_ref: null,
            session_id: function() {
                return a.cookies.get("smc_sid") || a.cookies.set("smc_sid", a.helpers.rand(32)), a.cookies.get("smc_sid")
            }(),
            setReferer: function() {
                var c = /^(http(s)?:\/\/)?(www\.)?/;
                this.is_outer_ref = 0 !== this.referrer.replace(c, "").indexOf(this.domain), this.referrer = b.referrer, this.entrance_page = this.url, this.is_outer_ref && a.storage.save("ref", this.referrer, "local"), a.storage.save("entrance_page", this.entrance_page, "local")
            }
        }
    }(h), h.server = {
        get: function(a) {
            var b = {};
            b.smartcall_code = h.smartcall_code, b.session_id = h.user.session_id, b.url = h.user.url, h.user.entrance_page && (b.entrance_page = h.user.entrance_page), h.user.referrer && (b.referer = h.user.referrer);
            var d = ("https:" === c.protocol ? "https:" : "http:") + "//" + h.option.static_domain + "/_smartcall?" + h.helpers.makeQueryString(b);
            h.loadFile("js", d, !1, a)
        },
        getChat: function(a) {
            var b = {};
            b.chat = h.db_params.chat;
            var c = "https://" + h.option.static_domain + "/_smartchat?" + h.helpers.makeQueryString(b);
            h.loadFile("js", c, !1, a)
        },
        send: function(a, b) {
            var c = {},
                d = "";
            a && a.hasOwnProperty("controller") && ("_call" === a.controller && (d = "_call"), "_analytics" === a.controller && (d = "_analytics"), delete a.controller), c.smartcall_code = h.smartcall_code, c.session_id = h.user.session_id, c.url = h.user.url, h.user.referrer && (c.referer = h.user.referrer), h.user.entrance_page && (c.entrance_page = h.user.entrance_page);
            var e = [h.helpers.makeQueryString(c)];
            a && e.push(h.helpers.makeQueryString(a)), b && e.push(b);
            var f = "https://" + h.option.static_domain + "/" + d + "?" + e.join("&");
            h.loadFile("js", f, !1, function() {})
        }
    }, h.texts = {
        init: function(a) {
            h.lang.init(a)
        }
    }, h.lang = {
        avail_lang: [],
        langCode: null,
        defLangCode: "ru",
        languages: {},
        locales: {
            ru: "ru",
            kz: "kz"
        },
        init: function(a) {
            this.langCode = this.detectLanguage(h.db_params.language), "undefined" == typeof this.langCode && (this.langCode = this.defLangCode), this.loadLang(this.langCode, a)
        },
        detectLanguage: function(a) {
            if ("auto" === a) {
                var b = this.checkUrl("kz");
                if (0 != b) return b;
                var c = this.getLocale();
                if (!c) return;
                return this.locales[c.toLowerCase()]
            }
            return a
        },
        checkUrl: function(a) {
            var b = window.location.href.replace(/.*?:\/\//g, "");
            return b.indexOf("/" + a) > -1 && "undefined" != typeof this.locales[a] && this.locales[a]
        },
        getLocale: function() {
            var a;
            return window.navigator && (a = window.navigator.userLanguage || window.navigator.language), a
        },
        loadLang: function(a, b) {
            var d = {};
            d.smartcall_code = h.smartcall_code, d.lang = a;
            var e = ("https:" === c.protocol ? "https:" : "http:") + "//" + h.option.static_domain + "/_texts?" + h.helpers.makeQueryString(d);
            h.loadFile("js", e, !1, b)
        },
        addLang: function(a) {
            for (code in a) "undefined" != typeof code && "undefined" != typeof a[code] && "object" == typeof a[code] && (this.languages[this.langCode] = a[code])
        }
    }, h
}(window, window.document, window.location, function() {
    return window.document.currentScript || function() {
        var a = window.document.getElementsByTagName("script");
        return a[a.length - 1]
    }()
}());