import Base from './Base.js';
import App from './components/App.js';
import LoginPage from './components/auth/LoginContainer.js';
import SignUpPage from './components/auth/SignUpContainer.js';


const routes = {
  component: Base,
  childRoutes: [

    {
      path: '/',
      component: App
    },

    {
      path: '/login',
      component: LoginPage
    },

    {
      path: '/signup',
      component: SignUpPage
    }

  ]
};

export default routes;