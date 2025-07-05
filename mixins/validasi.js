export const validasi = {
    data(){
        return{
            tgl:"",
            bulan: ['', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September' , 'Oktober', 'November', 'Desember'],
        }
    },
    methods:{
      isNumberOnly: function(evt) {
        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
          evt.preventDefault();
        } else {
          return true;
        }
      },
        isNumber: function(evt) {
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
              evt.preventDefault();;
            } else {
              return true;
            }
          },
          onlyNumberPhoneFax: function(evt) {
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 40 && charCode !== 41 && charCode !== 46) {
              evt.preventDefault();;
            } else {
              return true;
            }
          },
          onlyAlphabets: function(evt) {
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123)) {
                return true;
            } else {
                evt.preventDefault();
            }
        }
    },
    created: function () {

    }
}
