<template>
  <v-container class="pa-6">
    <draggable
      v-model="cards"
      item-key="id"
      class="d-flex align-start flex-wrap"
      style="gap: 24px"
      ghost-class="drag-ghost"
      chosen-class="drag-chosen"
      drag-class="drag-dragging"
      :animation="200"
    >
      <template #item="{ element }">
        <div class="draggable-card w-fit">
          <component :is="element.comp" :clickable="true" />
        </div>
      </template>
    </draggable>
  </v-container>
</template>

<script setup>
import NewsCard from '@/components/views/Home/NewsCard.vue'
import ContactsCard from '@/components/views/Home/ContactsCard.vue'
import TasksCard from '@/components/views/Home/TasksCard.vue'
import DayPlan from '@/components/views/Home/DayPlan.vue'
import { ref, onMounted, watch } from 'vue'
import draggable from 'vuedraggable'

// Base list of available cards
const allCards = [
  { id: 'news', comp: NewsCard },
  { id: 'contacts', comp: ContactsCard },
  { id: 'tasks', comp: TasksCard },

  { id: 'dayPlan', comp: DayPlan },
]

// Reactive list for Draggable UI
const cards = ref([...allCards])

const CARD_ORDER_KEY = 'home.cardsOrder'

const applyOrder = ids => {
  const idToCard = Object.fromEntries(allCards.map(c => [c.id, c]))
  const ordered = ids.map(id => idToCard[id]).filter(Boolean)
  const missing = allCards.filter(c => !ids.includes(c.id))
  cards.value = [...ordered, ...missing]
}

onMounted(() => {
  try {
    const raw = localStorage.getItem(CARD_ORDER_KEY)
    if (raw) {
      const ids = JSON.parse(raw)
      if (Array.isArray(ids)) applyOrder(ids)
    }
  } catch (_) {
    // ignore storage errors
  }
})

watch(
  cards,
  list => {
    try {
      const ids = list.map(c => c.id)
      localStorage.setItem(CARD_ORDER_KEY, JSON.stringify(ids))
    } catch (_) {
      // ignore storage errors
    }
  },
  { deep: false }
)
</script>

<style scoped>
/* Drag styles */
.draggable-card {
  cursor: grab;
}
.drag-ghost {
  opacity: 0.5;
}
.drag-chosen,
.drag-dragging {
  outline: 2px dashed #c493dc;
  outline-offset: 2px;
}
</style>
