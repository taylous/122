import api from "../../api/imgur";

const state = {
  images: [],
  imgurLinks: [],
  loading: false
};
const getters = {
  allImages: state => state.images,
  showLoading: state => state.loading
};

const actions = {
  async fetchImages({ commit, rootState }) {
    const { token } = rootState.auth;
    const response = await api.fetchImages(token);
    commit("setImages", response.data.data);
  },

  async uploadImages({ commit, rootState }, images) {

    let array = []
    array[0] = images;
    const { token } = rootState.auth;

    commit("setLoading", true);
    await api.uploadImages(array, token).then(res => {
      let imgUrl = res[0]['data']['data']['link'];
      console.log(imgUrl);
      state.imgurLinks.push(imgUrl);
    }).catch(error=>{
      alert("사진 업로드에 실패하였습니다.");
    });
    commit("setLoading", false);
  },

  async deleteImage({rootState}, imageDeleteHash) {

    const { token } = rootState.auth;
    await api.deleteImage(token, imageDeleteHash).then(res => {

      return true;
    }).catch(error=>{
      alert("사진 업로드에 실패하였습니다.");
      return false;
    });
  }
};

const mutations = {
  setImages: (state, images) => {
    state.images = images;
  },
  setLoading: (state, isLoading) => {
    state.loading = isLoading;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
