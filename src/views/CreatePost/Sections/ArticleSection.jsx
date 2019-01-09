import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Chat from "@material-ui/icons/Chat";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Fingerprint from "@material-ui/icons/Fingerprint";
import TextField from "@material-ui/core/TextField"
import Edit from "@material-ui/icons/Edit";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import InputBase from "@material-ui/core/InputBase";
import productStyle from "assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx";
import Button from "components/CustomButtons/Button.jsx";
class ArticleSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      ready: false
    };
  }

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSubmit = event => {
    const { title, content } = this.state;
    const {submit , index} = this.props;
      if ((title.trim() != "" && content.trim() != "")) {
        submit({ type:"Article", title:title , content:content , index:index })
        this.setState({ ready: true });
      } else {
        console.log("warning");
      }
  };

  removeContent = () => {
    this.props.remove(this.props.index);
  };

  handleEdit = event => {
    this.setState({ ready: false });
  };
  render() {
    const { classes } = this.props;
    const { ready, title, content } = this.state;
    if (!ready) {
      return <div className={classes.section}>
          <Button round color="warning" onClick={this.removeContent}>
            Remove
          </Button>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
              <CustomInput labelText="Title" id="title" inputProps={{ ref: input => {
                    this.titleInput = input;
                  }, value: title }} formControlProps={{ fullWidth: true, onChange: this.handleChange }} />
              <br />
              <TextField ref={input => {
                  this.contentInput = input;
                }} placeholder="MultiLine with rows: 2 and rowsMax: 4" id="content" multiline={true} fullWidth={true} onChange={this.handleChange} rows={5} rowsMax={20} value={content} />
            </GridItem>
            <GridItem>
              <Button round color="warning" onClick={this.handleSubmit}>
                Submit
              </Button>
            </GridItem>
          </GridContainer>
        </div>;
    } else {
      return <div className={classes.section}>
          <Button justIcon round color="warning" onClick={this.handleEdit}>
            <Edit style={{ color: "#FFFFFF" }} />
          </Button>
          <Button round color="warning" onClick={this.removeContent}>
            Remove
          </Button>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
              <h2 className={classes.title}>{title}</h2>
              <h5 className={classes.description}>{content}</h5>
            </GridItem>
          </GridContainer>
        </div>;
    }
  }
}

export default withStyles(productStyle)(ArticleSection);
