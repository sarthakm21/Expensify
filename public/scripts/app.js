'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IndecisionApp = function (_React$Component) {
    _inherits(IndecisionApp, _React$Component);

    function IndecisionApp(props) {
        _classCallCheck(this, IndecisionApp);

        /* We have to bind these methods to "this" parent component because when they are referenced 
           independently without the class(like they do when they are passed as props and are used by children components) 
           they lose their binding and the value of "this" is no longer defined.
           https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind */
        var _this = _possibleConstructorReturn(this, (IndecisionApp.__proto__ || Object.getPrototypeOf(IndecisionApp)).call(this, props));

        _this.handleRemoveAll = _this.handleRemoveAll.bind(_this);
        _this.handlePick = _this.handlePick.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.handleRemoveOption = _this.handleRemoveOption.bind(_this);

        _this.state = {
            options: []
        };
        return _this;
    }

    _createClass(IndecisionApp, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            try {
                var prevData = JSON.parse(localStorage.getItem('options'));
                if (prevData) this.setState(function () {
                    return { options: prevData };
                });
            } catch (error) {
                console.log("Some error occured", error);
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            if (this.state.options.length !== prevState.options.length) {
                localStorage.setItem('options', JSON.stringify(this.state.options)); /*Using json.stringify to convert the array into json string format                                        
                                                                                     since localStorage only takes in strings as inputs */
            }
        }
    }, {
        key: 'handleRemoveOption',
        value: function handleRemoveOption(optionText) {
            var modifiedOptions = this.state.options.filter(function (option) {
                return option !== optionText;
            });
            this.setState(function () {
                return { options: modifiedOptions };
            });
        }
    }, {
        key: 'handleRemoveAll',
        value: function handleRemoveAll() {
            this.setState(function () {
                return { options: [] };
            }); /*We have to enclose the object that we are 
                returning into parenthesis because otherwise, the arrow function will consider it to be the function body */
        }
    }, {
        key: 'handlePick',
        value: function handlePick() {
            alert(this.state.options[Math.floor(Math.random() * this.state.options.length)]);
        }
    }, {
        key: 'handleSubmit',
        value: function handleSubmit(option) {
            if (!option) {
                return "Please enter a valid input";
            } else if (this.state.options.indexOf(option) > -1) {
                return "The option already exists";
            }

            this.setState(function (prev) {
                return { options: [].concat(_toConsumableArray(prev.options), [option]) };
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var app = {
                subtitle: "Dropeth thy confusion in the hands of thy computer"
            };
            return React.createElement(
                'div',
                null,
                React.createElement(Header, {
                    subtitle: app.subtitle
                }),
                React.createElement(Action, {
                    handlePick: this.handlePick,
                    hasOptions: this.state.options.length > 0
                }),
                React.createElement(Options, {
                    options: this.state.options,
                    handleRemoveAll: this.handleRemoveAll,
                    handleRemoveOption: this.handleRemoveOption
                }),
                React.createElement(Select, {
                    handleSubmit: this.handleSubmit
                })
            );
        }
    }]);

    return IndecisionApp;
}(React.Component);

/* We use functional components when we do not need state or lifecycle methods or methods for the individual component. 
Functional methods are faster than class based components because they do not include the code for above mentioned properties */


var Header = function Header(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'h1',
            null,
            props.title
        ),
        React.createElement(
            'h2',
            null,
            props.subtitle
        )
    );
};

Header.defaultProps = {
    title: "Indecision App"
};

var Action = function Action(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'button',
            { onClick: props.handlePick, disabled: !props.hasOptions },
            'What would you like to do?'
        )
    );
};

var Options = function Options(props) {
    var optionElement = props.options.map(function (option) {
        return React.createElement(Option, {
            key: option,
            optionText: option,
            handleRemoveOption: props.handleRemoveOption
        });
    });
    return React.createElement(
        'div',
        null,
        React.createElement(
            'button',
            { onClick: props.handleRemoveAll },
            'Remove All'
        ),
        React.createElement(
            'ul',
            null,
            optionElement.length !== 0 ? optionElement : React.createElement(
                'p',
                null,
                'Enter some options to get started'
            )
        )
    );
};

var Option = function Option(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'li',
            null,
            props.optionText,
            React.createElement(
                'button',
                { onClick: function onClick(e) {
                        return props.handleRemoveOption(props.optionText);
                    } },
                'Remove'
            )
        )
    );
};

var Select = function (_React$Component2) {
    _inherits(Select, _React$Component2);

    function Select(props) {
        _classCallCheck(this, Select);

        var _this2 = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props));

        _this2.handleSubmit = _this2.handleSubmit.bind(_this2);
        _this2.state = {
            error: undefined
        };
        return _this2;
    }

    _createClass(Select, [{
        key: 'handleSubmit',
        value: function handleSubmit(e) {
            e.preventDefault();
            var option = e.target.elements.addOption.value;
            var error = this.props.handleSubmit(option);
            this.setState(function () {
                return { error: error };
            });

            if (!error) e.target.elements.addOption.value = '';
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                this.state.error && React.createElement(
                    'p',
                    null,
                    this.state.error
                ),
                React.createElement(
                    'form',
                    { onSubmit: this.handleSubmit },
                    React.createElement('input', { type: 'text', name: 'addOption' }),
                    React.createElement(
                        'button',
                        null,
                        'Add an option'
                    )
                )
            );
        }
    }]);

    return Select;
}(React.Component);

ReactDOM.render(React.createElement(IndecisionApp, null), document.getElementById('container'));
