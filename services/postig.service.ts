import { $axios } from '~/utils/api';
export default class PostIgService {
  url = "/postIg";
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
  public save(req: any, id:any): Promise<any> {
    if (id) {
      return this.update(req);
    } else {
      return this.create(req);
    }
  }
  public update(req: any): Promise<any> {
    return $axios.$post("/update-postIg/", req);
  }
  public create(req: any): Promise<any> {
    return $axios.$post("/postIg/", req);
  }
  public delete(id: string): Promise<any> {
    return $axios.$delete("/postIg/" + id);
  }
  
}
