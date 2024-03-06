const { nanoid } = require('nanoid');

const TABLA = 'post';
const COLLECTION = TABLA;

module.exports = function (injectedStore) {
    let Store = injectedStore;
    if (!Store) {
        Store = require('../../../store/dummy');
    }

    function list() {
        return Store.list(TABLA);
  }
  
    function listOne(id) { 
        return Store.get(TABLA, id)
  }

  function listByUser(idUser) {
    console.log(idUser);
    return Store.listByUser(TABLA, {user_id: idUser})
  }
  
    function create(id, postData) { 
        const post = {
            id: nanoid(),
            user_id: id,
            ...postData
        }    
        return Store.create(TABLA, post)
    }
    function update(postData, id) {
        return Store.update(TABLA, postData, id)
    }
  
    function remove(removeId) { 
        return Store.remove(TABLA, removeId)
    }

    // Likes & Post
    	async function like(post, user) {
        const like = await Store.create(COLLECTION + '_like', {
          post: post,
          user: user
        })

        return like
  }

  async function postsLiked(user) {
      post = 'post'
      const users = await Store.query(
        COLLECTION + '_like',
        { user: user },
        { post: post }
      )
      return users
    }


  async function postLikers(post) {
    const users = await Store.query(
      COLLECTION + '_like',
      { post: post },
      { post: 'post' }
      )
      return users
    }
    
    return {
    list,
    listOne,
    listByUser,
    create,
    update,
    remove,
    like,
    postsLiked,
    postLikers
    }
}