import React, {Component} from 'react';
import {database, storage} from '../../firebase';
import AddImg from './AddImg';
import './postCreate.css';
import AddContent from './AddContent';
import AddTitle from './AddTitle';
class PostCreate extends Component {
  constructor(props) {
    super(props);
    this.tempImg = [];
    this.state = {
      title: '',
      writer: '',
      content: [
        {
          type: 'imgTopic',
          data: ''
        }, {
          type: 'content',
          data: ''
        }
      ],
      imgTopic: [],
      optional: [],
      Tag: [],
      postTag: [''],
      uploader: 0
    };
  }

  onChange = (element, name, i) => {
    if (name === 'imgTopic') {
      let img = this.tempImg;
      img[i] = element;
      element = i;
    }
    let data = this.state.content;
    let point = data[i]
    point['data'] = element;
    this.setState({
      [name]: [...data]
    });
  }

  titleChange=(e)=>{
    this.setState({title: e.target.value})
  }

  getMessage=(element)=> {
    const Ref = database.ref().child(element);
    Ref.on('value', snap => {
      this.setState({[element]: snap.val()})
    });
  }

  createpost = () => {
    const {postTag, content, title} = this.state
    if (postTag !== '' && title !== '') {
      const trimContent = this.state.content.filter((e)=>{
        console.log(e);
        return e!==null;
      });
      const {title, content, postTag} = this.state;
      let firebaseRef = database.ref('Post/');
      let time = new Date();
      firebaseRef.push({title: title, writer: this.props.uid.data.username, content: trimContent, date: time.getTime(), tag: postTag}).then((snap) => {
        const key = snap.key;
        this.tempImg.map((item, i) => {
          var storageRef = storage.ref('Post/' + key + '/' + i);
          var task = storageRef.put(item);
          task.on('state_changed', function(snapshot) {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            document.getElementById('uploader').value = progress;
          }, function(error) {
            // Handle unsuccessful uploads
          });
          return null;
        });
      });

    } else {
      alert('กรุณากรอกให้ครบทุกช่อง และเลือกอย่างน้อย 1 Tag');
    }
  }

  addImg = () => {
    this.addData(<AddImg count={this.state.optional.length} onchange={this.onChange}/>);
    let iRef = this.state.content;
    var ob = [
      {
        type: 'imgTopic',
        data: ''
      }
    ];
    iRef.push.apply(iRef, ob);
  }

  addContent = () => {
    this.addData(<AddContent count={this.state.optional.length} onchange={this.onChange} delC={this.delContent}/>);
    let cRef = this.state.content;
    var ob = [
      {
        type: 'content',
        data: ''
      }
    ];
    cRef.push.apply(cRef, ob);
  }

  addTitle = () => {
    this.addData(<AddTitle count={this.state.optional.length} onchange={this.onChange}/>);
    let cRef = this.state.content;
    var ob = [
      {
        type: 'subtitle',
        data: ''
      }
    ];
    cRef.push.apply(cRef, ob);
  }

  addData = (data) => {
    let Ref = this.state.optional;
    Ref.push(data);
    this.setState({optional: Ref});
  }


  delContent=(i)=>{
    let {content,optional}=this.state;
    console.log('Remove '+i);
    content[i]=null
    optional[i]=null
    //this.setState({content:newC,optional:newO})
    console.log(content);
    console.log(optional);
    this.forceUpdate();
  }

  componentDidMount() {
    this.getMessage('Tag');
  }



  tagSelector = (e) => {
    const {postTag} = this.state;
    const value = e.target.value;
    if (postTag.includes(value)) {
      postTag.splice(postTag.indexOf(value), 1);
    } else {
      postTag.push(value);
    }
  }

  render() {
    console.log(this.tempImg);
    console.log(this.state.content);
    var reader = [];
    var preview = [];
    const {Tag, optional, title, content} = this.state;
    return (<div class="container-fluid">
      <div class="row">
        <div class="col col-md-6">
          <h1>Create post</h1>
          <div class="btn-group btn-group-toggle" data-toggle="buttons">
            <h2>Tags: {
                Tag.map((item, i) => {
                  return (<button type="radio" class="btn btn-info" id={item} value={item} name="options" autocomplete="off" onClick={this.tagSelector}>
                    {item}
                  </button>)
                })
              }</h2>
          </div>
          <div class="form-group">
            <label for="topic">Post Title:</label>
            <input type="text" class="form-control" id="topic" onChange={this.titleChange} name="title"/>
          </div>
          <AddImg count={0} onchange={this.onChange} upload={this.uploader}/>
          <AddContent count={1} onchange={this.onChange}/>

          <div id="btn-add-optional">
            <button onClick={this.addImg} class="btn btn-secondary">Add image</button>
            <button onClick={this.addTitle} class="btn btn-secondary">Add Title</button>
            <button onClick={this.addContent} class="btn btn-secondary">Add Content</button>
          </div>
          <div id="optional">{optional}
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-primary" onClick={this.createpost}>submit</button>
          </div>

        </div>
        <div class="col  bg-secondary">
          <h1>Preview</h1>
          <h1>{title}</h1>
          {

            content.map((element, i) => {
              if(element===null){return null;}
              else if (element['type'] === 'subtitle') {
                return (<h2>{element['data']}</h2>);
              } else if (element['type'] === 'content') {
                return (<p>{element['data']}</p>);
              } else if (element['type'] === 'imgTopic') {
                preview[i] = document.getElementById("preview" + i);
                let image = this.tempImg[i];
                reader[i] = new FileReader();
                reader[i].addEventListener("load", function() {
                  preview[i].src = reader[i].result;
                }, false);
                if (image) {
                  reader[i].readAsDataURL(image);
                }
                return (<img src={preview[i]} class="rounded mx-auto d-block img-responsive img-fluid topImg" height="200" alt="preview" id={"preview" + i}/>);
              }
            })
          }

        </div>
      </div>
      <div class="fixed-bottom">
        <progress class="" value="0" max="100" id="uploader">0%</progress>
      </div>
    </div>);
  }
}

export default PostCreate;
