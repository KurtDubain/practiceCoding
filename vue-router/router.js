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
      if (this.beforeEachCallback) {
        this.beforeEachCallback(to, from, next);
      } else {
        next();
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
  