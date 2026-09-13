<template>
  <div class="note-form">

    <ion-item>
      <ion-input
        label="Note Title"
        label-placement="stacked"
        placeholder="Enter note title"
        v-model="form.title"
      />
    </ion-item>

    <ion-item>
      <ion-textarea
        label="Content"
        label-placement="stacked"
        placeholder="Write your note..."
        :auto-grow="true"
        v-model="form.content"
      />
    </ion-item>

    <ion-item>
      <ion-input
        label="Category"
        label-placement="stacked"
        placeholder="e.g. School, Personal, Work"
        v-model="form.category"
      />
    </ion-item>

    <ion-item>
      <ion-select
        label="Status"
        label-placement="stacked"
        v-model="form.status"
      >
        <ion-select-option value="Normal">
          Normal
        </ion-select-option>

        <ion-select-option value="Important">
          Important
        </ion-select-option>
      </ion-select>
    </ion-item>

    <div class="buttons">

      <ion-button
        expand="block"
        class="save-button"
        @click="saveNote"
      >
        {{ note ? 'Update Note' : 'Save Note' }}
      </ion-button>

      <ion-button
        expand="block"
        fill="outline"
        class="cancel-button"
        @click="cancel"
      >
        Cancel
      </ion-button>

    </div>

  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';

import {
  IonItem,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonButton
} from '@ionic/vue';

interface Note {
  id?: string;
  title: string;
  content: string;
  category: string;
  dateCreated?: string;
  status: string;
}

const props = defineProps<{
  note?: Note | null;
}>();

const emit = defineEmits(['save', 'cancel']);

const form = reactive({
  title: '',
  content: '',
  category: '',
  status: 'Normal'
});

watch(
  () => props.note,
  (newNote) => {

    if (newNote) {
      form.title = newNote.title;
      form.content = newNote.content;
      form.category = newNote.category;
      form.status = newNote.status;
    } else {
      form.title = '';
      form.content = '';
      form.category = '';
      form.status = 'Normal';
    }

  },
  { immediate: true }
);

const saveNote = () => {
  emit('save', { ...form });
};

const cancel = () => {
  emit('cancel');
};
</script>

<style scoped>
.note-form {
  padding: 2px;
}

ion-item {
  --background: #f8faf8;
  --border-color: #d9e4dc;
  --highlight-color-focused: #397064;
  --border-radius: 9px;
  margin-bottom: 12px;
}

ion-input,
ion-textarea,
ion-select {
  --color: #222;
  --placeholder-color: #89958f;
}

ion-input::part(label),
ion-textarea::part(label),
ion-select::part(label) {
  color: #397064;
  font-weight: 600;
}

.buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 18px;
}

ion-button {
  height: 43px;
  margin: 0;
  --border-radius: 9px;
  font-weight: 600;
}

.save-button {
  --background: #397064;
  --background-hover: #2d5d53;
  --color: #ffffff;
}

.cancel-button {
  --border-color: #b8c9bd;
  --color: #53665d;
}

@media (max-width: 480px) {
  .note-form {
    padding: 2px;
  }

  ion-item {
    margin-bottom: 10px;
  }

  .buttons {
    grid-template-columns: 1fr;
  }

  ion-button {
    height: 43px;
  }
}
</style>