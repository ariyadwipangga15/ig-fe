import { Component, Vue } from "nuxt-property-decorator";
import { PAGE_SIZE } from "~/constants/global";
import Swal from "sweetalert2";
import { toast } from "@/mixins/toast.js";

@Component({
  layout: "admin",
})
export default class PostIGComponent extends Vue {
  public dialog = false;
  public dialogTitle = "Tambah PostIG";
  public isLoading = false;
  public itemsPerPage = PAGE_SIZE;
  public page = 1;
  public previousPage = 1;
  public propOrder = "id";
  public reverse = false;
  public headers = [
    { text: "No", value: "no", align: "center", sortable: false, width: "5%" },
    { text: "Judul", value: "judul", width: "35%" },
    { text: "Deksripsi", value: "deskripsi", width: "50%" },
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
    judul: "",
    deskripsi: "",
    file : null

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
    this.dialogTitle = "Tambah PostIG";
    this.dialog = true;
  }

  editItem(x: any) {
    this.dialogTitle = "Edit PostIG";
    this.editedItem = x
    this.editedItem.id = x.id
    this.editedItem.fileOld = x.path_image
    this.dialog = true;
  }

  deleteItem(x: any) {
    Swal.fire({
      title: "Hapus Data",
      text: "Apakah Anda yakin menghapus PostIG [" + x.nama + "] !",
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
        this.$postIgService()
          .delete(x.id)
          .then((res: any) => {
            toast.methods.showToast(
              "success",
              "Data [" + x.judul + "] berhasil dihapus"
            );
            this.loadAll();
          });
      }
    });
  }

  handleSave() {
    const formData = new FormData();
    if(this.editedItem.id){
      formData.append('id', this.editedItem.id);
      formData.append('judul', this.editedItem.judul);
      formData.append('deskripsi', this.editedItem.deskripsi);
      formData.append('file', this.editedItem.file); 
      formData.append('fileOld', this.editedItem.path_image); 
    }else{
      formData.append('judul', this.editedItem.judul);
      formData.append('deskripsi', this.editedItem.deskripsi);
      formData.append('file', this.editedItem.file);
    }
  
    this.$postIgService()
      .save(formData, this.editedItem.id)
      .then((res: any) => {
        if (res.success === true) {
          this.handleClose();
          toast.methods.showToast("success", res.message);
          this.loadAll();
        } else {
          toast.methods.showToast("error", res.message);
        }
      });
  }
  

  loadAll(): void {
    this.isLoading = true;
    const { pageNumber, pageSize, q, sortBy, sortType } = (<any>this).$route.query;
    this.$postIgService()
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
