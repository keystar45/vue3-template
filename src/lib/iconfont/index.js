(window._iconfont_svg_string_3909114 =
  '<svg><symbol id="icon-yonghuming" viewBox="0 0 1024 1024"><path d="M444.48 563.264h135.04A316.48 316.48 0 0 1 896 879.744a63.36 63.36 0 0 1-63.36 63.296H191.36a63.36 63.36 0 0 1-63.36-63.296 316.48 316.48 0 0 1 316.48-316.48zM512 499.968c-123.712 0-224-99.2-224-221.568C288 156.16 388.288 56.96 512 56.96s224 99.2 224 221.504c0 122.368-100.288 221.568-224 221.568z"  ></path></symbol><symbol id="icon-mima" viewBox="0 0 1024 1024"><path d="M832 960H192c-35.328 0-64-26.688-64-59.776v-448c0-33.024 28.672-59.712 64-59.712h640c35.328 0 64 26.688 64 59.712v448c0 33.088-28.672 59.776-64 59.776M512 541.888c-52.992 0-96 40.128-96 89.6 0 33.088 19.392 61.696 48 77.184v85.312c0 25.728 21.504 46.72 48 46.72a47.36 47.36 0 0 0 48-46.72v-85.312c28.608-15.488 48-44.096 48-77.184 0-49.472-43.008-89.6-96-89.6M512 153.6c-105.984 0-192 80.192-192 179.2H224C224 184.32 352.896 64 512 64s288 120.32 288 268.8H704c0-99.008-86.016-179.2-192-179.2"  ></path></symbol></svg>'),
  (function (h) {
    var a = (a = document.getElementsByTagName("script"))[a.length - 1],
      l = a.getAttribute("data-injectcss"),
      a = a.getAttribute("data-disable-injectsvg");
    if (!a) {
      var i,
        o,
        c,
        v,
        z,
        m = function (a, l) {
          l.parentNode.insertBefore(a, l);
        };
      if (l && !h.__iconfont__svg__cssinject__) {
        h.__iconfont__svg__cssinject__ = !0;
        try {
          document.write(
            "<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>"
          );
        } catch (a) {
          console && console.log(a);
        }
      }
      (i = function () {
        var a,
          l = document.createElement("div");
        (l.innerHTML = h._iconfont_svg_string_3909114),
          (l = l.getElementsByTagName("svg")[0]) &&
            (l.setAttribute("aria-hidden", "true"),
            (l.style.position = "absolute"),
            (l.style.width = 0),
            (l.style.height = 0),
            (l.style.overflow = "hidden"),
            (l = l),
            (a = document.body).firstChild
              ? m(l, a.firstChild)
              : a.appendChild(l));
      }),
        document.addEventListener
          ? ~["complete", "loaded", "interactive"].indexOf(document.readyState)
            ? setTimeout(i, 0)
            : ((o = function () {
                document.removeEventListener("DOMContentLoaded", o, !1), i();
              }),
              document.addEventListener("DOMContentLoaded", o, !1))
          : document.attachEvent &&
            ((c = i),
            (v = h.document),
            (z = !1),
            p(),
            (v.onreadystatechange = function () {
              "complete" == v.readyState &&
                ((v.onreadystatechange = null), t());
            }));
    }
    function t() {
      z || ((z = !0), c());
    }
    function p() {
      try {
        v.documentElement.doScroll("left");
      } catch (a) {
        return void setTimeout(p, 50);
      }
      t();
    }
  })(window);
