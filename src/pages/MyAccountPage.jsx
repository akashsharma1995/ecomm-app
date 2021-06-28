import Layout from "../components/Layout";
import MyAccountInfo from "../components/myAccountInfo";

import {
  ContentWithSidebar,
  Sidebar,
  MainContent,
} from "../components/UI/ContentWithSidebar";

const listItems = [
  { title: "My Account", linkTo: "/my-account" },
  { title: "Orders", linkTo: "/orders" },
];

const MyAccountPage = (props) => {
  return (
    <Layout myAccountPage>
      <ContentWithSidebar>
        <Sidebar listItems={listItems} />
        <MainContent>
          <MyAccountInfo />
        </MainContent>
      </ContentWithSidebar>
    </Layout>
  );
};

export default MyAccountPage;
