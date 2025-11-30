import { defineStore } from 'pinia'

export const useNavigationStore = defineStore('navigation', {
  persist: true,
  state: () => ({
    subHeaderExpanded: true,
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
        icon: 'id-badge',
        iconSize: 20,
        path: '/users',
        showTitle: false,
      },
      {
        id: 'contacts',
        title: 'مخاطبین',
        icon: 'agenda',
        iconSize: 20,
        path: '/contacts',
        showTitle: false,
      },
      {
        id: 'news',
        title: 'اخبار',
        icon: 'book',
        iconSize: 20,
        path: '/news',
        showTitle: false,
      },
    ],
    favoriteProducts: [],
    products: [
      {
        id: 1,
        label: 'محصول 1',
        icon: 'layout-tab-window',
        color: '#10b981',
        bgColor: 'rgba(16, 185, 129, 0.1)',
      },
      {
        id: 2,
        label: 'محصول 2',
        icon: 'layout-tab-window',
        color: '#10b981',
        bgColor: 'rgba(16, 185, 129, 0.1)',
      },
      {
        id: 3,
        label: 'محصول 3',
        icon: 'layout-tab-window',
        color: '#6366f1',
        bgColor: 'rgba(99, 102, 241, 0.1)',
      },
      {
        id: 4,
        label: 'محصول 4',
        icon: 'layout-tab-window',
        color: '#10b981',
        bgColor: 'rgba(16, 185, 129, 0.1)',
      },
      {
        id: 5,
        label: 'محصول 5',
        icon: 'layout-tab-window',
        color: '#f59e0b',
        bgColor: 'rgba(245, 158, 11, 0.1)',
      },
      {
        id: 6,
        label: 'محصول 6',
        icon: 'layout-tab-window',
        color: '#8b5cf6',
        bgColor: 'rgba(139, 92, 246, 0.1)',
      },
      {
        id: 7,
        label: 'محصول 7',
        icon: 'layout-tab-window',
        color: '#C493DC',
        bgColor: 'rgba(139, 92, 246, 0.1)',
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
    // setSubHeaderExpanded(value) {
    //   this.subHeaderExpanded = value
    // },
    toggleSubHeader() {
      this.subHeaderExpanded = !this.subHeaderExpanded
    },
    // اضافه کردن منوی جدید
    addMenuItem(menuItem) {
      this.menuItems.push(menuItem)
    },

    addFavoriteProduct(product) {
      this.favoriteProducts.push(product)
    },

    removeFavoriteProduct(id) {
      this.favoriteProducts = this.favoriteProducts.filter(product => product.id !== id)
    },

    toggleFavoriteProduct(productId) {
      const isFavorite = this.favoriteProducts.some(fav => fav.id === productId)

      if (isFavorite) {
        // اگر در لیست هست، حذفش کن
        this.favoriteProducts = this.favoriteProducts.filter(product => product.id !== productId)
      } else if (this.favoriteProducts.length < 4) {
        // اگر در لیست نیست و تعداد کمتر از 4 است، اضافه کن
        const product = this.products.find(p => p.id === productId)
        if (product) {
          this.favoriteProducts.push(product)
        }
      }
    },

    setDefaultFavorites() {
      this.products.forEach(product => {
        if (product.id <= 4) {
          this.favoriteProducts.push(product)
        }
      })
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
