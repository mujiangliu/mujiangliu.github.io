function FullPage(k) {
	function A(a, g, f, c) {
		this.cx = 3 * a;
		this.bx = 3 * (f - a) - this.cx;
		this.ax = 1 - this.cx - this.bx;
		this.cy = 3 * g;
		this.by = 3 * (c - g) - this.cy;
		this.ay = 1 - this.cy - this.by
	}
	var B = document.getElementById(k.id),
	e = B.children,
	H = e.length,
	V = H,
	C = k.slideTime || 800,
	w = k.effect || {},
	b = 0,
	y,D,h,m,s,E,O,P,Q,F = [],
	R = [],
	S,u,T = null,
	t = !1,
	I = !1,
	W,l,z,G,v,X,Y,q,x,L,U;
	if (e && 1 !== H) {
		k.mode && (I = -1 !== k.mode.indexOf("nav:"), R = k.mode.split(","), S = R.length);
		for (l = 0; l < H; l++) F.push(e[l].style);
		y = !!window.addEventListener;
		D = "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch; (function() {
			var a = navigator.userAgent,
			g = a.indexOf("Android"),
			f;
			z = -1 !== a.indexOf("QQBrowser") ? 200 : 0; - 1 !== g && (f = a.substring(g + 7, g + 11).replace(" ", ""));
			return f || 0
		})();
		h = function(a) {
			switch (!0) {
			case "" === a.webkitTransition: return "webkit";
			case "" === a.MozTransition: return "Moz";
			case "" === a.msTransition: return "ms";
			case "" === a.OTransition: return "O";
			default:
				return ""
			}
		} (document.createElement("Chriswang").style);
		A.prototype = {
			epsilon: 1E-5,
			sampleCurveX: function(a) {
				return ((this.ax * a + this.bx) * a + this.cx) * a
			},
			sampleCurveY: function(a) {
				return ((this.ay * a + this.by) * a + this.cy) * a
			},
			sampleCurveDerivativeX: function(a) {
				return (3 * this.ax * a + 2 * this.bx) * a + this.cx
			},
			solveCurveX: function(a, g) {
				var f, c, d, b;
				d = a;
				for (c = 0; 8 > c; c++) {
					b = this.sampleCurveX(d) - a;
					if (Math.abs(b) < g) return d;
					f = this.sampleCurveDerivativeX(d);
					if (Math.abs(f) < g) break;
					d -= b / f
				}
				f = 0;
				c = 1;
				d = a;
				if (d < f) return f;
				if (d > c) return c;
				for (; f < c;) {
					b = this.sampleCurveX(d);
					if (Math.abs(b - a) < g) break;
					a > b ? f = d: c = d;
					d = .5 * (c - f) + f
				}
				return d
			},
			solve: function(a, g) {
				return this.sampleCurveY(this.solveCurveX(a, g))
			}
		};
		G = function() {
			m = document.documentElement.clientWidth || window.innerWidth;
			s = document.documentElement.clientHeight || window.innerHeight;
			B.style.height = s + "px"
		};
		l = function(a, g, f, b) {
			E = a;
			O = g;
			P = f;
			Q = b
		};
		if ("string" === typeof k.easing) switch (k.easing) {
		case "ease":
			l(.25, .1, .25, 1);
			break;
		case "linear":
			l(0, 0, 1, 1);
			break;
		case "ease-in":
			l(.42, 0, 1, 1);
			break;
		case "ease-out":
			l(0, 0, .58, 1);
			break;
		case "ease-in-out":
			l(.42, 0, .58, 1)
		} else l(k.easing[0], k.easing[1], k.easing[2], k.easing[3]);
		if ("" !== h) {
			for (; V--;) F[V][h + "TransitionTimingFunction"] = "cubic-bezier(" + E + "," + O + "," + P + "," + Q + ")";
			v = function(a, g, f, b, d) {
				a = a.style;
				g = "translate(" + g + "px," + f + "px) translateZ(0)";
				d.scale && (g += 0 === b ? " scale(" + d.scale[0] + ")": " scale(" + d.scale[1] + ")");
				d.rotate && (g += 0 === b ? " rotate(" + d.rotate[0] + "deg)": " rotate(" + d.rotate[1] + "deg)");
				a[h + "TransformOrigin"] = "50% 50%";
				a[h + "Transform"] = g
			}
		} else W = new A(E, O, P, Q),
		v = function(a, g, b, c) {
			var d = a.currentStyle,
			e = a.style,
			h = parseInt(e.left || d.left, 10),
			k = parseInt(e.top || d.top, 10),
			q = g - h,
			l = b - k,
			s = +new Date + c,
			m = 0,
			r = w.opacity,
			t;
			clearInterval(T);
			T = setInterval(function() {
				var a; + new Date > s ? (a = r ? "left:" + g + "px;top:" + b + "px;filter:alpha(opacity=" + 100 * r[1] + ");": "left:" + g + "px;top:" + b + "px;", clearInterval(T)) : (t = s - new Date, m = t / c, m = W.solve(1 - m, A.prototype.epsilon), a = "left:" + (h + q * m) + "px;top:" + (k + l * m) + "px;", r && (a += "filter:alpha(opacity=" + 100 * (r[1] * m - r[0] * (1 - m)) + ");"));
				e.cssText = a
			},
			13)
		};
		X = {
			transform: function(a, g, b) {
				var c = 0,
				d = "" !== h || "none" !== a.translate && a.translate ? z: -50;
				switch (a.translate) {
				case "Y":
					c = b > g ? s: -s;
					v(e[b], 0, c, 0, a);
					break;
				case "X":
					c = b > g ? m: -m;
					v(e[b], c, 0, 0, a);
					break;
				case "XY":
					c = {
						X: b > g ? m: -m,
						Y: b > g ? s: -s
					};
					v(e[b], c.X, c.Y, 0, a);
					break;
				default:
					v(e[b], 0, 0, 0, a)
				}
				setTimeout(function() {
					v(e[b], 0, 0, C, a)
				},
				d + 50)
			},
			opacity: function(a, b, f) {
				var c = e[f].style;
				c.opacity = a[0];
				setTimeout(function() {
					c.opacity = a[1]
				},
				70)
			}
		};
		Y = y && D ? navigator.userAgent.indexOf("Firefox") ?
		function(a, b) {
			a.addEventListener("click", b, !1)
		}: function(a, b, f) {
			a.addEventListener("touchstart", b, !1);
			f && a.addEventListener("touchmove",
			function(a) {
				a.preventDefault()
			},
			!1)
		}: function(a, b) {
			a.onclick = b
		};
		q = function(a, b, f) {
			var c = a.className,
			d = [];
			if ( - 1 !== c.indexOf(b)) {
				d = c.split(" ");
				for (c = d.length; c--;) d[c] === b && (" " === f || "" === f ? d.splice(c, 1) : d[c] = f);
				d.length ? a.className = d.join(" ") : (a.removeAttribute("class"), a.removeAttribute("className"))
			}
		};
		I && (L = function(a, b) {
			var f = u[b].className;
			q(u[a], "active", " ");
			u[b].className = "" === f ? "active": f + " active"
		});
		x = function(a) {
			var g = z,
			f, c;
			if (! (t || a === b || a >= H || 0 > a)) {
				t = !0;
				for (c in w) X[c](w[c], b, a);
				g += "" === h ? 20 : 0;
				f = b;
				b = a;
				I && L(f, b);
				setTimeout(function() {
					e[a].className += " slide"
				},
				g);
				setTimeout(function() {
					F[a][h + "TransitionDuration"] = C + "ms"
				},
				20);
				setTimeout(function() {
					q(e[f], "current", "");
					q(e[b], "slide", "current");
					k.callback && k.callback(b, e[b]);
					t = !1
				},
				C + z + 120)
			}
		};
		G();
		l = e[b].className;
		e[b].className = -1 !== l.indexOf("current") ? l: l + " current";
		for (y ? window.addEventListener("resize", G, !1) : window.onresize = G; S--;)(function(a) {
			switch (!0) {
			case "wheel" === a: U = function(a) {
					a = a || window.event;
					a.preventDefault ? a.preventDefault() : a.returnValue = !1;
					t || (a = -a.wheelDelta || a.detail, x(b + (0 > a ? -1 : 1)))
				};
				y && document.addEventListener("DOMMouseScroll", U, !1);
				window.onmousewheel = document.onmousewheel = U;
				break;
			case "touch" === a: if (!D || !y) break; (function() {
					var a = w.transform.scale[0],
					f = w.transform.scale[1] - a,
					c = w.transform.rotate[0],
					d = w.transform.rotate[1] - c,
					l = w.opacity[0],
					u = w.opacity[1] - l,
					v,
					x,
					y,
					z,
					G,
					r = {},
					A = !1,
					n,
					p,
					D,
					M,
					N,
					E,
					J;
					"Y" === w.transform.translate ? (D = function() {
						n = F[b - 1];
						p = F[b + 1];
						n && (n[h + "TransitionDuration"] = "0ms", n[h + "Transform"] = "translate(0,-" + s + "px) translateZ(0)", n[h + "TransformOrigin"] = "50% 100%", e[b - 1].className += " swipe");
						p && (p[h + "TransitionDuration"] = "0ms", p[h + "Transform"] = "translate(0," + s + "px) translateZ(0)", p[h + "TransformOrigin"] = "50% 0%", e[b + 1].className += " swipe")
					},
					E = function(b) {
						var e = Math.abs(b.y / s),
						K = " scale(" + (a + f * e) + ") rotate(" + (c + d * e) + "deg)";
						n && 0 < b.y && (n.opacity = l + u * e, n[h + "Transform"] = "translate(0," + (b.y - s) + "px) translateZ(0)" + K);
						p && 0 > b.y && (p.opacity = l + u * e, p[h + "Transform"] = "translate(0," + (s + b.y) + "px) translateZ(0)" + K)
					},
					M = function(a, d) {
						var c = C >> 1;
						q(e[b + d], "swipe", "slide");
						a.opacity = 1;
						a[h + "TransitionDuration"] = c + "ms";
						a[h + "Transform"] = "translate(0," + d * s + "px) translateZ(0)";
						setTimeout(function() {
							q(e[b + d], "slide", "");
							setTimeout(function() {
								t = !1
							},
							50)
						},
						c)
					},
					N = function(a, d) {
						var c = b + d,
						f = ~~ (C / 1.5),
						g = e[b - d];
						g && q(g, "swipe", "");
						0 > c || c > H - 1 ? setTimeout(function() {
							t = !1
						},
						50) : (I && L(b, c), a.opacity = 1, q(e[c], "swipe", "slide"), a[h + "TransitionDuration"] = f + "ms", a[h + "Transform"] = "translate(0,0) translateZ(0)", setTimeout(function() {
							q(e[b], "current", "");
							q(e[c], "slide", "current");
							b = c;
							k.callback && k.callback(b, e[b]);
							setTimeout(function() {
								t = !1
							},
							50)
						},
						f))
					}) : (D = function() {
						n = F[b - 1];
						p = F[b + 1];
						n && (n[h + "TransitionDuration"] = "0ms", n[h + "Transform"] = "translate(-" + m + "px,0) translateZ(0)", n[h + "TransformOrigin"] = "100% 50%", e[b - 1].className += " swipe");
						p && (p[h + "TransitionDuration"] = "0ms", p[h + "Transform"] = "translate(" + m + "px,0) translateZ(0)", p[h + "TransformOrigin"] = "0 50%", e[b + 1].className += " swipe")
					},
					E = function(b) {
						var e = Math.abs(b.x / m),
						K = " scale(" + (a + f * e) + ") rotate(" + (c + d * e) + "deg)";
						n && 0 < b.x && (console.log(), n.opacity = l + u * e, n[h + "Transform"] = "translate(" + (b.x - m) + "px,0) translateZ(0)" + K);
						p && 0 > b.x && (p.opacity = l + u * e, p[h + "Transform"] = "translate(" + (m + b.x) + "px,0) translateZ(0)" + K)
					},
					M = function(a, c) {
						var d = C >> 1;
						q(e[b + c], "swipe", "slide");
						a.opacity = 1;
						a[h + "TransitionDuration"] = d + "ms";
						a[h + "Transform"] = "translate(" + c * m + "px,0) translateZ(0)";
						setTimeout(function() {
							q(e[b + c], "slide", "");
							setTimeout(function() {
								t = !1
							},
							50)
						},
						d)
					},
					N = function(a, c) {
						var d = b + c,
						f = ~~ (C / 1.5),
						g = e[b - c];
						g && q(g, "swipe", "");
						0 > d || d > H - 1 ? setTimeout(function() {
							t = !1
						},
						50) : (I && L(b, d), q(e[d], "swipe", "slide"), a.opacity = 1, a[h + "TransitionDuration"] = f + "ms", a[h + "Transform"] = "translate(0,0) translateZ(0)", setTimeout(function() {
							q(e[b], "current", "");
							q(e[d], "slide", "current");
							b = d;
							k.callback && k.callback(b, e[b]);
							setTimeout(function() {
								t = !1
							},
							50)
						},
						f))
					});
					v = function(a) {
						var b = a.touches[0];
						a.preventDefault();
						1 < event.touches.length || event.scale && 1 !== event.scale || (r = {
							x: b.pageX - y,
							y: b.pageY - z
						},
						A ? J && E(r) : (J = Math.abs(r.x) > Math.abs(r.y) ? "X": "Y", J = J === k.effect.transform.translate ? !0 : !1, A = !0))
					};
					x = function(a) {
						var b = a.changedTouches[0];
						a = +new Date - G;
						var d;
						d = 0;
						var c = !1;
						r = {
							x: b.pageX - y,
							y: b.pageY - z
						};
						b = Math.abs(r.x);
						d = Math.abs(r.y);
						switch (k.effect.transform.translate) {
						case "Y":
							c = 250 > +a && 30 < d || d > .3 * s;
							d = 0 < r.y ? -1 : 1;
							break;
						case "X":
							c = 250 > +a && 30 < b || b > .3 * m;
							d = 0 < r.x ? -1 : 1;
							break;
						default:
							c = 350 > +a && 50 < d + b || d > .3 * s || b > .3 * m,
							d = b > d ? 0 < r.x ? -1 : 1 : 0 < r.y ? -1 : 1
						}
						c && J ? -1 === d ? N(n, -1) : N(p, 1) : (n && M(n, -1), p && M(p, 1));
						B.removeEventListener("touchmove", v, !1);
						B.removeEventListener("touchend", x, !1)
					};
					B.addEventListener("touchstart",
					function(a) {
						a = a.touches[0];
						t || (t = !0, y = a.pageX, z = a.pageY, G = +new Date, r = {},
						A = !1, D(), B.addEventListener("touchmove", v, !1), B.addEventListener("touchend", x, !1))
					},
					!1)
				})();
				break;
			case - 1 !== a.indexOf("nav:") : (function() {
					var e = a.split(":")[1],
					e = document.getElementById(e),
					f,
					c;
					u = e.children;
					f = u.length;
					c = u[b].className;
					if (e && u) {
						for (; f--;) u[f].setAttribute("data-page", f); - 1 === c.indexOf("active") && (u[b].className = "" === c ? "active": c + " active");
						f = function(a) {
							var b;
							a = a || window.event;
							a = a.target || a.srcElement;
							for (b = a.tagName.toLowerCase();
							"li" !== b;) {
								if ("ul" === b) return;
								a = a.parentNode;
								b = a.tagName.toLowerCase()
							}
							x( + a.getAttribute("data-page"))
						};
						Y(e, f, 1)
					}
				})()
			}
		})(R[S]);
		return {
			thisPage: function() {
				return b
			},
			go: function(a) {
				x(a)
			},
			next: function() {
				x(b + 1)
			},
			prev: function() {
				x(b - 1)
			}
		}
	}
};