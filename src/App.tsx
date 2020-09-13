import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

import Counter from "@/components/Counter/Counter"
import NavHeader from "@/components/NavHeader/NavHeader"

import routes from "@/router/index"

import "./App.scss"
import Modal from "./components/Modal"

export default () => {
  return (
    <div>
      <Router>
        <NavHeader />
        <Modal> 
          <div style={{background:'red'}}>aaaaaaaa</div>
        </Modal>
        <Modal>
          <div style={{background:'yellow'}}>bbbbbbbbbb</div>
        </Modal>
        <Counter />
        <Switch>
          {routes.map((route, index) => (
            <RouteWithSubRoutes key={index} {...route} />
          ))}
        </Switch>
      </Router>
    </div>
  )
}

interface RouteType {
  path: string
  exact: boolean
  component: Function
  routes?: object
}

const RouteWithSubRoutes: React.FC<RouteType> = (route) => {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) => {
        return (
          <React.Suspense fallback={<div>加载中...</div>}>
            <route.component {...props} routes={route.routes} />
          </React.Suspense>
        )
      }}
    />
  )
}
