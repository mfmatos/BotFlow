import { connect } from "react-redux";
import React, { Component } from "react";
import ItemsList from "../components/ItemsList";
import UtterForm from "../components/UtterForm";
import MessageIcon from '@material-ui/icons/Message';
import * as utterAction from "../actions/uttersAction";
import { SaveButtonCheck, Done, Add, CreateNewUtter } from '../styles/button';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { Divider } from "@material-ui/core";
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import SnackbarContent from "../components/CustomSnackbar"

class UtterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
    this.props.getUtters();
  }

  isEnableUtterButton() {
    let has_empty_fields = false;
    const no_modifications = (JSON.stringify(this.props.current_utter) !== JSON.stringify(this.props.old_utter));
    if (this.props.current_utter.utters !== undefined) {
      this.props.current_utter.utters.forEach(utter => {
        utter.utterText.forEach(text => {
          if ((text.text).trim().length === 0) {
            has_empty_fields = true;
          }
        })
      });

      // TODO verificar se o nome esta na lista de utters
      
      return (
        no_modifications &&
        !has_empty_fields &&
        (this.props.current_utter.nameUtter.length !== 0)
      );
    }
    return false
  }

  getAppBar() {
    let utter_name = (this.props.current_utter !== undefined) ? this.props.current_utter.nameUtter : "";

    return (
      <Toolbar style={{ background: "#f6f9f9", padding: "4px" }}>
        <Grid item xs={1} />
        <Grid item xs={7}>
          <TextField
            fullWidth
            type="text"
            id="utter-name"
            value={utter_name}
            label="Nome da resposta"
            helperText={this.props.helper_text}
            onChange={(e) => this.props.setUtterName(e.target.value, this.props.utters)}
          />
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={3}>
          <Typography variant="h6" color="inherit">
            <Button
              disabled={!this.isEnableUtterButton()}
              variant="contained"
              size="small"
              color="secondary"
              onClick={() => this.handleClick(false)}>
              <SaveButtonCheck>
                <Done />
                <label>
                  Gravar
                </label>
              </SaveButtonCheck>
            </Button>
            <Button onClick={() => this.handleClick(true)}>DELETAR</Button>
          </Typography>
        </Grid>
      </Toolbar>
    )
  }

  handleClick(remove) {
    this.setState({ open: true });
    if (remove) {
      this.props.removeUtter(this.props.current_utter._id)
    }
    else {
      this.props.saveData(this.props.current_utter, this.props.utters)
    }
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {

    return (
      <Grid container>
        <Grid item xs={3} style={{ background: "#dae8ea" }}>
          <Button
            color="secondary"
            variant="contained"
            style={{ margin: "16px 24px" }}
            onClick={() => this.props.createNewUtter()}
          >
            <CreateNewUtter>
              <Add />
              <label>Criar Resposta</label>
            </CreateNewUtter>
          </Button>
          <ItemsList items={this.props.utters} icon={<MessageIcon />} text="Respostas cadastradas" />
        </Grid>
        <Grid item xs={9}>
          {this.getAppBar()}
          <Divider />
          <div style={{ height: "calc(100vh - 164px)", overflowY: "auto", overflowX: "hidden" }}>
            <UtterForm />
          </div>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            open={this.state.open}
            autoHideDuration={6000}
            onClose={() => this.handleClose()}
          >
            <SnackbarContent
              onClose={() => this.handleClose()}
              variant="success"
              message={this.props.notification_text}
            />
          </Snackbar>
        </Grid>
      </Grid >
    )
  }
}

const mapStateToProps = state => { return { ...state.utterReducer } };

const mapDispatchToProps = dispatch => ({
  getUtters: () => dispatch(utterAction.getUtters()),
  createNewUtter: () => dispatch(utterAction.createNewUtter()),
  removeUtter: (utter_id) => dispatch(utterAction.removeUtter(utter_id)),
  setUtterName: (utter_name) => dispatch(utterAction.setUtterName(utter_name)),
  saveData: (current_utter, utters) => dispatch(utterAction.saveData(current_utter, utters)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UtterPage);