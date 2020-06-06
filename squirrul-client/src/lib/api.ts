import gql from "graphql-tag";
import { gqlClient } from "./gqlClient";

type UUID = string;

export interface Tag {
  id: UUID;
  name: string;
}

interface AcornTag {
  tag: Tag;
}

export interface Acorn {
  id: UUID;
  name?: string;
  body: string;
  acorns_tags: AcornTag[];
}

export const GET_TAGS = gql`
  query GetTags($username: String!) {
    tags(
      order_by: { name: asc }
      where: { creator: { username: { _eq: $username } } }
    ) {
      name
    }
  }
`;

export const GET_ACORNS = gql`
  query GetAcorns($username: String!) {
    acorns(
      order_by: { id: asc }
      where: { creator: { username: { _eq: $username } } }
    ) {
      id
      name
      body
      acorns_tags {
        tag {
          name
        }
      }
    }
  }
`;

export const UPDATE_ACORN = gql`
  mutation UpdateAcorn($id: uuid!, $name: String = null, $body: String!) {
    update_acorns_by_pk(
      pk_columns: { id: $id }
      _set: { body: $body, name: $name }
    ) {
      id
      name
      body
      updated_at
    }
  }
`;

const api = (username: string) => ({
  getTags: async function (): Promise<string[]> {
    const { data } = await gqlClient.query<{ tags: Tag[] }>({
      query: GET_TAGS,
      variables: {
        username,
      },
    });
    return data.tags.map(({ name }) => name);
  },

  getAcorns: async function (): Promise<Acorn[]> {
    const { data } = await gqlClient.query<{ acorns: Acorn[] }>({
      query: GET_ACORNS,
      variables: {
        username,
      },
    });
    return data.acorns;
  },

  updateAcorn: async function (variables: Acorn): Promise<any> {
    const { data } = await gqlClient.mutate<{ acorn: Acorn }>({
      mutation: UPDATE_ACORN,
      variables,
    });
    return data;
  },
});

export default api;
