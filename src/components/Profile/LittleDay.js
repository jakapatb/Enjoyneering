import React,{Component} from 'react';
import LittleCourse from './LittleCourse';
class LittleDay extends Component{
  constructor(){
    super();
    this.state={
      day:"SUN"
    };
  }
  render(){
    return(
      <tr class="bg-light">
        <td class="text-center border">{this.props.day}</td>
        <td class="text-center border"/>
<LittleCourse course="coding" start="9.00" end="12.00"/>
<td class="text-center border"/>
<LittleCourse course="database" start="13.00" end="16.00"/>
<td class="text-center border"/>
<LittleCourse  course="Telecom" start="17.00" end="19.00"/>
      </tr>
    );
  }
}
export default LittleDay;
