import React, { Component } from "react";

export class EditGroupMembers extends Component {
  next = event => {
    event.preventDefault();
    this.props.nextStep();
    this.props.handleMembership();
  };

  render() {
    let { members, handleToggleMember } = this.props;
    return (
      <React.Fragment>
        <form>
          <div>
            {members.map((member, index) => {
              return (
                <div key={member._id}>
                  <div>{member.name}</div>
                  <div>{member.member}</div>
                  <button onClick={() => handleToggleMember(index)}>
                    Add To Group
                  </button>
                </div>
              );
            })}
          </div>
          <button onClick={this.next}>Next</button>
        </form>
      </React.Fragment>
    );
  }
}

export default EditGroupMembers;
