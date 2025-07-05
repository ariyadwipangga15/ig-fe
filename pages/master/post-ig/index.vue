<template>
  <div>
    <TableListData
      :headers="headers"
      :tableData="data"
      defaultSortBy="createdAt"
      title="Data POST IG"
      searchTitle="Cari . . ."
      @fetchData="loadAll"
      @addItem="addItem"
      @editItem="editItem"
      @deleteItem="deleteItem"
    >
    </TableListData>
    <DialogForm
      :show="dialog"
      :persistent="true"
      :formTitle="dialogTitle"
      @handleSave="handleSave"
      @handleClose="handleClose"
    >
      <v-row class="mt-1">
        <v-col cols="12" md="12">
          <v-text-field
            v-model="editedItem.judul"
            label="Judul"
            :rules="[() => !!editedItem.judul || 'Judul  harus dilengkapi']"
            required
          ></v-text-field>
          <v-textarea
            v-model="editedItem.deskripsi"
            hide-details="auto"
            label="Deskripsi"
            :rules="[() => !!editedItem.deskripsi || 'Deskripsi harus dilengkapi']"
            rows="2"
            dense
            required
          ></v-textarea>
         <v-file-input
        v-model="editedItem.file"
        label="Gambar"
        accept="image/*"
        show-size
        prepend-icon="mdi-camera"
        :rules="[() => !!editedItem.file || 'Gambar harus dipilih']"
        required
      ></v-file-input>
        </v-col>
      </v-row>
      <v-row>
            <v-col cols="12" md="4">
              <v-checkbox v-model="editedItem.is_post" label="Post" color="blue" hide-details>
              </v-checkbox>
             
            </v-col>
            <v-col cols="12" md="4">
              <v-checkbox v-model="editedItem.is_like" label="Like" color="blue"
                hide-details>
              </v-checkbox>
            </v-col>
            <v-col cols="12" md="4">
              <v-checkbox v-model="editedItem.is_komentar" label="Komentar" color="blue" hide-details>
              </v-checkbox>  
              
            </v-col>
           
          </v-row>
    </DialogForm>
  </div>
</template>

<script lang="ts" src="./post-ig.component.ts"></script>
