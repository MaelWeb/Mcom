// dialog
;(function($) {
    var _dialogTpl = '<div class="modal-dialog">' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<button type="button" class="close" data-role="dismis"><span aria-hidden="true">×</span></button>' +
        '<h4><%=title%></h4>' +
        '</div>' +
        '<div class="modal-body">' +
        '<p><%= content %></p>' +
        '</div>' +
        '<div class="modal-footer">' +
        '<% for (var key in button) { %>' +
        '<% if (key == select) { %>' +
        '<button type="button" data-role="<%=key%>"  class="btn btn-default btn-primary"><%=button[key]%></button>' +
        '<% } else { %>' +
        '<button type="button" class="btn btn-default" data-role="<%=key%>"><%=button[key]%></button>' +
        '<% } %>' +
        '<% } %>' +
        '</div>' +
        '</div>' +
        '</div>';
    var defaults = {
            title: '',
            content: '',
            button: {
                action: '确认',
                dismis: '取消'
            },
            select: 'action',
            allowScroll: false,
            dismis: function() {},
            action: function() {}
        },
        dialog = [],
        removeDialog = function(obj) {
            for (var i = 0, _len = dialog.length; i < _len; i++) {
                if (dialog[i] == obj) {
                    dialog.splice(i, 1);
                }
            }
        },
        position = function(dom, index) {
            if (index > 1) {
                var pre = dialog[index - 2];
                dom.css({
                    top: pre.element.offset().top + 20,
                    left: pre.element.offset().left + 20
                });
            } else {
                var width = dom.outerWidth(),
                    height = dom.outerHeight(),
                    $window = $(window),
                    bodyWidth = $window.width(),
                    bodyHeight = $window.height(),
                    scrollTop = $window.scrollTop();
                dom.css({
                    top: (bodyHeight / 2 - height / 2) / 3 * 2 + scrollTop,
                    left: bodyWidth / 2 - width / 2
                });
            }

        };
    var Dialog = function(_tpl, option) {
        this.option = option && typeof(option) == 'object' ? $.extend(defaults, option) : defaults;
        if (typeof(option) == 'string') {
            this[option]();
            return;
        }
        this.index = dialog.push(this);
        //this.element = $(ejs.render(_tpl, this.option)).appendTo('body');
        this.element = $(tpl(_tpl, this.option)).appendTo('body');
        if (this.element.find('[data-role]').length) {
            this.button = this.element.find('[data-role]');
        }
        this._bindEvent();
        this.bindMove();
        this.toggle();
        position(this.element, this.index);
    };
    Dialog.prototype = {
        _bindEvent: function() {
            var self = this;
            self.button.on("click", function() {
                self.toggle();
                var role = $(this).attr('data-role');
                self.option[role]();
            });
            self.element.find(".close").click(function() {
                self.hide();
            });
        },
        toggle: function() {
            if (this.element.hasClass("in")) {
                this.hide();
            } else {
                this.show();
            }
        },
        show: function() {
            var self = this;
            self.element.addClass("in");
        },
        hide: function() {
            var self = this;
            self.element.removeClass("in").addClass('out');
            removeDialog(self);
            setTimeout(function() {
                self.element.remove();
            }, 500);
        },
        mousemove: function(x, y) {
            var self = this;
            $('body').on('mousemove.' + self.moveingTag, function(e) {
                if (self.moving) {
                    self.element.css({
                        top: e.pageY - y,
                        left: e.pageX - x
                    }).addClass('on');
                }
            });
        },
        offMousemove: function(x, y) {
            var self = this;
            $('body').off('mousemove.' + self.moveingTag);
            self.element.removeClass('on');
        },
        bindMove: function() {
            var self = this;
            self.moveingTag = 'alertMoving' + (new Date().getTime());
            self.element.mousedown(function(e) {
                self.moving = true;
                self.mousemove(e.pageX - self.element.offset().left, e.pageY - self.element.offset().top);
            }).mouseup(function() {
                self.offMousemove();
            });

        }
    };

    function Plugin(option) {
        var $this = this;
        if (typeof $this == "object" && $this.html()) {
            return new Dialog($this.html(), option);
        }
        return new Dialog(_dialogTpl, option);
    }
    $.fn.dialog = $.dialog = Plugin;
})(jQuery)
// loading
;(function($) {
    var _loadingTpl = '<div class="loading-layout J-plugin-loading hide"><div class="loading-bg"></div><div class="loading J-loading-text"><%= content %></div></div>';

    var defaults = {
        content: '加载中...'
    };
    // 构造函数
    var Loading = function(option) {
        var self = this;
        this.option = typeof(option) == 'object' ? $.extend(defaults, option) : defaults;
        if ($('.J-plugin-loading').length == 0) {
            //$(ejs.render(_loadingTpl, this.option)).appendTo('body');
            $(tpl(_loadingTpl, this.option)).appendTo('body');
        } else {
            $('.J-plugin-loading .J-loading-text').text(this.option.content);
        }

        this.element = $('.J-plugin-loading');
        if (typeof(option) == 'string') {
            this[option]();
            return;
        }
        this.show();
    };
    Loading.prototype = {
        show: function() {
            this.element.removeClass('hide');
        },
        hide: function() {
            this.element.addClass('hide');
        }
    };

    function Plugin(option) {
        return new Loading(option);
    }
    $.loading = Plugin;
})(jQuery);
// 模态框
;(function($) {
    // var testHtml = '<div class="modal modal-layout">' +
    //     '<div class="modal-dialog">' +
    //     '<div class="modal-content">' +
    //     '<div class="modal-header">' +
    //     '<button type="button" class="close"><span aria-hidden="true">&times;</span></button>' +
    //     '<h4 class="modal-title" id="myModalLabel">Modal title</h4>' +
    //     '</div>' +
    //     '<div class="modal-body">' +
    //     '<p>Overflowing text to show scroll behaviorCras mattis consectetur purus sit amet fermentum.Cras justo odio, dapibus ac facilisis in , egestas eget quam.Morbi leo risus, porta ac consectetur ac, vestibulum at eros.Praesent commodo cursus magna, vel scelerisque nisl consectetur et.Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.Aenean lacinia bibendum nulla sed consectetur.Praesent commodo cursus magna, vel scelerisque nisl consectetur et.Donec sed odio dui.Donec ullamcorper nulla non metus auctor fringilla.Cras mattis consectetur purus sit amet fermentum.Cras justo odio, dapibus ac facilisis in , egestas eget quam.Morbi leo risus, porta ac consectetur ac, vestibulum at eros.Praesent commodo cursus magna, vel scelerisque nisl consectetur et.Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.Aenean lacinia bibendum nulla sed consectetur.Praesent commodo cursus magna, vel scelerisque nisl consectetur et.Donec sed odio dui.Donec ullamcorper nulla non metus auctor fringilla.Cras mattis consectetur purus sit amet fermentum.Cras justo odio, dapibus ac facilisis in , egestas eget quam.Morbi leo risus, porta ac consectetur ac, vestibulum at eros.Praesent commodo cursus magna, vel scelerisque nisl consectetur et.Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.Aenean lacinia bibendum nulla sed consectetur.Praesent commodo cursus magna, vel scelerisque nisl consectetur et.Donec sed odio dui.Donec ullamcorper nulla non metus auctor fringilla.' +
    // '</p></div>' +
    // '<div class="modal-footer">' +
    // '<button type="button" class="btn btn-default J-canlce">Close</button>' +
    // '<button type="button" class="btn btn-primary">Save changes</button>' +
    // '</div>' +
    // '</div>' +
    // '</div>' +
    // '</div>';

    var Modal = function(tpl, callback) {
            this.template = tpl;
            this.data = null;
            this.callback = callback;
        },
        position = function(dom, index) {
            if (index > 1) {
                var pre = alerts[index - 2];
                dom.css({
                    top: pre.element.offset().top + 20,
                    left: pre.element.offset().left + 20
                });
            } else {
                var width = dom.outerWidth(),
                    height = dom.outerHeight(),
                    $window = $(window),
                    bodyWidth = $window.width(),
                    bodyHeight = $window.height(),
                    scrollTop = $window.scrollTop();
                dom.css({
                    top: (bodyHeight / 2 - height / 2) / 3,
                    left: bodyWidth / 2 - width / 2
                });
            }

        };
    Modal.prototype = {
        create: function() {
            var self = this;

            self.element = $(self.template).appendTo("body");
            self.$this = self.element;
            position(self.element.find(".modal-dialog"));
        },
        show: function(_data) {
            var self = this;

            self.create();
            self._bindEvent();

            if (_data) {
                self.data = _data;
            }
            self.element.show();
            setTimeout(function() {
                self.element.find(".modal-dialog").addClass("in");
            }, 100);
            //$("body").addClass("modal-open");

            if (self.callback && typeof self.callback == "function") {
                self.callback();
            }
        },
        hide: function() {
            var self = this;
            self.element.find(".modal-dialog").removeClass("in").addClass('out');
            setTimeout(function() {
                self.element.remove();
            }, 200);
            //$("body").removeClass("modal-open");
        },
        afterRender: function(fn) {
            var self = this;
            if (fn && typeof fn == "function") {
                fn(self);
            }
        },
        _bindEvent: function() {
            var self = this;
            self.element.find(".close").click(function() {
                self.hide();
            });
        }
    };
    $.fn.Wimodal = $.Wimodal = function(tpl, _callback) {
        var $this = this,
            argLength = arguments.length,
            template, callback;

        if (typeof $this == "object" && $this.html()) {
            template = $this.html();
        }

        if (argLength === 1 && typeof arguments[0] == "string") {
            template = arguments[0];
        } else if (argLength === 1 && typeof arguments[0] == "function") {
            callback = arguments[0];
        }

        if (tpl && _callback) {
            template = tpl;
            callback = _callback;
        }

        return new Modal(template, callback);
    };
    // demo
    // var modal = $.Wimodal(testHtml, function() {
    //     var self = this,
    //         $this = self.$this;
    //     $this.find(".J-canlce").click(function() {
    //         $.tips("确定关闭么？？？？");
    //     });
    // });
    // modal.show();
})(jQuery);
// tips
;(function($) {
    var _tipsTpl = '<div class="alert alert-<%=type%> alert-dismissible  A-plugin-tips tips-layout">' +
        '<button type="button" class="close"><span aria-hidden="true">×</span></button>' +
        '<%=content%>' +
        '</div>';

    var defaults = {
            content: '',
            stayTime: 3000,
            type: 'warning', // 提示类型，可选warning|danger
            callback: function() {}
        },
        position = function(dom, index) {
            if (index > 1) {
                var pre = alerts[index - 2];
                dom.css({
                    top: pre.element.offset().top + 20,
                    left: pre.element.offset().left + 20
                });
            } else {
                var width = dom.outerWidth(),
                    height = dom.outerHeight(),
                    $window = $(window),
                    bodyWidth = $window.width(),
                    bodyHeight = $window.height(),
                    scrollTop = $window.scrollTop();
                dom.css({
                    top: (bodyHeight / 2 - height / 2) / 3 * 2 + scrollTop,
                    left: bodyWidth / 2 - width / 2
                });
            }

        };
    // 构造函数
    var Tips = function(option) {
        var self = this;
        this.option = typeof(option) == 'object' ? $.extend(defaults, option) : defaults;
        if ($('.A-plugin-tips').length) {
            $('.A-plugin-tips').remove();
        }
        if (typeof option == "string") {
            this.option.content = option;
        }
        //$(ejs.render(_tipsTpl, this.option)).appendTo('body');
        $(tpl(_tipsTpl, this.option)).appendTo('body');
        this.element = $el = $('.A-plugin-tips');
        position($el);
        self.show();
        self.bindEvent();
    };
    Tips.prototype = {
        show: function() {
            var self = this;
            self.element.fadeIn(500);
            if (self.option.stayTime > 0) {
                setTimeout(function() {
                    self.hide();
                }, self.option.stayTime);
            }
        },
        hide: function() {
            var self = this;
            self.element.fadeOut(500);
            setTimeout(function() {
                self.element.remove();
            }, 500);
            this.option.callback();
        },
        bindEvent: function() {
            var self = this;
            self.element.find(".close").click(function() {
                self.hide();
            });
        }
    };

    function Plugin(option) {
        return new Tips(option);
    }
    $.tips = Plugin;
})(jQuery);
// back to top
;(function($) {
    'use strict'
    $.fn.backTop = function() {
        var $backBtn = $(this),
            b = document.body,
            d = document.documentElement;

        $backBtn.css("display", "none");
        window.onscroll = show;
        $backBtn.click(function() {
            $backBtn.css("display", "none");
            window.onscroll = null;
            var setInt = setInterval(function() {
                b.scrollTop -= Math.ceil((b.scrollTop + d.scrollTop) * 0.1);
                d.scrollTop -= Math.ceil((b.scrollTop + d.scrollTop) * 0.1);
                if ((b.scrollTop + d.scrollTop) == 0) {
                    clearInterval(setInt, window.onscroll = show);
                }
            }, 10);
        });

        function show() {
            var scroll = b.scrollTop + d.scrollTop;
            if ( scroll > 100) {
                $backBtn.fadeIn(1000);
            } else {
                $backBtn.css("display", "none");
            }
        }
    };
})(jQuery);
/*
 * 模板渲染，不能防备xss。
 * 如果有xss防备需求，请使用ejs等具备该功能的模板引擎
 */
'use strtic'
function tpl(str, data) {
    var fn = function(data) {
        var i, variable = [],
            value = [];
        for (i in data) {
            variable.push(i);
            value.push(data[i]);
        }
        return (new Function(variable, fn.code))
            .apply(data, value); // new Function返回渲染结果HTML
    };

    fn.code = fn.code || "var $parts=[]; $parts.push('" + str
        .replace(/\\/g, '\\\\')
        .replace(/[\r\t\n]/g, " ")
        .split("<%").join("\t")
        .replace(/(^|%>)[^\t]*/g, function(str) {
            return str.replace(/'/g, "\\'");
        }) // 将模板中文本部分的单引号替换为\'
        .replace(/\t=(.*?)%>/g, "',$1,'") // 将模板中<%= %>的直接数据引用（无逻辑代码）与两侧的文本用'和,隔开，同时去掉了左标签产生的tab符
        .split("\t").join("');") // 将tab符（上面替换左标签产生）替换为'); 由于上一步已经把<%=产生的tab符去掉，因此这里实际替换的只有逻辑代码的左标签
        .split("%>").join("$parts.push('") // 把剩下的右标签%>（逻辑代码的）替换为"$parts.push('"
        + "'); return $parts.join('');"; // 最后得到的就是一段JS代码，保留模板中的逻辑，并依次把模板中的常量和变量压入$parts数组

    return data ? fn(data) : fn;
}