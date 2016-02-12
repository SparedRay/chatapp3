const key = 'VUE-CHAT-v3'

// Data estatica por ahora
if (!localStorage.getItem(key)) {
  let now = new Date()
  let data = {
    // Usuario inicial
    user: {
      id: 1,
      name: 'Coffce',
      img: 'assets/logo.png'
    },
    // Otros usuarios
    userList: [
      {
        id: 2,
        name: 'ElWerito',
        img: 'assets/logo.png'
      },
      {
        id: 3,
        name: 'webpack',
        img: 'assets/logo.png'
      }
    ],

    // Chats guardados
    sessionList: [
      {
        userId: 2,
        messages: [
          {
            text: 'Que mas wey?。',
            date: now
          },
          {
            text: 'Visita el chatapp 3.0 ahora con vue!',
            date: now
          }
        ]
      },
      {
        userId: 3,
        messages: []
      }
    ]
  }
  localStorage.setItem(key, JSON.stringify(data))
}

export default {
  fetch () {
    return JSON.parse(localStorage.getItem(key))
  },
  save (store) {
    localStorage.setItem(key, JSON.stringify(store))
  }
}
