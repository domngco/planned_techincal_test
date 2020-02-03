import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Divider, Header, Icon, Table, Button } from "semantic-ui-react";

export class UnconnectedGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      group: {}
    };
  }

  componentDidMount() {
    this.handleGroup();
  }

  handleGroup = async () => {
    let data = new FormData();
    data.append("groupID", this.props.match.params.id);
    let response = await fetch("/group", {
      method: "POST",
      body: data
    });
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    let _group = body.message;
    if (!body.success) {
      alert("Unsuccessful, ", body.message);
      return;
    }
    if (body.success) {
      this.setState({ group: _group });
      return;
    }
  };

  render() {
    const { group } = this.state;
    return (
      <React.Fragment>
        <Divider horizontal>
          <Header as="h4">
            <Icon name="group" />
            Group Details
          </Header>
        </Divider>
        <Table definition>
          <Table.Body>
            <Table.Row>
              <Table.Cell width={3}>Group Name</Table.Cell>
              <Table.Cell>{group.name}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell width={3}>Department</Table.Cell>
              <Table.Cell>{group.department}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell width={3}>Description</Table.Cell>
              <Table.Cell>{group.description}</Table.Cell>
            </Table.Row>
          </Table.Body>
          {this.props.loggedIn ? (
            <Table.Footer fullWidth>
              <Table.Row>
                <Table.HeaderCell colSpan="1">
                  <Button
                    floated="left"
                    icon
                    labelPosition="left"
                    primary
                    size="small"
                    as={Link}
                    to={"/edit-group/" + group._id}
                  >
                    <Icon name="edit outline" />
                    Edit
                  </Button>
                </Table.HeaderCell>
                <Table.HeaderCell colSpan="2">
                  <Button
                    floated="right"
                    icon
                    labelPosition="left"
                    secondary
                    size="small"
                    as={Link}
                    to={"/group-members-list/" + group._id}
                  >
                    <Icon name="arrow alternate circle right outline" />
                    View Members
                  </Button>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          ) : (
            <Table.Footer fullWidth>
              <Table.Row>
                <Table.HeaderCell colSpan="1">
                  <Button
                    floated="left"
                    icon
                    labelPosition="left"
                    primary
                    size="small"
                    as={Link}
                    to={"/group-list"}
                  >
                    <Icon name="arrow alternate circle left outline" />
                    Back
                  </Button>
                </Table.HeaderCell>
                <Table.HeaderCell colSpan="2">
                  <Button
                    floated="right"
                    icon
                    labelPosition="left"
                    secondary
                    size="small"
                    as={Link}
                    to={"/group-members-list/" + group._id}
                  >
                    <Icon name="arrow alternate circle right outline" />
                    View Members
                  </Button>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          )}
        </Table>
      </React.Fragment>
    );
  }
}

let mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn
  };
};

let Group = connect(mapStateToProps)(UnconnectedGroup);

export default Group;
