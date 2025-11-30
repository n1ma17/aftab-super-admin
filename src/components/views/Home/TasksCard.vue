<script setup>
import { ref } from 'vue'
import SharedCard from '@/components/shared/SharedCard.vue'
import ThemifyIcon from '@/components/icons/ThemifyIcon.vue'

// Tasks Array
const tasks = ref([
  {
    id: 1,
    title: 'طراحی رابط کاربری صفحه اصلی',
    description: 'طراحی و پیاده‌سازی UI/UX صفحه اصلی پروژه',
    completed: false,
    priority: 'high',
    dueDate: '۱۴۰۳/۰۸/۲۰',
    assignee: 'علی احمدی',
  },
  {
    id: 2,
    title: 'پیاده‌سازی API تماس',
    description: 'ایجاد API برای مدیریت تماس‌های کاربران',
    completed: true,
    priority: 'medium',
    dueDate: '۱۴۰۳/۰۸/۱۸',
    assignee: 'سارا محمدی',
  },
  {
    id: 3,
    title: 'بهینه‌سازی پایگاه داده',
    description: 'بهینه‌سازی query ها و ایندکس‌گذاری جداول',
    completed: false,
    priority: 'low',
    dueDate: '۱۴۰۳/۰۸/۲۵',
    assignee: 'محمد رضایی',
  },
  {
    id: 4,
    title: 'تست واحد کامپوننت‌ها',
    description: 'نوشتن Unit Test برای تمام کامپوننت‌های Vue',
    completed: false,
    priority: 'high',
    dueDate: '۱۴۰۳/۰۸/۲۲',
    assignee: 'فاطمه کریمی',
  },
  {
    id: 5,
    title: 'مستندسازی API',
    description: 'تکمیل مستندات Swagger برای تمام endpointها',
    completed: true,
    priority: 'medium',
    dueDate: '۱۴۰۳/۰۸/۱۹',
    assignee: 'حسین نوری',
  },
])
</script>

<template>
  <SharedCard showDivider>
    <template #header>
      <div class="d-flex align-center" style="gap: 8px">
        <ThemifyIcon name="clipboard" size="32" style="color: var(--v-theme-secondary)" />
        <h2 class="text-h6 font-weight-bold">تسک‌های من</h2>
      </div>
    </template>
    <template #content>
      <div class="d-flex flex-column" style="gap: 16px; height: 500px; overflow-y: auto">
        <!-- Task Item -->
        <div
          v-for="task in tasks"
          :key="task.id"
          class="task-item"
          style="
            padding: 12px;
            border-radius: 8px;
            border: 1px solid rgba(0, 0, 0, 0.12);
            background: white;
          "
        >
          <div class="d-flex align-start" style="gap: 12px">
            <!-- Task Content -->
            <div style="flex: 1 1 auto; min-width: 0">
              <h3 class="text-subtitle-2 font-weight-semibold" style="margin: 0 0 4px">
                {{ task.title }}
              </h3>
              <p class="text-body-2" style="margin: 0 0 8px; color: rgba(0, 0, 0, 0.6)">
                {{ task.description }}
              </p>

              <!-- Meta Info -->
              <div class="d-flex align-center flex-wrap" style="gap: 12px">
                <!-- Priority Badge -->
                <v-chip
                  size="small"
                  :color="
                    task.priority === 'high'
                      ? 'error'
                      : task.priority === 'medium'
                        ? 'warning'
                        : 'info'
                  "
                  variant="tonal"
                  class="font-weight-medium"
                >
                  <ThemifyIcon name="flag" :size="12" style="margin-inline-end: 4px" />
                  {{
                    task.priority === 'high'
                      ? 'فوری'
                      : task.priority === 'medium'
                        ? 'متوسط'
                        : 'عادی'
                  }}
                </v-chip>

                <!-- Due Date -->
                <span
                  class="d-inline-flex align-center text-caption"
                  style="gap: 4px; color: rgba(0, 0, 0, 0.6)"
                  v-if="task.dueDate"
                >
                  <ThemifyIcon name="time" :size="12" />
                  {{ task.dueDate }}
                </span>

                <!-- Assignee -->
                <span
                  class="d-inline-flex align-center text-caption"
                  style="gap: 4px; color: rgba(0, 0, 0, 0.6)"
                >
                  <ThemifyIcon name="user" :size="12" />
                  {{ task.assignee }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="tasks.length === 0" class="text-center" style="padding: 32px 0">
          <ThemifyIcon
            name="check-box"
            :size="48"
            style="color: rgba(0, 0, 0, 0.3); margin: 0 auto 12px"
          />
          <p class="text-body-2" style="color: rgba(0, 0, 0, 0.6)">هیچ تسکی وجود ندارد</p>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="text-body-2 text-center" style="color: rgba(0, 0, 0, 0.6)">
        جمع کل: <strong>{{ tasks.length }}</strong> تسک
      </div>
    </template>
  </SharedCard>
</template>

<style scoped>
.task-item {
  position: relative;
}

.task-item::before {
  content: '';
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  border-radius: 0 4px 4px 0;
  background: linear-gradient(to bottom, #c493dc, #955ba7);
  transition: all 0.3s ease;
}
</style>
