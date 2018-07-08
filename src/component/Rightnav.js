import React,{Component} from 'react';



class Rightnav extends Component{
  constructor() {
        super();
        this.state = { time: new Date() }; // initialise the state
    }

    componentDidMount() { // create the interval once component is mounted
        this.update = setInterval(() => {
            this.setState({ time: new Date() });
        }, 1 * 1000); // every 1 seconds
    }

    componentWillUnmount() { // delete the interval just before component is removed
        clearInterval(this.update);
    }

  render(){
    const { time } = this.state; // retrieve the time from state
    return(
      <div class="col col-xl-4 bg-dark">
      <div class="text-center">
                  <h2 class="text-white">
                      {/* print the string prettily */}
                      {time.toLocaleTimeString()}
                  </h2>
      </div>
<div class="text-white">
<h3>Tag:</h3>
</div>
      </div>
    );
  }
}
export default Rightnav;
