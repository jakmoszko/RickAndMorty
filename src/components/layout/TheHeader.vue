<template>
  <header>
    <nav>
      <router-link to="/">
      <img src="@/assets/img/rick_morty_logo.png" alt="">
      </router-link>
      <ul >
        <li><router-link class="nav-active-element" to="/message">New message</router-link></li>
        <li><router-link class="nav-active-element" to="/history">History</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
header {
  width: 100%;
  height: 5rem;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

header a {
  text-decoration: none;
  color: #324B72;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
}

.nav-active-element:active,
.nav-active-element:hover,
.nav-active-element.router-link-active {
  background-color: #4EADC5;
  color: white;
}

header nav {
  width: 1000px;
  margin: auto;
  margin-bottom: 0px;
  display: flex;
  justify-content: space-between;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: end;
}
</style>