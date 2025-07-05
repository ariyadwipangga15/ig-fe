import { Component, Vue } from "nuxt-property-decorator";
import { PAGE_SIZE } from "~/constants/global";
import Swal from "sweetalert2";
import { toast } from "@/mixins/toast.js";

@Component({
  layout: "admin",
})
export default class RoleComponent extends Vue {
  public dialog = false;
  public dialogTitle = "Tambah Role";
  public isLoading = false;
  public itemsPerPage = PAGE_SIZE;
  public page = 1;
  public previousPage = 1;
  public propOrder = "id";
  public reverse = false;
  public headers = [
    { text: "No", value: "no", align: "center", sortable: false, width: "5%" },
    { text: "Nama Role", value: "nama", width: "35%" },
    { text: "Keterangan", value: "keterangan", width: "50%" },
    {
      text: "Aksi",
      align: "center",
      value: "actions",
      sortable: false,
      width: "10%",
    },
  ];
  public editedItem: any = {};
  public defaultItem = {
    nama: "",
    keterangan: "",
  };
  public data = {
    items: [],
    meta: {
      total: 0,
    },
  };

  created() {
    this.loadAll();
  }

  handleClose() {
    this.editedItem = this.defaultItem;
    this.dialog = false;
  }

  addItem() {
    this.editedItem = this.defaultItem;
    this.dialogTitle = "Tambah Role";
    this.dialog = true;
  }

  editItem(x: any) {
    this.dialogTitle = "Edit Role";
    this.editedItem = x
    this.dialog = true;
  }

  deleteItem(x: any) {
    Swal.fire({
      title: "Hapus Data",
      text: "Apakah Anda yakin menghapus Role [" + x.nama + "] !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#95a5a6",
      confirmButtonText: "Ya",
      cancelButtonText: "Batal",
      showLoaderOnConfirm: true,
      allowOutsideClick: false,
    }).then((result) => {
      if (result.value) {
        this.$roleService()
          .delete(x.id)
          .then((res: any) => {
            toast.methods.showToast(
              "success",
              "Data [" + x.nama + "] berhasil dihapus"
            );
            this.loadAll();
          });
      }
    });
  }

  handleSave() {
    this.$roleService()
      .save(this.editedItem)
      .then((res: any) => {
        if (res.success==true) {
          this.handleClose();
          this.handleClose();
          toast.methods.showToast("success", res.message);
          this.loadAll();
        }else{
          toast.methods.showToast("error", res.message);
        }
      });
  }

  loadAll(): void {
    this.isLoading = true;
    const { pageNumber, pageSize, q, sortBy, sortType } = (<any>this).$route.query;
    this.$roleService()
      .retrieve({
        q: q,
        limit: pageSize ? pageSize : this.itemsPerPage,
        page: pageNumber ? pageNumber : this.page,
        sortBy: sortBy,
        sortType: sortType,
      })
      .then((res: any) => {
        this.isLoading = false;
        this.data = {
          items: res.data != null ? res.data : [],
          meta: res.meta,
        };
      })
      .catch(() => {
        this.isLoading = false;
      });
  }
}
