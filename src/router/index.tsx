import { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import AdminLayout from "../components/AdminLayout";
import routes from "./config";
import { Styles } from "../styles/styles";

const Router = () => {
  return (
    <Suspense fallback={null}>
      <Styles />
      <Switch>
        {routes.map((routeItem) => {
          const Component = lazy(() => import(`../pages/${routeItem.component}`));
          
          return (
            <Route
              key={routeItem.component}
              path={routeItem.path}
              exact={routeItem.exact}
              render={(props) => {
                if (routeItem.layout === "admin") {
                  return (
                    <AdminLayout>
                      <Component {...props} />
                    </AdminLayout>
                  );
                }
                
                if (routeItem.layout === "site") {
                  return (
                    <>
                      <Header />
                      <Component {...props} />
                      <Footer />
                    </>
                  );
                }
                
                // Auth ou outros layouts sem header/footer
                return <Component {...props} />;
              }}
            />
          );
        })}
      </Switch>
    </Suspense>
  );
};

export default Router;
