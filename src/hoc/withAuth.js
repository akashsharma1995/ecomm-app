import { useAuth } from "../customHooks";
// import { history } from 'react-dom';

const WithAuth = props => useAuth(props) && props.children;

export default WithAuth;