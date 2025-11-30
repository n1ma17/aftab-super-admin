<script setup>
import { onMounted, ref } from 'vue'
import SharedCard from '@/components/shared/SharedCard.vue'

const calendar = ref()

const colors = ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1']
const names = ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party']

const focus = ref('')
const type = ref('month')
const selectedEvent = ref({})
const selectedElement = ref(null)
const selectedOpen = ref(false)
const events = ref([])

onMounted(() => {
  calendar.value.checkChange()
})

function viewDay(nativeEvent, { date }) {
  focus.value = date
  type.value = 'day'
}
function getEventColor(event) {
  return event.color
}
function setToday() {
  focus.value = ''
}
function prev() {
  calendar.value.prev()
}
function next() {
  calendar.value.next()
}
function showEvent(nativeEvent, { event }) {
  const open = () => {
    selectedEvent.value = event
    selectedElement.value = nativeEvent.target
    requestAnimationFrame(() => requestAnimationFrame(() => (selectedOpen.value = true)))
  }
  if (selectedOpen.value) {
    selectedOpen.value = false
    requestAnimationFrame(() => requestAnimationFrame(() => open()))
  } else {
    open()
  }
  nativeEvent.stopPropagation()
}
function updateRange({ start, end }) {
  const _events = []
  const min = new Date(`${start.date}T00:00:00`)
  const max = new Date(`${end.date}T23:59:59`)
  const days = (max.getTime() - min.getTime()) / 86400000
  const eventCount = rnd(days, days + 20)
  for (let i = 0; i < eventCount; i++) {
    const allDay = rnd(0, 3) === 0
    const firstTimestamp = rnd(min.getTime(), max.getTime())
    const first = new Date(firstTimestamp - (firstTimestamp % 900000))
    const secondTimestamp = rnd(2, allDay ? 288 : 8) * 900000
    const second = new Date(first.getTime() + secondTimestamp)
    _events.push({
      name: names[rnd(0, names.length - 1)],
      start: first,
      end: second,
      color: colors[rnd(0, colors.length - 1)],
      timed: !allDay,
    })
  }
  events.value = _events
}
function rnd(a, b) {
  return Math.floor((b - a + 1) * Math.random()) + a
}
</script>

<template>
  <v-row class="fill-height">
    <v-col>
      <v-card variant="flat">
        <v-card-title>
          <v-row flat class="pa-8">
            <v-btn class="me-4" color="grey-darken-2" variant="outlined" @click="setToday">
              Today
            </v-btn>
            <v-btn color="grey-darken-2" size="small" variant="text" icon @click="next">
              <v-icon size="small"> mdi-chevron-right </v-icon>
            </v-btn>
            <v-btn color="grey-darken-2" size="small" variant="text" icon @click="prev">
              <v-icon size="small"> mdi-chevron-left </v-icon>
            </v-btn>

            <v-toolbar-title v-if="calendar">
              {{ calendar.title }}
            </v-toolbar-title>
            <v-btn
              v-if="type === 'day'"
              color="grey-darken-2"
              variant="outlined"
              @click="type = 'month'"
            >
              <ThemifyIcon name="arrow-left" size="16" />
            </v-btn>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-calendar
            ref="calendar"
            v-model="focus"
            :event-color="getEventColor"
            :events="events"
            :type="type"
            color="primary"
            @change="updateRange"
            @click:date="viewDay"
            @click:event="showEvent"
            @click:more="viewDay"
          ></v-calendar>
          <v-menu
            v-model="selectedOpen"
            :activator="selectedElement"
            :close-on-content-click="false"
            location="end"
          >
            <v-card color="grey-lighten-4" min-width="350px" flat>
              <v-toolbar :color="selectedEvent.color" dark>
                <v-btn icon>
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-toolbar-title>{{ selectedEvent.name }}</v-toolbar-title>
                <v-btn icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <span v-html="selectedEvent.details"></span>
              </v-card-text>
              <v-card-actions>
                <v-btn color="secondary" variant="text" @click="selectedOpen = false">
                  Cancel
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped></style>
