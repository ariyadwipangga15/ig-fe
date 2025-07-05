<template>
  <div>
    <TableListData
      :headers="headers"
      :tableData="data"
      defaultSortBy="createdAt"
      title="Data Role"
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
            v-model="editedItem.nama"
            label="Nama Role"
            :rules="[() => !!editedItem.nama || 'Nama Role harus dilengkapi']"
            required
          ></v-text-field>
          <v-textarea
            v-model="editedItem.keterangan"
            hide-details="auto"
            label="Keterangan Role"
            rows="2"
            dense
            required
          ></v-textarea>
        </v-col>
      </v-row>
    </DialogForm>
  </div>
</template>

<script lang="ts" src="./role.component.ts"></script>
