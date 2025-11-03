import { defineStore } from 'pinia'

export const useNavigationStore = defineStore('navigation', {
  state: () => ({
    menuItems: [
      {
        id: 'dashboard',
        title: 'داشبورد',
        icon: 'dashboard',
        iconSize: 18,
        path: '/',
        showTitle: true, // نمایش عنوان در کنار آیکون
      },
      {
        id: 'users',
        title: 'کاربران',
        icon: 'user',
        iconSize: 20,
        path: '/users',
        showTitle: false,
      },
    ],
  }),

  getters: {
    // گرفتن منوهایی که عنوان دارند
    menusWithTitle: state => state.menuItems.filter(item => item.showTitle),

    // گرفتن منوهایی که فقط آیکون دارند
    iconOnlyMenus: state => state.menuItems.filter(item => !item.showTitle),

    // پیدا کردن منو با id
    getMenuById: state => id => state.menuItems.find(item => item.id === id),
  },

  actions: {
    // اضافه کردن منوی جدید
    addMenuItem(menuItem) {
      this.menuItems.push(menuItem)
    },

    // حذف منو با id
    removeMenuItem(id) {
      const index = this.menuItems.findIndex(item => item.id === id)
      if (index !== -1) {
        this.menuItems.splice(index, 1)
      }
    },

    // به‌روزرسانی منو
    updateMenuItem(id, updates) {
      const item = this.menuItems.find(item => item.id === id)
      if (item) {
        Object.assign(item, updates)
      }
    },

    // تغییر وضعیت نمایش عنوان
    toggleShowTitle(id) {
      const item = this.menuItems.find(item => item.id === id)
      if (item) {
        item.showTitle = !item.showTitle
      }
    },
  },
})
