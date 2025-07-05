import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { PAGE_SIZE } from "~/constants/global";
import Swal from "sweetalert2";
import { toast } from "@/mixins/toast.js";

let $axios: NuxtAxiosInstance;

@Component({
  layout: "admin",
})
export default class UserComponent extends Vue {
  // Declarate refs
  $refs!: {
    form: HTMLFormElement;
    refLookupPegawai: HTMLFormElement;
  };

  public dialog = false;
  public isLoading = false;
  public itemsPerPage = PAGE_SIZE;
  public page = 1;
  public previousPage = 1;
  public propOrder = "id";
  public reverse = false;
  public valid = false;
  public showPassword = false;
  public modeform = "ADD";
  public listRole: any = [];
  public headers = [
    {
      text: "No",
      align: "center",
      sortable: false,
      value: "no",
      class: "th-head",
      width: "3%",
    },
    {
      text: "Username",
      align: "left",
      value: "username",
      class: "th-head",
      sortable: true,
      width: "20%",
    },
    {
      text: "Nama",
      align: "left",
      value: "nama",
      class: "th-head",
      sortable: true,
      width: "20%",
    },
    {
      text: "Email",
      align: "left",
      value: "email",
      class: "th-head",
      sortable: true,
      width: "10%",
    },
    {
      text: "Role",
      align: "left",
      value: "nama_role",
      class: "th-head",
      sortable: true,
      width: "15%",
    }, 
    {
      text: "Aksi",
      sortable: false,
      align: "center",
      value: "actions",
      class: "th-head",
      width: "10%",
    },
  ];
  public data = {
    items: [],
    meta: {
      totalItems: 0,
    },
  };

  public passwordRules: any = [
    (v: any) => !!v || "Password wajib diisi",
    (v: string | any[]) =>
      (v && v.length >= 8 && !Boolean(this.editedItem.id)) ||
      "Password minimal 8 karakter",
  ];

  public emailRules: any = [
    (v: any) => !!v || "Email wajib diisi",
    (v: string) => /.+@.+\..+/.test(v) || "Email harus valid",
  ];

  public defaultItem = {
    username: "",
    email: "",
    role: "",
    password: "",
    nama: "",
  };

  public editedItem: any = {};

  mounted(): void {
    this.loadAll();
  }

  created(): void {
    this.loadAllRole();
  }

  get formTitle() {
    return this.modeform === "UPDATE" ? "Edit User" : "Tambah User";
  }

  loadAll(): void {
    this.isLoading = true;
    const { pageNumber, pageSize, q, sortBy, sortType, idRole } = (<any>this).$route
    .query;
    this.$userService()
      .retrieve({
        q: q,
        limit: pageSize ? pageSize : this.itemsPerPage,
        page: pageNumber ? pageNumber : this.page,
        sortBy: sortBy,
        sortType: sortType,
        role: idRole ? idRole : "",
      })
      .then((res) => {
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
  loadAllRole(): void {
    this.$menuService()
      .getAllRole()
      .then((res) => {
        this.listRole = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  
  resetPassword(item: any): void {
    const reset = {
      id: item.id,
      newPassword: "123456",
    };
    this.$userService()
      .resetPassword(reset)
      .then((res) => {
        toast.methods.showToast(
          "success",
          "Password [" + item.username + "] berhasil di reset"
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  isNumber(evt: any): true | undefined {
    evt = evt ? evt : window.event;
    var charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
      evt.preventDefault();
    } else {
      return true;
    }
  }

  close(): void {
    this.$refs.form.resetValidation();
    this.editedItem = Object.assign({}, this.defaultItem);
    this.modeform = "ADD";
    this.dialog = false;
  }

  addItem(): void {
    this.editedItem = this.defaultItem;
    this.dialog = true;
  }

  editItem(x: any) {
    this.$userService()
      .retrieveById(x.id)
      .then((res) => {
        if (res.data) {
          if (res.data.length > 0) {
          this.editedItem = res.data[0];
          this.modeform = "UPDATE";
          this.editedItem.password = "";
          this.dialog = true;
        }
        }
      });
  }

  deleteItem(x: any) {
    Swal.fire({
      title: "Hapus User",
      text: "Apakah Anda yakin menghapus User [" + x.username + "] !",
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
        this.$userService()
          .delete(x.id)
          .then((res) => {
            toast.methods.showToast(
              "success",
              "User [" + x.username + "] berhasil dihapus"
            );
            this.loadAll();
          });
      }
    });
  }

  saveValidate(): void {
    if (this.$refs.form.validate()) {
      this.handleSave();
      this.$refs.form.resetValidation();
    }
  }

  handleSave() {
    this.$userService()
      .save(this.editedItem)
      .then((res) => {
        if (res.success==true) {
          toast.methods.showToast("success", "User berhasil disimpan");
          this.close();
          this.loadAll();
        }else{
          toast.methods.showToast("error", res.message);
        }

      })
      .catch((err) => {
        console.log(err);
      });
  }
}
