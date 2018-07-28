import React, {Component} from 'react';
import LittlePost from '../LittlePost/LittlePost';
import Conrousel from './Conrousel';
import {database} from '../../firebase';
import './home.css';
class Home extends Component {

  constructor(props, match) {
    super(props);
    this.state = {
      Post: [],
      test:[]
    };
    this.getPostKey = this.getPostKey.bind(this);
  }
  /*TODO เรียงตามเวลา โดยล่าสุดขึ้นก่อน ใช้LIFO*/
  getPostKey() {
    const Ref = database.ref().child('Post/').orderByChild('date').limitToLast(3);
    let temp = this.state.Post;
    Ref.once('value', snap => {
      snap.forEach(function(childSnap) {
        let childKey = childSnap.key
        temp.push(childKey)
      })
      this.setState({Post: temp})
    })
  }

  componentDidMount() {
    this.getPostKey();
  }


  render() {
        let { Post} = this.state;
    return (<div class="container">
      <div class="bg-light">
        {/* left columns */}
        <div class="col">
          {/* Top slide */}
          <Conrousel item={this.state.Post}/>
          <br/> {/* Top topics: */}
          <div class="d-flex flex-row bg-dark">
            <div class="p-2 bg-warning">
              Latest Post</div>
          </div>

          {/* Card frame */}
          <div class="content">
            <br/> {/* Card:Education */}
            {
              Post.map((item) => {
                return (<LittlePost id={item}/>)
              })
            }

          </div>

          {/* Top topics: */}
          <div class="d-flex flex-row bg-dark">
            <div class="p-2 bg-warning">
              Top Post</div>
          </div>
          {/* Card frame */}
          <div class="content">
            <br/>
            {
              Post.map((item) => {
                return (<LittlePost id={item}/>)
              })
            }
          </div>

        </div>
      </div>
    </div>);
  }
}
export default Home;
