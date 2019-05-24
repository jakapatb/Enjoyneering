import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import TextField from "@material-ui/core/TextField";
// core components
import Button from "components/CustomButtons/Button.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CommentSection from "./CommentSection";
import { connect } from "react-redux";
import { compose } from "redux";
import { sendComment, fetchOldComments } from "actions/index.js";
import productStyle from "assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx";
import List from '@material-ui/core/List';

class ArticleSection extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      content: "",
      hasOldComments: true,
      checked:true
    };
  }
  
  handleSubmit= event => {
    if(event.key === "Enter"){
        this.setState({ content:"Sending..." }) 
        this.props.sendComment(
          {
            ownerUid: this.props.auth.data.uid,
            content: event.target.value,
            date: new Date(),

          })
        this.setState({ content:"" }); 
    }
  }
  handleChange = event =>{
    this.setState({content:event.target.value})
  }
  handleOldComments= () => {
    this.props
      .fetchOldComments(this.props.id)
      .catch(() => this.setState({ hasOldComments: false, checked :true}));
  }
  render() {
    const { comments, classes } = this.props;
    const { content, hasOldComments, checked } = this.state;
    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={12}>
          {hasOldComments && (
            <Button onClick={this.handleOldComments}>
              fetchOldComments
            </Button>
          )}
        </GridItem>
        <List className={classes.commentList}>
          {comments.map((comment, index) => (
            <CommentSection
              key={index}
              content={comment.content}
              id={comment.id}
              checked={checked}
            />
          ))}
        </List>
        <GridItem xs={12} sm={12} md={12} />
        <TextField
          placeholder="..."
          label="MultiLine with rows: 5 and rowsMax: 10"
          id="content"
          multiline={true}
          margin="dense"
          variant="outlined"
          onKeyPress={this.handleSubmit}
          onChange={this.handleChange}
          fullWidth={true}
          rows={5}
          rowsMax={20}
          value={content}
        />
      </GridContainer>
    );
  }
}
const mapStateToProps = (state) => ({
  auth:state.auth
})

const mapDispatchToProps = {
  sendComment,
  fetchOldComments
};

export default compose(
  withStyles(productStyle),
  connect(mapStateToProps,mapDispatchToProps)
)(ArticleSection);
