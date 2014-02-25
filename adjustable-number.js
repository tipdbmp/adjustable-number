angular.module('adjustable-number', [])
.directive('adjustableNumber', function($document, $timeout)
{
    return {
    restrict: 'E',
    scope: {
        num:        '=',
        numclass:   '@',
        inputclass: '@',

        // adding a tooltip="..." attribte to the span tag and double clicking on it
        // (the adjustable number) in order to show the input field, hides the input field?!
        // no idea why that is...
//        numtip:     '@',

    },
    transclude: true,
    template: '<span                             ng-show="in_adjustable_mode" ng-dblclick="in_adjustable_mode=!in_adjustable_mode; _input_select_text();"                            class="{{numclass}}">{{num}}</span>'
            + '<input type="text" ng-model="num" ng-hide="in_adjustable_mode" ng-dblclick="in_adjustable_mode=!in_adjustable_mode; _input_check_valid();" ng-change="_input_limit()" class="{{inputclass}}">'
            + '<span ng-transclude></span>'
            ,
    link: function(scope, element, attrs)
    {
        var step         = parseInt(attrs.step, 10) || 1;
        var min_value    = attrs.min   || 1;
        var max_value    = attrs.max   || 100;
        var adjust_speed = attrs.speed || 3;
        var body         = angular.element('body');
        var input, input_len;
        scope.in_adjustable_mode = true;
        scope.numtip = scope.numtip || '';

        scope._input_select_text = function()
        {
            var input = element.find('input');
            $timeout(function()
            {
                input.focus().select();
            }, 0);
        };

        element
        .mousedown(function(mouse_down_event)
        {
            var num          = parseInt(scope.num, 10);
            var prev_mousex  = mouse_down_event.pageX;
            var move_counter = 0;

            $document
            .mousemove(function(mouse_move_event)
            {
                var current_mousex = mouse_move_event.pageX;
                var mouse_dx       = current_mousex - prev_mousex;

                body.css('user-select', 'none');
                body.css('cursor', 'col-resize');

                move_counter++;

                if (!scope.in_adjustable_mode) { return; }
                if (move_counter % adjust_speed != 0) { return ; }

                if (mouse_dx < 0)
                {
                    num = Math.max(min_value, num - step);
                }
                else if (mouse_dx > 0)
                {
                    num = Math.min(max_value, num + step);
                }
                scope.$apply(function()
                {
                    scope.num = num;
                });

                prev_mousex = current_mousex;
            })
            .mouseup(function()
            {
                body.css('user-select', 'text');
                body.css('cursor', '');
                $document.unbind('mousemove');
                $document.unbind('mouseup');
            })
            ;
        })
        ;

        scope._input_limit = function()
        {
            var num = scope.num;

            if (num === null || num === "") { return; }
            if (num.charAt(0) === '-' && num.length === 1) { return; }

            num = parseInt(num, 10);
            if (isNaN(num)) { num = min_value; }

            num = Math.max(min_value, num);
            num = Math.min(max_value, num);
            scope.num = num;
        };

        scope._input_check_valid = function()
        {
            if (scope.num === '-' || scope.num === null || scope.num === '')
            {
                scope.num = min_value;
            }
        };
    },

    };
})
;
