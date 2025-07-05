import { $axios } from '~/utils/api';
export default class RoleService {
  url = "/roles";
  public retrieve(req?: any): Promise<any> {
    return $axios.$get(this.url, {
      params: req,
    });
  }
  public retrieveAll(req?: any): Promise<any> {
    return $axios.$get(`${this.url}/all`, {
      params: req,
    });
  }
  public retrieveById(id: string): Promise<any> {
    return $axios.$get(`${this.url}/${id}`);
  }
  public save(req: any): Promise<any> {
    if (req.id) {
      return this.update(req);
    } else {
      return this.create(req);
    }
  }
  public update(req: any): Promise<any> {
    return $axios.$put("/roles-update/" + req.id, req);
  }
  public create(req: any): Promise<any> {
    return $axios.$post("/roles-create/", req);
  }
  public delete(id: string): Promise<any> {
    return $axios.$delete("/roles-delete/" + id);
  }
  
}
