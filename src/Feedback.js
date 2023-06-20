import { useState } from "react";
import axios from "axios";


export default function Feedback()
{
	const [name, setName] = useState("");
	const [fb, setFb] = useState("excellent");
	const [ans, setAns] = useState("");

	const hName = (event) => { setName(event.target.value); }
	const hFb = (event) => { setFb(event.target.value); }
	
	const save = (event) => {
		event.preventDefault();
		let data = { name, fb}
		let urladd = "http://localhost:9999/save";
		axios.post(urladd, data)
		.then( res => {
		if (res.data.affectedRows == 1) {
			setAns("Thank u for ur feedback");
			setName("");
			setFb("excellent");
		}
		})
		.catch(err => {
			if (err.code == "ERR_NETWORK") {
				setAns("server down. pls try after some time");
			}
		})
	}

	return(
	<>
	<center>
	<h1> Feedback Please </h1>
	<form onSubmit={save}>
	<input type="text" placeholder="enter ur name "
	onChange={hName} value={name}/>
	<br/><br/>
	<input type="radio" name="f" value="excellent" defaultChecked={true}
	onChange={hFb}  checked={fb=="excellent"} /> Excellent
	<input type="radio" name="f" value="good" 
	onChange={hFb} checked={fb=="good"}/> Good
	<input type="radio" name="f" value="ok" 
	onChange={hFb} checked={fb=="ok"}/> Ok
	<br/><br/>
	<input type="submit"/>
	</form>
	<h1> { ans } </h1>
	</center>
	</>
	);
}





