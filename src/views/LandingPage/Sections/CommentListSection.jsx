import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import TextField from "@material-ui/core/TextField";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CommentSection from "./CommentSection";
import { connect } from "react-redux";
import { compose } from "redux";
import { sendComment } from "actions/index.js";
import productStyle from "assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx";

class ArticleSection extends React.Component {
  constructor(props){
    super(props)
    this.state={
      content:""
    }
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
  render() {
    const { classes, comments } = this.props;
    const { content } = this.state
    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          {comments.map((comment, index) => (
              <CommentSection key={index} content={comment.content} id={comment.id} />
            ))}
          <GridItem xs={12} sm={12} md={8}>
            <TextField
              placeholder="MultiLine with rows: 5 and rowsMax: 10"
              id="content"
              multiline={true}
              onKeyPress={this.handleSubmit}
              onChange={this.handleChange}
              fullWidth={true}
              rows={5}
              rowsMax={20}
              value={content}
            />
          </GridItem>
        </GridContainer>
        <div />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  auth:state.auth
})

const mapDispatchToProps = {
  sendComment
}

export default compose(
  withStyles(productStyle),
  connect(mapStateToProps,mapDispatchToProps)
)(ArticleSection);
