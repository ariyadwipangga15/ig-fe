import { $axios } from "~/utils/api";
export default class MenuService {
  public retrieve(req?: any): Promise<any> {
    return $axios.$get(`/menu`, {
      params: req,
    });
  }
  public retrieveById(req?: any): Promise<any> {
    return $axios.$get("/menu/id", {
      params: req,
    });
  }
  // public retrieveById(id: string): Promise<any> {
  //   return $axios.$get(`/menu/` + id);
  // }
  public save(req: any): Promise<any> {
    console.log(req);
    if (req.id) {
      return this.update(req);
    } else {
      return this.create(req);
    }
  }

  public update(req: any): Promise<any> {
    return $axios.$put("/updateMenu/" + req.id, req);
  }
  public create(req: any): Promise<any> {
    return $axios.$post("/createMenu", req);
  }
  public delete(id: string): Promise<any> {
    return $axios.$delete("/menu-hapus/" + id);
  }

  public getAllRole(): Promise<any> {
    return $axios.$get("/roles-all");
  }
  public getAllMenu(req?: any): Promise<any> {
    return $axios.$get("/menu/all", {
      params: req,
    });
  }
  public getMenuUser(req: any): Promise<any> {
    return $axios.$get("/menu-user/", { params: req });
  }
  public saveAkses(req: any): Promise<any> {
    return $axios.$post("/createMenuUser/", req);
  }
  public deleteAkses(id: any): Promise<any> {
    return $axios.$delete("/menu-user-hapus/" + id);
  }
  public getMenuPermission(req: any): Promise<any> {
    return $axios.$get("/menu-user/permission", { params: req });
  }
  public sort(req: any): Promise<any> {
    return $axios.$put("/menu-user/sort", req);
  }
  public upMenu(req: any): Promise<any> {
    return $axios.$put("/upMenu/" + req.id, req);
  }
  public downMenu(req: any): Promise<any> {
    return $axios.$put("/downMenu/" + req.id, req);
  }
}
