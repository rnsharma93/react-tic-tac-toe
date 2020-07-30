import React from 'react';
import logo from './logo.svg';
import './App.css';

class Box extends React.Component {
	constructor(props) {
		super(props);
		
	}
	
	render() {
		return(
			<button className="board__box" onClick={this.props.onClick}>
				{this.props.text}
			</button>
		
		);
	}
	
}

class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			boxes : Array(9).fill(null),
			xIsNext : true
		};
		//this.handleBoxClick = this.handleBoxClick.bind(this);
	}
	
	handleBoxClick(index) {
		const boxes = this.state.boxes.slice();
		
		if(boxes[index] || findWinner(boxes)) {
			return
		}
		
		boxes[index] = (this.state.xIsNext) ? "X" : "O";
		
		this.setState({
			boxes : boxes,
			xIsNext : !this.state.xIsNext
		});
	}
	
	restGame() {
		this.setState({
			boxes : Array(9).fill(null),
			xIsNext : true
		});
	}
	
	render() {
		
		let winner = findWinner(this.state.boxes);
		
		let allFilled = allBoxClicked(this.state.boxes);
		
		let status;
		if(winner) {
			status = "Winner is "+winner;
		} else if(!winner && allFilled) {
			status = "Match Draw restart game";
		} else {
			status = "Next turn => "+ ((this.state.xIsNext) ? "X" : "O");
		}
		
		
		
		
		
		return(
			<>
				<div className="board-wrapper">
                    <div className="board">
                        <h2 className="board-heading">{status}</h2>

                        <div className="board-row">
							<Box text={this.state.boxes[0]} onClick={ () => this.handleBoxClick(0)} />
							<Box text={this.state.boxes[1]} onClick={ () => this.handleBoxClick(1)} />
							<Box text={this.state.boxes[2]} onClick={ () => this.handleBoxClick(2)} />
						</div>	
						
						<div className="board-row">
							<Box text={this.state.boxes[3]} onClick={ () => this.handleBoxClick(3)} />
							<Box text={this.state.boxes[4]} onClick={ () => this.handleBoxClick(4)} />
							<Box text={this.state.boxes[5]} onClick={ () => this.handleBoxClick(5)} />
						</div>	
						
						<div className="board-row">
							<Box text={this.state.boxes[6]} onClick={ () => this.handleBoxClick(6)} />
							<Box text={this.state.boxes[7]} onClick={ () => this.handleBoxClick(7)} />
							<Box text={this.state.boxes[8]} onClick={ () => this.handleBoxClick(8)} />
						</div>	
						<br/>
						<button className="btn" onClick={()=>this.restGame()}>Reset/Restart Game</button>
					</div>
				</div>			
			</>
		
		);
	}
	
}

class App extends React.Component {
	render(){
		return (
		<div className="App">
			<Game />
		</div>
	  );
	}
}

export default App;


export function findWinner(boxes) {
	const rows = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
	
	for(let i=0; i<rows.length; i++) {
		const [a,b,c] = rows[i];
		
		if(boxes[a] && boxes[a]==boxes[b] && boxes[a]==boxes[c]) {
			return boxes[a];
		}
		
	}
	
	return null;
	
}

export function allBoxClicked(boxes) {
	let count = 0;
	
	boxes.forEach(function(item){
		if(item!=null) {
			count++;
		}
		
	});
	
	if(count==9) {
		return true;
	} else {
		return false;
	}
}
