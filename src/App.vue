<script>
  import store from './store'
  import card from './components/card'
  import list from './components/list'
  import text from './components/text'
  import message from './components/message'
  export default {
    el: '#chat',
    data () {
      let serverData = store.fetch()
      return {
        // Inicia al usuario
        user: serverData.user,
        // Lista de usuarios
        userList: serverData.userList,
        // Lista de chats
        sessionList: serverData.sessionList,
        // Busqueda
        search: '',
        // Index de la sesion
        sessionIndex: 0
      }
    },
    computed: {
      session () {
        return this.sessionList[this.sessionIndex]
      }
    },
    watch: {
      // Guardar los cambios en LocalStorage
      sessionList: {
        deep: true,
        handler () {
          store.save({
            user: this.user,
            userList: this.userList,
            sessionList: this.sessionList
          })
        }
      }
    },
    components: {
      card, list, text, message
    }
  }
</script>

<template>
    <div>
        <div class="sidebar">
            <card :user="user" :search.sync="search"></card>
            <list :user-list="userList" :session="session" :session-index.sync="sessionIndex" :search="search"></list>
        </div>
        <div class="main">
            <message :session="session" :user="user" :user-list="userList"></message>
            <text :session="session"></text>
        </div>
    </div>
</template>

<style>
  #chat {
    overflow: hidden;
    border-radius: 3px;
  }
  #chat .sidebar,
  #chat .main {
    height: 100%;
  }
  #chat .sidebar {
    float: left;
    width: 200px;
    color: #f4f4f4;
    background-color: #2e3238;
  }
  #chat .main {
    position: relative;
    overflow: hidden;
    background-color: #eee;
  }
  #chat .m-text {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
  }
  #chat .m-message {
    height: calc(100% - 160px);
  }
</style>
