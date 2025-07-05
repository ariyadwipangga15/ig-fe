<template>
  <div>
    <TableUser
      :headers="headers"
      :tableData="data"
      defaultSortBy="created_at"
      title="Data User"
      searchTitle="Cari User"
      @fetchData="loadAll"
      @addItem="addItem"
      @editItem="editItem"
      @deleteItem="deleteItem"
      @resetItem="resetPassword"
      :listRole="listRole"
      >
    </TableUser>

    <!-- Dialog -->
    <v-dialog v-model="dialog" persistent scrollable width="600">
      <v-card>
        <v-card-title
          class="appcolor"
          style="color: white; padding-top: 12px; padding-bottom: 12px"
        >
          <span style="font-size: 20px; padding-right: 10px">{{
            formTitle
          }}</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="close()" style="color: white">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form
              onSubmit="return false"
              ref="form"
              v-model="valid"
              lazy-validation
            >
              <v-layout>
                <v-flex xs12 sm12 md12>
                  <v-autocomplete
                    v-model="editedItem.role"
                    :rules="[() => !!editedItem.role || 'Role wajib diisi']"
                    required
                    :items="listRole"
                    item-text="nama"
                    item-value="id"
                    :closeOnSelect="true"
                    :menu-props="{ top: false, offsetY: true }"
                    label="Role"
                    clearable
                  >
                  </v-autocomplete>
                  <v-text-field
                    v-model="editedItem.nama"
                    :rules="[
                      () => !!editedItem.nama || 'nama wajib diisi',
                    ]"
                    label="Nama"
                  ></v-text-field>
                  <v-text-field
                    v-model="editedItem.username"
                    :rules="[
                      () => !!editedItem.username || 'username wajib diisi',
                    ]"
                    required
                    label="Username"
                  ></v-text-field>
                  <v-text-field
                    v-model="editedItem.email"
                    :rules="emailRules"
                    required
                    label="Email"
                  ></v-text-field>
                  <v-text-field
                    v-if="modeform === 'ADD'"
                    v-model="editedItem.password"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="modeform == 'ADD' ? passwordRules : []"
                    :type="showPassword ? 'text' : 'password'"
                    label="Password"
                    @click:append="showPassword = !showPassword"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-form>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <div class="pa-2">
            <v-btn class="mr-2" color="primary" @click="saveValidate()" dark
              >Simpan</v-btn
            >
            <v-btn
              class="body-2 font-weight-bold"
              color="grey"
              dark
              @click="close()"
              >Batal</v-btn
            >
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts" src="./user.component.ts"></script>
