<template>
  <div class="p-6">
    <draggable
      v-model="cards"
      item-key="id"
      class="flex items-start gap-6 justify-start flex-wrap"
      ghost-class="drag-ghost"
      chosen-class="drag-chosen"
      drag-class="drag-dragging"
      :animation="200"
    >
      <template #item="{ element }">
        <div class="draggable-card" :class="{ 'w-full': element.id === 'news' }">
          <component :is="element.comp" />
        </div>
      </template>
    </draggable>
  </div>
</template>

<script setup>
import NewsCard from '@/components/views/Home/NewsCard.vue'
import ContactsCard from '@/components/views/Home/ContactsCard.vue'
import TasksCard from '@/components/views/Home/TasksCard.vue'
import CalendarCard from '@/components/views/Home/CalendarCard.vue'
import { ref, onMounted, watch } from 'vue'
import draggable from 'vuedraggable'

// Base list of available cards
const allCards = [
  { id: 'news', comp: NewsCard },
  { id: 'contacts', comp: ContactsCard },
  { id: 'tasks', comp: TasksCard },
  { id: 'calendar', comp: CalendarCard },
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
