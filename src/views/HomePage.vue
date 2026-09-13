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
          <div>
            <span class="eyebrow">YOUR PERSONAL SPACE</span>
            <h1>My Notes</h1>
          </div>

        </div>

        <div class="stats-bar">
          <div class="stat-item">
            <span class="stat-value">{{ normalNotes }}</span>
            <span class="stat-label">Normal</span>
          </div>

          <div class="stat-divider"></div>

          <div class="stat-item">
            <span class="stat-value important-value">{{ importantNotes }}</span>
            <span class="stat-label">Important</span>
          </div>
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
import { computed, onMounted, onUnmounted, ref } from 'vue';

import {
  createNote,
  deleteNote as deleteFirebaseNote,
  subscribeToNotes,
  updateNote as updateFirebaseNote
} from '@/services/noteService';

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

const importantNotes = computed(() =>
  notes.value.filter(note => note.status === 'Important').length
);

const normalNotes = computed(() =>
  notes.value.filter(note => note.status === 'Normal').length
);

let stopNotesSubscription: (() => void) | undefined;

onMounted(() => {
  stopNotesSubscription = subscribeToNotes(firebaseNotes => {
    notes.value = firebaseNotes.map(note => ({
      id: note.id ?? '',
      title: note.title,
      content: note.content,
      category: note.category,
      dateCreated: note.dateCreated,
      status: note.status
    }));
  });
});

onUnmounted(() => {
  stopNotesSubscription?.();
});

const saveNote = async (formData: {
  title: string;
  content: string;
  category: string;
  status: string;
}) => {
  const noteData = {
    title: formData.title,
    content: formData.content,
    category: formData.category,
    dateCreated: editingNote.value?.dateCreated ?? new Date().toLocaleDateString(),
    status: formData.status
  };

  if (editingNote.value) {
    await updateFirebaseNote(editingNote.value.id, noteData);
  }
  else {
    await createNote(noteData);
  }

  closeForm();
};

const editNote = (note: Note) => {
  editingNote.value = note;
  showForm.value = true;
};

const deleteNote = async (id: string) => {
  await deleteFirebaseNote(id);
};

const closeForm = () => {
  showForm.value = false;
  editingNote.value = null;
};
</script>

<style scoped>

ion-content {
  --background: #f4f7f4;
}

ion-toolbar {
  --background: #173f3a;
  --color: #ffffff;
  --border-width: 0;
}

ion-title {
  font-weight: 600;
}

.container {
  width: 100%;
  max-width: 760px;
  margin: 0 auto;
  padding: 32px 20px 48px;
}

.page-header {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
  text-align: center;
}

.eyebrow {
  display: block;
  margin-bottom: 8px;
  color: #ba6b3d;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1.4px;
}

.page-header h1 {
  margin: 0;
  color: #173f3a;
  font-size: 34px;
  font-weight: 750;
  letter-spacing: 0;
}

.stats-bar {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 17px 20px;
  margin-bottom: 18px;
  border: 1px solid #dce7df;
  border-radius: 14px;
  background: #ffffff;
  box-shadow: 0 8px 24px rgba(23, 63, 58, 0.06);
}

.stat-item {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.stat-value {
  color: #173f3a;
  font-size: 22px;
  font-weight: 800;
}

.important-value {
  color: #ba6b3d;
}

.stat-label {
  color: #71807a;
  font-size: 13px;
}

.stat-divider {
  width: 1px;
  height: 25px;
  background: #dce7df;
}

.add-button {
  --background: #ba6b3d;
  --background-hover: #a95d33;
  --color: #ffffff;
  --border-radius: 10px;
  height: 46px;
  margin-bottom: 25px;
  font-weight: 600;
}

.form-container {
  background: #ffffff;
  border: 1px solid #dce7df;
  border-radius: 14px;
  padding: 20px;
  margin-bottom: 25px;
  box-shadow: 0 8px 24px rgba(23, 63, 58, 0.06);
}

.form-container h2 {
  margin: 0 0 15px;
  font-size: 20px;
  color: #173f3a;
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
  color: #173f3a;
}

.notes-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.empty-state {
  background: #ffffff;
  border: 1px solid #dce7df;
  border-radius: 14px;
  text-align: center;
  padding: 40px 20px;
  margin-top: 10px;
}

.empty-state h2 {
  margin: 0 0 8px;
  font-size: 20px;
  color: #173f3a;
}

.empty-state p {
  margin: 0 0 20px;
  color: #65736f;
  font-size: 14px;
}

.empty-state ion-button {
  --border-color: #397064;
  --color: #397064;
  --border-radius: 7px;
}

@media (max-width: 480px) {

  .container {
    padding: 24px 14px 35px;
  }

  .page-header h1 {
    font-size: 29px;
  }

  .stats-bar {
    gap: 14px;
    padding: 15px;
  }

  .stat-item {
    display: block;
  }

  .stat-label {
    display: block;
    margin-top: 2px;
    font-size: 11px;
  }

}

</style>