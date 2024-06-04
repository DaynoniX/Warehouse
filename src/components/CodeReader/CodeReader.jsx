import {BarcodeScanner, useCamera, useScanning} from 'react-barcode-scanner'
import "react-barcode-scanner/polyfill"
import {useEffect, useRef, useState} from "react";

export default function CodeReader() {
	const video = useRef();
	const scanOptions = {
		delay: 1000,
		format: ['qr_code']
	}
	let visualList = [];

	const [getScannedBarcode, startScanning, endScanning] = useScanning(video, scanOptions);
	const [isCameraAvailable] = useCamera(video);
	const [list, setList] = useState([]);

	useEffect(() => {
		if (!isCameraAvailable){
			endScanning();
		} else {
			startScanning();
		}
	}, [isCameraAvailable, startScanning, endScanning])

	useEffect(() => {
		console.log(getScannedBarcode)
		if (getScannedBarcode) {
			setList(x => [...x, getScannedBarcode.rawValue])
		}
	}, [getScannedBarcode]);

	if (list.length > 0) {
		visualList = list.map((el, i) => <li key={'li_' + i}>{el}</li>)
	}

	return (
		<>
			<div className="video">
				<video ref={video} autoPlay={true} playsInline={true} muted={true}/>
			</div>
			<ul>
				{visualList}
			</ul>
		</>
	)
}