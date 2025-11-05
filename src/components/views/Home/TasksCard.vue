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
  <SharedCard showDivider class="w-fit">
    <template #header>
      <div class="flex items-center gap-2">
        <ThemifyIcon name="clipboard" size="32" class="text-secondary-500" />
        <h2 class="text-2xl font-bold text-gray-800">تسک‌های من</h2>
      </div>
    </template>
    <template #content>
      <div class="flex flex-col gap-4">
        <!-- Task Item -->
        <div
          v-for="task in tasks"
          :key="task.id"
          class="task-item p-3 rounded-lg border bg-white border-gray-200"
        >
          <div class="flex items-start gap-3">
            <!-- Task Content -->
            <div class="flex-1 min-w-0">
              <h3 class="text-base font-semibold mb-1 text-gray-800">
                {{ task.title }}
              </h3>
              <p class="text-sm mb-2 text-gray-600">
                {{ task.description }}
              </p>

              <!-- Meta Info -->
              <div class="flex items-center gap-3 flex-wrap">
                <!-- Priority Badge -->
                <span
                  class="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium"
                  :class="{
                    'bg-error-100 text-error-700': task.priority === 'high',
                    'bg-warning-100 text-warning-700': task.priority === 'medium',
                    'bg-info-100 text-info-700': task.priority === 'low',
                  }"
                >
                  <ThemifyIcon name="flag" :size="12" />
                  {{
                    task.priority === 'high'
                      ? 'فوری'
                      : task.priority === 'medium'
                        ? 'متوسط'
                        : 'عادی'
                  }}
                </span>

                <!-- Due Date -->
                <span class="inline-flex items-center gap-1 text-xs text-gray-500" v-if="task.dueDate">
                  <ThemifyIcon name="time" :size="12" />
                  {{ task.dueDate }}
                </span>

                <!-- Assignee -->
                <span class="inline-flex items-center gap-1 text-xs text-gray-500">
                  <ThemifyIcon name="user" :size="12" />
                  {{ task.assignee }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="tasks.length === 0" class="text-center py-8">
          <ThemifyIcon name="check-box" :size="48" class="text-gray-300 mx-auto mb-3" />
          <p class="text-gray-500 text-sm">هیچ تسکی وجود ندارد</p>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="text-sm text-gray-600 text-center">
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

