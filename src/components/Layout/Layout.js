import TextArea from "../TextArea/TextArea";
import {BarcodeScanner} from "react-barcode-scanner";
import CodeReader from "../CodeReader/CodeReader";


export default function Layout() {
	return (
		<div className="layout">
			<TextArea>
				Here is the text
				<br/>

			</TextArea>
			<CodeReader/>
		</div>
	)
}