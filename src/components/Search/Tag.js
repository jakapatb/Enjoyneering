import React, {Component} from 'react';
import LittlePost from '../LittlePost/LittlePost';
import {database} from '../../firebase';

class Tag extends Component {

  constructor(props, match) {
    super(props);

    this.state = {
      Tag: [],
      Post: []
    };
    this.getMessage = this.getMessage.bind(this);
    this.getPostKey = this.getPostKey.bind(this);
  }

  componentDidMount() {
    this.getMessage('Tag');
    this.getPostKey();

  }
  getMessage(element) {
    const Ref = database.ref().child(element);
    Ref.on('value', snap => {
      this.setState({[element]: snap.val()})
    });
  }
  /*TODO เรียงตามเวลา โดยล่าสุดขึ้นก่อน ใช้LIFO*/
  getPostKey() {
    const Ref = database.ref().child('Post/').orderByChild('date');
    let temp = this.state.Post;
    Ref.once('value', snap => {
      snap.forEach(function(childSnap) {
        let childKey = childSnap.key
        temp.push(childKey)
      })
      this.setState({Post: temp})
    })
  }
  render() {
    console.log(this.props);
    let {Tag, Post} = this.state;
    return (<div class="container">

      <h2>Tags: {
          Tag.map((item) => {
            return (<button type="button" class="btn btn-info" data-toggle="button" aria-pressed="false" autocomplete="off">
              {item}
            </button>)
          })
        }</h2>
      <h2>Search:{this.props.match.params.article}</h2>
      {
        Post.map((item) => {
          return (<LittlePost id={item}/>)
        })
      }

      {/* ไอสัส ค่าก็มาแล้ว ทำไมไม่ขึ้น */}

    </div>);
  }
}

export default Tag;
