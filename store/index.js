import Vue from 'vue';
import Vuex from 'vuex';
import persistedState from 'vuex-persistedstate';
import getters from './getters';
Vue.use(Vuex);

const files = require.context('./modules', false, /\.js$/);
const modules = {};

files.keys().forEach(key => {
    modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default;
});

const store = () => {
    return new Vuex.Store({
        modules,
        getters,
        plugins: [persistedState()]
    });
};

export default store;
