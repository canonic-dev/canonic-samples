import { gql } from "@apollo/client";

export const GET_CONTAINERS = gql`
  query {
    containers {
      #Container is on the the table on the Canonic backend
      title #Title contains the title of the container
      identifier #Using the identifier to associate the PR with the container.
    }
  }
`;

export const GET_PR = gql`
  query {
    pullRequests {
      #Pull Requests is another table on the Canonic backend
      github {
        #Github is the name of our Github integration.
        title #title will contain PR's title
        state #state will contain PR's state (etiher 'open' or 'closed')
        body #body contains the description of the PR
        draft #draft contains a boolean value indicating if the PR is a draft or not
        html_url #html_url contains the link to PR on github.com
        user {
          #user will hold user's data, here we are only fetching their profile picture link and their username
          avatar_url #avatar_url has the profile picture link of the user
          login #login has user's username
        }
        assignee {
          #assignee contains either null means PR has no assignee or return a user's data, here as well we are fetching their profile picture link and their username.
          avatar_url #avatar_url has the assignee's profile picture link of the user
          login #login has assignee's username
        }
        labels {
          #labels contains the array of labels. Here we will be just needing name and color
          name #name has title of the label
          color #color contains the hexadecimal value of color without a '#'
        }
      }
    }
  }
`;
