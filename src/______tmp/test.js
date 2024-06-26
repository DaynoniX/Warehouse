"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useScanning = void 0;
var tslib_1 = require("tslib");
var react_1 = require("react");
var DEFAULT_OPTIONS = {
	delay: 1000,
	formats: ['qr_code']
};
function useScanning(ref, provideOptions) {
	var _this = this;
	var _a = (0, react_1.useState)(),
		detectedBarcode = _a[0],
		setDetectBarcode = _a[1];
	var _b = (0, react_1.useState)(false),
		start = _b[0],
		setStart = _b[1];
	var options = (0, react_1.useMemo)(function () {
		return Object.assign({}, DEFAULT_OPTIONS, provideOptions);
	}, [provideOptions]);
	var scan = (0, react_1.useCallback)(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
		var target, detector, detected;
		return tslib_1.__generator(this, function (_a) {
			switch (_a.label) {
				case 0:
					target = ref.current;
					detector = new BarcodeDetector({
						formats: options.formats
					});
					return [4, detector.detect(target)];
				case 1:
					detected = (_a.sent())[0];
					if (detected !== undefined) {
						setDetectBarcode(detected);
					}
					return [2];
			}
		});
	}); }, [ref, options.formats]);
	(0, react_1.useEffect)(function () {
		var target = ref.current;
		if (target == null || !start)
			return;
		var cancelled = false;
		var timer;
		var frame = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
			return tslib_1.__generator(this, function (_a) {
				switch (_a.label) {
					case 0: return [4, scan()];
					case 1:
						_a.sent();
						if (!cancelled) {
							timer = window.setTimeout(frame, options.delay);
						}
						return [2];
				}
			});
		}); };
		timer = window.setTimeout(frame, options.delay);
		return function () {
			clearTimeout(timer);
			cancelled = true;
		};
	}, [start, ref, options.delay, scan]);
	var open = (0, react_1.useCallback)(function () {
		setStart(true);
	}, []);
	var close = (0, react_1.useCallback)(function () {
		setStart(false);
	}, []);
	return [detectedBarcode, open, close];
}
exports.useScanning = useScanning;
