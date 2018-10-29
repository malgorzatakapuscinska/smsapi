"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _antd = antd,
    Form = _antd.Form,
    Input = _antd.Input,
    Select = _antd.Select,
    Button = _antd.Button,
    Checkbox = _antd.Checkbox,
    Alert = _antd.Alert;

var App =
/*#__PURE__*/
function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    var _this;

    _classCallCheck(this, App);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(App).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handlesubmit", function (event) {
      event.preventDefault();
    });

    _this.state = {};
    return _this;
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      var _this$props$form = this.props.form,
          getFieldDecorator = _this$props$form.getFieldDecorator,
          validateFields = _this$props$form.validateFields;
      var _this$state = this.state,
          groups = _this$state.groups,
          contactSaved = _this$state.contactSaved,
          serverError = _this$state.serverError;
      console.log(groups);
      console.log(this.state);
      return React.createElement("div", {
        className: "container"
      }, React.createElement(Form, {
        layout: "horizontal",
        onSubmit: this.handlesubmit,
        className: "ant-form--centered"
      }, React.createElement(Form.Item, {
        label: "Numer telefonu kom\xF3rkowego wg wzoru: 48xxxxxxxxx",
        className: "label-wordWrapped"
      }, getFieldDecorator("phone_number", {
        rules: [{
          required: true,
          message: "Wpisz twój numer telefonu!"
        }, {
          max: 11,
          message: "Numer telefonu zbyt długi - maksimum 11 znaków"
        }, {
          pattern: new RegExp(/48[0-9]{9}/),
          message: "Niepoprawny numer telefonu"
        }]
      })(React.createElement(Input, {
        placeholder: "np. 48666666666"
      }))), React.createElement(Form.Item, null, React.createElement(Button, {
        type: "primary",
        htmlType: "submit"
      }, "Subskrybuj"))), ")}");
    }
  }]);

  return App;
}(React.Component);

var WrappedApp = Form.create()(App);
ReactDOM.render(React.createElement("div", null, React.createElement(WrappedApp, null)), document.getElementById('app'));
