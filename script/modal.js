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