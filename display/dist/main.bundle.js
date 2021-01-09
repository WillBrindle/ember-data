/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var d3 = __webpack_require__(/*! d3 */ "./node_modules/d3/index.js");
var AWS = __webpack_require__(/*! aws-sdk */ "./node_modules/aws-sdk/lib/browser.js");
var urlParams = new URLSearchParams(window.location.search);
var dbclient = new AWS.DynamoDB({
    credentials: new AWS.Credentials(urlParams.get('access'), urlParams.get('secret')),
    region: 'eu-west-1',
});
(function () { return __awaiter(void 0, void 0, void 0, function () {
    function drawGraph(container, results, weather, minY) {
        if (minY === void 0) { minY = MIN_X; }
        // set the dimensions and margins of the graph
        var margin = { top: 40, right: 30, bottom: 30, left: 60 }, width = 460 - margin.left - margin.right, height = 400 - margin.top - margin.bottom;
        // append the svg object to the body of the page
        var svg = d3.select(container)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        svg.append("text")
            .attr('font-family', 'sans-serif')
            .attr('font-weight', 'bold')
            .attr('font-size', '24px')
            .attr('fill', '#58546a')
            .attr('y', -10) // TODO: setting
            .text(results[0].name.S);
        var data = results
            .map(function (d) { return ({
            date: d3.timeParse("%Q")(d.time.N),
            value: Number(d.temperature.N),
            status: d.status ? Number(d.status.N) : -1
        }); });
        var weatherData = [];
        if (weather) {
            weatherData = weather.map(function (d) { return ({
                date: d3.timeParse("%s")(d.dt.N),
                value: Number(d.main.M.temp.N) - 273.15,
            }); });
        }
        var aggregatedData = [];
        var rollupAmount = 15 * 60 * 1000; // 15 mins
        d3.rollup(data, function (v) { return d3.mean(v, function (d) { return d.value; }); }, function (d) { return Math.floor(d.date / rollupAmount) * rollupAmount; })
            .forEach(function (val, key) {
            aggregatedData.push({ value: val, date: key });
        });
        // Add X axis --> it is a date format
        var x = d3.scaleTime()
            .domain(d3.extent(aggregatedData, function (d) { return d.date; }))
            .range([0, width]);
        var axisX = svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));
        // Add Y axis
        var y = d3.scaleLinear()
            .domain([minY, d3.max(aggregatedData, function (d) { return +d.value; })])
            .range([height, 0]);
        var axisY = svg.append("g")
            .call(d3.axisLeft(y));
        axisY.selectAll("line")
            .style("stroke", "#aab8c9"); // e1e3eb
        axisY.selectAll("path")
            .style("stroke", "#aab8c9"); // e1e3eb
        axisY.selectAll("text")
            .style("fill", "#aab8c9"); // e1e3eb
        axisX.selectAll("line")
            .style("stroke", "#aab8c9"); // e1e3eb
        axisX.selectAll("path")
            .style("stroke", "#aab8c9"); // e1e3eb
        axisX.selectAll("text")
            .style("fill", "#aab8c9"); // e1e3eb
        var line = d3.line()
            .x(function (d) { return x(d.date); })
            .y(function (d) { return y(d.value); })
            .curve(d3.curveBasis);
        var line2 = d3.line()
            .x(function (d) { return x(d.date); })
            .y(function (d) { return y(d.value); })
            .curve(d3.curveBasis);
        /*
        const weatherLine = d3.line()
            .x((d: any) => x(d.date))
            .y((d: any) => y(d.value))
            .curve(d3.curveBasis);
        */
        // Background to show whether it's on or off
        var statusData = [];
        for (var i = 0; i < data.length; i++) {
            var d = data[i];
            if (d.status === -1) {
                continue;
            }
            if (statusData.length === 0 || d.status !== statusData[statusData.length - 1].value) {
                statusData.push({ startTime: d.date, endTime: d.date, value: d.status });
            }
            else {
                statusData[statusData.length - 1].endTime = d.date;
            }
        }
        statusData = statusData.filter(function (s) { return s.value !== 1; });
        svg
            .selectAll("rect")
            .data(statusData)
            .enter().append("rect")
            .attr("width", function (d) { return x(d.endTime) - x(d.startTime); }) // TODO: should make this go to whenever the next one is instead
            .attr("height", height)
            .attr("opacity", function (d) { return d.value === 1 ? 0 : 0.15; })
            .attr("fill", '#ff3456')
            .attr("x", function (d) { return x(d.startTime); })
            .attr("y", 0);
        if (weatherData) {
            svg.append("path")
                // .datum(data)
                .datum(weatherData)
                .attr("fill", "none")
                .attr("stroke", "#aab8c9")
                .attr("stroke-width", 3)
                .attr("d", line2);
        }
        // Add the line
        svg.append("path")
            // .datum(data)
            .datum(aggregatedData)
            .attr("fill", "none")
            .attr("stroke", "#0066ff")
            .attr("stroke-width", 3)
            .attr("d", line);
    }
    var DAY_IN_MS, MIN_X, results, weather, results2, results3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                DAY_IN_MS = 24 * 60 * 60 * 1000;
                MIN_X = 0;
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        dbclient.query({
                            ExpressionAttributeValues: {
                                ":sensor": {
                                    S: "41223"
                                },
                                ":time": {
                                    N: "" + (new Date().getTime() - DAY_IN_MS)
                                }
                            },
                            ExpressionAttributeNames: {
                                "#time": 'time'
                            },
                            KeyConditionExpression: "sensorId = :sensor AND #time > :time",
                            // FilterExpression: "#time > :time",
                            TableName: "ember"
                        }, function (err, data) {
                            if (err) {
                                reject(err);
                                return;
                            }
                            resolve(data.Items);
                        });
                    })];
            case 1:
                results = _a.sent();
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        dbclient.query({
                            ExpressionAttributeValues: {
                                ":id": {
                                    S: '2644849'
                                },
                                ":time": {
                                    N: "" + Math.floor((new Date().getTime() - DAY_IN_MS) / 1000)
                                }
                            },
                            KeyConditionExpression: "id = :id AND dt > :time",
                            TableName: "weather"
                        }, function (err, data) {
                            if (err) {
                                reject(err);
                                return;
                            }
                            resolve(data.Items);
                        });
                    })];
            case 2:
                weather = _a.sent();
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        dbclient.query({
                            ExpressionAttributeValues: {
                                ":sensor": {
                                    S: "41224"
                                },
                                ":time": {
                                    N: "" + (new Date().getTime() - DAY_IN_MS)
                                }
                            },
                            ExpressionAttributeNames: {
                                "#time": 'time'
                            },
                            KeyConditionExpression: "sensorId = :sensor AND #time > :time",
                            // FilterExpression: "#time > :time",
                            TableName: "ember"
                        }, function (err, data) {
                            if (err) {
                                reject(err);
                                return;
                            }
                            resolve(data.Items);
                        });
                    })];
            case 3:
                results2 = _a.sent();
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        dbclient.query({
                            ExpressionAttributeValues: {
                                ":sensor": {
                                    S: "41225"
                                },
                                ":time": {
                                    N: "" + (new Date().getTime() - DAY_IN_MS)
                                }
                            },
                            ExpressionAttributeNames: {
                                "#time": 'time'
                            },
                            KeyConditionExpression: "sensorId = :sensor AND #time > :time",
                            // FilterExpression: "#time > :time",
                            TableName: "ember"
                        }, function (err, data) {
                            if (err) {
                                reject(err);
                                return;
                            }
                            resolve(data.Items);
                        });
                    })];
            case 4:
                results3 = _a.sent();
                drawGraph("#my_dataviz", results, null, 20);
                drawGraph("#my_dataviz2", results2, weather);
                drawGraph("#my_dataviz3", results3, weather);
                return [2 /*return*/];
        }
    });
}); })();


/***/ }),

/***/ "./node_modules/webpack/hot sync ^\\.\\/log$":
/*!***************************************************************!*\
  !*** ./node_modules/webpack/hot/ sync nonrecursive ^\.\/log$ ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./log": "./node_modules/webpack/hot/log.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/webpack/hot sync ^\\.\\/log$";

/***/ }),

/***/ "?65c5":
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/***/ (() => {

/* (ignored) */

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// the startup function
/******/ 	// It's empty as some runtime module handles the default behavior
/******/ 	__webpack_require__.x = x => {}
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// Promise = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		var deferredModules = [
/******/ 			["./src/main.ts","vendors"],
/******/ 			["./node_modules/webpack-dev-server/client/index.js?http://0.0.0.0:8083","vendors"]
/******/ 		];
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		var checkDeferredModules = x => {};
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime, executeModules] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0, resolves = [];
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					resolves.push(installedChunks[chunkId][0]);
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			while(resolves.length) {
/******/ 				resolves.shift()();
/******/ 			}
/******/ 		
/******/ 			// add entry modules from loaded chunk to deferred list
/******/ 			if(executeModules) deferredModules.push.apply(deferredModules, executeModules);
/******/ 		
/******/ 			// run deferred modules when all chunks ready
/******/ 			return checkDeferredModules();
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkdisplay"] = self["webpackChunkdisplay"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 		
/******/ 		function checkDeferredModulesImpl() {
/******/ 			var result;
/******/ 			for(var i = 0; i < deferredModules.length; i++) {
/******/ 				var deferredModule = deferredModules[i];
/******/ 				var fulfilled = true;
/******/ 				for(var j = 1; j < deferredModule.length; j++) {
/******/ 					var depId = deferredModule[j];
/******/ 					if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferredModules.splice(i--, 1);
/******/ 					result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 				}
/******/ 			}
/******/ 			if(deferredModules.length === 0) {
/******/ 				__webpack_require__.x();
/******/ 				__webpack_require__.x = x => {};
/******/ 			}
/******/ 			return result;
/******/ 		}
/******/ 		var startup = __webpack_require__.x;
/******/ 		__webpack_require__.x = () => {
/******/ 			// reset startup function so it can be called again when more startup code is added
/******/ 			__webpack_require__.x = startup || (x => {});
/******/ 			return (checkDeferredModules = checkDeferredModulesImpl)();
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// run startup
/******/ 	return __webpack_require__.x();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaXNwbGF5Ly4vc3JjL21haW4udHMiLCJ3ZWJwYWNrOi8vZGlzcGxheS8vVXNlcnMvd2lsbGJyaW5kbGUvcmVwb3Mvd2lsbGJyaW5kbGUvZW1iZXIvZGlzcGxheS9ub2RlX21vZHVsZXMvd2VicGFjay9ob3R8c3luY3xub25yZWN1cnNpdmV8L15cXC5cXC9sb2ckLyIsIndlYnBhY2s6Ly9kaXNwbGF5L2lnbm9yZWR8ZnMiLCJ3ZWJwYWNrOi8vZGlzcGxheS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9kaXNwbGF5L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9kaXNwbGF5L3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vZGlzcGxheS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2Rpc3BsYXkvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9kaXNwbGF5L3dlYnBhY2svcnVudGltZS9ub2RlIG1vZHVsZSBkZWNvcmF0b3IiLCJ3ZWJwYWNrOi8vZGlzcGxheS93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9kaXNwbGF5L3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxRUFBeUI7QUFDekIsc0ZBQStCO0FBRS9CLElBQU0sU0FBUyxHQUFHLElBQUksZUFBZSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7QUFFOUQsSUFBTSxRQUFRLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDO0lBQzlCLFdBQVcsRUFBRSxJQUFJLEdBQUcsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FB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QUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN4RSxLQUFLLENBQUMsQ0FBRSxNQUFNLEVBQUUsQ0FBQyxDQUFFLENBQUMsQ0FBQztRQUV0QixJQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQzthQUM1QixJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXRCLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO2FBQ2xCLEtBQUssQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTO1FBQzFDLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO2FBQ2xCLEtBQUssQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTO1FBQzFDLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO2FBQ2xCLEtBQUssQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTO1FBQ3hDLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO2FBQ2xCLEtBQUssQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTO1FBQzFDLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO2FBQ2xCLEtBQUssQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTO1FBQzFDLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO2FBQ2xCLEtBQUssQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTO1FBRXhDLElBQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQyxJQUFJLEVBQUU7YUFDakIsQ0FBQyxDQUFDLFVBQUMsQ0FBTSxJQUFLLFFBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQVQsQ0FBUyxDQUFDO2FBQ3hCLENBQUMsQ0FBQyxVQUFDLENBQU0sSUFBSyxRQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFWLENBQVUsQ0FBQzthQUN6QixLQUFLLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRTFCLElBQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQyxJQUFJLEVBQUU7YUFDbEIsQ0FBQyxDQUFDLFVBQUMsQ0FBTSxJQUFLLFFBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQVQsQ0FBUyxDQUFDO2FBQ3hCLENBQUMsQ0FBQyxVQUFDLENBQU0sSUFBSyxRQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFWLENBQVUsQ0FBQzthQUN6QixLQUFLLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRTFCOzs7OztVQUtFO1FBRUYsNENBQTRDO1FBQzVDLElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNwQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNsQyxJQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEIsSUFBSSxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUNqQixTQUFTO2FBQ1o7WUFDRCxJQUFJLFVBQVUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEtBQUssVUFBVSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFO2dCQUNqRixVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO2FBQzVFO2lCQUFNO2dCQUNILFVBQVUsQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO2FBQ3REO1NBQ0o7UUFDRCxVQUFVLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxXQUFDLElBQUksUUFBQyxDQUFDLEtBQUssS0FBSyxDQUFDLEVBQWIsQ0FBYSxDQUFDLENBQUM7UUFFbkQsR0FBRzthQUNFLFNBQVMsQ0FBQyxNQUFNLENBQUM7YUFDakIsSUFBSSxDQUFDLFVBQVUsQ0FBQzthQUNoQixLQUFLLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO2FBQ3RCLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBUyxDQUFNLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsZ0VBQWdFO2FBQ3pJLElBQUksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDO2FBQ3RCLElBQUksQ0FBQyxTQUFTLEVBQUUsVUFBUyxDQUFNLElBQUksT0FBTyxDQUFDLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDO2FBQ3JFLElBQUksQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDO2FBQ3ZCLElBQUksQ0FBQyxHQUFHLEVBQUUsVUFBUyxDQUFNLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUFDLENBQUMsQ0FBQzthQUNyRCxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRWxCLElBQUksV0FBVyxFQUFFO1lBQ2IsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7Z0JBQ2QsZUFBZTtpQkFDZCxLQUFLLENBQUMsV0FBVyxDQUFDO2lCQUNsQixJQUFJLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQztpQkFDcEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUM7aUJBQ3pCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO2lCQUN2QixJQUFJLENBQUMsR0FBRyxFQUFPLEtBQUssQ0FBQyxDQUFDO1NBQzlCO1FBRUQsZUFBZTtRQUNmLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1lBQ2QsZUFBZTthQUNkLEtBQUssQ0FBQyxjQUFjLENBQUM7YUFDckIsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7YUFDcEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUM7YUFDekIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7YUFDdkIsSUFBSSxDQUFDLEdBQUcsRUFBTyxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDOzs7OztnQkE1T0ssU0FBUyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztnQkFDaEMsS0FBSyxHQUFHLENBQUMsQ0FBQztnQkFFQSxxQkFBTSxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO3dCQUM5QyxRQUFRLENBQUMsS0FBSyxDQUFDOzRCQUNYLHlCQUF5QixFQUFFO2dDQUN2QixTQUFTLEVBQUU7b0NBQ1AsQ0FBQyxFQUFFLE9BQU87aUNBQ2I7Z0NBQ0QsT0FBTyxFQUFFO29DQUNMLENBQUMsRUFBRSxNQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsU0FBUyxDQUFFO2lDQUMzQzs2QkFDSjs0QkFDRCx3QkFBd0IsRUFBRTtnQ0FDdEIsT0FBTyxFQUFFLE1BQU07NkJBQ2xCOzRCQUNELHNCQUFzQixFQUFFLHNDQUFzQzs0QkFDOUQscUNBQXFDOzRCQUNyQyxTQUFTLEVBQUUsT0FBTzt5QkFDckIsRUFBRSxVQUFDLEdBQUcsRUFBRSxJQUFJOzRCQUNULElBQUksR0FBRyxFQUFFO2dDQUNMLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQ0FDWixPQUFPOzZCQUNWOzRCQUNELE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ3hCLENBQUMsQ0FBQyxDQUFDO29CQUNQLENBQUMsQ0FBQzs7Z0JBdkJJLE9BQU8sR0FBRyxTQXVCZDtnQkFFYyxxQkFBTSxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO3dCQUM5QyxRQUFRLENBQUMsS0FBSyxDQUFDOzRCQUNYLHlCQUF5QixFQUFFO2dDQUN2QixLQUFLLEVBQUU7b0NBQ0gsQ0FBQyxFQUFFLFNBQVM7aUNBQ2Y7Z0NBQ0QsT0FBTyxFQUFFO29DQUNMLENBQUMsRUFBRSxLQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBRztpQ0FDaEU7NkJBQ0o7NEJBQ0Qsc0JBQXNCLEVBQUUseUJBQXlCOzRCQUNqRCxTQUFTLEVBQUUsU0FBUzt5QkFDdkIsRUFBRSxVQUFDLEdBQUcsRUFBRSxJQUFJOzRCQUNULElBQUksR0FBRyxFQUFFO2dDQUNMLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQ0FDWixPQUFPOzZCQUNWOzRCQUNELE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ3hCLENBQUMsQ0FBQyxDQUFDO29CQUNQLENBQUMsQ0FBQzs7Z0JBbkJJLE9BQU8sR0FBRyxTQW1CZDtnQkFFZSxxQkFBTSxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO3dCQUMvQyxRQUFRLENBQUMsS0FBSyxDQUFDOzRCQUNYLHlCQUF5QixFQUFFO2dDQUN2QixTQUFTLEVBQUU7b0NBQ1AsQ0FBQyxFQUFFLE9BQU87aUNBQ2I7Z0NBQ0QsT0FBTyxFQUFFO29DQUNMLENBQUMsRUFBRSxNQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsU0FBUyxDQUFFO2lDQUMzQzs2QkFDSjs0QkFDRCx3QkFBd0IsRUFBRTtnQ0FDdEIsT0FBTyxFQUFFLE1BQU07NkJBQ2xCOzRCQUNELHNCQUFzQixFQUFFLHNDQUFzQzs0QkFDOUQscUNBQXFDOzRCQUNyQyxTQUFTLEVBQUUsT0FBTzt5QkFDckIsRUFBRSxVQUFDLEdBQUcsRUFBRSxJQUFJOzRCQUNULElBQUksR0FBRyxFQUFFO2dDQUNMLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQ0FDWixPQUFPOzZCQUNWOzRCQUNELE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ3hCLENBQUMsQ0FBQyxDQUFDO29CQUNQLENBQUMsQ0FBQzs7Z0JBdkJJLFFBQVEsR0FBRyxTQXVCZjtnQkFFZSxxQkFBTSxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO3dCQUMvQyxRQUFRLENBQUMsS0FBSyxDQUFDOzRCQUNYLHlCQUF5QixFQUFFO2dDQUN2QixTQUFTLEVBQUU7b0NBQ1AsQ0FBQyxFQUFFLE9BQU87aUNBQ2I7Z0NBQ0QsT0FBTyxFQUFFO29DQUNMLENBQUMsRUFBRSxNQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsU0FBUyxDQUFFO2lDQUMzQzs2QkFDSjs0QkFDRCx3QkFBd0IsRUFBRTtnQ0FDdEIsT0FBTyxFQUFFLE1BQU07NkJBQ2xCOzRCQUNELHNCQUFzQixFQUFFLHNDQUFzQzs0QkFDOUQscUNBQXFDOzRCQUNyQyxTQUFTLEVBQUUsT0FBTzt5QkFDckIsRUFBRSxVQUFDLEdBQUcsRUFBRSxJQUFJOzRCQUNULElBQUksR0FBRyxFQUFFO2dDQUNMLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQ0FDWixPQUFPOzZCQUNWOzRCQUNELE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ3hCLENBQUMsQ0FBQyxDQUFDO29CQUNQLENBQUMsQ0FBQzs7Z0JBdkJJLFFBQVEsR0FBRyxTQXVCZjtnQkE2SUYsU0FBUyxDQUFDLGFBQWEsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUM1QyxTQUFTLENBQUMsY0FBYyxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDN0MsU0FBUyxDQUFDLGNBQWMsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7Ozs7S0FDaEQsQ0FBQyxFQUFFLENBQUM7Ozs7Ozs7Ozs7O0FDN1BMO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtFOzs7Ozs7Ozs7O0FDdEJBLGU7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7V0MvQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsRUFBRTtXQUNGO1dBQ0E7V0FDQSxDQUFDLEk7Ozs7O1dDUEQsc0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7O1dDTkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxFOzs7OztXQ0pBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0sb0JBQW9CO1dBQzFCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0EsZUFBZSw0QkFBNEI7V0FDM0M7V0FDQTtXQUNBLGdCQUFnQiwyQkFBMkI7V0FDM0M7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLDRDQUE0QztXQUM1QztXQUNBLEU7Ozs7VUNyRkE7VUFDQSIsImZpbGUiOiJtYWluLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGQzIGZyb20gXCJkM1wiO1xuaW1wb3J0ICogYXMgQVdTIGZyb20gXCJhd3Mtc2RrXCI7XG5cbmNvbnN0IHVybFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCk7XG5cbmNvbnN0IGRiY2xpZW50ID0gbmV3IEFXUy5EeW5hbW9EQih7XG4gICAgY3JlZGVudGlhbHM6IG5ldyBBV1MuQ3JlZGVudGlhbHModXJsUGFyYW1zLmdldCgnYWNjZXNzJyksIHVybFBhcmFtcy5nZXQoJ3NlY3JldCcpKSxcbiAgICByZWdpb246ICdldS13ZXN0LTEnLFxufSk7XG5cbihhc3luYyAoKSA9PiB7XG5cbiAgICBjb25zdCBEQVlfSU5fTVMgPSAyNCAqIDYwICogNjAgKiAxMDAwO1xuICAgIGNvbnN0IE1JTl9YID0gMDtcblxuICAgIGNvbnN0IHJlc3VsdHMgPSBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGRiY2xpZW50LnF1ZXJ5KHtcbiAgICAgICAgICAgIEV4cHJlc3Npb25BdHRyaWJ1dGVWYWx1ZXM6IHtcbiAgICAgICAgICAgICAgICBcIjpzZW5zb3JcIjoge1xuICAgICAgICAgICAgICAgICAgICBTOiBcIjQxMjIzXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFwiOnRpbWVcIjoge1xuICAgICAgICAgICAgICAgICAgICBOOiBgJHtuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIERBWV9JTl9NU31gXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIEV4cHJlc3Npb25BdHRyaWJ1dGVOYW1lczoge1xuICAgICAgICAgICAgICAgIFwiI3RpbWVcIjogJ3RpbWUnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgS2V5Q29uZGl0aW9uRXhwcmVzc2lvbjogXCJzZW5zb3JJZCA9IDpzZW5zb3IgQU5EICN0aW1lID4gOnRpbWVcIixcbiAgICAgICAgICAgIC8vIEZpbHRlckV4cHJlc3Npb246IFwiI3RpbWUgPiA6dGltZVwiLFxuICAgICAgICAgICAgVGFibGVOYW1lOiBcImVtYmVyXCJcbiAgICAgICAgfSwgKGVyciwgZGF0YSkgPT4ge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc29sdmUoZGF0YS5JdGVtcyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgY29uc3Qgd2VhdGhlciA9IGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgZGJjbGllbnQucXVlcnkoe1xuICAgICAgICAgICAgRXhwcmVzc2lvbkF0dHJpYnV0ZVZhbHVlczoge1xuICAgICAgICAgICAgICAgIFwiOmlkXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgUzogJzI2NDQ4NDknXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBcIjp0aW1lXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgTjogYCR7TWF0aC5mbG9vcigobmV3IERhdGUoKS5nZXRUaW1lKCkgLSBEQVlfSU5fTVMpIC8gMTAwMCl9YFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBLZXlDb25kaXRpb25FeHByZXNzaW9uOiBcImlkID0gOmlkIEFORCBkdCA+IDp0aW1lXCIsXG4gICAgICAgICAgICBUYWJsZU5hbWU6IFwid2VhdGhlclwiXG4gICAgICAgIH0sIChlcnIsIGRhdGEpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXNvbHZlKGRhdGEuSXRlbXMpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGNvbnN0IHJlc3VsdHMyID0gYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBkYmNsaWVudC5xdWVyeSh7XG4gICAgICAgICAgICBFeHByZXNzaW9uQXR0cmlidXRlVmFsdWVzOiB7XG4gICAgICAgICAgICAgICAgXCI6c2Vuc29yXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgUzogXCI0MTIyNFwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBcIjp0aW1lXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgTjogYCR7bmV3IERhdGUoKS5nZXRUaW1lKCkgLSBEQVlfSU5fTVN9YFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBFeHByZXNzaW9uQXR0cmlidXRlTmFtZXM6IHtcbiAgICAgICAgICAgICAgICBcIiN0aW1lXCI6ICd0aW1lJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIEtleUNvbmRpdGlvbkV4cHJlc3Npb246IFwic2Vuc29ySWQgPSA6c2Vuc29yIEFORCAjdGltZSA+IDp0aW1lXCIsXG4gICAgICAgICAgICAvLyBGaWx0ZXJFeHByZXNzaW9uOiBcIiN0aW1lID4gOnRpbWVcIixcbiAgICAgICAgICAgIFRhYmxlTmFtZTogXCJlbWJlclwiXG4gICAgICAgIH0sIChlcnIsIGRhdGEpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXNvbHZlKGRhdGEuSXRlbXMpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGNvbnN0IHJlc3VsdHMzID0gYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBkYmNsaWVudC5xdWVyeSh7XG4gICAgICAgICAgICBFeHByZXNzaW9uQXR0cmlidXRlVmFsdWVzOiB7XG4gICAgICAgICAgICAgICAgXCI6c2Vuc29yXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgUzogXCI0MTIyNVwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBcIjp0aW1lXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgTjogYCR7bmV3IERhdGUoKS5nZXRUaW1lKCkgLSBEQVlfSU5fTVN9YFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBFeHByZXNzaW9uQXR0cmlidXRlTmFtZXM6IHtcbiAgICAgICAgICAgICAgICBcIiN0aW1lXCI6ICd0aW1lJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIEtleUNvbmRpdGlvbkV4cHJlc3Npb246IFwic2Vuc29ySWQgPSA6c2Vuc29yIEFORCAjdGltZSA+IDp0aW1lXCIsXG4gICAgICAgICAgICAvLyBGaWx0ZXJFeHByZXNzaW9uOiBcIiN0aW1lID4gOnRpbWVcIixcbiAgICAgICAgICAgIFRhYmxlTmFtZTogXCJlbWJlclwiXG4gICAgICAgIH0sIChlcnIsIGRhdGEpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXNvbHZlKGRhdGEuSXRlbXMpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGRyYXdHcmFwaChjb250YWluZXIsIHJlc3VsdHMsIHdlYXRoZXIsIG1pblkgPSBNSU5fWCkge1xuICAgICAgICAvLyBzZXQgdGhlIGRpbWVuc2lvbnMgYW5kIG1hcmdpbnMgb2YgdGhlIGdyYXBoXG4gICAgICAgIHZhciBtYXJnaW4gPSB7dG9wOiA0MCwgcmlnaHQ6IDMwLCBib3R0b206IDMwLCBsZWZ0OiA2MH0sXG4gICAgICAgICAgICB3aWR0aCA9IDQ2MCAtIG1hcmdpbi5sZWZ0IC0gbWFyZ2luLnJpZ2h0LFxuICAgICAgICAgICAgaGVpZ2h0ID0gNDAwIC0gbWFyZ2luLnRvcCAtIG1hcmdpbi5ib3R0b207XG5cbiAgICAgICAgLy8gYXBwZW5kIHRoZSBzdmcgb2JqZWN0IHRvIHRoZSBib2R5IG9mIHRoZSBwYWdlXG4gICAgICAgIHZhciBzdmcgPSBkMy5zZWxlY3QoY29udGFpbmVyKVxuICAgICAgICAuYXBwZW5kKFwic3ZnXCIpXG4gICAgICAgICAgICAuYXR0cihcIndpZHRoXCIsIHdpZHRoICsgbWFyZ2luLmxlZnQgKyBtYXJnaW4ucmlnaHQpXG4gICAgICAgICAgICAuYXR0cihcImhlaWdodFwiLCBoZWlnaHQgKyBtYXJnaW4udG9wICsgbWFyZ2luLmJvdHRvbSlcbiAgICAgICAgLmFwcGVuZChcImdcIilcbiAgICAgICAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsXG4gICAgICAgICAgICAgICAgXCJ0cmFuc2xhdGUoXCIgKyBtYXJnaW4ubGVmdCArIFwiLFwiICsgbWFyZ2luLnRvcCArIFwiKVwiKTtcblxuICAgICAgICBzdmcuYXBwZW5kKFwidGV4dFwiKVxuICAgICAgICAgICAgLmF0dHIoJ2ZvbnQtZmFtaWx5JywgJ3NhbnMtc2VyaWYnKVxuICAgICAgICAgICAgLmF0dHIoJ2ZvbnQtd2VpZ2h0JywgJ2JvbGQnKVxuICAgICAgICAgICAgLmF0dHIoJ2ZvbnQtc2l6ZScsICcyNHB4JylcbiAgICAgICAgICAgIC5hdHRyKCdmaWxsJywgJyM1ODU0NmEnKVxuICAgICAgICAgICAgLmF0dHIoJ3knLCAtMTApIC8vIFRPRE86IHNldHRpbmdcbiAgICAgICAgICAgIC50ZXh0KHJlc3VsdHNbMF0ubmFtZS5TKTtcblxuXG4gICAgICAgIGNvbnN0IGRhdGEgPSAoPEFycmF5PGFueT4+cmVzdWx0cylcbiAgICAgICAgICAgIC5tYXAoZCA9PiAoe1xuICAgICAgICAgICAgICAgIGRhdGUgOiBkMy50aW1lUGFyc2UoXCIlUVwiKShkLnRpbWUuTiksXG4gICAgICAgICAgICAgICAgdmFsdWU6IE51bWJlcihkLnRlbXBlcmF0dXJlLk4pLFxuICAgICAgICAgICAgICAgIHN0YXR1czogZC5zdGF0dXMgPyBOdW1iZXIoZC5zdGF0dXMuTikgOiAtMVxuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIGxldCB3ZWF0aGVyRGF0YSA9IFtdO1xuICAgICAgICBpZiAod2VhdGhlcikge1xuICAgICAgICAgICAgd2VhdGhlckRhdGEgPSB3ZWF0aGVyLm1hcChkID0+ICh7XG4gICAgICAgICAgICAgICAgZGF0ZTogZDMudGltZVBhcnNlKFwiJXNcIikoZC5kdC5OKSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogTnVtYmVyKGQubWFpbi5NLnRlbXAuTikgLTI3My4xNSwgLy8gS2VsdmluIHRvIENcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGFnZ3JlZ2F0ZWREYXRhID0gW107XG4gICAgICAgIGNvbnN0IHJvbGx1cEFtb3VudCA9IDE1ICogNjAgKiAxMDAwOyAvLyAxNSBtaW5zXG4gICAgICAgIGQzLnJvbGx1cChkYXRhLCB2ID0+IGQzLm1lYW4odiwgKGQ6IGFueSkgPT4gZC52YWx1ZSksIChkOiBhbnkpID0+IE1hdGguZmxvb3IoZC5kYXRlIC8gcm9sbHVwQW1vdW50KSAqIHJvbGx1cEFtb3VudCApXG4gICAgICAgICAgICAuZm9yRWFjaCgodmFsLCBrZXkpID0+IHtcbiAgICAgICAgICAgICAgICBhZ2dyZWdhdGVkRGF0YS5wdXNoKHsgdmFsdWU6IHZhbCwgZGF0ZToga2V5IH0pO1xuICAgICAgICAgICAgfSlcblxuXG4gICAgICAgIC8vIEFkZCBYIGF4aXMgLS0+IGl0IGlzIGEgZGF0ZSBmb3JtYXRcbiAgICAgICAgdmFyIHggPSBkMy5zY2FsZVRpbWUoKVxuICAgICAgICAuZG9tYWluKGQzLmV4dGVudChhZ2dyZWdhdGVkRGF0YSwgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5kYXRlOyB9KSlcbiAgICAgICAgLnJhbmdlKFsgMCwgd2lkdGggXSk7XG4gICAgICAgIGNvbnN0IGF4aXNYID0gc3ZnLmFwcGVuZChcImdcIilcbiAgICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoMCxcIiArIGhlaWdodCArIFwiKVwiKVxuICAgICAgICAuY2FsbChkMy5heGlzQm90dG9tKHgpKTtcblxuICAgICAgICAvLyBBZGQgWSBheGlzXG4gICAgICAgIHZhciB5ID0gZDMuc2NhbGVMaW5lYXIoKVxuICAgICAgICAuZG9tYWluKFttaW5ZLCBkMy5tYXgoYWdncmVnYXRlZERhdGEsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuICtkLnZhbHVlOyB9KV0pXG4gICAgICAgIC5yYW5nZShbIGhlaWdodCwgMCBdKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGF4aXNZID0gc3ZnLmFwcGVuZChcImdcIilcbiAgICAgICAgLmNhbGwoZDMuYXhpc0xlZnQoeSkpO1xuXG4gICAgICAgIGF4aXNZLnNlbGVjdEFsbChcImxpbmVcIilcbiAgICAgICAgICAgIC5zdHlsZShcInN0cm9rZVwiLCBcIiNhYWI4YzlcIik7IC8vIGUxZTNlYlxuICAgICAgICBheGlzWS5zZWxlY3RBbGwoXCJwYXRoXCIpXG4gICAgICAgICAgICAuc3R5bGUoXCJzdHJva2VcIiwgXCIjYWFiOGM5XCIpOyAvLyBlMWUzZWJcbiAgICAgICAgYXhpc1kuc2VsZWN0QWxsKFwidGV4dFwiKVxuICAgICAgICAgICAgLnN0eWxlKFwiZmlsbFwiLCBcIiNhYWI4YzlcIik7IC8vIGUxZTNlYlxuICAgICAgICBheGlzWC5zZWxlY3RBbGwoXCJsaW5lXCIpXG4gICAgICAgICAgICAuc3R5bGUoXCJzdHJva2VcIiwgXCIjYWFiOGM5XCIpOyAvLyBlMWUzZWJcbiAgICAgICAgYXhpc1guc2VsZWN0QWxsKFwicGF0aFwiKVxuICAgICAgICAgICAgLnN0eWxlKFwic3Ryb2tlXCIsIFwiI2FhYjhjOVwiKTsgLy8gZTFlM2ViXG4gICAgICAgIGF4aXNYLnNlbGVjdEFsbChcInRleHRcIilcbiAgICAgICAgICAgIC5zdHlsZShcImZpbGxcIiwgXCIjYWFiOGM5XCIpOyAvLyBlMWUzZWJcblxuICAgICAgICBjb25zdCBsaW5lID0gZDMubGluZSgpIFxuICAgICAgICAgICAgLngoKGQ6IGFueSkgPT4geChkLmRhdGUpKVxuICAgICAgICAgICAgLnkoKGQ6IGFueSkgPT4geShkLnZhbHVlKSlcbiAgICAgICAgICAgIC5jdXJ2ZShkMy5jdXJ2ZUJhc2lzKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGxpbmUyID0gZDMubGluZSgpIFxuICAgICAgICAgICAgLngoKGQ6IGFueSkgPT4geChkLmRhdGUpKVxuICAgICAgICAgICAgLnkoKGQ6IGFueSkgPT4geShkLnZhbHVlKSlcbiAgICAgICAgICAgIC5jdXJ2ZShkMy5jdXJ2ZUJhc2lzKTtcblxuICAgICAgICAvKlxuICAgICAgICBjb25zdCB3ZWF0aGVyTGluZSA9IGQzLmxpbmUoKSBcbiAgICAgICAgICAgIC54KChkOiBhbnkpID0+IHgoZC5kYXRlKSlcbiAgICAgICAgICAgIC55KChkOiBhbnkpID0+IHkoZC52YWx1ZSkpXG4gICAgICAgICAgICAuY3VydmUoZDMuY3VydmVCYXNpcyk7XG4gICAgICAgICovXG5cbiAgICAgICAgLy8gQmFja2dyb3VuZCB0byBzaG93IHdoZXRoZXIgaXQncyBvbiBvciBvZmZcbiAgICAgICAgbGV0IHN0YXR1c0RhdGEgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBkID0gZGF0YVtpXTtcbiAgICAgICAgICAgIGlmIChkLnN0YXR1cyA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzdGF0dXNEYXRhLmxlbmd0aCA9PT0gMCB8fCBkLnN0YXR1cyAhPT0gc3RhdHVzRGF0YVtzdGF0dXNEYXRhLmxlbmd0aCAtIDFdLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgc3RhdHVzRGF0YS5wdXNoKHsgc3RhcnRUaW1lOiBkLmRhdGUsIGVuZFRpbWU6IGQuZGF0ZSwgdmFsdWU6IGQuc3RhdHVzIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdGF0dXNEYXRhW3N0YXR1c0RhdGEubGVuZ3RoIC0gMV0uZW5kVGltZSA9IGQuZGF0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzdGF0dXNEYXRhID0gc3RhdHVzRGF0YS5maWx0ZXIocyA9PiBzLnZhbHVlICE9PSAxKTtcblxuICAgICAgICBzdmdcbiAgICAgICAgICAgIC5zZWxlY3RBbGwoXCJyZWN0XCIpXG4gICAgICAgICAgICAuZGF0YShzdGF0dXNEYXRhKVxuICAgICAgICAgICAgLmVudGVyKCkuYXBwZW5kKFwicmVjdFwiKVxuICAgICAgICAgICAgLmF0dHIoXCJ3aWR0aFwiLCBmdW5jdGlvbihkOiBhbnkpIHsgcmV0dXJuIHgoZC5lbmRUaW1lKSAtIHgoZC5zdGFydFRpbWUpIH0pIC8vIFRPRE86IHNob3VsZCBtYWtlIHRoaXMgZ28gdG8gd2hlbmV2ZXIgdGhlIG5leHQgb25lIGlzIGluc3RlYWRcbiAgICAgICAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGhlaWdodClcbiAgICAgICAgICAgIC5hdHRyKFwib3BhY2l0eVwiLCBmdW5jdGlvbihkOiBhbnkpIHsgcmV0dXJuIGQudmFsdWUgPT09IDEgPyAwIDogMC4xNSB9KVxuICAgICAgICAgICAgLmF0dHIoXCJmaWxsXCIsICcjZmYzNDU2JylcbiAgICAgICAgICAgIC5hdHRyKFwieFwiLCBmdW5jdGlvbihkOiBhbnkpIHsgcmV0dXJuIHgoZC5zdGFydFRpbWUpIH0pXG4gICAgICAgICAgICAuYXR0cihcInlcIiwgMCk7XG5cbiAgICAgICAgaWYgKHdlYXRoZXJEYXRhKSB7XG4gICAgICAgICAgICBzdmcuYXBwZW5kKFwicGF0aFwiKVxuICAgICAgICAgICAgICAgIC8vIC5kYXR1bShkYXRhKVxuICAgICAgICAgICAgICAgIC5kYXR1bSh3ZWF0aGVyRGF0YSlcbiAgICAgICAgICAgICAgICAuYXR0cihcImZpbGxcIiwgXCJub25lXCIpXG4gICAgICAgICAgICAgICAgLmF0dHIoXCJzdHJva2VcIiwgXCIjYWFiOGM5XCIpXG4gICAgICAgICAgICAgICAgLmF0dHIoXCJzdHJva2Utd2lkdGhcIiwgMylcbiAgICAgICAgICAgICAgICAuYXR0cihcImRcIiwgPGFueT5saW5lMik7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIEFkZCB0aGUgbGluZVxuICAgICAgICBzdmcuYXBwZW5kKFwicGF0aFwiKVxuICAgICAgICAgICAgLy8gLmRhdHVtKGRhdGEpXG4gICAgICAgICAgICAuZGF0dW0oYWdncmVnYXRlZERhdGEpXG4gICAgICAgICAgICAuYXR0cihcImZpbGxcIiwgXCJub25lXCIpXG4gICAgICAgICAgICAuYXR0cihcInN0cm9rZVwiLCBcIiMwMDY2ZmZcIilcbiAgICAgICAgICAgIC5hdHRyKFwic3Ryb2tlLXdpZHRoXCIsIDMpXG4gICAgICAgICAgICAuYXR0cihcImRcIiwgPGFueT5saW5lKTtcbiAgICB9XG5cbiAgICBkcmF3R3JhcGgoXCIjbXlfZGF0YXZpelwiLCByZXN1bHRzLCBudWxsLCAyMCk7XG4gICAgZHJhd0dyYXBoKFwiI215X2RhdGF2aXoyXCIsIHJlc3VsdHMyLCB3ZWF0aGVyKTtcbiAgICBkcmF3R3JhcGgoXCIjbXlfZGF0YXZpejNcIiwgcmVzdWx0czMsIHdlYXRoZXIpO1xufSkoKTsiLCJ2YXIgbWFwID0ge1xuXHRcIi4vbG9nXCI6IFwiLi9ub2RlX21vZHVsZXMvd2VicGFjay9ob3QvbG9nLmpzXCJcbn07XG5cblxuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHZhciBpZCA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpO1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhpZCk7XG59XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8obWFwLCByZXEpKSB7XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdHJldHVybiBtYXBbcmVxXTtcbn1cbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSBcIi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svaG90IHN5bmMgXlxcXFwuXFxcXC9sb2ckXCI7IiwiLyogKGlnbm9yZWQpICovIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0aWYoX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSkge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdGxvYWRlZDogZmFsc2UsXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuXHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4vLyB0aGUgc3RhcnR1cCBmdW5jdGlvblxuLy8gSXQncyBlbXB0eSBhcyBzb21lIHJ1bnRpbWUgbW9kdWxlIGhhbmRsZXMgdGhlIGRlZmF1bHQgYmVoYXZpb3Jcbl9fd2VicGFja19yZXF1aXJlX18ueCA9IHggPT4ge31cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5tZCA9IChtb2R1bGUpID0+IHtcblx0bW9kdWxlLnBhdGhzID0gW107XG5cdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0cmV0dXJuIG1vZHVsZTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbnZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXG5cdFtcIi4vc3JjL21haW4udHNcIixcInZlbmRvcnNcIl0sXG5cdFtcIi4vbm9kZV9tb2R1bGVzL3dlYnBhY2stZGV2LXNlcnZlci9jbGllbnQvaW5kZXguanM/aHR0cDovLzAuMC4wLjA6ODA4M1wiLFwidmVuZG9yc1wiXVxuXTtcbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbnZhciBjaGVja0RlZmVycmVkTW9kdWxlcyA9IHggPT4ge307XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lLCBleGVjdXRlTW9kdWxlc10gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdH1cblx0fVxuXHRpZihydW50aW1lKSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuXHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcblx0fVxuXG5cdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3Rcblx0aWYoZXhlY3V0ZU1vZHVsZXMpIGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMpO1xuXG5cdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtkaXNwbGF5XCJdID0gc2VsZltcIndlYnBhY2tDaHVua2Rpc3BsYXlcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpO1xuXG5mdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlc0ltcGwoKSB7XG5cdHZhciByZXN1bHQ7XG5cdGZvcih2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgZGVmZXJyZWRNb2R1bGUgPSBkZWZlcnJlZE1vZHVsZXNbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yKHZhciBqID0gMTsgaiA8IGRlZmVycmVkTW9kdWxlLmxlbmd0aDsgaisrKSB7XG5cdFx0XHR2YXIgZGVwSWQgPSBkZWZlcnJlZE1vZHVsZVtqXTtcblx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tkZXBJZF0gIT09IDApIGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkTW9kdWxlcy5zcGxpY2UoaS0tLCAxKTtcblx0XHRcdHJlc3VsdCA9IF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gZGVmZXJyZWRNb2R1bGVbMF0pO1xuXHRcdH1cblx0fVxuXHRpZihkZWZlcnJlZE1vZHVsZXMubGVuZ3RoID09PSAwKSB7XG5cdFx0X193ZWJwYWNrX3JlcXVpcmVfXy54KCk7XG5cdFx0X193ZWJwYWNrX3JlcXVpcmVfXy54ID0geCA9PiB7fTtcblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufVxudmFyIHN0YXJ0dXAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLng7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnggPSAoKSA9PiB7XG5cdC8vIHJlc2V0IHN0YXJ0dXAgZnVuY3Rpb24gc28gaXQgY2FuIGJlIGNhbGxlZCBhZ2FpbiB3aGVuIG1vcmUgc3RhcnR1cCBjb2RlIGlzIGFkZGVkXG5cdF9fd2VicGFja19yZXF1aXJlX18ueCA9IHN0YXJ0dXAgfHwgKHggPT4ge30pO1xuXHRyZXR1cm4gKGNoZWNrRGVmZXJyZWRNb2R1bGVzID0gY2hlY2tEZWZlcnJlZE1vZHVsZXNJbXBsKSgpO1xufTsiLCIvLyBydW4gc3RhcnR1cFxucmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ueCgpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==