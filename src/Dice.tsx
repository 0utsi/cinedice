const Dice = ({opacity}) => {

	return <div className="perspective" style={{ opacity}}>
				<div id="die-1" className="die">
					<div className="face face-1">
						<div className="dot"></div>
					</div>
					<div className="face face-2">
						<div className="dot"></div>
						<div className="dot"></div>
					</div>
					<div className="face face-3">
						<div className="dot"></div>
						<div className="dot"></div>
						<div className="dot"></div>
					</div>
					<div className="face face-4">
						<div className="dot"></div>
						<div className="dot"></div>
						<div className="dot"></div>
						<div className="dot"></div>
					</div>
					<div className="face face-5">
						<div className="dot"></div>
						<div className="dot"></div>
						<div className="dot"></div>
						<div className="dot"></div>
						<div className="dot"></div>
					</div>
					<div className="face face-6">
						<div className="dot"></div>
						<div className="dot"></div>
						<div className="dot"></div>
						<div className="dot"></div>
						<div className="dot"></div>
						<div className="dot"></div>
					</div>
				</div>
			</div>
}

export default Dice;