import Router from './router.js';
import Home from './components/Home.js';
import About from './components/About.js';

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
];

const router = new Router(routes);

router.beforeEach((to, from, next) => {
  console.log(`Navigating from ${from.path} to ${to.path}`);
  next();
});

router.push('/'); // Initial route
