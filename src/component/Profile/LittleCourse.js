import React,{Component} from 'react';

class LittleCourse extends Component{
  render(){

    const block =(start,end)=>{
       return end-start;

    }
    console.log(block)
    return(
          <td class="text-center border" colspan={block(this.props.start,this.props.end)}>{this.props.course} {this.props.start}-{this.props.end}</td>
    );
  }
}
export default LittleCourse;
