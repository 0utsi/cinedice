import { Link } from "react-router-dom";
import './Select.css'

export default function Select() {

	return (
		<div className="select">
			<Link to="/movie">Przejdź do Strony 1</Link>
			<Link to="/music">Przejdź do Strony 2</Link>
		</div>
	)
}