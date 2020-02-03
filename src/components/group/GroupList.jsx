import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Table } from "semantic-ui-react";
import _ from "lodash";

export class GroupList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      column: null,
      direction: null
    };
  }

  componentDidMount() {
    this.handleGroups();
  }

  handleGroups = async () => {
    let response = await fetch("/group-list");
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    let allGroups = body.message;
    this.setState({ groups: allGroups });
    console.log("group list,", this.state);
  };
  handleSort = clickedColumn => () => {
    const { column, groups, direction } = this.state;
    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        groups: _.sortBy(groups, [clickedColumn]),
        direction: "ascending"
      });
      return;
    }
    this.setState({
      groups: groups.reverse(),
      direction: direction === "ascending" ? "descending" : "ascending"
    });
  };

  render() {
    const { column, groups, direction } = this.state;
    return (
      <React.Fragment>
        <Table sortable celled fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                sorted={column === "name" ? direction : null}
                onClick={this.handleSort("name")}
              >
                Group Name
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "department" ? direction : null}
                onClick={this.handleSort("department")}
              >
                Department
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "description" ? direction : null}
                onClick={this.handleSort("description")}
              >
                Description
              </Table.HeaderCell>
              <Table.HeaderCell>Details</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {_.map(groups, ({ name, department, description, _id }) => {
              return (
                <Table.Row key={_id}>
                  <Table.Cell>{name}</Table.Cell>
                  <Table.Cell>{department}</Table.Cell>
                  <Table.Cell>{description}</Table.Cell>
                  <Table.Cell selectable>
                    <Link to={"/group/" + _id}>Learn More</Link>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </React.Fragment>
    );
  }
}

export default GroupList;
