"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

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
    Checkbox = _antd.Checkbox;
var axiosConfig = {
  url: "http://localhost:3001/contacts"
};
var axiosInstance = axios.create(axiosConfig);

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
      console.log(_this.props);

      _this.props.form.validateFields({
        force: true
      }, function (error, values) {
        if (!error) {
          console.log(values);
          var stringifyValues = JSON.stringify(values);
          console.log(stringifyValues);
          axios.post('http://localhost:3001/contacts/add', values).then(function (response) {
            return console.log(response);
          });
        } else console.log(error);
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "validatePhoneNumber", function (_rule, _value, callback) {
      _this.state.contacts.find(function (contact) {
        return contact.phone_number === _this.props.form.getFieldValue('phone_number');
      }) === undefined ? callback() : callback("Istnieje użytkownik o podanym numerze telefonu. Proroszę wpisać inny numer telefonu lub skontaktować się z administratorem");
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "validateEmail", function (_rule, _value, callback) {
      _this.state.contacts.find(function (contact) {
        return contact.email === _this.props.form.getFieldValue('email');
      }) === undefined ? callback() : callback("Istnieje użytkownik o podanym adresie e-mail. Proszę użyc innego adresu e-mail lub skontaktować się z administratorem");
    });

    _this.state = {
      contacts: [],
      groups: []
    };
    return _this;
  }

  _createClass(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      axios.get("http://localhost:3001/contacts").then(function (response) {
        _this2.setState(_objectSpread({}, _this2.state, {
          contacts: response.data
        }), function () {
          return console.log(_this2.state);
        });
      }).catch(function (error) {
        return console.log(error);
      });
      axios.get("http://localhost:3001/groups").then(function (response) {
        _this2.setState(_objectSpread({}, _this2.state, {
          groups: response.data
        }), function () {
          return console.log(_this2.state);
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props$form = this.props.form,
          getFieldDecorator = _this$props$form.getFieldDecorator,
          validateFields = _this$props$form.validateFields;
      var groups = this.state.groups;
      return React.createElement("div", {
        className: "container"
      }, React.createElement(Form, {
        layout: "horizontal",
        onSubmit: this.handlesubmit,
        style: {
          width: "50%"
        }
      }, React.createElement(Form.Item, {
        label: "Imi\u0119"
      }, getFieldDecorator("first_name", {
        rules: [{
          required: true,
          message: "Wpisz swoje imę!"
        }]
      })(React.createElement(Input, {
        placeholder: "Jan"
      }))), React.createElement(Form.Item, {
        label: "Nazwisko"
      }, getFieldDecorator("last_name", {
        rules: [{
          required: true,
          message: "Wpisz nazwisko!"
        }]
      })(React.createElement(Input, {
        placeholder: "Kowalski"
      }))), React.createElement(Form.Item, {
        label: "Numer telefonu kom\xF3rkowego wg wzoru: 48xxxxxxxxx"
      }, getFieldDecorator("phone_number", {
        rules: [{
          required: true,
          message: "Wpisz twój numer telefonu!"
        }, {
          pattern: new RegExp(/48[0-9]{9}/),
          message: "Niepoprawny numer telefonu"
        }, {
          validator: this.validatePhoneNumber
        }]
      })(React.createElement(Input, {
        placeholder: "np. 48666666666"
      }))), React.createElement(Form.Item, {
        label: "E-mail"
      }, getFieldDecorator("email", {
        rules: [{
          required: true,
          message: "Wpisz twój adres e-mail"
        }, {
          type: 'email',
          message: 'The input is not a valid e-mail addres'
        }, {
          validator: this.validateEmail
        }]
      })(React.createElement(Input, {
        placeholder: "jan.kowalski@domena.pl"
      }))), React.createElement(Form.Item, {
        label: "Wybierz grup\u0119"
      }, getFieldDecorator("subscriberGroup", {
        rules: [{
          required: true,
          message: "Wybierz grupę!"
        }]
      })(React.createElement(Select, {
        placeholder: "Wybierz grup\u0119"
      }, groups.map(function (group) {
        return React.createElement(Select.Option, {
          key: group.id,
          value: group.name
        }, group.name);
      })))), React.createElement(Form.Item, null, getFieldDecorator("agreement", {
        rules: [{
          required: true,
          message: "Zgoda jest wymagana"
        }]
      })(React.createElement(Checkbox, null, "Zgoda na przetwarzanie ", React.createElement("a", {
        href: ""
      }, "danych osobowych")))), React.createElement(Form.Item, null, React.createElement(Button, {
        type: "primary",
        htmlType: "submit"
      }, "Subskrybuj"))));
    }
  }]);

  return App;
}(React.Component);

var WrappedApp = Form.create()(App);
ReactDOM.render(React.createElement("div", null, React.createElement(WrappedApp, null)), document.getElementById('app'));
