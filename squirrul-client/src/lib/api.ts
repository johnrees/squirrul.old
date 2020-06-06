import gql from "graphql-tag";
import { gqlClient } from "./gqlClient";

export interface Tag {
  id: number;
  name: string;
}

interface AcornTag {
  tag: Tag;
}

export interface Acorn {
  id: number;
  name?: string;
  body: string;
  acorns_tags: AcornTag[];
}

export const GET_TAGS = gql`
  query GetTags {
    tags(order_by: { name: asc }) {
      name
    }
  }
`;

export const UPDATE_ACORN = gql`
  mutation UpdateAcorn($id: Int!, $body: String = "", $name: String = null) {
    update_acorns_by_pk(
      pk_columns: { id: $id }
      _set: { name: $name, body: $body }
    ) {
      id
    }
  }
`;

export const GET_ACORNS = gql`
  query GetAcorns {
    acorns(order_by: { id: asc }) {
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

const api = {
  getTags: async function (): Promise<string[]> {
    const { data } = await gqlClient.query<{ tags: Tag[] }>({
      query: GET_TAGS,
    });
    return data.tags.map(({ name }) => name);
  },
  getAcorns: async function (): Promise<Acorn[]> {
    const { data } = await gqlClient.query<{ acorns: Acorn[] }>({
      query: GET_ACORNS,
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
};

export default api;
