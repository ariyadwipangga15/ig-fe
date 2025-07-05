import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component({
  layout: "admin",
})
export default class DashboardComponent extends Vue {
  public data = [];
}
