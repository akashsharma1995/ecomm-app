import Layout from "../components/Layout";
import Orders from "../components/orders";

import {
  ContentWithSidebar,
  Sidebar,
  MainContent,
} from "../components/UI/ContentWithSidebar";

const listItems = [
  { title: "My Account", linkTo: "/my-account" },
  { title: "Orders", linkTo: "/orders" },
];

const MyOrdersPage = (props) => {
  return (
    <Layout myOrdersPage>
      <ContentWithSidebar>
        <Sidebar listItems={listItems} />
        <MainContent>
          <Orders />
        </MainContent>
      </ContentWithSidebar>
    </Layout>
  );
};

export default MyOrdersPage;
