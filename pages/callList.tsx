import CallList from "../components/callList";
import cookies from "next-cookies";
import { addApolloState, initializeApollo } from "../lib/apollo-client";
import { allCallsVariables, GET_CALLS } from "../components/callList/queries";

export default function Calls(props) {
  //@ts-ignore
  return <CallList callsData={props.calls} />;
}

export async function getServerSideProps() {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: GET_CALLS,
    varibales: allCallsVariables,
  });

  return addApolloState(apolloClient, {
    props: {
      calls: data,
    },
  });
}
