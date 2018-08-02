import React, {Component} from 'react';
import trim from 'trim';
import {database, getMessage} from '../../firebase';
import LittlePost from '../LittlePost/LittlePost';
class Search extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onKeyup = this.onKeyup.bind(this);
    this.getMessage = this.getMessage.bind(this);
    this.getPostKey = this.getPostKey.bind(this);
    this.tagSelector=this.tagSelector.bind(this);
    this.routes = props.routes;
    this.filterPost = []
    this.state = {
      search: '',
      Tag: [],
      Post: [],
      Taged: []
    };

  }

  componentDidMount() {
    this.getMessage('Tag');
    this.getPostKey();
  }

  /* TODO เรียงตามเวลา โดยล่าสุดขึ้นก่อน ใช้LIFO */
  getPostKey() {
    const Ref = database.ref().child('Post/').orderByChild('date');
    let temp = this.state.Post;
    Ref.once('value', snap => {
      snap.forEach(function(childSnap) {
        temp.push({id: childSnap.key, title: childSnap.child('title').val(), tag: childSnap.child('tag').val()})
      })
    })
  }

  getMessage(element) {
    const Ref = database.ref().child(element);
    Ref.on('value', snap => {
      this.setState({Tag: snap.val(), Taged: snap.val()})
    });
  }

  onKeyup(e) {
    if (e.keyCode == 13) {
      e.preventDefault();

      this.searching();

    }
  }

  searching(){
    let taged = this.state.Taged;
    this.filterPost = this.state.Post.filter((contact) => {
      return contact.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 && contact.tag.every((tag) => {
        return taged.includes(tag);
      });
    });
    this.forceUpdate();

  }
  onChange(e) {
    const name = e.target.name
    this.setState({[name]: e.target.value});

  }

  tagSelector(e){

    const {Taged} = this.state;
    const value = e.target.value;
    if (Taged.includes(value)) {
      Taged.splice(Taged.indexOf(value), 1);
    } else {
      Taged.push(value);
    }

    this.searching();
  }

  render() {

    let {Tag, Post} = this.state;
    return (<div class="container">
      <h1>Search Enjoyneering</h1>
      <input type="search" class="form-control" id="search" onChange={this.onChange} onKeyUp={this.onKeyup} value={this.state.search} name="search"/>

        <div class="btn-group-toggle" data-toggle="buttons"><h2>Tags: </h2>{
            Tag.map((item, i) => {
              return (
                <input type="button" class="btn btn-primary active" id={item} value={item} checked name="options" autocomplete="off" onClick={this.tagSelector}/>
              );
            })
          }</div>

      {
        this.filterPost.map((item) => {
          return (<LittlePost id={item.id}/>)
        })
      }
    </div>);
  }
}
export default Search;
