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
};

export default api;
