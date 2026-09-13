<template>
  <ion-page>

    <ion-header>
      <ion-toolbar>
        <ion-title>Simple Notes Organizer</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>

      <div class="container">

        <div class="page-header">
          <h1>My Notes</h1>
          <p>Manage and organize your notes.</p>
        </div>

        <ion-button
          expand="block"
          class="add-button"
          @click="showForm = true"
        >
          Add Note
        </ion-button>

        <div
          v-if="showForm"
          class="form-container"
        >

          <h2>
            {{ editingNote ? 'Edit Note' : 'Add New Note' }}
          </h2>

          <NoteForm
            :note="editingNote"
            @save="saveNote"
            @cancel="closeForm"
          />

        </div>

        <div
          v-if="notes.length > 0"
          class="notes-section"
        >

          <div class="section-title">
            <h2>Notes</h2>
            <span>
              {{ notes.length }}
            </span>
          </div>

          <div class="notes-list">

            <NoteCard
              v-for="note in notes"
              :key="note.id"
              :note="note"
              @edit="editNote(note)"
              @delete="deleteNote(note.id)"
            />

          </div>

        </div>

        <div
          v-else-if="!showForm"
          class="empty-state"
        >
          <h2>No Notes Yet</h2>

          <p>
            Add your first note to get started.
          </p>

          <ion-button
            fill="outline"
            @click="showForm = true"
          >
            Add Your First Note
          </ion-button>
        </div>

      </div>

    </ion-content>

  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton
} from '@ionic/vue';

import NoteForm from '@/components/NoteForm.vue';
import NoteCard from '@/components/NoteCard.vue';

interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  dateCreated: string;
  status: string;
}

const showForm = ref(false);

const editingNote = ref<Note | null>(null);

const notes = ref<Note[]>([]);

const saveNote = (formData: {
  title: string;
  content: string;
  category: string;
  status: string;
}) => {

  if (editingNote.value) {

    const index = notes.value.findIndex(
      note => note.id === editingNote.value?.id
    );

    if (index !== -1) {

      notes.value[index] = {
        ...editingNote.value,
        ...formData
      };

    }

  }

  else {

    const newNote: Note = {
      id: Date.now().toString(),
      title: formData.title,
      content: formData.content,
      category: formData.category,
      dateCreated: new Date().toLocaleDateString(),
      status: formData.status
    };

    notes.value.push(newNote);
  }

  closeForm();
};

const editNote = (note: Note) => {
  editingNote.value = note;
  showForm.value = true;
};

const deleteNote = (id: string) => {
  notes.value = notes.value.filter(
    note => note.id !== id
  );
};

const closeForm = () => {
  showForm.value = false;
  editingNote.value = null;
};
</script>

<style scoped>

ion-content {
  --background: #eef5fb;
}

ion-toolbar {
  --background: #1f5fae;
  --color: #ffffff;
  --border-width: 0;
}

ion-title {
  font-weight: 600;
}

.container {
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  padding: 25px 18px 40px;
}

.page-header {
  margin-bottom: 20px;
}

.page-header h1 {
  margin: 0;
  font-size: 30px;
  font-weight: 700;
  color: #1d3557;
}

.page-header p {
  margin: 6px 0 0;
  color: #60758a;
  font-size: 14px;
}

.add-button {
  --background: #1f5fae;
  --background-hover: #194f91;
  --color: #ffffff;
  --border-radius: 8px;
  height: 46px;
  margin-bottom: 25px;
  font-weight: 600;
}

.form-container {
  background: #ffffff;
  border: 1px solid #d8e5f2;
  border-radius: 8px;
  padding: 18px;
  margin-bottom: 25px;
}

.form-container h2 {
  margin: 0 0 15px;
  font-size: 20px;
  color: #1d3557;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.section-title h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #1d3557;
}

.section-title span {
  min-width: 24px;
  height: 24px;
  padding: 0 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: #d7e7f7;
  color: #245b96;
  font-size: 12px;
  font-weight: 600;
}

.notes-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.empty-state {
  background: #ffffff;
  border: 1px solid #d8e5f2;
  border-radius: 8px;
  text-align: center;
  padding: 40px 20px;
  margin-top: 10px;
}

.empty-state h2 {
  margin: 0 0 8px;
  font-size: 20px;
  color: #1d3557;
}

.empty-state p {
  margin: 0 0 20px;
  color: #60758a;
  font-size: 14px;
}

.empty-state ion-button {
  --border-color: #1f5fae;
  --color: #1f5fae;
  --border-radius: 7px;
}

@media (max-width: 480px) {

  .container {
    padding: 20px 14px 35px;
  }

  .page-header h1 {
    font-size: 27px;
  }

}

</style>