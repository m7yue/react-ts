import Header from '@/components/Counter/Counter';
import NavHeader from '@/components/NavHeader/NavHeader';
import routes from '@/router/index';

import './app.scss';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default () => {
  return (
    <div>
      <Router>
        <NavHeader/>
        <Header/>
        <Switch>
          {routes.map((route, index) => (
            <RouteWithSubRoutes key={index} {...route} />
          ))}
        </Switch>
      </Router>
    </div>
  );
}


interface RouteType {
  path: string;
  component: Function;
  routes?: object;
}

const RouteWithSubRoutes: React.FC<RouteType> = route => {
  return (
    <Route
      path={route.path}
      render={props => {
        return (
          <React.Suspense fallback={<div>加载中...</div>}>
            <route.component {...props} routes={route.routes}/>
          </React.Suspense>
        );
      }}
    />
  );
}

