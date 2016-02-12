<script>
import Vue from 'vue'

export default {
  props: ['session', 'user', 'userList'],
  computed: {
    sessionUser () {
      let users = this.userList.filter(item => item.id === this.session.userId)
      return users[0]
    }
  },
  filters: {
    // Obtener avatar del usuario
    avatar (item) {
      // Si el usuario es el dueño del mensaje saliente mostrar el suyo
      let user = item.self ? this.user : this.sessionUser
      return user && user.img
    },
    // Transformar fecha en formato Hora/minuto
    time (date) {
      if (typeof date === 'string') {
        date = new Date(date)
      }
      return date.getHours() + ':' + date.getMinutes()
    }
  },
  directives: {
    // Mover la caja de mensajes (Si es que funciona)
    'scroll-bottom': function () {
      Vue.nextTick(() => {
        this.el.scrollTop = this.el.scrollHeight - this.el.clientHeight
      })
    }
  }
}
</script>

<template>
  <div class="m-message" v-scroll-bottom="session.messages">
    <ul>
      <li v-for="item in session.messages">
        <p class="time"><span>{{item.date | time}}</span></p>
        <div class="main" :class="{ self: item.self }">
          <img class="avatar" width="30" height="30" :src="item | avatar" />
          <div class="text">{{item.text}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style>
    .m-message {
      padding: 10px 15px;
      overflow-y: scroll;
    }
    .m-message li {
      margin-bottom: 15px;
    }
    .m-message .time {
      margin: 7px 0;
      text-align: center;
    }
    .m-message .time > span {
      display: inline-block;
      padding: 0 18px;
      font-size: 12px;
      color: #fff;
      border-radius: 2px;
      background-color: #dcdcdc;
    }
    .m-message .avatar {
      float: left;
      margin: 0 10px 0 0;
      border-radius: 3px;
    }
    .m-message .text {
      display: inline-block;
      position: relative;
      padding: 0 10px;
      max-width: calc(100% - 40px);
      min-height: 30px;
      line-height: 2.5;
      font-size: 12px;
      text-align: left;
      word-break: break-all;
      background-color: #fafafa;
      border-radius: 4px;
    }
    .m-message .text:before {
      content: " ";
      position: absolute;
      top: 9px;
      right: 100%;
      border: 6px solid transparent;
      border-right-color: #fafafa;
    }
    .m-message .self {
      text-align: right;
    }
    .m-message .self .avatar {
      float: right;
      margin: 0 0 0 10px;
    }
    .m-message .self .text {
      background-color: #b2e281;
    }
    .m-message .self .text:before {
      right: inherit;
      left: 100%;
      border-right-color: transparent;
      border-left-color: #b2e281;
    }
</style>