class Router {
    constructor(routes) {
      this.routes = routes;
      this.currentRoute = null;
      this.beforeEachCallback = null;
      window.addEventListener('popstate', this.onPopState.bind(this));
    }
  
    push(path) {
      window.history.pushState({}, null, path);
      this.onPopState();
    }
  
    render() {
      const view = document.getElementById('app');
      const routeComponent = this.currentRoute ? new this.currentRoute.component() : null;
      console.log('routeComponent.$el',routeComponent.$el)
      view.innerHTML = '';
      if (routeComponent) {
        view.appendChild(routeComponent.$el);
        routeComponent.mounted();
      }
    }
  
    beforeEach(callback) {
      this.beforeEachCallback = callback;
    }
  
    beforeRouteEnterCallback(to, from, next) {
      const continueNavigation = ()=>{
        this.currentRoute = to
        this.render()
      }
      if (this.beforeEachCallback) {
        this.beforeEachCallback(to, from, continueNavigation);
      } else {
        continueNavigation()
      }
    }
  
    onPopState() {
      const path = window.location.pathname;
      const toRoute = this.routes.find(route => route.path === path) || {};
      const fromRoute = this.currentRoute || {};
  
      this.beforeRouteEnterCallback(toRoute, fromRoute, () => {
        this.currentRoute = toRoute;
        this.render();
      });
    }
  }
  
  export default Router;
  