import React from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchStream } from '../../actions';
import Modal from '../Modal';
import history from '../../history';

import { deleteStream } from '../../actions';

class StreamDelete extends React.Component {

  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id); 
  }
  
  renderActions() {
    const id = this.props.match.params.id;
    return (
      <>
        <button onClick={() => {this.props.deleteStream(id)}} className="ui button negative">Delete</button>
        <Link to="/" className="ui button">Cancel</Link>
      </>
    )
  }

  renderContent() {
    if (!this.props.stream) {
      return 'Are you sure you want to delete this stream?'
    } else {
      return `Are you sure you want to delete the stream with the title "${this.props.stream.title}"?`
    }
  }

  render() {

    return (
      <div>
        <Modal 
          title="Delete Stream"
          content={this.renderContent()}
          actions={this.renderActions()}
          onDismiss={() => history.push('/')}
        />
      </div>
    );
  }

};

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] }
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);