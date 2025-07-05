import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { PAGE_SIZE } from "~/constants/global";
import Swal from "sweetalert2";
import { toast } from "@/mixins/toast.js";

let $axios: NuxtAxiosInstance;

@Component({
  layout: "admin",
})
export default class MenuComponent extends Vue {
  // Declarate refs
  $refs!: {
    form: HTMLFormElement;
    formAkses: HTMLFormElement;
    refLookupItem: HTMLFormElement;
  };

  public dialog = false;
  public dialogMenuUser = false;
  public valid = true;
  public dialogTitle = "Tambah Menu";
  public formTitle = "Tambah Menu User";
  public isLoading = false;
  public isLoadingMenuUser = false;
  public itemsPerPage = PAGE_SIZE;
  public page = 1;
  public previousPage = 1;
  public propOrder = "id";
  public reverse = false;
  public headers = [
    {
      text: "No",
      value: "no",
      align: "center",
      sortable: false,
      class: "th-head",
      width: "3%",
    },
    { text: "Nama", value: "nama_menu", class: "th-head", width: "20%" },
    { text: "Link", value: "link_menu", class: "th-head", width: "20%" },
    { text: "Icon", value: "class_icon", class: "th-head", width: "20%" },
    { text: "Keterangan", value: "keterangan", class: "th-head", width: "20%" },
    {
      text: "Actions",
      align: "center",
      value: "actions",
      sortable: false,
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

  public defaultItem = {
    id: "",
    nama_menu: "",
    link_menu: "",
    keterangan: "",
    class_icon: "",
  };

  public editedItem: any = {};

  public list_role = [];
  public list_menu = [];
  public list_menu_user = [];
  public id_role_selected = "";

  public list_level = [1, 2, 3];
  public list_posisi = [
    { value: "1", text: "SIDEBAR" },
    // { value: "2", text: "CARD MENU" },
    // { value: "3", text: "DETAIL MENU" },
  ];

  public level = "";
  public posisi = "";
  public parent_selected = "";
  public menu_selected: any = [];
  public roleSelected = { id: "", name: "" };
  public filterSelected: any = {};

  public formInput = [
    {
      type: "inputs",
      jenis: "texts",
      isRequired: true,
      model: "nama_menu",
      label: "Nama",
      rules: [(v: string) => !!v || "Nama wajib diisi"],
    },
    {
      type: "inputs",
      jenis: "texts",
      isRequired: true,
      model: "link_menu",
      label: "Link",
      rules: [(v: string) => !!v || "Link wajib diisi"],
    },
    {
      type: "inputs",
      jenis: "texts",
      isRequired: true,
      model: "class_icon",
      label: "Icon",
    },
    {
      type: "inputs",
      jenis: "texts",
      isRequired: true,
      model: "keterangan",
      label: "Keterangan",
    },
  ];

  mounted() {
    this.$nuxt.$on("close-dialog", () => {
      this.closeDialog();
    });
    this.loadAll();
    this.loadAllRole();
    this.loadAllMenu();
  }

  showDialog() {
    this.dialog = true;
  }

  closeDialog() {
    this.editedItem = this.defaultItem;
    this.dialog = false;
  }

  addItem() {
    this.editedItem = this.defaultItem;
    this.dialogTitle = "Tambah Menu";
    this.dialog = true;
  }

  editItem(x: any) {
    this.$menuService()
      .retrieveById({
       id: x.id,
      })
      .then((res) => {
        if (res.data) {
          if (res.data.length > 0) {
            this.editedItem = res.data[0];
            this.dialogTitle = "Edit Menu";
            this.dialog = true;
          }
        }
      });
  }

  deleteItem(x: any) {
    Swal.fire({
      title: "Hapus Menu",
      text: "Apakah Anda yakin menghapus Menu [" + x.nama_menu + "] !",
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
        this.$menuService()
          .delete(x.id)
          .then((res) => {
            toast.methods.showToast(
              "success",
              "Menu [" + x.nama_menu + "] berhasil dihapus"
            );
            this.loadAll();
          });
      }
    });
  }

  handleSave(formInput: any) {
    formInput.app = 1;
    this.$menuService()
      .save(formInput)
      .then((res) => {
        console.log('res',res)
        if (res.success==true) {
          this.closeDialog();
          toast.methods.showToast("success", res.message);
          this.loadAll();
          this.loadAllMenu()
        }else{
          toast.methods.showToast("error", res.message);
        }
      });
  }

  loadAll(): void {
    this.isLoading = true;
    const { pageNumber, pageSize, q, sortBy, sortType } = (<any>this).$route
      .query;
    this.$menuService()
      .retrieve({
        q: q,
        limit: pageSize ? pageSize : this.itemsPerPage,
        page: pageNumber ? pageNumber : this.page,
        sortBy: sortBy,
        sortType: sortType,
        app: 1,
      })
      .then((res) => {
        this.isLoading = false;
        console.log('res :', res.data)
        this.data = {
          items: res.data != null ? res.data : [],
          meta: res.meta,
        };
      })
      .catch((error) => {
        console.log("error", error);
        this.isLoading = false;
      });
  }

  closeFormMenuUser() {
    this.level = "";
    this.posisi = "";
    this.parent_selected = "";
    this.menu_selected = [];
    this.dialogMenuUser = !this.dialogMenuUser;
  }

  loadAllRole() {
    this.$menuService()
      .getAllRole()
      .then((response) => {
        this.list_role = response.data;
      });
  }

  remove(item: any) {
    const index = this.menu_selected.indexOf(item.id);
    if (index >= 0) this.menu_selected.splice(index, 1);
  }

  loadAllMenu() {
    this.$menuService()
      .getAllMenu({
        app: 1,
      })
      .then((response) => {
        this.list_menu = response.data || [];
      });
  }

  loadMenuUser(val: any) {
    this.isLoadingMenuUser = true
    this.filterSelected = val;
    this.id_role_selected = val.idRole;
    this.roleSelected = this.list_role.find(
      (el: any) => el.id === val.idRole
    ) || { id: "", name: "" };

    console.log(val);

    this.getMenuUser();
  }

  getMenuUser() {
    this.$menuService()
      .getMenuUser({
        idRole: this.filterSelected.idRole,
        posisi: this.filterSelected.posisi,
        app: 1,
      })
      .then((response) => {
        this.list_menu_user = response.data || [];
        for (let index = 0; index < this.list_menu_user.length; index++) {
          let el1:any = this.list_menu_user[index];
          var show_button_up = true;
          var show_button_down = true;
          if (index == 0) {
            show_button_up = false;
          }
          if (index == this.list_menu_user.length - 1) {
            show_button_down = false;
          }
          el1.show_button_up = show_button_up;
          el1.show_button_down = show_button_down;

          if (el1.children) {
            for (let ind = 0; ind < el1.children.length; ind++) {
              const el2 = el1.children[ind];
              var show_button_up2 = true;
              var show_button_down2 = true;
              if (ind == 0) {
                show_button_up2 = false;
              }
              if (ind == el1.children.length - 1) {
                show_button_down2 = false;
              }
              el2.show_button_up = show_button_up2;
              el2.show_button_down = show_button_down2;

              if (el2.children) {
                for (let idx = 0; idx < el2.children.length; idx++) {
                  const el3 = el2.children[idx];
                  var show_button_up3 = true;
                  var show_button_down3 = true;
                  if (idx == 0) {
                    show_button_up3 = false;
                  }
                  if (idx == el2.children.length - 1) {
                    show_button_down3 = false;
                  }
                  el3.show_button_up = show_button_up3;
                  el3.show_button_down = show_button_down3;
                }
              }
            }
          }
        }
        this.isLoadingMenuUser = false
      });
  }

  saveMenuUserValidate() {
    if (this.$refs.formAkses.validate()) {
      this.saveMenuUser();
    }
  }

  saveMenuUser() {
    const postBody = {
      idMenu: this.menu_selected,
      idRole: this.id_role_selected,
      level: this.level,
      parent: this.parent_selected,
      posisi: this.posisi,
    };
    Swal.fire({
      title: "Simpan",
      text: "Apakah Anda yakin ingin menyimpan data ?",
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
        this.$menuService()
          .saveAkses(postBody)
          .then((res) => {
            toast.methods.showToast("success", "Menu berhasil disimpan");
            this.getMenuUser();
            this.closeFormMenuUser();
          });
      }
    });
  }

  deleteMenuUser(val: any) {
    Swal.fire({
      title: "Hapus Menu",
      text: "Apakah Anda yakin menghapus Menu [" + val.nama_menu + "] !",
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
        this.$menuService()
          .deleteAkses(val.id)
          .then(() => {
            toast.methods.showToast(
              "success",
              "Menu [" + val.nama_menu + "] berhasil dihapus"
            );
            this.getMenuUser();
          });
      }
    });
  }
}
