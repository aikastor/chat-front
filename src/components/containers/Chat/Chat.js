import React, {Component} from 'react';
import Container from "@material-ui/core/Container";
import {loadMessages, sendMessage} from "../../../store/actions";
import {connect} from "react-redux";
import MessageForm from "../../MessageForm/MessageForm";

class Chat extends Component {
  state = {
    author: '',
    message: '',
  };
  componentDidMount() {
    this.props.loadMessages();

  }
  handleChange = e => {
    this.setState({[e.target.name]: e.target.value})
  };
  sendMsg = async (e) => {
    e.preventDefault();
    await this.props.sendMsg({author: this.state.author, message: this.state.message});
    this.setState({author: '', message: ''});
  };
  render() {
    return (
        <Container maxWidth='md'>
          {}
          <MessageForm
              onChange={this.handleChange}нфтк
              author={this.state.author}
              msg={this.state.message}
              onSubmit={e => this.sendMsg(e)}
          />
        </Container>
    );
  }
}
const mapStateToProps = state => ({
  messages: state.messages,
  loading: state.loading,
});
const mapDispatchToProps = dispatch => ({
  loadMessages: () => dispatch(loadMessages()),
  sendMsg: (msg) => dispatch(sendMessage(msg)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);