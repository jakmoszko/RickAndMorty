<template>
  <div class="custom-select" @click="isOpen = !isOpen">
    <div class="select-input"
    :class="{'active': isOpen, 'error': !isSelectValid && isSelectTouched}"><p :class="{'error-input-text': !isSelectValid && isSelectTouched}" v-if="characterName == ''">Pick a character</p><p v-else>{{ characterName}}</p><span :class="{'rotate-top': isOpen}"><img src="@/assets/img/arrow.png" alt=""></span></div>
    <div class="select-options" v-if="isOpen">
      <div class="select-option" :value="item.id" v-for="item in characterData" :key="item.id" @click="$emit('updateSelect', item.id), changeName(item.id)"> {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomSelect",
  data() {
    return {
      isOpen: false,
      characterName: ''
    };
  },
  props: ['custom-select', 'characterData', 'isSelectValid', 'isSelectTouched'],
  methods: {
    changeName(itemId) {
      this.characterName = this.characterData.find(item=> item.id === itemId).name;
    }
  }
}
</script>

<style scoped>
.custom-select {
  display: flex;
  flex-direction: column;
}

.select-input {
  width: 100%;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border: 1px solid #E0E0E0;
  margin: 10px 0 0;
  cursor: pointer;
}

p {
  margin: unset;
  color: gray
}

.active {
  border-radius: 10px 10px 0 0;
}

.select-options {
  border-bottom: 1px solid #E0E0E0;
  border-left: 1px solid #E0E0E0;
  border-right: 1px solid #E0E0E0;
  border-radius: 0 0 10px 10px;
  height:120px;
  overflow:scroll;
  overflow-x:hidden;

}

.select-options::-webkit-scrollbar {
    width: 5px;
    height: 10px;
    background-color: transparent;
}

.select-options::-webkit-scrollbar-thumb {
    background-color: #C4C4C4;
    border-radius: 3px;
}

.select-option {
  cursor: pointer;
  padding: 10px;
  color: #324B72;
}

.select-option:hover {
  background-color: #F4F4F4
}

.error {
  border: 1px red solid;
}

.error-input-text {
  color: red;
}

.rotate-top {
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