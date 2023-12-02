import Router from './router.js';
import Home from './components/Home.js';
import About from './components/About.js';
import Weather from './components/Weather.js'
import Chat from './components/Chat.js'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path:'/weather', component: Weather },
  { path:'/chat', component:Chat }
];

const router = new Router(routes);

router.beforeEach((to, from, next) => {
  console.log(`Navigating from ${from.path} to ${to.path}`);
  next();
});

router.push('/'); // Initial route
