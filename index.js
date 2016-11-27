(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("redux"), require("immutable"), require("react"), require("react-redux"), require("bowser"), require("color"));
	else if(typeof define === 'function' && define.amd)
		define(["redux", "immutable", "react", "react-redux", "bowser", "color"], factory);
	else if(typeof exports === 'object')
		exports["ui-beakers"] = factory(require("redux"), require("immutable"), require("react"), require("react-redux"), require("bowser"), require("color"));
	else
		root["ui-beakers"] = factory(root["redux"], root["immutable"], root["react"], root["react-redux"], root["bowser"], root["color"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_10__, __WEBPACK_EXTERNAL_MODULE_11__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.HomePage = exports.AlertContainer = exports.Alert = exports.removeAlert = exports.addTimedAlert = exports.addAlert = undefined;
	
	var _redux = __webpack_require__(1);
	
	var _Alert = __webpack_require__(4);
	
	var _Alert2 = _interopRequireDefault(_Alert);
	
	var _alert = __webpack_require__(6);
	
	var _alert2 = _interopRequireDefault(_alert);
	
	var _HomePage = __webpack_require__(8);
	
	var _HomePage2 = _interopRequireDefault(_HomePage);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.addAlert = _redux.addAlert;
	exports.addTimedAlert = _redux.addTimedAlert;
	exports.removeAlert = _redux.removeAlert;
	exports.Alert = _Alert2.default;
	exports.AlertContainer = _alert2.default;
	exports.HomePage = _HomePage2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.store = undefined;
	exports.addAlert = addAlert;
	exports.removeAlert = removeAlert;
	exports.addTimedAlert = addTimedAlert;
	
	var _redux = __webpack_require__(2);
	
	var _immutable = __webpack_require__(3);
	
	var ADD_ALERT = 'ADD_ALERT';
	var REMOVE_ALERT = 'REMOVE_ALERT';
	
	function alertReducer() {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _immutable.fromJS)([]);
	    var action = arguments[1];
	
	    switch (action.type) {
	        case ADD_ALERT:
	            return state.push(action.alert);
	
	        case REMOVE_ALERT:
	            return state.delete(state.indexOf(action.alert));
	
	        default:
	            return state;
	    }
	}
	
	var store = exports.store = (0, _redux.createStore)(alertReducer);
	
	function addAlert(alert) {
	    store.dispatch({
	        alert: alert,
	        type: ADD_ALERT
	    });
	}
	
	function removeAlert(alert) {
	    store.dispatch({
	        alert: alert,
	        type: REMOVE_ALERT
	    });
	}
	
	function addTimedAlert(alert) {
	    var displayTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5000;
	
	    addAlert(alert);
	
	    setTimeout(function () {
	        removeAlert(alert);
	    }, displayTime);
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("redux");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("immutable");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(5);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _redux = __webpack_require__(1);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var handleClick = function handleClick(alert) {
	    return function () {
	        (0, _redux.removeAlert)(alert);
	    };
	};
	
	var Alert = function Alert(props) {
	    var alert = props.alert;
	
	
	    if (alert) {
	        var message = alert.message;
	        var type = alert.type;
	
	        var alertTypes = {
	            danger: '#CC2127',
	            success: '#07CE8F',
	            warning: '#FD7400'
	        };
	        var style = {
	            container: {
	                backgroundColor: alertTypes[type],
	                color: '#fff',
	                padding: 20,
	                position: 'fixed',
	                textAlign: 'center',
	                top: 0,
	                width: '100%',
	                zIndex: 1031
	            },
	            x: {
	                cursor: 'pointer',
	                fontSize: 30,
	                padding: '0 10px',
	                position: 'absolute',
	                right: 10,
	                top: 10
	            }
	        };
	
	        return _react2.default.createElement(
	            'div',
	            { style: style.container },
	            message,
	            _react2.default.createElement(
	                'span',
	                {
	                    onClick: handleClick(alert),
	                    style: style.x },
	                '\xD7'
	            )
	        );
	    }
	
	    return null;
	};
	
	Alert.propTypes = {
	    alert: _react.PropTypes.shape({
	        message: _react.PropTypes.node.isRequired,
	        type: _react.PropTypes.oneOf(['danger', 'success', 'warning'])
	    })
	};
	
	exports.default = Alert;

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(5);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(7);
	
	var _redux = __webpack_require__(1);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Renders any alerts in the Alert store one at a time
	 *
	 * @author Ben Larkins <ben@sellerlabs.com>
	 */
	var AlertContainer = function AlertContainer(_ref) {
	    var alertComponent = _ref.alertComponent;
	
	    var Alert = (0, _reactRedux.connect)(function (state) {
	        return {
	            alert: state.get(0)
	        };
	    })(alertComponent);
	
	    return _react2.default.createElement(
	        _reactRedux.Provider,
	        { store: _redux.store },
	        _react2.default.createElement(Alert, null)
	    );
	};
	
	AlertContainer.propTypes = {
	    alertComponent: _react.PropTypes.element.isRequired
	};
	
	exports.default = AlertContainer;

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("react-redux");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(5);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Renderer = __webpack_require__(9);
	
	var _Renderer2 = _interopRequireDefault(_Renderer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var style = {
	    background: {
	        height: '100%',
	        position: 'fixed',
	        width: '100%',
	        zIndex: '-1'
	    },
	    contentContainer: {
	        display: 'flex',
	        flexDirection: 'column',
	        height: '100%',
	        position: 'absolute',
	        width: '100%'
	    },
	    img: {
	        height: 150,
	        marginBottom: 50,
	        marginTop: 100
	    },
	    logo: {
	        textAlign: 'center',
	        width: '100%'
	    }
	};
	
	/**
	 * Class HomeCanvas
	 *
	 * Sets up the background animation
	 */
	
	var HomePage = function (_Component) {
	    _inherits(HomePage, _Component);
	
	    function HomePage() {
	        var _ref;
	
	        var _temp, _this, _ret;
	
	        _classCallCheck(this, HomePage);
	
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }
	
	        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = HomePage.__proto__ || Object.getPrototypeOf(HomePage)).call.apply(_ref, [this].concat(args))), _this), _this.render = function () {
	            var _this$props = _this.props;
	            var children = _this$props.children;
	            var logoSrc = _this$props.logoSrc;
	            var _this$props$logoStyle = _this$props.logoStyle;
	            var logoStyle = _this$props$logoStyle === undefined ? {} : _this$props$logoStyle;
	
	
	            return _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement(
	                    'div',
	                    { style: style.background },
	                    _react2.default.createElement('canvas', { id: 'welcomeCanvas' })
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { style: style.contentContainer },
	                    logoSrc ? _react2.default.createElement(
	                        'div',
	                        { style: style.logo },
	                        _react2.default.createElement('img', {
	                            alt: 'application-logo',
	                            src: logoSrc,
	                            style: Object.assign({}, style.img, logoStyle) })
	                    ) : null,
	                    children
	                )
	            );
	        }, _temp), _possibleConstructorReturn(_this, _ret);
	    }
	
	    _createClass(HomePage, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var _props = this.props;
	            var _props$backgroundColo = _props.backgroundColor;
	            var backgroundColor = _props$backgroundColo === undefined ? '#ffffff' : _props$backgroundColo;
	            var backgroundEndColor = _props.backgroundEndColor;
	            var _props$lineColor = _props.lineColor;
	            var lineColor = _props$lineColor === undefined ? '#000000' : _props$lineColor;
	            var _props$particleColor = _props.particleColor;
	            var particleColor = _props$particleColor === undefined ? '#000000' : _props$particleColor;
	            var _props$ringColor = _props.ringColor;
	            var ringColor = _props$ringColor === undefined ? '#000000' : _props$ringColor;
	
	
	            var renderer = new _Renderer2.default('welcomeCanvas', {
	                background: backgroundColor,
	                backgroundEnd: backgroundEndColor,
	                line: lineColor,
	                particle: particleColor,
	                ring: ringColor
	            });
	
	            renderer.seed();
	
	            renderer.run();
	        }
	
	        /**
	         * Render the component
	         *
	         * @returns {ReactElement}
	         */
	
	    }]);
	
	    return HomePage;
	}(_react.Component);
	
	exports.default = HomePage;
	
	
	HomePage.propTypes = {
	    backgroundColor: _react.PropTypes.string,
	    backgroundEndColor: _react.PropTypes.string,
	    children: _react.PropTypes.node,
	    lineColor: _react.PropTypes.string,
	    logoSrc: _react.PropTypes.string,
	    logoStyle: _react.PropTypes.object,
	    particleColor: _react.PropTypes.string,
	    ringColor: _react.PropTypes.string
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable no-param-reassign */
	
	var _bowser = __webpack_require__(10);
	
	var _bowser2 = _interopRequireDefault(_bowser);
	
	var _color = __webpack_require__(11);
	
	var _color2 = _interopRequireDefault(_color);
	
	var _RenderUtils = __webpack_require__(12);
	
	var _RenderUtils2 = _interopRequireDefault(_RenderUtils);
	
	var _Particle = __webpack_require__(13);
	
	var _Particle2 = _interopRequireDefault(_Particle);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var lowEnd = _bowser2.default.safari || _bowser2.default.mobile;
	var lowEndIterations = 70;
	
	/**
	 * Class Renderer
	 *
	 * Provides the backgorund animation for the homepage
	 */
	
	var Renderer = function () {
	    /**
	     * Construct an instance of a Renderer
	     *
	     * @param canvasId
	     */
	    function Renderer(canvasId, colors) {
	        var _this = this;
	
	        _classCallCheck(this, Renderer);
	
	        this.loop = function () {
	            _this.drawBackground();
	            _this.drawEntities();
	
	            if (!lowEnd || _this.frameCount < lowEndIterations) {
	                window.requestAnimFrame(_this.loop.bind(_this));
	            }
	        };
	
	        this.drawEntities = function () {
	            var ctx = _this.context;
	            var evaluatedConnections = [];
	
	            var entityHandler = function entityHandler(entity) {
	                var connections = 1;
	
	                var connectionsManager = function connectionsManager(entity2) {
	                    var hashKey = _this.getConnectionHashKey(entity, entity2);
	
	                    if (evaluatedConnections[hashKey]) {
	                        return;
	                    }
	
	                    connections += _this.drawDistanceLine({
	                        x: entity.x + entity.w / 2,
	                        y: entity.y + entity.h / 2
	                    }, {
	                        x: entity2.x + entity2.w / 2,
	                        y: entity2.y + entity2.w / 2
	                    }, entity, entity2);
	
	                    evaluatedConnections[hashKey] = true;
	                };
	
	                ctx.save();
	
	                _this.entities.forEach(connectionsManager);
	
	                // Translate
	                if (entity.x !== undefined && entity.y !== undefined) {
	                    ctx.translate(entity.x, entity.y);
	                }
	
	                ctx.globalAlpha = entity.opacity;
	
	                // Render texture
	                connections = entity.previousConnections * 0.9 + connections * 0.1;
	                ctx.beginPath();
	                ctx.arc(entity.w / 2, entity.h / 2, 3, 0, 2 * Math.PI, false);
	                ctx.fillStyle = _this.colors.particle;
	                ctx.fill();
	
	                ctx.beginPath();
	                ctx.arc(entity.w / 2, entity.h / 2, 3 * connections, 0, 2 * Math.PI, false);
	                ctx.lineWidth = 1;
	                ctx.strokeStyle = _this.colors.ring;
	                ctx.stroke();
	
	                entity.previousConnections = connections;
	
	                ctx.globalAlpha = 1;
	
	                ctx.restore();
	
	                if (entity.update !== undefined && !lowEnd) {
	                    entity.update();
	                }
	
	                if (_this.frameCount > 150) {
	                    if (entity.inside(_this.width, _this.height)) {
	                        var part = new _Particle2.default(_this.width, _this.height, lowEnd);
	
	                        _this.entities[_this.entities.indexOf(entity)] = part;
	                    }
	
	                    _this.frameCount = 0;
	                }
	
	                _this.frameCount += 1;
	            };
	
	            _this.entities.forEach(entityHandler);
	        };
	
	        // Initialize references to the canvas object
	        this.canvas = document.getElementById(canvasId);
	        this.context = this.canvas.getContext('2d');
	
	        // Set the size of the renderer to the window size
	        this.setSize(window.innerWidth, window.innerHeight);
	
	        // Re-size with window
	        window.onresize = function () {
	            _this.setSize(window.innerWidth, window.innerHeight);
	
	            if (lowEnd) {
	                _this.drawBackground();
	            }
	        };
	
	        // Define default colors
	        var bgColor = lowEnd ? (0, _color2.default)(colors.background).alpha(0.5).rgbString() : (0, _color2.default)(colors.background).rgbString();
	
	        var backgroundColor = bgColor;
	
	        if (colors.backgroundEnd) {
	            var backgroundColorEnd = lowEnd ? (0, _color2.default)(colors.backgroundEnd).alpha(0.5).rgbString() : (0, _color2.default)(colors.backgroundEnd).rgbString();
	
	            backgroundColor = this.context.createLinearGradient(0, 0, 0, this.context.canvas.height);
	            backgroundColor.addColorStop(0, bgColor);
	            backgroundColor.addColorStop(1, backgroundColorEnd);
	        }
	
	        var lineColor = (0, _color2.default)(colors.line);
	
	        this.colors = {
	            background: backgroundColor,
	            lineEnd: lineColor.rgbString(),
	            lineMidpoint: lineColor.alpha(0.1).rgbString(),
	            particle: (0, _color2.default)(colors.particle).hexString(),
	            ring: (0, _color2.default)(colors.ring).alpha(0.2).rgbString()
	        };
	
	        // Entities array
	        this.entities = [];
	
	        this.minDistance = 200;
	
	        if (lowEnd) {
	            this.minDistance = 150;
	        }
	    }
	
	    /**
	     * Start rendering
	     */
	
	
	    _createClass(Renderer, [{
	        key: 'run',
	        value: function run() {
	            // RequestAnimFrame: a browser API for getting smooth animations
	            _RenderUtils2.default.setupAnimFrame();
	
	            if (lowEnd) {
	                window.requestAnimFrame = function () {
	                    return function (callback) {
	                        window.setTimeout(callback, 2000);
	                    };
	                }();
	            }
	
	            this.frameCount = 0;
	
	            this.loop();
	        }
	
	        /**
	         * The rendering loop
	         */
	
	    }, {
	        key: 'drawBackground',
	
	
	        /**
	         * Draw the canvas background
	         */
	        value: function drawBackground() {
	            this.context.fillStyle = this.colors.background;
	
	            this.context.fillRect(0, 0, this.width, this.height);
	        }
	
	        /**
	         * Add an entity to the micro-engine
	         *
	         * @param entity
	         */
	
	    }, {
	        key: 'addEntity',
	        value: function addEntity(entity) {
	            this.entities.push(entity);
	        }
	
	        /**
	         * Keep adding entities so that the particle field doesn't die down over
	         * time.
	         */
	
	    }, {
	        key: 'keepAlive',
	        value: function keepAlive() {
	            if (this.entities.length < 40) {
	                this.addEntity(new _Particle2.default(this.width, this.height, lowEnd));
	            }
	        }
	
	        /**
	         * Set the size of the rendering surface (canvas)
	         *
	         * @param width
	         * @param height
	         */
	
	    }, {
	        key: 'setSize',
	        value: function setSize(width, height) {
	            this.devicePixelRatio = window.devicePixelRatio || 1;
	
	            this.backingStoreRatio = _RenderUtils2.default.getBackingStoreRatio(this.context);
	            this.ratio = this.devicePixelRatio / this.backingStoreRatio;
	
	            this.width = width;
	            this.height = height;
	
	            this.canvas.width = width;
	            this.canvas.height = height;
	
	            if (this.devicePixelRatio !== this.backingStoreRatio) {
	                var canvas = this.canvas;
	
	                var oldWidth = canvas.width;
	                var oldHeight = canvas.height;
	
	                canvas.width = oldWidth * this.ratio;
	                canvas.height = oldHeight * this.ratio;
	
	                canvas.style.width = oldWidth + 'px';
	                canvas.style.height = oldHeight + 'px';
	
	                this.context.scale(this.ratio, this.ratio);
	            }
	        }
	
	        /**
	         * Get the hashed key for a connection between nodes
	         *
	         * @param entity1
	         * @param entity2
	         *
	         * @returns {string}
	         */
	
	    }, {
	        key: 'getConnectionHashKey',
	        value: function getConnectionHashKey(entity1, entity2) {
	            var index1 = this.entities.indexOf(entity1);
	            var index2 = this.entities.indexOf(entity2);
	
	            if (index1 > index2) {
	                return [index1, index2].join();
	            }
	
	            return [index2, index1].join();
	        }
	
	        /**
	         * Draw all entities in the engine
	         */
	
	    }, {
	        key: 'drawDistanceLine',
	
	
	        /**
	         * Draw the connecting line between entities
	         *
	         * @param p1
	         * @param p2
	         * @param entity1
	         * @param entity2
	         *
	         * @returns {number}
	         */
	        value: function drawDistanceLine(p1, p2, entity1, entity2) {
	            var percentage = 0;
	            var ctx = this.context;
	            var dx = p1.x - p2.x;
	            var dy = p1.y - p2.y;
	
	            var dist = Math.sqrt(dx * dx + dy * dy);
	
	            // Draw the line when distance is smaller
	            // then the minimum distance
	            if (dist <= this.minDistance) {
	                var gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
	
	                percentage = 1.2 - dist / this.minDistance;
	                var percentageSafe = percentage.toFixed(2);
	
	                ctx.globalAlpha = percentageSafe;
	
	                gradient.addColorStop('0', this.colors.lineEnd);
	                gradient.addColorStop('0.5', this.colors.lineMidpoint);
	                gradient.addColorStop('1.0', this.colors.lineEnd);
	
	                // Draw the line
	                ctx.beginPath();
	                ctx.strokeStyle = gradient;
	                ctx.moveTo(p1.x, p1.y);
	                ctx.lineTo(p2.x, p2.y);
	                ctx.stroke();
	                ctx.closePath();
	
	                ctx.globalAlpha = 1;
	                // Some acceleration for the particles depending upon their distance
	                var ax = dx / 200000;
	                var ay = dy / 200000;
	
	                // Apply the acceleration on the particles
	                entity1.xVel -= ax;
	                entity1.yVel -= ay;
	
	                entity2.xVel += ax;
	                entity2.yVel += ay;
	
	                return percentage;
	            }
	
	            return 0;
	        }
	
	        /**
	         * Initial seeding of the environment
	         */
	
	    }, {
	        key: 'seed',
	        value: function seed() {
	            var height = this.height;
	            var width = this.width;
	
	            var count = 40;
	
	            if (_bowser2.default.mobile) {
	                count = 30;
	            } else if (lowEnd) {
	                count = 100;
	            }
	
	            for (var i = 0; i < count; i += 1) {
	                this.addEntity(new _Particle2.default(width, height, lowEnd));
	            }
	        }
	    }]);
	
	    return Renderer;
	}();
	
	exports.default = Renderer;

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("bowser");

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("color");

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Class RenderUtils
	 *
	 * Some rendering utilities
	 */
	var RenderUtils = function () {
	    function RenderUtils() {
	        _classCallCheck(this, RenderUtils);
	    }
	
	    _createClass(RenderUtils, null, [{
	        key: "setupAnimFrame",
	
	        /**
	         * Setup the requestAnimFrame polyfill or alias
	         */
	        value: function setupAnimFrame() {
	            window.requestAnimFrame = function () {
	                return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
	                    window.setTimeout(callback, 1000 / 60);
	                };
	            }();
	        }
	
	        /**
	         * Get the backing store ratio
	         *
	         * This is used to determine whether to draw in retina mode or not on an
	         * HTML canvas
	         *
	         * @param context
	         *
	         * @returns {*|number}
	         */
	
	    }, {
	        key: "getBackingStoreRatio",
	        value: function getBackingStoreRatio(context) {
	            return context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1;
	        }
	    }]);
	
	    return RenderUtils;
	}();
	
	exports.default = RenderUtils;

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Class Particle
	 *
	 * Represents a particle in a particle system
	 */
	var Particle = function () {
	
	    /**
	     * Construct an instance of a Particle
	     *
	     * @param width
	     * @param height
	     * @param lowEnd
	     */
	    function Particle(width, height) {
	        var lowEnd = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	
	        _classCallCheck(this, Particle);
	
	        this.x = Math.random() * width;
	        this.y = Math.random() * height;
	
	        this.w = 100;
	        this.h = 100;
	
	        this.xVel = 2 - Math.random() * 4;
	        this.yVel = 2 - Math.random() * 4;
	
	        this.opacity = 0;
	
	        if (lowEnd) {
	            this.opacity = 1;
	        }
	
	        this.previousConnections = 0;
	    }
	
	    /**
	     * Update the state of the particle
	     */
	
	
	    _createClass(Particle, [{
	        key: "update",
	        value: function update() {
	            this.angle += this.angularVel;
	
	            this.x += this.xVel;
	            this.y += this.yVel;
	
	            if (this.opacity < 1) {
	                this.opacity += 0.05;
	            }
	        }
	
	        /**
	         * Check if the particle is inside an area
	         *
	         * @param width
	         * @param height
	         *
	         * @returns {boolean}
	         */
	
	    }, {
	        key: "inside",
	        value: function inside(width, height) {
	            return this.x + this.w < 0 || this.x > width || this.y + this.h < 0 || this.y > height;
	        }
	    }]);
	
	    return Particle;
	}();
	
	exports.default = Particle;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=index.js.map