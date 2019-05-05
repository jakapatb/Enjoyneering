import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Edit from "@material-ui/icons/Edit";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import articleStyle from "assets/jss/material-kit-react/views/landingPageSections/articleStyle.jsx";
import Button from "components/CustomButtons/Button.jsx";
class TitleSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.content.title,
      ready: props.content.ready
    };
  }

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSubmit = event => {
    const { title } = this.state;
    const { submit, index } = this.props;
    if (title.trim() !== "") {
      // ตอน Submit ข้อมูลทั้ง Title และ Content ห้ามว่าง
      submit({ type: "Title", title: title,  index: index });
      this.setState({ ready: true });
    } else {
      //TODO แจ้งเตื่อนว่า ยังมีข้อมูลว่าง
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
    const { ready, title } = this.state;
    if (!ready) {
      return (
        <div className={classes.section}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <CustomInput
                labelText="Title"
                id="title"
                inputProps={{
                  ref: input => {
                    this.titleInput = input;
                  },
                  classes: classes.title,
                  value: title
                }}
                formControlProps={{
                  fullWidth: true,
                  onChange: this.handleChange,
                  onBlur: this.handleSubmit
                }}
              />
              <br />
            </GridItem>
          </GridContainer>
          <GridContainer
            className={classes.buttonList}
            justify="flex-end"
          >
            <Button round color="warning" onClick={this.handleSubmit}>
              Submit
            </Button>
            <Button round color="warning" onClick={this.removeContent}>
              Remove
            </Button>
          </GridContainer>
        </div>
      );
    } else {
      return (
        <div className={classes.section}>
          <GridContainer className={classes.buttonList} direction="row" >
            <Button justIcon round color="warning" onClick={this.handleEdit}>
              <Edit style={{ color: "#FFFFFF" }} />
            </Button>
            <Button round color="warning" onClick={this.removeContent}>
              Remove
            </Button>
          </GridContainer>
            <GridItem xs={12} sm={12} md={8}>
              <h2 className={classes.title}>{title}</h2>
            </GridItem>
        </div>
      );
    }
  }
}

export default withStyles(articleStyle)(TitleSection);
