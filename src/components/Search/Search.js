import React,{Component} from 'react';
import trim from 'trim';
import RouteWithSubRoutes from '../../RouteWithSubRoutes';
class Search extends Component{
  constructor(props){
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onKeyup = this.onKeyup.bind(this);
    this.routes = props.routes;
    this.state = {
  search: ''
};

  }
  onChange(e){
    const name = e.target.name
    this.setState({
      [name]:e.target.value
    });
  }
  onKeyup(e){
    if(e.keyCode === 13 && trim(e.target.value) !== ''){
      e.preventDefault();
      window.location = '/search/'+this.state.search;
    }
  }


  render(){
    return(
      <div class="container">
        <h1>Search Enjoyneering</h1>
            <input  type="text" class="form-control" id="search"
              onChange={this.onChange} onKeyUp={this.onKeyup} value={this.state.search} name="search"
            />



        {this.routes.map((route,i)=>(
          <RouteWithSubRoutes key={i} {...route} />
        ))}

      </div>
    );
  }
}
export default Search;
