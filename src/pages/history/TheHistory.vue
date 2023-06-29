<template>
  <div class="blue-top-border">
    <Transition name="slide-fade" appear>
      <div class="transition-wrapper">
        <h1>Message history</h1>
        <section>
          <template v-if="storedMessages">
          <single-history v-for="mes in storedMessages" :key="mes.id" :title="mes.title" :message="mes. message" :character="mes.character" :avatar="mes.character.img" :date="mes.date" :time="mes. time"></single-history>
          </template>

          <template v-else>
          There is no message to display
          </template>
        </section>
      </div>
    </Transition>
  </div>
</template>

<script>
import SingleHistory from '@/components/histories/SingleHistory.vue'
import { fetchCharacterById } from '@/api/character.js'

export default {
  components: {
    SingleHistory
  },
  data() {
    return {
      storedMessages: [],
    }
  },
  async beforeMount() {
    this.storedMessages = JSON.parse(localStorage.getItem('historyMessage'));

    if(!this.storedMessages) return;

    const charatersIDs = this.storedMessages.map(item => item.character);

    this.storedMessages = await fetchCharacterById(charatersIDs).then(res => {
      const storedMessagesMap = this.storedMessages.map(item => {
        const characterData = res.filter(e => e.id === item.character);

        return {...item, character: characterData[0] }
      })

      return storedMessagesMap
    });
  }
  
}
</script>

<style scoped>
*{
  color: #324B72
}
.blue-top-border {
  border-top: 24px solid #4EADC5;
}

.transition-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h1 {
  font-weight: 300;
  font-size: 32px;
  margin: 30px auto
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}
</style>