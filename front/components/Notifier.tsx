import React from "react";
import { inject, observer } from "mobx-react";
import { withStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";

import { NotifierStore } from "../stores/notifier";
import { COLORS, ICONS } from "../utils";

interface INotifierProps {
  notifier: NotifierStore;
  classes: any;
}
function Notifier(props: INotifierProps) {
  return (
    <Snackbar
      className={props.classes.root}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left"
      }}
      open={props.notifier.isOpened}
      autoHideDuration={4000}
      onClose={props.notifier.close}
    >
      <NotifierContent notifier={props.notifier} />
    </Snackbar>
  );
}
export default withStyles({ root: { zIndex: 20000 } })(
  inject("notifier")(observer(Notifier))
);

const styles = () => ({
  success: {
    backgroundColor: COLORS.darkBlue
  },
  error: {
    backgroundColor: "#BC4A53"
  }
});
const NotifierContent = withStyles(styles)(
  observer(function(props: any) {
    return (
      <SnackbarContent
        className={props.classes[props.notifier.variant]}
        aria-describedby="client-snackbar"
        message={
          <div id="message-id" style={{ maxWidth: "75vw" }}>
            {props.notifier.message}
          </div>
        }
        action={[
          <div
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={props.notifier.close}
            style={{ display: "flex", alignItems: "center" }}
          >
            <ICONS.Close fontSize="small" />
          </div>
        ]}
      />
    );
  })
);
