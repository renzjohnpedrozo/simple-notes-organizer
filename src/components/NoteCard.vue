```vue
<template>
  <ion-card class="note-card">

    <ion-card-header>
      <div class="note-header">

        <div class="title-section">
          <ion-card-title>
            {{ note.title }}
          </ion-card-title>

          <ion-badge
            :color="note.status === 'Important' ? 'danger' : 'medium'"
          >
            {{ note.status }}
          </ion-badge>
        </div>

      </div>
    </ion-card-header>

    <ion-card-content>

      <p class="note-content">
        {{ note.content }}
      </p>

      <div class="note-details">

        <div class="detail-item">
          <span class="detail-label">Category</span>
          <span class="detail-value">{{ note.category }}</span>
        </div>

        <div class="detail-item">
          <span class="detail-label">Date Created</span>
          <span class="detail-value">{{ note.dateCreated }}</span>
        </div>

      </div>

      <div class="actions">

        <ion-button
          class="edit-button"
          size="small"
          fill="solid"
          @click="editNote"
        >
          Edit Note
        </ion-button>

        <ion-button
          class="delete-button"
          size="small"
          fill="outline"
          color="danger"
          @click="deleteNote"
        >
          Delete
        </ion-button>

      </div>

    </ion-card-content>

  </ion-card>
</template>

<script setup lang="ts">
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonBadge,
  IonButton
} from '@ionic/vue';

defineProps<{
  note: {
    id?: string;
    title: string;
    content: string;
    category: string;
    dateCreated: string;
    status: string;
  };
}>();

const emit = defineEmits(['edit', 'delete']);

const editNote = () => {
  emit('edit');
};

const deleteNote = () => {
  emit('delete');
};
</script>

<style scoped>

.note-card {
  margin: 0;
  border: 1px solid #dedede;
  border-radius: 10px;
  box-shadow: none;
  background: #ffffff;
  overflow: hidden;
}

ion-card-header {
  padding: 18px 18px 12px;
}

ion-card-content {
  padding: 0 18px 18px;
}

.title-section {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

ion-card-title {
  flex: 1;
  min-width: 0;
  font-size: 19px;
  font-weight: 650;
  line-height: 1.35;
  color: #222;
  overflow-wrap: anywhere;
}

ion-badge {
  flex-shrink: 0;
  padding: 5px 8px;
  border-radius: 6px;
  font-size: 10px;
  font-weight: 600;
}

.note-content {
  margin: 0 0 18px;
  color: #444;
  font-size: 15px;
  line-height: 1.55;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}

.note-details {
  border-top: 1px solid #eeeeee;
  padding-top: 12px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 15px;
  padding: 5px 0;
}

.detail-label {
  color: #777;
  font-size: 13px;
  flex-shrink: 0;
}

.detail-value {
  color: #444;
  font-size: 13px;
  text-align: right;
  overflow-wrap: anywhere;
}

.actions {
  display: flex;
  gap: 10px;
  margin-top: 18px;
  padding-top: 2px;
}

.actions ion-button {
  flex: 1;
  height: 40px;
  margin: 0;
  --border-radius: 6px;
  font-weight: 600;
  font-size: 13px;
}

.edit-button {
  --background: #3880ff;
  --background-hover: #3171e0;
  --color: #ffffff;
}

.delete-button {
  --border-width: 1px;
  --border-color: #eb445a;
  --color: #eb445a;
}

@media (max-width: 480px) {

  .note-card {
    border-radius: 8px;
  }

  ion-card-header {
    padding: 15px 15px 10px;
  }

  ion-card-content {
    padding: 0 15px 15px;
  }

  .title-section {
    gap: 8px;
  }

  ion-card-title {
    font-size: 17px;
  }

  ion-badge {
    padding: 4px 7px;
    font-size: 9px;
  }

  .note-content {
    margin-bottom: 16px;
    font-size: 14px;
    line-height: 1.5;
  }

  .detail-item {
    display: block;
    padding: 6px 0;
  }

  .detail-label {
    display: block;
    margin-bottom: 2px;
    font-size: 11px;
    color: #888;
  }

  .detail-value {
    display: block;
    text-align: left;
    font-size: 13px;
  }

  .actions {
    gap: 8px;
    margin-top: 16px;
  }

  .actions ion-button {
    height: 40px;
    font-size: 12px;
  }

}

</style>
```
