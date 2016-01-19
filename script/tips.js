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