<template>
  <div class="app">
    <AppHeader fixed>

      <b-navbar-nav class="ml-auto">
   
        <b-nav-item class="d-md-down-none">
     
        </b-nav-item>
        <b-nav-item class="d-md-down-none">
   
        </b-nav-item>

      </b-navbar-nav>

    </AppHeader>
    <div class="app-body">

      <main class="main">
        <Breadcrumb :list="list" />
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>

    </div>

  </div>
</template>
