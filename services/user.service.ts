import { $axios } from '~/utils/api';
export default class UserService {

  public retrieve(req?: any): Promise<any> {
    return $axios.$get(`/users`, {
      params: req,
    });
  }
  public retrieveById(id: string): Promise<any> {
    return $axios.$get(`/users/` + id);
  }
  public save(req: any): Promise<any> {
    if (req.id) {
      return this.update(req);
    } else {
      return this.create(req);
    }
  }
  public update(req: any): Promise<any> {
    return $axios.$put('/users-update/' + req.id, req)
  }
  public resetPassword(req: any): Promise<any> {
    return $axios.$put('/users/password/reset/' + req.id, req)
  }
  public create(req: any): Promise<any> {
    return $axios.$post('/users-create', req)
  }
  public delete(id: string): Promise<any> {
    return $axios.$delete('/users-delete/' + id)
  }
}
