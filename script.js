

class Stopwatch extends React.Component {
	constructor(props) {
		super(props);

		this.running = false;

		this.state = {
			times: {
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			},
			savedTimes: []
		};
	}

    reset() {
    	this.setState({
    		times: {
	            minutes: 0,
	            seconds: 0,
	            miliseconds: 0
	        }
    	});
    }

	format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
	}

	start() {
	    if (!this.running) {
	        this.running = true;
	        this.watch = setInterval(() => this.step(), 10);
	    }
	}

	step() {
	    if (!this.running) return;
	    this.calculate();
	}

	calculate() {
		const times = Object.assign({}, this.state.times);

    	times.miliseconds++;

	    if (times.miliseconds >= 100) {
	        times.seconds++;
	        times.miliseconds = 0;
	    }

	    if (times.seconds >= 60) {
	        times.minutes++;
	        times.seconds = 0;
	    }

	    this.setState({times});
	}

	stop() {
	    this.running = false;
	    clearInterval(this.watch);
	}

	render() {
		return (
			<div>
	 			<nav className="controls">
		      		<a href="#" className="button" onClick={this.start.bind(this)}>Start</a>
			      	<a href="#" className="button" onClick={this.stop.bind(this)}>Stop</a>
			      	<a href="#" className="button" onClick={this.reset.bind(this)}>Reset</a>
			    </nav>
			    <div className="stopwatch">
			    	{this.format(this.state.times)}	
			    </div>
			    <div>
			      <a href="#" className="button">Record</a>
			      <a href="#" className="button">Reset List</a>
			    </div>
			    <ul className="results"></ul>
			</div>
		);
	}
}

const pad0 = (value) => {
	let result = value.toString();

	if (result.length < 2) {
		result = '0' + result;
	}

	return result;
}


const element = React.createElement(Stopwatch);
ReactDOM.render(element, document.getElementById('app'));
