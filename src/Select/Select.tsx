import { Link } from "react-router-dom";
import './Select.css'

export default function Select() {

	return (
		<div className="select">
			<Link to="/movie">CineDice</Link>
			<Link to="/music">ListenThis</Link>
		</div>
	)
}