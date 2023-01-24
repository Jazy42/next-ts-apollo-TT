import CallList from "../components/callList";
import { addApolloState, initializeApollo } from "../lib/apollo-client";
import { allCallsVariables, GET_CALLS } from "../components/callList/queries";

export default function Calls(props) {
  return <CallList callsData={props.callsData} />;
}

const apolloClient = initializeApollo();

export async function getServerSideProps(ctx) {
  const { req, res } = ctx;
  const accessToken = req.cookies["access_token"];

  const { data } = await apolloClient.query({
    query: GET_CALLS,
    variables: allCallsVariables,
    context: {
      accessToken,
    },
  });

  return addApolloState(apolloClient, {
    props: {
      callsData: data,
    },
  });
}
