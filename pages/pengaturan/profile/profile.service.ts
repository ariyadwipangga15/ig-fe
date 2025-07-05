import { $axios } from "~/utils/api";

export default class ProfileService {
    public ubahPassword(req?: any): Promise<any> {
        return $axios.$post(`ubah-password`, req);
    }
    public downloadDb(req?: any): Promise<any> {
        return $axios.$get(`create-backup`, {
            params: req,
        });
    }
}