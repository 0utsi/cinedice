import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";


export default function Music() {

	return (
	<>
		<Link to="/"><FontAwesomeIcon className='back-btn' icon={faArrowLeft} /></Link>
		<div className="music">MUSIC</div>
	</>
	)
}