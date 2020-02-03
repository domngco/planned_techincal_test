import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import RemoveMember from "./editGroupMembership/RemoveMember.jsx";
import { Table, Button, Icon, Grid } from "semantic-ui-react";
import _ from "lodash";

export class UnconnectedGroupMembersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
      column: null,
      direction: null
    };
  }

  componentDidMount() {
    this.handleGroup();
  }

  handleGroup = async () => {
    let data = new FormData();
    data.append("groupID", this.props.match.params.id);
    let response = await fetch("/group-member-list", {
      method: "POST",
      body: data
    });
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    let members = body.message;
    console.log("members, ", members);
    if (!body.success) {
      alert(body.message);
      return;
    }
    if (body.success) {
      this.setState({ members: members });
      return;
    }
  };

  handleSort = clickedColumn => () => {
    const { column, members, direction } = this.state;
    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        members: _.sortBy(members, [clickedColumn]),
        direction: "ascending"
      });
      return;
    }
    this.setState({
      members: members.reverse(),
      direction: direction === "ascending" ? "descending" : "ascending"
    });
  };

  render() {
    const { column, members, direction } = this.state;
    return (
      <React.Fragment>
        <Table sortable celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                sorted={column === "firstName" ? direction : null}
                onClick={this.handleSort("firstName")}
              >
                First Name
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "lastName" ? direction : null}
                onClick={this.handleSort("lastName")}
              >
                Last Name
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "title" ? direction : null}
                onClick={this.handleSort("title")}
              >
                Job Title
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "email" ? direction : null}
                onClick={this.handleSort("email")}
              >
                Email
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "phone" ? direction : null}
                onClick={this.handleSort("phone")}
              >
                Phone Number
              </Table.HeaderCell>
              <Table.HeaderCell>Delete</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {_.map(
              members,
              ({ firstName, lastName, title, email, phone, _id }) => {
                let memberID = _id;
                console.log("memberID, ", memberID);
                let groupID = this.props.match.params.id;
                console.log("groupID, ", groupID);
                return (
                  <Table.Row key={_id}>
                    <Table.Cell>{firstName}</Table.Cell>
                    <Table.Cell>{lastName}</Table.Cell>
                    <Table.Cell>{title}</Table.Cell>
                    <Table.Cell>{email}</Table.Cell>
                    <Table.Cell>{phone}</Table.Cell>
                    {this.props.loggedIn ? (
                      <Table.Cell selectable>
                        <Grid centered>
                          <Grid.Row verticalAlign="middle">
                            <RemoveMember
                              memberID={memberID}
                              groupID={groupID}
                            />
                          </Grid.Row>
                        </Grid>
                      </Table.Cell>
                    ) : (
                      <Table.Cell />
                    )}
                  </Table.Row>
                );
              }
            )}
          </Table.Body>
          <Table.Footer fullWidth>
            {this.props.loggedIn ? (
              <Table.Row>
                <Table.HeaderCell colSpan="6">
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
                  <Button
                    floated="right"
                    icon
                    labelPosition="left"
                    secondary
                    size="small"
                    as={Link}
                    to={"/add-group-members/" + this.props.match.params.id}
                  >
                    <Icon name="edit outline" />
                    Add Member
                  </Button>
                </Table.HeaderCell>
              </Table.Row>
            ) : (
              <Table.Row>
                <Table.HeaderCell colSpan="6">
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
              </Table.Row>
            )}
          </Table.Footer>
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

let GroupMembersList = connect(mapStateToProps)(UnconnectedGroupMembersList);

export default GroupMembersList;
