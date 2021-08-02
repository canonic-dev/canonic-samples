import { gql } from "@apollo/client";
// This query is used to update a column, it mainly is used when a new task is created so it gets attached to the respective column.
export const UPDATE_COLUMN = gql`
  mutation updateColumnMutation($_id: ID!, $title: String!, $taskIds: [ID!]!) {
    updateColumn(_id: $_id, input: { title: $title, taskIds: $taskIds }) {
      _id
      title
      taskIds {
        _id
        content
        description
      }
    }
  }
`;
// Mutation query to add a Task, here content is mandotory but description isn't
export const ADD_TASK = gql`
  mutation createTaskMutation($content: String!, $description: String!) {
    createTask(input: { content: $content, description: $description }) {
      content
      _id
      description
    }
  }
`;
