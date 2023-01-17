import { gql, useQuery } from "@apollo/client";

 const GET_USER = gql`
  query Me {
  me {
    id
    username
  }
}
`

const useGeTUser = () => {
  return useQuery(GET_USER);

}

export default useGeTUser;