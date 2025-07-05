
export interface FilterReportHarian {
    startDate: string
    idGudang: string | ''
}
export interface FilterKartuPersedian {
    startDate: string
    endDate: string
    idGudang: string | ''
    idItem: string | ''
    idMutu: string | ''
    idKebun: string | ''
    tahunPanen: string | ''
    idBulan: string | ''
}
export interface FilterPenjualan {
    startDate: string
    endDate: string
    idKebun: string | ''
    idItem: string | ''
}
export interface FilterNotaTimbang {
    startDate: string
    endDate: string
    idGudang: string | ''
    idKebun: string | ''
    idItem: string | ''
}
