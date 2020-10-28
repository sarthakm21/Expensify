"use strict";

var container = document.getElementById('container');

//The command to compile jsx into javascript using babel\
//babel <jsx file location> --out-file=<javascript file location> --presets="env,react" --watch

var app = {
    title: "Indecision App",
    subtitle: "Dropeth thy confusion in the hands of thy computer",
    options: []
};

var formSubmit = function formSubmit(e) {
    e.preventDefault();
    var temp = e.target.elements.addOption.value;
    if (temp) app.options.push(temp);
    e.target.elements.addOption.value = '';
    renderApp();
};

var clearAll = function clearAll() {
    app.options = [];
    renderApp();
};

var selectOption = function selectOption() {
    var index = Math.floor(Math.random() * app.options.length);
    alert(app.options[index]);
};

var renderApp = function renderApp() {
    var template = React.createElement(
        "div",
        null,
        React.createElement(
            "h1",
            null,
            app.title
        ),
        app.subtitle && React.createElement(
            "p",
            null,
            app.subtitle
        ),
        React.createElement(
            "form",
            { onSubmit: formSubmit, style: { display: "inline" } },
            React.createElement("input", { type: "text", name: "addOption" }),
            React.createElement(
                "button",
                null,
                "Add an option"
            )
        ),
        React.createElement(
            "button",
            { onClick: clearAll },
            "Clear All"
        ),
        React.createElement(
            "p",
            null,
            app.options.length ? "These are your options: " : "No options available",
            " "
        ),
        React.createElement(
            "ol",
            null,
            app.options.map(function (option) {
                return React.createElement(
                    "li",
                    { key: option },
                    option
                );
            })
        ),
        React.createElement(
            "button",
            { onClick: selectOption, disabled: app.options.length === 0 },
            "What should I do?"
        )
    );

    ReactDOM.render(template, container);
};

renderApp();
