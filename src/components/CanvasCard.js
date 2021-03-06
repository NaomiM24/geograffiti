import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "../api";
const userImg = require("../assets/user.png");

class CanvasCard extends Component {
  state = {
    username: null,
    displayPic: null,
    isLoading: true,
    err: false,
  };

  componentDidMount() {
    const { graffiti } = this.props;
    api
      .getUserById(graffiti.firebase_id)
      .then(({ data }) => {
        this.setState({
          username: data.username,
          isLoading: false,
          displayPic: data.display_pic_url,
        });
      })
      .catch(() => {
        this.setState({
          isLoading: false,
          err: "Could not load at this time",
        });
      });
  }

  handleError = () => {
    this.setState({ displayPic: userImg });
  };

  render() {
    const { graffiti } = this.props;
    const { username, isLoading, err, displayPic } = this.state;
    return (
      <li className="canvas-card">
        {isLoading ? (
          <p>Loading...</p>
        ) : err ? (
          <p>{err}</p>
        ) : (
          <Link to={`/view/${graffiti.id}`} className="view">
            <p className="posted-by">{username}</p>
            <p className="posted-on">{graffiti.created_at}</p>
            <p className="likes">
              <img src="/likes.png" alt="likes" /> {graffiti.votes}
            </p>
            <p className="posted-by-pic">
              <img
                src={displayPic}
                alt="display pic"
                className="display-pic"
                onError={this.handleError}
              />
            </p>
          </Link>
        )}
      </li>
    );
  }
}

export default CanvasCard;
