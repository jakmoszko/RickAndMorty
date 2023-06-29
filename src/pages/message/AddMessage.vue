<template>
  <div class="blue-top-border">
    <Transition name="slide-fade" appear>
      <form @submit.prevent="submitData">
        <section>
          <h1>Send a new message</h1>
        </section>

        <section>
          <label for="title" :class="{'label-error': !title.isValid && title.isTouched}">Title</label> 
          <input 
            id="title" 
            name="title" 
            type="text" 
            placeholder="Enter the title" 
            v-model.trim="title.val" 
            :class="{'input-error': !title.isValid && title.isTouched}" 
            @blur="clearValidity('title')" />
            
          <ErrorMessage v-if="!title.isValid && title.isTouched" errorMessage="Your title length must be between 3 and 32 characters long and can't contain special characters"/>
        </section>

        <section>
          <label for="message" :class="{'label-error': !message.isValid && message.isTouched}">Message</label> 
          <textarea 
            id="message"
             name="message" 
             rows="8" 
             class="message-input" 
             type="text" 
             placeholder="Enter the message here..." 
             v-model.trim="message.val" 
             :class="{'input-error': !message.isValid && message.isTouched}" @blur="clearValidity('message')">
          </textarea>

          <ErrorMessage v-if="!message.isValid && message.isTouched" errorMessage="Message must not be empty and be less than 256 characters long."/>
        </section>

        <section>
          <label for="character" :class="{'label-error': !character.isValid && character.isTouched}">Character</label> 
            <CustomSelect @update-select="updateSelect($event)" :characterData="characterData" :isSelectValid="character.isValid" :isSelectTouched="character.isTouched" v-model="character.val"/>
          <ErrorMessage v-if="!character.isValid && character.isTouched" errorMessage="You have to choose character."/>
          
          
        </section>
        <div class="checkbox-wrapper">
          <input type="checkbox" checked="checked">
          I want to use InterGalaxy Quickpost<span>&#8482;</span>
        </div>

        <div class="button-wrapper">
          <button type="submit">Send</button>
        </div>
        <Transition name="fade">
          <p class="tooltip-message" v-if="isTooltipVisible">Your message has been sent.</p>
        </Transition>
      </form>
    </Transition>
  </div>
</template>

<script>
import CustomSelect from "@/components/CustomSelect.vue";
import ErrorMessage from "@/components/ErrorMessage.vue";
import { fetchCharactersData } from "@/api/character.js";
import { getTime } from "@/utils/time.js";
import { getDate } from "@/utils/date.js";

export default {
  data() {
    return {
      title: {
        val: '',
        isValid: false,
        isTouched: false,
      },
      message: {
        val: '',
        isValid: false,
        isTouched: false,
      },
      character: {
        val: '',
        isValid: false,
        isTouched: false,
      },
      characterData: [],
      isTooltipVisible: false
    }
  },
  components: {
    ErrorMessage,
    CustomSelect,
    },
  beforeMount() {
    fetchCharactersData().then(res => {
        this.characterData = res;
    })
  },
  methods: {
    updateSelect(value) {
      this.character.val = value;
      this.character.isValid = true;
    },
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateForm() {
      const regex = /[\w\d\s]*/gm;

      if (this.title.val.length < 3 || this.title.val.length > 32 || !regex.test(this.title.val)) {
        this.title.isValid = false;
        this.title.isTouched = true;
      }
      if (this.message.val === '' || this.message.val.length > 256 ) {
        this.message.isValid = false;
        this.message.isTouched = true;
      }
      if (!this.character.val) {
        this.character.isValid = false;
        this.character.isTouched = true;
      }

      if(!this.character.isValid || !this.message.isValid || !this.title.isValid) {
        return false;
      }
      this.showTooltip();

      return true;
    },
    showTooltip() {
      this.isTooltipVisible = true
      setTimeout(() => {
        this.isTooltipVisible = false
      }, 2000)
    },

    submitData() {
      if (!this.validateForm()) {
        return;
      }

      const localStorageSessionData = JSON.parse(localStorage.getItem('historyMessage'));

      const formData = {
        id: !localStorageSessionData ? 1 : localStorageSessionData.length + 1,
        title: this.title.val,
        message: this.message.val,
        character: this.character.val,
        date: getDate(),
        time: getTime()
      }


      if(!localStorageSessionData) {
        localStorage.setItem('historyMessage', JSON.stringify([formData]));
        return;
      }
       
      const historyMessageData = localStorageSessionData;
      historyMessageData.push(formData)
      localStorage.setItem('historyMessage', JSON.stringify(historyMessageData));
    },
    
  }
  
}
</script>

<style scoped>
*{
  color: #324B72
}

.blue-top-border {
  border-top: 24px solid #4EADC5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

form {
  width: 460px;
}

h1 {
  font-weight: 300;
  font-size: 32px;
  margin: 30px auto
}

section {
  display: flex;
  flex-direction: column;
}

button {
border: unset;
background-color: #4EADC5;
color: white;
padding: 15px 25px;
border-radius: 50px;
font-size: 16px;
cursor: pointer;
}

input,
select,
textarea {
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #E0E0E0;
  margin: 10px 0;
  font-size: 14px
}

textarea {
  resize: unset;
  font-family: inherit;
  font-size: 14px;
}

textarea::placeholder {
  font-size: 16px;
}

.input-error {
  border: solid 1px red;
}

.label-error {
  color: red
}

.input::placeholder {
  font-size: 14px
}

.input-error::placeholder {
  color: red;
  opacity: 1;
}

.input-error::-ms-input-placeholder {
  color: red;
}

.checkbox-wrapper {
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: 600;
  font-size: 14px;
  margin: 20px 0;
}

input[type="checkbox" i] {
  height: 24px;
  width: 24px;
  accent-color: #4EADC5;
}

.button-wrapper {
  display: flex;
  justify-content: end;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.tooltip-message {
  text-align: center;
}
</style>