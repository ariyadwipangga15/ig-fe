import Swal from 'sweetalert2'
export const toast = {
  methods: {
    showToast(icon, title) {
      let Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });
      Toast.fire({
        icon: icon,
        title: title
      });
    },
    showSuccessModalSwal(msg, action = null) {
      Swal.fire({
        title: 'Berhasil !',
        text: msg,
        icon: 'success',
        allowOutsideClick: false,
      }).then((result) => {
        if (result.value) {
          action
        }
      })
    },

    showWarningModalSwal(msg, action = null) {
      Swal.fire({
        title: 'Warning !',
        text: msg,
        icon: 'warning',
        allowOutsideClick: false,
      }).then((result) => {
        if (result.value) {
          action
        }
      })
    },
    swalAlert(title, icon, msg){
      Swal.fire(
        title,
        msg,
        icon
      )
    }
  },
  created() {
    
  },
}