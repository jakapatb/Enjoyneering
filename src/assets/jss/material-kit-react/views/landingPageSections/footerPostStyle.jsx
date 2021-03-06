const footerPostStyle = theme => ({
  chip: {
    margin: theme.spacing.unit
  },
  button: {
    padding: "12px 10px 12px 10px",
    fontSize: "1.313rem",
    textTransform: "none",
    borderRadius: "0.5rem",
    color: "black",
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: "crimson"
    },
    fab: {
      margin: theme.spacing.unit
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      left: 0,
      right: 0
    }
  }
});

export default footerPostStyle;
