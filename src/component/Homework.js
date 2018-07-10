import React,{Component} from 'react';

class Homework extends Component{
render(){
return(
  <div class="container">
      <h1>Homework <span class="badge badge-success">5/8</span></h1>
      <table class="table table-striped">
          <thead>
              <tr>
                  <th>Number</th>
                  <th>Subject</th>
                  <th>Title</th>
                  <th>Sec</th>
                  <th>Date/Time</th>
                  <th>Status</th>
              </tr>
          </thead>
          <tbody>
              <ListHomework number="#pop5" subject="Coding" title="Coding การบ้านครั้งที่3"/>
              <ListHomework  number="#pop4" subject="Database" title="Database การบ้านครั้งที่1"/>
              <ListHomework number="#pop3" subject="Coding" title="Coding การบ้านครั้งที่2"/>
              <ListHomework number="#pop2" subject="Webtech" title="Webtech การบ้านครั้งที่2"/>
              <ListHomework  number="#pop1" subject="Coding" title="Coding การบ้านครั้งที่1"/>
          </tbody>
      </table>
      <PopupHomework/>
  </div>
);
}
}

class ListHomework extends Component{
  render(){
    return(
      <tr data-toggle="modal" data-target="#homework" >
          <td>1</td>
          <td>{this.props.subject}</td>
          <td>{this.props.title}</td>
          <td>21</td>
          <td>6/7/2018</td>
          <td>Not done</td>
      </tr>
    );
  }
}


class PopupHomework extends Component{
render(){
  return(
    <div class="modal fade" id="homework" tabindex="-1" role="dialog" aria-labelledby="loginLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h1>Homework:{this.props.subject}</h1>
                </div>
                <div class="modal-body">
                    <p>information</p>
                    <img class="img-fluid" src="img/forum.jpg" alt="homework"/>
                </div>
                <form action="config/action_homework.php">
                    <div class="modal-footer">
                        <div class="custom-file">
                            <input type="file" class="custom-file-input" id="homework_file"/>
                            <label class="custom-file-label" for="customFile">Send Homework</label>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit
               </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
}

}

export default Homework;
