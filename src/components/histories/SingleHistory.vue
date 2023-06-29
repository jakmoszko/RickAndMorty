<template>
  <div class="complex-message">
    <div class="message-title-container" @click="isToggle = !isToggle">
      <p class="message-title">{{ title }}</p>
      <span><img :class="{'rotate': isToggle}" src="@/assets/img/arrow.png" alt=""></span>
    </div>
    <Transition name="slide-fade">
      <div class="message-inner" v-if="isToggle">
        <div class="addressee-wrapper">
          <img class="adressee-avatar" :src="avatar" alt="">
          <div class="addressee-details">
            <p>Sent to: {{ character.name }}</p>
            <p>Date: {{ date }}</p>
            <p>At: {{ time }} </p>
          </div>
        </div>
        <p>{{ message }}</p>
      </div>
    </Transition>
  </div>
</template>

<script>
export default {
  props: ['title', 'message', 'character', 'avatar', 'date', 'time'],
  data() {
    return {
      isToggle: false
    }
  }
};

</script>

<style scoped>
.complex-message {
  border-bottom: solid #E0E0E0 1px;
  width: 460px;
}

.message-title {
  font-weight: 600;
  font-size: 14px
}

.addressee-wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
  border-left: solid #C4C4C4 1px;
  padding-left: 5px;
}

.addressee-details {
  display: flex;
  flex-direction: column;
}

.addressee-details p {
  margin: unset
}

.adressee-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}

.message-title-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

.rotate {
  transform: rotateX(180deg);
  animation: rotation 0.3s linear;
}
@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(180deg);
    }
}

</style>